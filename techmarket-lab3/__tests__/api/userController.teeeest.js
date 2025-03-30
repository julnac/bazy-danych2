const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const User = require('../../models/User');

describe('User API Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });

  let userId;

  test('POST /api/users - should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123',
        first_name: 'John',
        last_name: 'Doe'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    userId = res.body.data.id;
  });

  test('GET /api/users - should retrieve all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('GET /api/users/:id - should retrieve a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe('testuser');
  });

  test('PUT /api/users/:id - should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ first_name: 'UpdatedName' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.first_name).toBe('UpdatedName');
  });

  test('DELETE /api/users/:id - should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });

  test('GET /api/users/:id - should return 404 for deleted user', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
