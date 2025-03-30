const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const Category = require('../../models/Category');

describe('Category API Endpoints', () => {
  let categoryId;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });

  test('POST /api/categories - should create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({ name: 'Electronics', description: 'Electronic items' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    categoryId = res.body.data.id;
  });

  test('GET /api/categories - should retrieve all categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('GET /api/categories/:id - should retrieve a category by ID', async () => {
    const res = await request(app).get(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Electronics');
  });

  test('PUT /api/categories/:id - should update a category', async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({ description: 'Updated electronics category' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.description).toBe('Updated electronics category');
  });

  test('DELETE /api/categories/:id - should delete a category', async () => {
    const res = await request(app).delete(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(204);
  });

  test('GET /api/categories/:id - should return 404 for deleted category', async () => {
    const res = await request(app).get(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
