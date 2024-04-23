const express = require('express');
const router = express.Router();

// Import controllers
const AuthController = require('../controllers/AuthController');
const RestaurantController = require('../controllers/restaurantController');
const DishController = require('../controllers/DishController');
const ReviewController = require('../controllers/reviewController');
const NotificationController = require('../controllers/NotificationController');

// Import middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Define routes
// Authentication routes
router.route('/auth/register')
    .post(AuthController.registerUser);

router.route('/auth/login')
    .post(AuthController.loginUser);

router.route('/auth/profile')
    .get(authMiddleware, AuthController.getUserProfile);

// Restaurant routes
router.route('/restaurant')
    .post(authMiddleware, adminMiddleware, RestaurantController.createRestaurant)
    .get(RestaurantController.getRestaurants);

router.route('/restaurant/:id')
    .get(RestaurantController.getRestaurantById)
    .put(authMiddleware, adminMiddleware, RestaurantController.updateRestaurant)
    .delete(authMiddleware, adminMiddleware, RestaurantController.deleteRestaurant);

// Dish routes
router.route('/dish')
    .post(authMiddleware, adminMiddleware, DishController.createDish)
    .get(DishController.getDishes);

router.route('/dish/:id')
    .get(DishController.getDishById)
    .put(authMiddleware, adminMiddleware, DishController.updateDish)
    .delete(authMiddleware, adminMiddleware, DishController.deleteDish);

// Review routes
router.route('/review')
    .post(authMiddleware, ReviewController.createReview)
    .get(ReviewController.getReviews);

router.route('/review/:id')
    .get(ReviewController.getReviewById)
    .put(authMiddleware, ReviewController.updateReview)
    .delete(authMiddleware, ReviewController.deleteReview);

// Notification routes
router.route('/notification')
    .get(authMiddleware, NotificationController.getNotifications)
    .post(authMiddleware, NotificationController.createNotification);

// Export the router
module.exports = router;
