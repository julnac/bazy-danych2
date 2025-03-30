const request = require('supertest');
const app = require('../../app'); 
const sequelize = require('../../config/database');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Category = require('../../models/Category');

let productId, userId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const category = await Category.create({ name: 'Elektronika', description: 'Urządzenia elektryczne i gadżety' });

  const product = await Product.create({ 
    name: 'Test Product', 
    category_id: category.id , 
    description: 'Test description', 
    price: 10.99, 
    stock_count: 100, 
    brand: 'TestBrand', 
    image_url: 'http://example.com/image.jpg' 
  });
  productId = product.id;

  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password_hash: 'hashedpassword123',
  });
  userId = user.id;
});

describe('Cart API Endpoints', () => {
  let cartItemId;

  test('POST /api/carts - should add a product to the cart', async () => {
    const res = await request(app)
      .post('/api/carts')
      .send({
        user_id: userId,
        product_id: productId,
        quantity: 2
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    cartItemId = res.body.data.id;
  });

  test('POST /api/carts - should return 400 if quantity is less than 1', async () => {
    const res = await request(app)
      .post('/api/carts')
      .send({
        user_id: userId,
        product_id: productId,
        quantity: 0
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Błąd walidacji');
  });

//   test('GET /api/carts/:user_id - should retrieve cart contents', async () => {
//     const res = await request(app).get(`/api/carts/${userId}`);
//     expect(res.body).toBe(200);
//     expect(res.body.count).toBeGreaterThan(0);
//   });

  test('PUT /api/carts/:id - should update the quantity of a cart item', async () => {
    const res = await request(app)
      .put(`/api/carts/${cartItemId}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.quantity).toBe(5);
  });

  test('DELETE /api/carts/:id - should remove a product from the cart', async () => {
    const res = await request(app).delete(`/api/carts/${cartItemId}`);
    expect(res.statusCode).toBe(204);
  });

//   test('GET /api/carts/:user_id - should return 404 for empty cart', async () => {
//     const res = await request(app).get(`/api/carts/${userId}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.count).toBe(0);
//   });
});

afterAll(async () => {
  await sequelize.close();
});
  