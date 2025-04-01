const { getDb } = require('../config/db');

const COLLECTION = 'products';

/**
 * Wzorzec rozszerzonej referencji (Extended Reference Pattern)
 * 
 * Przechowuje podstawowe informacje o powiązanej encji (kategorii)
 * bezpośrednio w dokumencie produktu, aby uniknąć dodatkowych zapytań JOIN.
 */
async function getProductsWithCategoryInfo() {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  return collection.find({
    category_info: { $exists: true }
  }).toArray();
}

async function addCategoryInfoToProduct(productId, categoryInfo) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  const { ObjectId } = require('mongodb');
  
  return collection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { category_info: categoryInfo } }
  );
}

module.exports = {
  getProductsWithCategoryInfo,
  addCategoryInfoToProduct
};