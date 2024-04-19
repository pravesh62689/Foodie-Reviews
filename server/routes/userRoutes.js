const express = require('express');
const router = express.Router();

// Import controllers
const AuthController = require('../controllers/AuthController');
const RestaurantController = require('../controllers/RestaurantController');
const DishController = require('../controllers/DishController');
const ReviewController = require('../controllers/ReviewController');
const NotificationController = require('../controllers/NotificationController');

// Import middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Define routes

// Authentication routes
router.post('/auth/register', AuthController.registerUser);
router.post('/auth/login', AuthController.loginUser);
router.get('/auth/profile', authMiddleware, AuthController.getUserProfile);

// Restaurant routes
router.post('/restaurants', authMiddleware, adminMiddleware, RestaurantController.createRestaurant);
router.get('/restaurants', RestaurantController.getRestaurants);
router.get('/restaurants/:id', RestaurantController.getRestaurantById);
router.put('/restaurants/:id', authMiddleware, adminMiddleware, RestaurantController.updateRestaurant);
router.delete('/restaurants/:id', authMiddleware, adminMiddleware, RestaurantController.deleteRestaurant);

// Dish routes
router.post('/dishes', authMiddleware, adminMiddleware, DishController.createDish);
router.get('/dishes', DishController.getDishes);
router.get('/dishes/:id', DishController.getDishById);
router.put('/dishes/:id', authMiddleware, adminMiddleware, DishController.updateDish);
router.delete('/dishes/:id', authMiddleware, adminMiddleware, DishController.deleteDish);

// Review routes
router.post('/reviews', authMiddleware, ReviewController.createReview);
router.get('/reviews', ReviewController.getReviews);
router.get('/reviews/:id', ReviewController.getReviewById);
router.put('/reviews/:id', authMiddleware, ReviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, ReviewController.deleteReview);

// Notification routes
router.get('/notifications', authMiddleware, NotificationController.getNotifications);
router.post('/notifications', authMiddleware, NotificationController.createNotification);

// Export the router
module.exports = router;
