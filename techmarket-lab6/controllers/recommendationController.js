const ProductView = require("../models/ProductView");
const Product = require("../models/Product"); // jeśli potrzebujesz do wzbogacenia wyników
const mongoose = require("mongoose");

// Prosta rekomendacja
const recommendProductsForUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  try {
    // 1. Pobierz historię użytkownika
    const userViews = await ProductView.find({ userId });
    const viewedProductIds = [...new Set(userViews.map((v) => v.productId.toString()))];

    if (viewedProductIds.length === 0) {
        return res.status(200).json({ recommendations: [], message: "No browsing history found." });
    }

    // 2. Znajdź innych użytkowników, którzy oglądali te same produkty
    const similarViews = await ProductView.find({
      productId: { $in: viewedProductIds },
      userId: { $ne: userId }
    });

    if (similarViews.length === 0) {
        return res.status(200).json({ recommendations: [], message: "No similar users found." });
    }

    // 3. Grupa użytkowników i obliczenie podobieństwa
    const similarityMap = {};
    for (const view of similarViews) {
      const otherUserId = view.userId.toString();
      if (!similarityMap[otherUserId]) similarityMap[otherUserId] = new Set();
      similarityMap[otherUserId].add(view.productId.toString());
    }

    //współczynniki podobieństwa (Jaccard Index)
    const similarityScores = Object.entries(similarityMap).map(([otherUserId, productSet]) => {
      const common = [...productSet].filter((p) => viewedProductIds.includes(p));
      const union = new Set([...productSet, ...viewedProductIds]);
      const score = common.length / union.size;
      return { otherUserId, score, products: [...productSet] };
    });

    // 4. Posortuj podobnych użytkowników wg podobieństwa
    similarityScores.sort((a, b) => b.score - a.score);

    // 5. Zbierz rekomendowane produkty (oglądane przez podobnych, ale nie przez użytkownika)
    const recommendedSet = new Set();

    for (const { products } of similarityScores) {
      for (const pid of products) {
        if (!viewedProductIds.includes(pid)) {
          recommendedSet.add(pid);
        }
      }
    }

    const recommendedIds = Array.from(recommendedSet).slice(0, 10);

    if (recommendedIds.length === 0) {
      return res.status(200).json({ recommendations: [], message: "No new products to recommend." });
    }

    // 5. Pobierz szczegóły produktów z Postgresa
    const recommendedProducts = await Product.findAll({
        where: { id: recommendedIds },
        attributes: ["id", "name", "price", "brand", "image_url", "description", "is_avaliable"]
      });
  
      res.json({ recommendations: recommendedProducts });
    } catch (err) {
      console.error("❌ Recommendation error:", err);
      res.status(500).json({ message: "Error generating recommendations" });
    }
};

module.exports = { recommendProductsForUser };
