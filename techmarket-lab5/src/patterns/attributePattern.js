const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

/**
 * Wzorzec atrybutów (Attribute Pattern)
 * 
 * Przechowuje różnorodne atrybuty produktów w ujednoliconej strukturze,
 * ułatwiając wyszukiwanie i filtrowanie po różnych atrybutach.
 */
async function createProductWithAttributes(productData) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  // Transformacja atrybutów produktu do formatu zgodnego z wzorcem atrybutów
  const attributes = [];
  
  // Przekształcamy specyficzne dla kategorii atrybuty w zunifikowaną listę
  if (productData.attributes) {
    for (const [name, value] of Object.entries(productData.attributes)) {
      attributes.push({ name, value });
    }
    delete productData.attributes;
  }
  
  // Dodajemy listę atrybutów do dokumentu
  const product = {
    ...productData,
    attributes,
    createdAt: new Date()
  };
  
  const result = await collection.insertOne(product);
  return { _id: result.insertedId, ...product };
}

async function findProductsByAttribute(attributeName, attributeValue) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  return collection.find({
    attributes: {
      $elemMatch: {
        name: attributeName,
        value: attributeValue
      }
    }
  }).toArray();
}

module.exports = {
  createProductWithAttributes,
  findProductsByAttribute
};