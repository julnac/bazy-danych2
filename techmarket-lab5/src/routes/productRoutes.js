const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateRequest } = require('../middleware/validationMiddleware');
const {
    createProductSchema,
    ratingSchema,
    priceUpdateSchema,
    attributeSearchSchema
} = require('../schemas/productSchema');

// Podstawowe trasy CRUD
router.post('/',
    validateRequest(createProductSchema, 'body'),
    productController.createProduct
);
router.get('/', productController.getAllProducts);

// Trasy implementujące wzorzec atrybutów
router.get('/search',
    validateRequest(attributeSearchSchema, 'query'),
    productController.findProductsByAttribute
);

// Trasy implementujące wzorzec rozszerzonej referencji
router.get('/with-category', productController.getProductsWithCategoryInfo);

router.get('/:id', productController.getProductById);


// Trasy implementujące wzorzec obliczeniowy
router.post('/:id/rate',
    validateRequest(ratingSchema, 'body'),
    productController.updateProductRating
);
router.get('/rating/:rating', productController.getProductsByMinimumRating);

// Trasy implementujące wzorzec kubełkowy
router.put('/:id/price',
    validateRequest(priceUpdateSchema, 'body'),
    productController.updateProductPrice
);
router.get('/:id/price-history', productController.getPriceHistory);

module.exports = router;