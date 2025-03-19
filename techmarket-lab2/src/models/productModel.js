const pool = require('../config/db');

const Product = {
  // Get all products
  // getAll: async () => {
  //   const { rows } = await pool.query('SELECT * FROM products ORDER BY product_id;');
  //   return rows;
  // },

  getAll: async ({ isAvailable, sort }) => {
    let query = 'SELECT * FROM products';
    let values = [];
    let conditions = [];

    if (isAvailable !== undefined) {
      conditions.push('isAvailable = $' + (values.length + 1));
      values.push(isAvailable);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    if (sort === 'asc' || sort === 'desc') {
      query += ` ORDER BY price ${sort.toUpperCase()}`;
    } else {
      query += ' ORDER BY product_id';
    }

    const { rows } = await pool.query(query, values);
    return rows;
  },

  // Get product by ID
  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE product_id = $1;', [id]);
    return rows[0];
  },

  // Create new product
  create: async (name, category, description, price, stockCount, brand, imageUrl, isAvailable) => {
    const { rows } = await pool.query(
      'INSERT INTO products (name, category, description, price, stockCount, brand, imageUrl, isAvailable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
      [name, category, description, price, stockCount, brand, imageUrl, isAvailable]
    );
    return rows[0];
  },

  // Update product
  update: async (id, { name, category, description, price, stockCount, brand, imageUrl, isAvailable }) => {
    const { rows } = await pool.query(
      `UPDATE products 
       SET name = $1, category = $2, description = $3, price = $4, stockCount = $5, brand = $6, imageUrl = $7, isAvailable = $8 
       WHERE product_id = $9 RETURNING *;`,
      [name, category, description, price, stockCount, brand, imageUrl, isAvailable, id]
    );
    return rows[0];
  },

  // Delete product
  delete: async (id) => {
    const { rows } = await pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *;', [id]);
    return rows[0];
  }
};

module.exports = Product;

