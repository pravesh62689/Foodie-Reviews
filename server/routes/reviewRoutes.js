const express = require('express');
const router = express.Router();
const { addReview, editReview, deleteReview, getRestaurantReviews } = require('../controllers/reviewController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, addReview);
router.put('/:id', authenticateToken, editReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/:restaurantId', getRestaurantReviews);

module.exports = router;
