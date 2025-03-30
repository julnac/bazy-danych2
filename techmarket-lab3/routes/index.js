const express = require('express');

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const reviewRoutes = require('./reviewRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

const router = express.Router();

// Prefiks wersji API
// const API_PREFIX = '/api/v1';

// Montowanie tras
// router.use(`${API_PREFIX}/projects`, projectRoutes);
router.use('/api/users', userRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/reviews', reviewRoutes);
router.use('/api/products', productRoutes);
router.use('/api/carts', cartRoutes);

// Trasa kontroli stanu (health check)
router.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API działa',
    timestamp: new Date().toISOString()
  });
});

// Obsługa 404 dla tras API
router.all('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Nie można ${req.method} ${req.originalUrl}`
  });
});

module.exports = router;
