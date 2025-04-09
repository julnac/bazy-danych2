const Category = require('../models/Category');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ status: 'success', count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });

    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });

    res.status(201).json({ status: 'success', data: newCategory });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });

    await category.update(req.body);
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getCategoryWithProducts = async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name', 'description', 'price', 'stock_count']
          }
        ]
      });
  
      if (!category) return res.status(404).json({ status: 'error', message: 'Category not found' });
  
      res.status(200).json({ status: 'success', data: category });
    } catch (error) {
      next(error);
    }
  };
