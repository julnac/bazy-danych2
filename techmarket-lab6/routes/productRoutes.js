const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Endpointy
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.partialUpdateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;