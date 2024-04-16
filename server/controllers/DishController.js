const Dish = require('../models/Dish');

// Create a new dish
const createDish = async (req, res) => {
    try {
        const { name, description, price, restaurant } = req.body;
        const dish = new Dish({ name, description, price, restaurant });

        // Handle file upload for dish image
        if (req.file) {
            dish.image = req.file.path;
        }

        await dish.save();
        res.status(201).json(dish);
    } catch (error) {
        console.error('Error creating dish:', error);
        res.status(500).json({ error: 'Failed to create dish' });
    }
};

// Get all dishes
const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find().populate('restaurant');
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ error: 'Failed to fetch dishes' });
    }
};

// Get a dish by ID
const getDishById = async (req, res) => {
    try {
        const dishId = req.params.id;
        const dish = await Dish.findById(dishId).populate('restaurant');

        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        res.status(200).json(dish);
    } catch (error) {
        console.error('Error fetching dish:', error);
        res.status(500).json({ error: 'Failed to fetch dish' });
    }
};

// Update a dish
const updateDish = async (req, res) => {
    try {
        const dishId = req.params.id;
        const { name, description, price, restaurant } = req.body;

        const updatedDish = await Dish.findByIdAndUpdate(
            dishId,
            {
                name,
                description,
                price,
                restaurant,
                ...(req.file && { image: req.file.path }),
            },
            { new: true }
        );

        if (!updatedDish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        res.status(200).json(updatedDish);
    } catch (error) {
        console.error('Error updating dish:', error);
        res.status(500).json({ error: 'Failed to update dish' });
    }
};

// Delete a dish
const deleteDish = async (req, res) => {
    try {
        const dishId = req.params.id;

        const deletedDish = await Dish.findByIdAndDelete(dishId);

        if (!deletedDish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error('Error deleting dish:', error);
        res.status(500).json({ error: 'Failed to delete dish' });
    }
};

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish,
};
