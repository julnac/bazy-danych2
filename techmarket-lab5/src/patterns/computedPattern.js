const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

/**
 * Wzorzec obliczeniowy (Computed Pattern)
 * 
 * Przechowuje wstępnie obliczone wartości (średnia ocen)
 * wraz z surowymi danymi, aby przyspieszyć zapytania.
 */
async function updateProductRating(productId, newRating) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  const product = await collection.findOne({ _id: new ObjectId(productId) });
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  const currentRatings = product.ratings || [];
  currentRatings.push(newRating);
  
  // Obliczamy średnią ocenę
  const avgRating = currentRatings.reduce((sum, rating) => sum + rating, 0) / currentRatings.length;
  
  // Aktualizujemy dokument, przechowując zarówno surowe dane, jak i wstępnie obliczoną średnią
  return collection.updateOne(
    { _id: new ObjectId(productId) },
    { 
      $set: { 
        ratings: currentRatings,
        computed_avg_rating: parseFloat(avgRating.toFixed(1)),
        total_ratings: currentRatings.length,
        last_updated: new Date()
      } 
    }
  );
}

async function getProductsByMinimumRating(minRating) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Wykorzystujemy wstępnie obliczoną średnią ocenę do szybkiego filtrowania
  return collection.find({
    computed_avg_rating: { $gte: minRating }
  }).toArray();
}

module.exports = {
  updateProductRating,
  getProductsByMinimumRating
};