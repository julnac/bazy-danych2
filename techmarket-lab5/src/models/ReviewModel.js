const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'reviews';

// Podstawowe operacje CRUD
async function createReview(productData) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Insert the new review into the database
  const result = await collection.insertOne({
    ...reviewData,
    createdAt: new Date(),
  });

  return { _id: result.insertedId, ...reviewData };
}

async function getReviewById(id) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

async function getAllReviews() {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  return collection.find({}).toArray();
}

async function updateReviewContent(id, newContent) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Aktualizacja zawartość
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { content: newContent } }
  );
  
  return getReviewById(id);
}

async function deleteReview(id) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Delete the review from the database
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
  return result.deletedCount > 0; // Return true if deletion was successful
}

module.exports = {
  createReview,
  getReviewById,
  getAllReviews,
  updateReviewContent,
  deleteReview
};