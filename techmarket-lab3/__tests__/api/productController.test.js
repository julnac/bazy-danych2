const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

let categoryId;

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
  
  const category = await Category.create({ name: 'Electronics', description: 'Electronic items' });
  categoryId = category.id;
});

describe('Product API Endpoints', () => {
  let productId;

  test('POST /api/products - should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Smartphone',
        category_id: categoryId,
        description: 'Latest smartphone',
        price: 999.99,
        stock_count: 50,
        brand: 'TechBrand',
        image_url: 'http://example.com/image.jpg',
        is_available: true
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    productId = res.body.data.id;
  });

  test('GET /api/products - should retrieve all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('GET /api/products/:id - should retrieve a product by ID', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Smartphone');
  });

  test('PUT /api/products/:id - should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({ stock_count: 40 });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.stock_count).toBe(40);
  });

  test('PATCH /api/products/:id - should partially update a product', async () => {
    const res = await request(app)
      .patch(`/api/products/${productId}`)
      .send({ price: 899.99 });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.price).toBe(899.99);
  });

  test('DELETE /api/products/:id - should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/products/:id - should return 404 for deleted product', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await sequelize.close();
});
