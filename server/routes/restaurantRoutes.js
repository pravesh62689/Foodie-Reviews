const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

const authMiddleware = require('../middlewares/authMiddleware');

const { addReview, editReview, deleteReview, getRestaurantReviews } = reviewController;
const { authenticateToken } = authMiddleware;

// Defining routes with the extracted functions
router.post('/', authenticateToken, addReview);
router.put('/:id', authenticateToken, editReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/:restaurantId', getRestaurantReviews);

console.log("reviews");

// Exporting the router
module.exports = router;
