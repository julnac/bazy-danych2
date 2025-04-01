const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION = 'price_history';

/**
 * Wzorzec kubełkowy (Bucket Pattern)
 * 
 * Grupuje powiązane dane (historia cen) w "kubełki" według czasu,
 * aby zmniejszyć liczbę dokumentów i poprawić wydajność.
 */
async function recordPriceChange(productId, newPrice) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  // Sprawdzamy, czy istnieje już kubełek dla tego produktu i miesiąca
  const existingBucket = await collection.findOne({
    product_id: new ObjectId(productId),
    month: currentMonth
  });
  
  if (existingBucket) {
    // Dodajemy nowy wpis do istniejącego kubełka
    return collection.updateOne(
      { product_id: new ObjectId(productId), month: currentMonth },
      { 
        $push: { 
          price_points: {
            price: newPrice,
            timestamp: currentDate
          }
        },
        $set: {
          last_updated: currentDate
        }
      }
    );
  } else {
    // Tworzymy nowy kubełek
    return collection.insertOne({
      product_id: new ObjectId(productId),
      month: currentMonth,
      price_points: [
        {
          price: newPrice,
          timestamp: currentDate
        }
      ],
      created_at: currentDate,
      last_updated: currentDate
    });
  }
}

async function getPriceHistory(productId) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  
  return collection.find({
    product_id: new ObjectId(productId)
  }).sort({ month: 1 }).toArray();
}

module.exports = {
  recordPriceChange,
  getPriceHistory
};