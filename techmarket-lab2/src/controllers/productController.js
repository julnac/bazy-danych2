const Product = require('../models/productModel');

// Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.getAll();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    const { isAvailable, sort } = req.query;

    // Parsowanie wartości
    const filters = {
      isAvailable: isAvailable === 'true' ? true : isAvailable === 'false' ? false : undefined,
      sort: sort === 'asc' || sort === 'desc' ? sort : undefined
    };

    const products = await Product.getAll(filters);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    product ? res.status(200).json(product) : res.status(404).json({ error: 'Produkt nie znaleziony' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stockCount, brand, imageUrl, isAvailable } = req.body;

    if (!name || !category || !description || !price || !stockCount || !brand || !imageUrl) {
      return res.status(400).json({ error: 'Brak wymaganych danych' });
    }

    const newProduct = await Product.create(name, category, description, price, stockCount, brand, imageUrl, isAvailable ?? true);
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - Update a product completely
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.update(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH - Partially update a product
exports.partialUpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Brak danych do aktualizacji' });
    }

    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    const updatedProductParams = { ...product, ...updates };

    const updatedProduct = await Product.update(id, updatedProductParams);
    res.status(200).json(updatedProduct);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Remove a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    await Product.delete(req.params.id);
    res.status(200).json({ message: 'Produkt usunięty' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
