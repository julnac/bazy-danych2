const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');
const Review = require('./Review');
const User = require('./User');
const Cart = require('./Cart');

// Relacja: Category ma wiele produktów
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
  onDelete: 'CASCADE'
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

// Relacja: User ma wiele reviw
User.hasMany(Review, {
  foreignKey: 'user_id',
  as: 'reviews',
  onDelete: 'CASCADE'
});
Review.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Relacja: Produkt ma wiele review
Product.hasMany(Review, {
  foreignKey: 'product_id',
  as: 'reviews',
  onDelete: 'CASCADE'
});
Review.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

// Relacja: User ma wiele Cart items
User.hasMany(Cart, {
  foreignKey: 'user_id',
  as: 'cartItems',
  onDelete: 'CASCADE'
});
Cart.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Relacja: Produkt ma wiele Cart items
Product.hasMany(Cart, {
  foreignKey: 'product_id',
  as: 'cartItems',
  onDelete: 'CASCADE'
});
Cart.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

// Sync all models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully');
  } catch (error) {
    console.error('Failed to synchronize database models:', error);
  }
};

syncDatabase();

module.exports = {
  sequelize,
  Product,
  Category,
  Review,
  User,
  Cart
};