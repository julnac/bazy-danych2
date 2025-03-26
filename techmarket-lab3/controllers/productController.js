const { Product, Category, Review } = require('../models'); 

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'stock_count', 'brand', 'image_url', 'is_available', 'createdAt'],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'description']
        },
        {
          model: Review,
          as: 'reviews',
          attributes: ['id', 'rating', 'comment', 'user_id']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    
    const project = await Project.findByPk(projectId, {
      include: [{
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'status', 'priority', 'dueDate']
      }]
    });
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: `Projekt o ID ${projectId} nie został znaleziony`
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock_count, brand, image_url, is_available } = req.body;

    if (!name || !category || !description || !price || !stock_count || !brand || !image_url) {
      return res.status(400).json({ error: 'Brak wymaganych danych' });
    }

    const newProduct = await Product.create({
      name, category_id, description, price, stock_count, brand, image_url, is_available: is_available ?? true
    });
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - Update a product completely
exports.updateProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    const updatedProduct = await Product.update(req.body, { 
      where: { id: req.params.id }
    });

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
