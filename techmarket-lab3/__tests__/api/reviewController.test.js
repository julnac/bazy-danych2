const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const Review = require('../../models/Review');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Category = require('../../models/Category');

let productId, userId, reviewId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const category = await Category.create({ name: 'Elektronika', description: 'Urządzenia elektryczne i gadżety' });

  const product = await Product.create({ name: 'Test Product', category_id: category.id , description: 'Test description', price: 10.99, stock_count: 100, brand: 'TestBrand', image_url: 'http://example.com/image.jpg' });
  productId = product.id;

  const user = await User.create({ username: 'testuser', email: 'test@example.com', password_hash: 'hashedpassword123' });
  userId = user.id;
});

describe('Review API Endpoints', () => {
  test('POST /api/reviews - should create a new review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send({
        product_id: productId,
        user_id: userId,
        rating: '5',
        comment: 'Great product!'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    reviewId = res.body.data.id;
  });

  // test('GET /api/reviews - should retrieve all reviews', async () => {
  //   const res = await request(app).get('/api/reviews');
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.count).toBeGreaterThan(0);
  // });

  // test('GET /api/reviews/:id - should retrieve a review by ID', async () => {
  //   const res = await request(app).get(`/api/reviews/${reviewId}`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.data.rating).toBe('5');
  // });

  // test('PUT /api/reviews/:id - should update a review', async () => {
  //   const res = await request(app)
  //     .put(`/api/reviews/${reviewId}`)
  //     .send({ rating: '4', comment: 'Good product.' });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.data.rating).toBe('4');
  // });

  // test('DELETE /api/reviews/:id - should delete a review', async () => {
  //   const res = await request(app).delete(`/api/reviews/${reviewId}`);
  //   expect(res.statusCode).toBe(204);
  // });

  // test('GET /api/reviews/:id - should return 404 for deleted review', async () => {
  //   const res = await request(app).get(`/api/reviews/${reviewId}`);
  //   expect(res.statusCode).toBe(404);
  // });
});

afterAll(async () => {
  await sequelize.close();
});