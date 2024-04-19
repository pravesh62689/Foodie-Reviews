const Restaurant = require('../models/restaurant');

// Create a new restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, location, cuisine, image } = req.body;

        if (!name || !location || !cuisine || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newRestaurant = new Restaurant({
            name,
            location,
            cuisine,
            image,
        });

        const savedRestaurant = await newRestaurant.save();

        res.status(201).json(savedRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
};

// Get a list of all restaurants
const getRestaurants = async (req, res) => {
    try {
      // Get query parameters
      const { page = 1, pageSize = 9, search = '', filter = '' } = req.query;
      const query = {};
      
      // Apply search and filter logic
      if (search) {
        query.name = new RegExp(search, 'i');
      }
      if (filter) {
        query.cuisine = filter;
      }
  
      // Calculate skip value for pagination
      const skip = (page - 1) * pageSize;
  
      // Fetch restaurants from the database
      const restaurants = await Restaurant.find(query)
        .skip(skip)
        .limit(Number(pageSize));
  
      // Count total number of restaurants that match the query
      const totalRestaurants = await Restaurant.countDocuments(query);
  
      // Calculate total number of pages
      const totalPages = Math.ceil(totalRestaurants / pageSize);
  
      // Return the data and pagination info
      res.status(200).json({
        restaurants,
        totalPages,
        currentPage: page,
        totalRestaurants,
      });
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Get a specific restaurant by its ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        console.error('Error retrieving restaurant:', error);
        res.status(500).json({ error: 'Failed to retrieve restaurant' });
    }
};

// Update a specific restaurant by its ID
const updateRestaurant = async (req, res) => {
    try {
        const { name, location, cuisine, image } = req.body;

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, location, cuisine, image },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(updatedRestaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
};

// Delete a specific restaurant by its ID
const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
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
