const ProductModel = require('../models/ProductModel');

// Podstawowe operacje CRUD
async function createProduct(req, res) {
  try {
    // Walidacja została już wykonana przez middleware
    const productData = req.body;
    const product = await ProductModel.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

// Kontrolery implementujące wzorzec atrybutów
async function findProductsByAttribute(req, res) {
  try {
    const { name, value } = req.query;
    const products = await ProductModel.findProductsByAttribute(name, value);
    res.json(products);
  } catch (error) {
    console.error('Error searching products by attribute:', error);
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
}

// Kontrolery implementujące wzorzec rozszerzonej referencji
async function getProductsWithCategoryInfo(req, res) {
  try {
    const products = await ProductModel.getProductsWithCategoryInfo();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products with category info:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

// Kontrolery implementujące wzorzec obliczeniowy
async function updateProductRating(req, res) {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    
    await ProductModel.updateProductRating(id, rating);
    const updatedProduct = await ProductModel.getProductById(id);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product rating:', error);
    res.status(500).json({ message: 'Error updating rating', error: error.message });
  }
}

async function getProductsByMinimumRating(req, res) {
  try {
    const { rating } = req.params;
    const minRating = parseFloat(rating);
    
    if (isNaN(minRating)) {
      return res.status(400).json({ message: 'Rating must be a number' });
    }
    
    const products = await ProductModel.getProductsByMinimumRating(minRating);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by rating:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

// Kontrolery implementujące wzorzec kubełkowy
async function updateProductPrice(req, res) {
  try {
    const { id } = req.params;
    const { price } = req.body;
    
    const updatedProduct = await ProductModel.updateProductPrice(id, price);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product price:', error);
    res.status(500).json({ message: 'Error updating price', error: error.message });
  }
}

async function getPriceHistory(req, res) {
  try {
    const { id } = req.params;
    const priceHistory = await ProductModel.getPriceHistory(id);
    res.json(priceHistory);
  } catch (error) {
    console.error('Error fetching price history:', error);
    res.status(500).json({ message: 'Error fetching price history', error: error.message });
  }
}

module.exports = {
  // Podstawowe operacje CRUD
  createProduct,
  getProductById,
  getAllProducts,
  
  // Wzorzec atrybutów
  findProductsByAttribute,
  
  // Wzorzec rozszerzonej referencji
  getProductsWithCategoryInfo,
  
  // Wzorzec obliczeniowy
  updateProductRating,
  getProductsByMinimumRating,
  
  // Wzorzec kubełkowy
  updateProductPrice,
  getPriceHistory
};