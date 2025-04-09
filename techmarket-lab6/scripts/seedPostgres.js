require("dotenv").config();
const { faker } = require("@faker-js/faker");
const { sequelize, Product, Category, User } = require("../models");

const seed = async () => {
  try {
    // await sequelize.authenticate();
    // console.log("✅ Connected to PostgreSQL");

    // Wyczyść tabele
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    console.log("✅ Tables cleared");

    // Kategorie
    const categoryData = [
      { name: "Elektronika", description: "Telewizory, laptopy, smartfony" },
      { name: "Dom i ogród", description: "Meble, narzędzia, dekoracje" },
      { name: "Moda", description: "Ubrania, buty, akcesoria" }
    ];

    const categories = await Category.bulkCreate(categoryData, { returning: true });
    console.log(`✅ Inserted ${categories.length} categories`);

    // Użytkownicy
    const users = Array.from({ length: 5 }).map(() => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(20),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName()
    }));

    await User.bulkCreate(users);
    console.log(`✅ Inserted ${users.length} users`);

    // Produkty
    const products = Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category_id: faker.helpers.arrayElement(categories).id,
      price: parseFloat(faker.commerce.price({ min: 10, max: 1500 })),
      stock_count: faker.number.int({ min: 0, max: 100 }),
      brand: faker.company.name(),
      image_url: faker.image.urlPicsumPhotos(),
      is_avaliable: faker.datatype.boolean(),
      createdAt: faker.date.recent({ days: 30 })
    }));

    await Product.bulkCreate(products);
    console.log(`✅ Inserted ${products.length} products`);
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    // await sequelize.close();
    // console.log("🔒 PostgreSQL connection closed.");
  }
};

seed();

// node scripts/seedPostgres.js