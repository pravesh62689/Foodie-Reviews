const express = require('express');
const router = express.Router();
const { getRestaurants, addRestaurant, searchRestaurants, filterRestaurants } = require('../controllers/restaurantController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', getRestaurants);
router.post('/', authenticateToken, addRestaurant);
router.get('/search', searchRestaurants);
router.get('/filter', filterRestaurants);

module.exports = router;
