const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'username'] }
      ]
    });
    res.status(200).json({ status: 'success', count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'username'] }
      ]
    });

    if (!review) return res.status(404).json({ status: 'error', message: 'Review not found' });

    res.status(200).json({ status: 'success', data: review });
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { product_id, user_id, rating, comment } = req.body;
    const newReview = await Review.create({ product_id, user_id, rating, comment });

    res.status(201).json({ status: 'success', data: newReview });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ status: 'error', message: 'Review not found' });

    await review.update(req.body);
    res.status(200).json({ status: 'success', data: review });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ status: 'error', message: 'Review not found' });

    await review.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
