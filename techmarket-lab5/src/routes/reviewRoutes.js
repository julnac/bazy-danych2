const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateRequest } = require('../middleware/validationMiddleware');
const {
    createReviewSchema,
    contentUpdateSchema,
    attributeSearchSchema
} = require('../schemas/reviewSchema');


router.post('/',
    validateRequest(createReviewSchema, 'body'),
    reviewController.createReview
);

router.get('/', reviewController.getAllReviews);

// router.get('/:productId', reviewController.findReviewsByProduct);

router.put('/:id/content', 
    validateRequest(contentUpdateSchema, 'body'),
    reviewController.updateReviewContent
);

router.delete('/:id', reviewController.deleteReview);

// router.get('/:productId/stats', reviewController.getReviewStats);


// router.get('/:productId/search', reviewController.searchReviews);

// Głosowanie na pomocność recenzji
// router.post('/:id/vote', reviewController.voteReview);

// router.get('/rating/:rating', productController.getMeanRating);

module.exports = router;
