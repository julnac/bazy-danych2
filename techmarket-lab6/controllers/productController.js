const { Product, Category, Review } = require('../models');

// Pobierz wszystkie produkty
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

// Pobierz produkt po ID
exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId, {
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
      ]
    });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: `Produkt o ID ${productId} nie został znaleziony`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Utwórz nowy produkt
exports.createProduct = async (req, res) => {
  try {
    const { name, category_id, description, price, stock_count, brand, image_url, is_available } = req.body;

    if (!name || !category_id || !description || !price || !stock_count || !brand || !image_url) {
      return res.status(400).json({ error: 'Brak wymaganych danych' });
    }

    const newProduct = await Product.create({
      name, category_id, description, price, stock_count, brand, image_url, is_available: is_available ?? true
    });

    res.status(201).json({ status: 'success', data: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Zaktualizuj produkt (pełna aktualizacja)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    const updatedProduct = await Product.findByPk(id);
    res.status(200).json({ status: 'success', data: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Zaktualizuj produkt częściowo
exports.partialUpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Brak danych do aktualizacji' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    await product.update(updates);
    res.status(200).json({ status: 'success', data: product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Usuń produkt
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produkt nie znaleziony' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Produkt usunięty' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
