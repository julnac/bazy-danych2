require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Własne modele Mongoose
const Review = require("../models/Review");
const ProductView = require("../models/ProductView");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";

// Przykładowe ID produktów i użytkowników (powinny pochodzić z twojej bazy)
const productIds = [
  6,
  11,
  17
];

const userIds = [
  2,
  3,
  4
];

const sources = ["home", "search", "category", "recommendation", "ads"];

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("🔌 Connected to MongoDB");

  await Review.deleteMany({});
  await ProductView.deleteMany({});
  console.log("🧹 Cleared previous data");

  // Seed Reviews
  const reviews = [];

  for (let i = 0; i < 50; i++) {
    const review = new Review({
      productId: faker.helpers.arrayElement(productIds),
      userId: faker.helpers.arrayElement(userIds),
      rating: faker.number.int({ min: 1, max: 5 }),
      title: faker.lorem.words(3),
      content: faker.lorem.sentences(2),
      pros: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
      cons: [faker.hacker.adjective()],
      verifiedPurchase: faker.datatype.boolean(),
      helpfulVotes: faker.number.int({ min: 0, max: 15 }),
      createdAt: faker.date.recent({ days: 90 })
    });
    reviews.push(review);
  }

  await Review.insertMany(reviews);
  console.log(`✅ Inserted ${reviews.length} reviews`);

  // Seed Product Views
  const views = [];

  for (let i = 0; i < 200; i++) {
    const daysAgo = faker.number.int({ min: 0, max: 29 });
    const viewDate = new Date();
    viewDate.setDate(viewDate.getDate() - daysAgo);

    const view = new ProductView({
      productId: faker.helpers.arrayElement(productIds),
      userId: faker.helpers.arrayElement(userIds),
      viewDate,
      duration: faker.number.int({ min: 5, max: 300 }), // seconds
      source: faker.helpers.arrayElement(sources)
    });
    views.push(view);
  }

  await ProductView.insertMany(views);
  console.log(`✅ Inserted ${views.length} product views`);

  await mongoose.disconnect();
  console.log("✅ Done. Connection closed.");
};

seed().catch((err) => {
  console.error("❌ Error during seeding:", err);
  mongoose.disconnect();
});

// node scripts/seedMongo.js