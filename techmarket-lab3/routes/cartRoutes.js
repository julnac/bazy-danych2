const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.addToCart); 
router.get('/:user_id', cartController.getCartContents); 
router.put('/:id', cartController.updateCartQuantity); 
router.delete('/:id', cartController.removeFromCart); 

module.exports = router;
