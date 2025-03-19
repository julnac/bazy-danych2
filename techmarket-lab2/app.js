require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const productRoutes = require('./src/routes/productRoutes');
const errorHandler = require('./src/middleware/errorMiddleware');
const notFound = require('./src/middleware/notFoundMiddleware');

// inicjalizacja bazy danych
require('./src/config/db');

app.use(express.json());
app.use(cors()); // Allow frontend to communicate with API
app.use(morgan('dev')); // Logs HTTP requests

// Routing aplikacji
app.use('/api/products', productRoutes);

// Middleware dla nieznalezionych ścieżek (404)
app.use(notFound);

// Middleware globalnej obsługi błędów
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serwer działa na porcie ${PORT}`);
});