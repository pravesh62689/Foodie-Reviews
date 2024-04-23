const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const addRestaurant = async (req, res) => {
    const { name, location, cuisine } = req.body;
    console.log('Request received:', { name, location, cuisine });

    try {
        const newRestaurant = new Restaurant({ name, location, cuisine });
        console.log('New restaurant:', newRestaurant);

        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Error saving restaurant:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


const searchRestaurants = async (req, res) => {
    const { query } = req.query;

    try {
        const restaurants = await Restaurant.find({ $text: { $search: query } });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const filterRestaurants = async (req, res) => {
    const { cuisine, location } = req.query;

    try {
        let filter = {};

        if (cuisine) {
            filter.cuisine = cuisine;
        }

        if (location) {
            filter.location = location;
        }

        const restaurants = await Restaurant.find(filter);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    getRestaurants,
    addRestaurant,
    searchRestaurants,
    filterRestaurants,
};
