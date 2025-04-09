// models/ProductView.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productViewSchema = new Schema({
  // productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  // userId: { type: Schema.Types.ObjectId, ref: 'User' }, // może być null jeśli anonimowy
  productId: { type: Number, required: true }, // albo: String
  userId: { type: Number, required: true },
  viewDate: { type: Date, default: Date.now },
  duration: { type: Number }, // np. w sekundach
  source: { type: String } // np. "homepage", "search", "ad"
});

module.exports = mongoose.model('ProductView', productViewSchema);