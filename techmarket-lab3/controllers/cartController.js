const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    const cartItem = await Cart.create({ user_id, product_id, quantity });
    res.status(201).json({ status: 'success', data: cartItem });
  } catch (error) {
    next(error);
  }
};

exports.getCartContents = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`Fetching cart contents for user ID: ${user_id}`);
    
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, attributes: ['id', 'name', 'price'] }]
    });

    res.status(200).json({ status: 'success', count: cartItems.length, data: cartItems });
  } catch (error) {
    // console.error('Error fetching cart contents:', error);
    res.status(500).json({error });
    next(error);
  }
};

exports.updateCartQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ status: 'error', message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ status: 'success', data: cartItem });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ status: 'error', message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
