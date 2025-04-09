const express = require('express');
const router = express.Router(); 

const Product = require('../models/Product');

// Definicja przykładowej trasy GET dla ścieżki '/' w ramach tego routera
// Pełny adres URL będzie zależał od miejsca montowania routera w server.js
router.get('/', (req, res) => {
  res.status(200).send('Router dla reviews działa!');
});

// W tym miejscu będziemy dodawać obsługę pozostałych operacji CRUD:
// POST / (Create)
// GET / (Read All - już mamy szkielet)
// GET /:id (Read One)
// PUT /:id (Update)
// DELETE /:id (Delete)

// Eksportujemy skonfigurowany obiekt routera, aby udostępnić go na zewnątrz
module.exports = router;