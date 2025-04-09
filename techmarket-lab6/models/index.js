const sequelize = require('../config/postgres');
// Import modeli:
const Product = require("./Product");
const User = require("./User");
const Category = require("./Category");

// Relacje, jeśli masz np.:
Product.belongsTo(Category, { foreignKey: "category_id" });

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
  User,
  Category
};
