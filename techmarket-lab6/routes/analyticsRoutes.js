const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

// Ścieżki API
router.get("/reviews/stats", analyticsController.getReviewStats);
router.get("/reviews/trend", analyticsController.getReviewTrend);
router.get("/views/stats", analyticsController.getViewStats);
router.get("/views/trend", analyticsController.getViewTrend);

module.exports = router;

// /api/analytics/reviews/stats?productId=PRODUCT_ID
// /api/analytics/reviews/trend
// /api/analytics/views/stats?productId=PRODUCT_ID
// /api/analytics/views/trend
