const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');
const attributePattern = require('../patterns/attributePattern');
const extendedReferencePattern = require('../patterns/extendedReferencePattern');
const computedPattern = require('../patterns/computedPattern');
const bucketPattern = require('../patterns/bucketPattern');

const COLLECTION = 'products';

// Podstawowe operacje CRUD
async function createProduct(productData) {
  // Wykorzystanie wzorca atrybutów
  return attributePattern.createProductWithAttributes(productData);
}

async function getProductById(id) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

async function getAllProducts() {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  return collection.find({}).toArray();
}

async function updateProductPrice(id, newPrice) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Aktualizacja ceny w dokumencie produktu
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { price: newPrice } }
  );
  
  // Wykorzystanie wzorca kubełkowego do rejestracji zmiany ceny
  await bucketPattern.recordPriceChange(id, newPrice);
  
  return getProductById(id);
}

// Eksportujemy funkcje z modelu produktu i wzorców
module.exports = {
  // Podstawowe operacje
  createProduct,
  getProductById,
  getAllProducts,
  updateProductPrice,
  
  // Wzorzec atrybutów
  findProductsByAttribute: attributePattern.findProductsByAttribute,
  
  // Wzorzec rozszerzonej referencji
  getProductsWithCategoryInfo: extendedReferencePattern.getProductsWithCategoryInfo,
  addCategoryInfoToProduct: extendedReferencePattern.addCategoryInfoToProduct,
  
  // Wzorzec obliczeniowy
  updateProductRating: computedPattern.updateProductRating,
  getProductsByMinimumRating: computedPattern.getProductsByMinimumRating,
  
  // Wzorzec kubełkowy
  getPriceHistory: bucketPattern.getPriceHistory
};