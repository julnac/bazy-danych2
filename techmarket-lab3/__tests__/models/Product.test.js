const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Category = require('../../models/Category');
const Product = require('../../models/Product');

beforeAll(async () => {
  // Tworzenie tabel w pamięci
  await sequelize.sync({ force: true });

  // Dodanie przykładowej kategorii do testów
  await Category.create({ name: 'Elektronika', description: 'Urządzenia elektryczne i gadżety' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Model Product', () => {
  it('powinien poprawnie utworzyć produkt', async () => {
    const productData = {
      name: 'Laptop',
      category_id: 1,
      description: 'Wydajny laptop do pracy',
      price: 4500.00,
      stock_count: 10,
      brand: 'Dell',
      image_url: 'http://example.com/laptop.jpg',
      is_available: true
    };

    const product = await Product.create(productData);

    expect(product.id).toBeDefined();
    expect(product.name).toBe(productData.name);
    expect(product.category_id).toBe(productData.category_id);
    expect(product.description).toBe(productData.description);
    expect(Number(product.price)).toBe(4500);
    expect(product.stock_count).toBe(productData.stock_count);
    expect(product.brand).toBe(productData.brand);
    expect(product.image_url).toBe(productData.image_url);
    expect(product.is_available).toBe(true);
  });

  it('powinien zwrócić błąd przy braku nazwy produktu', async () => {
    const productData = {
      category_id: 1,
      description: 'Opis bez nazwy',
      price: 100,
      stock_count: 5,
      brand: 'TestBrand',
      image_url: 'http://example.com/test.jpg',
      is_available: true
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien zwrócić błąd przy ujemnej cenie', async () => {
    const productData = {
      name: 'Produkt Testowy',
      category_id: 1,
      description: 'Produkt z nieprawidłową ceną',
      price: -10.00,
      stock_count: 5,
      brand: 'TestBrand',
      image_url: 'http://example.com/test.jpg',
      is_available: true
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien zwrócić błąd przy nieistniejącej kategorii', async () => {
    const productData = {
      name: 'Smartfon',
      category_id: 99, // Kategoria nie istnieje
      description: 'Telefon testowy',
      price: 2999.00,
      stock_count: 20,
      brand: 'Samsung',
      image_url: 'http://example.com/phone.jpg',
      is_available: true
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('powinien poprawnie usunąć produkt', async () => {
    const product = await Product.create({
      name: 'Tablet',
      category_id: 1,
      description: 'Tablet testowy',
      price: 1500.00,
      stock_count: 3,
      brand: 'Apple',
      image_url: 'http://example.com/tablet.jpg',
      is_available: true
    });

    await product.destroy();

    const foundProduct = await Product.findByPk(product.id);
    expect(foundProduct).toBeNull();
  });
});

// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/database');
// const ProductModel = require('../../models/Product');
// const CategoryModel = require('../../models/Category');

// let Product;

// beforeAll(async () => {

//   const Category = CategoryModel(sequelize, DataTypes);
//   await sequelize.sync({ force: true }); // Zresetuj bazę danych przed testami

//   // Dodajemy przykładową kategorię do testów
//   await Category.create({
//     name: 'Elektronika',
//     description: 'Sprzęt elektroniczny i akcesoria'
//   });
  
//   // Inicjalizacja modelu produktu
//   Product = ProductModel(sequelize, DataTypes);
// });

// // Czyszczenie po testach
// afterAll(async () => {
//   await sequelize.close();
// });

// describe('Product Model', () => {
//   it('powinien utworzyć produkt z poprawnymi danymi', async () => {
//     const productData = {
//       name: 'Smartphone XYZ',
//       category_id: 1,
//       description: 'Nowoczesny smartfon z dużym ekranem',
//       price: 1999.99,
//       stock_count: 10,
//       brand: 'XYZ Electronics',
//       image_url: 'https://example.com/smartphone.jpg',
//       is_available: true
//     };

//     const product = await Product.create(productData);
//     expect(product.id).toBeDefined();
//     expect(product.name).toBe(productData.name);
//     expect(product.description).toBe(productData.description);
//     expect(product.price).toBe(productData.price);
//     expect(product.stock_count).toBe(productData.stock_count);
//     expect(product.brand).toBe(productData.brand);
//     expect(product.image_url).toBe(productData.image_url);
//     expect(product.is_available).toBe(productData.is_available);
//     expect(product.createdAt).toBeDefined();
//   });

//   it('powinien zwrócić błąd przy braku nazwy', async () => {
//     const productData = {
//       category_id: 1,
//       description: 'Opis produktu',
//       price: 100.00,
//       stock_count: 5,
//       brand: 'Test Brand',
//       image_url: 'https://example.com/test.jpg'
//     };

//     await expect(Product.create(productData)).rejects.toThrow();
//   });

//   it('powinien zwrócić błąd przy braku opisu', async () => {
//     const productData = {
//       name: 'Test Product',
//       category_id: 1,
//       price: 100.00,
//       stock_count: 5,
//       brand: 'Test Brand',
//       image_url: 'https://example.com/test.jpg'
//     };

//     await expect(Product.create(productData)).rejects.toThrow();
//   });

//   it('powinien zwrócić błąd przy cenie mniejszej niż 0', async () => {
//     const productData = {
//       name: 'Test Product',
//       category_id: 1,
//       description: 'Opis produktu',
//       price: -50.00, // Cena musi być większa lub równa 0
//       stock_count: 5,
//       brand: 'Test Brand',
//       image_url: 'https://example.com/test.jpg'
//     };

//     await expect(Product.create(productData)).rejects.toThrow();
//   });

//   it('powinien zwrócić błąd przy braku ilości w magazynie', async () => {
//     const productData = {
//       name: 'Test Product',
//       category_id: 1,
//       description: 'Opis produktu',
//       price: 100.00,
//       brand: 'Test Brand',
//       image_url: 'https://example.com/test.jpg'
//     };

//     await expect(Product.create(productData)).rejects.toThrow();
//   });
// });
