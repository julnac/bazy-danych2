const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFoundMiddleware');

// Inicjalizacja aplikacji Express
const app = express();

// Zastosowanie globalnego middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// Montowanie tras
app.use(routes);

// Middleware dla nieznalezionych ścieżek (404)
app.use(notFound);

// Middleware globalnej obsługi błędów (musi być ostatnie)
app.use(errorHandler);

// inicjalizacja bazy danych
// require('./config/database');

module.exports = app;
