const ReviewModel = require('../models/ReviewModel');

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    // Walidacja została już wykonana przez middleware
    const reviewData = req.body;
    const review = await ReviewModel.createReview(reviewData);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

async function getAllReviews(req, res) {
  try {
    const reviews = await ReviewModel.getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
}

//   GET /api/reviews/:productId
// const findReviewsByProduct = async (req, res) => {
//     try {
//       const { productId } = req.params;
//       const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;
  
//       const sortOrder = order === 'asc' ? 1 : -1;
//       const skip = (page - 1) * limit;
  
//       const reviews = await ReviewModel.find({ productId })
//         .sort({ [sort]: sortOrder })
//         .skip(skip)
//         .limit(parseInt(limit));
  
//       const totalReviews = await ReviewModel.countDocuments({ productId });
  
//       res.json({
//         reviews,
//         totalPages: Math.ceil(totalReviews / limit),
//         currentPage: parseInt(page),
//         totalReviews
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

//   PUT /api/reviews/:id/content
const updateReviewContent = async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const updatedReview = await ReviewModel.updateReviewContent(id, content);

      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json(updatedReview);
    } catch (err) {
      console.error('Error updating review content:', error);
      res.status(500).json({ message: 'Error updating content', error: error.message });
    }
};

// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReview = await ReviewModel.deleteReview(id);
  
      if (!deletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.json({ message: 'Review deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// GET /api/reviews/:productId/stats
// const getReviewStats = async (req, res) => {
//     try {
//       const { productId } = req.params;
  
//       const stats = await Review.aggregate([
//         { $match: { productId } },
//         {
//           $group: {
//             _id: '$rating',
//             count: { $sum: 1 }
//           }
//         }
//       ]);
  
//       const totalReviews = await Review.countDocuments({ productId });
      
//       if (totalReviews === 0) {
//         return res.json({ averageRating: 0, totalReviews: 0, ratingDistribution: {} });
//       }
  
//       const sumRatings = stats.reduce((acc, { _id, count }) => acc + _id * count, 0);
//       const averageRating = (sumRatings / totalReviews).toFixed(1);
  
//       const ratingDistribution = {};
//       stats.forEach(({ _id, count }) => {
//         ratingDistribution[_id] = count;
//       });
  
//       res.json({ averageRating, totalReviews, ratingDistribution });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// };

module.exports = {
    createReview,
    getAllReviews,
    // findReviewsByProduct,
    updateReviewContent,
    deleteReview,
    // getReviewStats
};


