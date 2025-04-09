const request = require("supertest");
const app = require("../server"); // Twój Express app
const mongoose = require("mongoose");
const ProductView = require("../models/ProductView");
const { sequelize } = require("../models"); // Sequelize z Postgresa

describe("GET /api/recommend/:userId", () => {
//   beforeAll(async () => {
//     // połączenie z bazami, jeśli nie robisz tego w server.js
//     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
//     await sequelize.authenticate();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     await sequelize.close();
//   });

  test("📚 Zwraca rekomendacje dla użytkownika z historią", async () => {
    const testUserId = "6613d1a4cf94bb14d4aa0001"; // upewnij się, że ten user ma ProductViews

    const res = await request(app).get(`/api/recommend/${testUserId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("recommendations");
    expect(Array.isArray(res.body.recommendations)).toBe(true);
  });

  test("🚫 Zwraca pustą listę jeśli użytkownik nie ma historii", async () => {
    const userId = new mongoose.Types.ObjectId();

    const res = await request(app).get(`/api/recommend/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.recommendations).toEqual([]);
    expect(res.body.message).toMatch(/no browsing history/i);
  });

  test("❌ Zwraca błąd dla nieprawidłowego userId", async () => {
    const res = await request(app).get(`/api/recommend/not-an-id`);

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid userid/i);
  });

  test("🛑 Obsługuje błąd serwera", async () => {
    // tymczasowo zamknij połączenie z Mongo
    await mongoose.disconnect();

    const res = await request(app).get(`/api/recommend/6613d1a4cf94bb14d4aa0001`);
    expect(res.status).toBe(500);
    expect(res.body.message).toMatch(/error generating/i);

    // przywróć połączenie
    await mongoose.connect(process.env.MONGODB_URI);
  });
});


// npm test