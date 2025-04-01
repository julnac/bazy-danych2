const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

// Strona główna
app.get('/', (req, res) => {
  res.json({
    message: 'MongoDB Patterns API is running',
    endpoints: {
      products: '/api/products',
      attributes: '/api/products/search?name=color&value=black',
      categoryInfo: '/api/products/with-category',
      ratings: '/api/products/rating/4.5',
      priceHistory: '/api/products/:id/price-history'
    }
  });
});

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

module.exports = app;
