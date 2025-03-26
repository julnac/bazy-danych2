const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ProductModel = require('../../models/Product');
const CategoryModel = require('../../models/Category');

let Product;

// Przygotowanie modelu przed testami
beforeAll(async () => {
  // Najpierw musimy zainicjalizować kategorię, aby testy mogły być wykonane
  const Category = CategoryModel(sequelize, DataTypes);
  await sequelize.sync({ force: true }); // Zresetuj bazę danych przed testami
  // Dodajemy przykładową kategorię do testów
  await Category.create({
    name: 'Elektronika',
    description: 'Sprzęt elektroniczny i akcesoria'
  });
  
  // Inicjalizacja modelu produktu
  Product = ProductModel(sequelize, DataTypes);
});

// Czyszczenie po testach
afterAll(async () => {
  await sequelize.close();
});

describe('Product Model', () => {
  it('powinien utworzyć produkt z poprawnymi danymi', async () => {
    const productData = {
      name: 'Smartphone XYZ',
      category_id: 1, // Odwołujemy się do kategorii, którą dodaliśmy
      description: 'Nowoczesny smartfon z dużym ekranem',
      price: 1999.99,
      stock_count: 10,
      brand: 'XYZ Electronics',
      image_url: 'https://example.com/smartphone.jpg',
      is_available: true
    };

    const product = await Product.create(productData);
    expect(product.id).toBeDefined();
    expect(product.name).toBe(productData.name);
    expect(product.description).toBe(productData.description);
    expect(product.price).toBe(productData.price);
    expect(product.stock_count).toBe(productData.stock_count);
    expect(product.brand).toBe(productData.brand);
    expect(product.image_url).toBe(productData.image_url);
    expect(product.is_available).toBe(productData.is_available);
    expect(product.createdAt).toBeDefined();
  });

  it('powinien zwrócić błąd przy braku nazwy', async () => {
    const productData = {
      category_id: 1,
      description: 'Opis produktu',
      price: 100.00,
      stock_count: 5,
      brand: 'Test Brand',
      image_url: 'https://example.com/test.jpg'
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien zwrócić błąd przy braku opisu', async () => {
    const productData = {
      name: 'Test Product',
      category_id: 1,
      price: 100.00,
      stock_count: 5,
      brand: 'Test Brand',
      image_url: 'https://example.com/test.jpg'
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien zwrócić błąd przy cenie mniejszej niż 0', async () => {
    const productData = {
      name: 'Test Product',
      category_id: 1,
      description: 'Opis produktu',
      price: -50.00, // Cena musi być większa lub równa 0
      stock_count: 5,
      brand: 'Test Brand',
      image_url: 'https://example.com/test.jpg'
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien zwrócić błąd przy braku ilości w magazynie', async () => {
    const productData = {
      name: 'Test Product',
      category_id: 1,
      description: 'Opis produktu',
      price: 100.00,
      brand: 'Test Brand',
      image_url: 'https://example.com/test.jpg'
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });
});
