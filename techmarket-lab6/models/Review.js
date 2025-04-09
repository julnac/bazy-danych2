// models/Review.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  // productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  // userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  productId: { type: Number, required: true },
  userId: { type: Number, required: true }, 
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String },
  content: { type: String },
  pros: [String],
  cons: [String],
  verifiedPurchase: { type: Boolean, default: false },
  helpfulVotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);