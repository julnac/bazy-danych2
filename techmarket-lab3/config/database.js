require('dotenv').config();
const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5433,
      dialect: 'postgres',
      logging: false, // Set to console.log to see SQL queries
      pool: {
          max: 5,        // Maximum number of connection in pool
          min: 0,        // Minimum number of connection in pool
          acquire: 30000, // Maximum time (ms) that pool will try to get connection before throwing error
          idle: 10000    // Maximum time (ms) that a connection can be idle before being released
      }
    }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;


