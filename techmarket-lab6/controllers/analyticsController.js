const mongoose = require("mongoose");
const Review = require("../models/Review");
const ProductView = require("../models/ProductView");

// Review Statistics: distribution & average
const getReviewStats = async (req, res) => {
  try {
    const productId = req.query.productId;

    const matchStage = productId ? { productId: new mongoose.Types.ObjectId(productId) } : {};

    const result = await Review.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $group: {
          _id: null,
          ratings: {
            $push: {
              rating: "$_id",
              count: "$count"
            }
          },
          total: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          ratings: {
            $map: {
              input: "$ratings",
              as: "r",
              in: {
                rating: "$$r.rating",
                count: "$$r.count",
                percentage: { $multiply: [{ $divide: ["$$r.count", "$total"] }, 100] }
              }
            }
          },
          total: 1
        }
      }
    ]);

    const avg = await Review.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" }
        }
      }
    ]);

    res.json({
      distribution: result[0]?.ratings || [],
      totalReviews: result[0]?.total || 0,
      averageRating: avg[0]?.avgRating || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Review stats error" });
  }
};

// Trend: daily number of reviews + average rating
const getReviewTrend = async (req, res) => {
  try {
    const productId = req.query.productId;
    const matchStage = productId ? { productId: new mongoose.Types.ObjectId(productId) } : {};

    const result = await Review.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          avgRating: { $avg: "$rating" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Review trend error" });
  }
};

// View statistics: total views, unique users, average duration
const getViewStats = async (req, res) => {
  try {
    const productId = req.query.productId;
    const matchStage = productId ? { productId: new mongoose.Types.ObjectId(productId) } : {};

    const result = await ProductView.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalViews: { $sum: 1 },
          avgDuration: { $avg: "$duration" },
          uniqueUsers: { $addToSet: "$userId" }
        }
      },
      {
        $project: {
          _id: 0,
          totalViews: 1,
          avgDuration: 1,
          uniqueUsersCount: { $size: "$uniqueUsers" }
        }
      }
    ]);

    res.json(result[0] || {
      totalViews: 0,
      avgDuration: 0,
      uniqueUsersCount: 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "View stats error" });
  }
};

// Trend: daily views count and avg duration
const getViewTrend = async (req, res) => {
  try {
    const productId = req.query.productId;
    const matchStage = productId ? { productId: new mongoose.Types.ObjectId(productId) } : {};

    const result = await ProductView.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$viewDate" }
          },
          count: { $sum: 1 },
          avgDuration: { $avg: "$duration" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "View trend error" });
  }
};

module.exports = {
  getReviewStats,
  getReviewTrend,
  getViewStats,
  getViewTrend
};
