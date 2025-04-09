require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongo'); // Importujemy funkcję connectDB
const sequelize = require('./config/postgres');
const cors = require("cors");

// === Sequelize setup (PostgreSQL) ===
require('./models'); // index.js w folderze models

// === Express setup ===
const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Routes ===
// Prosta trasa testowa
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });
// app.use('/api/reviews', require('./routes/reviews'));
// app.use('/api/productViews', require('./routes/productViews'));
app.use("/api/analytics", require('./routes/analyticsRoutes'));
// Montowanie tras postgres
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.use("/api", require("./routes/recommendationRoutes"));

// === MongoDB connection ===


// === PostgreSQL connection ===
const connectPostgres = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connected to PostgreSQL");
      // await sequelize.sync(); // jeśli chcesz synchronizować modele
    } catch (err) {
      console.error("PostgreSQL connection error:", err);
      process.exit(1);
    }
};

// === Start Server ===
const startServer = async () => {
    await connectMongo();
    await connectPostgres();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};
  
startServer();