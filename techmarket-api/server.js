import express from 'express';
import morgan from 'morgan';
import productRoutes from './src/routes/productRoutes.js';
// const express = require('express');
// const morgan = require('morgan');
// const productRoutes = require('./src/routes/productRoutes.js')
// const dotenv = require('dotenv');

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
