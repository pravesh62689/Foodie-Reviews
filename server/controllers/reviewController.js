const Review = require('../models/review');
const Dish = require('../models/Dish');
const Restaurant = require('../models/restaurant');

const createReview = async (req, res) => {
    try {
        const { content, rating, dishId, restaurantId } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!content || !rating || (!dishId && !restaurantId)) {
            return res.status(400).json({ message: 'Content, rating, and target ID (dish or restaurant) are required' });
        }

        // Check target exists
        if (dishId) {
            const dish = await Dish.findById(dishId);
            if (!dish) {
                return res.status(404).json({ message: 'Dish not found' });
            }
        } else if (restaurantId) {
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
        }

        // Create new review
        const newReview = new Review({
            content,
            rating,
            user: userId,
            dish: dishId,
            restaurant: restaurantId,
        });

        await newReview.save();

        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getReviews = async (req, res) => {
    try {
        // Retrieve all reviews, with optional filtering
        const filters = req.query;
        const reviews = await Review.find(filters).populate('user').exec();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id).populate('user').exec();
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, rating } = req.body;

        // Validate input
        if (!content && !rating) {
            return res.status(400).json({ message: 'Content or rating must be provided for update' });
        }

        // Find and update review
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (content) {
            review.content = content;
        }

        if (rating) {
            review.rating = rating;
        }

        await review.save();
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Delete review
        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
