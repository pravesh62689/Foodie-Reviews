const Restaurant = require('../models/restaurant');

// Create a new restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, location, cuisine, image } = req.body;

        // Create a new restaurant object
        const newRestaurant = new Restaurant({
            name,
            location,
            cuisine,
            image
        });

        // Save the restaurant to the database
        await newRestaurant.save();

        // Send the newly created restaurant as the response
        res.status(201).json(newRestaurant);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
};

// Get a list of all restaurants
const getRestaurants = async (req, res) => {
    try {
        // Retrieve all restaurants from the database
        const restaurants = await Restaurant.find();

        // Send the list of restaurants as the response
        res.json(restaurants);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
};

// Get a specific restaurant by its ID
const getRestaurantById = async (req, res) => {
    try {
        // Retrieve the restaurant with the specified ID
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Send the restaurant as the response
        res.json(restaurant);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to retrieve restaurant' });
    }
};

// Update a specific restaurant by its ID
const updateRestaurant = async (req, res) => {
    try {
        const { name, location, cuisine, image } = req.body;

        // Find the restaurant by its ID and update it
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, location, cuisine, image },
            { new: true } // Return the updated document
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Send the updated restaurant as the response
        res.json(updatedRestaurant);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
};

// Delete a specific restaurant by its ID
const deleteRestaurant = async (req, res) => {
    try {
        // Find the restaurant by its ID and delete it
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Send a success message as the response
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
};
