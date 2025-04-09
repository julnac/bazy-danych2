const express = require("express");
const router = express.Router();
const { recommendProductsForUser } = require("../controllers/recommendationController");

router.get("/recommend/:userId", recommendProductsForUser);

module.exports = router;
