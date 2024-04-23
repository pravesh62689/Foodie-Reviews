const Review = require('../models/Review');

const addReview = async (req, res) => {
    const { restaurantId, rating, comment } = req.body;

    try {
        const newReview = new Review({
            restaurant: restaurantId,
            user: req.user.id,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const editReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.rating = rating;
        review.comment = comment;

        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getRestaurantReviews = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.find({ restaurant: restaurantId }).populate('user');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    addReview,
    editReview,
    deleteReview,
    getRestaurantReviews,
};
