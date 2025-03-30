const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Review = require('../../models/Review');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Category = require('../../models/Category');

beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  
    await Category.create({ name: 'Elektronika', description: 'Urządzenia elektryczne i gadżety' });

    await Product.create({
      name: 'Smartphone',
      category_id: 1,
      description: 'Smartphone testowy',
      price: 999.99,
      stock_count: 10,
      brand: 'Test Brand',
      image_url: 'http://example.com/smartphone.jpg',
      is_available: true
    });
  
    await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password_hash: 'hashedpassword',
      first_name: 'Jan',
      last_name: 'Kowalski'
    });
  });
  
afterAll(async () => {
  await sequelize.sync({ force: true }); 
  await sequelize.close();
});
  
describe('Review Model', () => {

it('powinien utworzyć recenzję z poprawnymi danymi', async () => {
    const reviewData = {
    comment: 'Świetny produkt!',
    rating: '5',
    product_id: 1, // ID produktu
    user_id: 1 // ID użytkownika
    };

    const review = await Review.create(reviewData);

    expect(review.id).toBeDefined();
    expect(review.comment).toBe(reviewData.comment);
    expect(review.rating).toBe(reviewData.rating);
    expect(review.product_id).toBe(reviewData.product_id);
    expect(review.user_id).toBe(reviewData.user_id);
});

it('powinien zwrócić błąd przy braku produktu', async () => {
    const reviewData = {
    comment: 'Świetny produkt!',
    rating: '5',
    product_id: 99, // Nieistniejące ID produktu
    user_id: 1
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
});

it('powinien zwrócić błąd przy braku użytkownika', async () => {
    const reviewData = {
    comment: 'Świetny produkt!',
    rating: '5',
    product_id: 1,
    user_id: 99 // Nieistniejące ID użytkownika
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
});

it('powinien zwrócić błąd przy braku ratingu', async () => {
    const reviewData = {
    comment: 'Świetny produkt!',
    product_id: 1,
    user_id: 1,
    rating: null
    };

    await expect(Review.create(reviewData)).rejects.toThrow();
});

it('powinien przyjąć domyślną wartość ratingu', async () => {
    const reviewData = {
    comment: 'Świetny produkt!',
    product_id: 1,
    user_id: 1
    };

    const review = await Review.create(reviewData);

    expect(review.rating).toBe('3'); // Domyślna wartość ratingu
});
});