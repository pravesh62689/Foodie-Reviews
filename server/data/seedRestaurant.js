const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../models/restaurant');

dotenv.config();

const insertRestaurants = async () => {
    try {
        // Connect to the database
        mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

        // Array of restaurants to insert
        const restaurants =[
            {
                name: "Ocean's Delight",
                location: "San Diego, CA",
                cuisine: "Seafood",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1516624696830-5e85590b53d6?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Taste of Morocco",
                location: "Austin, TX",
                cuisine: "Moroccan",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1586353467285-36f97e2c2dd5?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Pasta Palace",
                location: "Denver, CO",
                cuisine: "Italian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1602879793987-540fce5b0228?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Middle Eastern Spice",
                location: "Phoenix, AZ",
                cuisine: "Middle Eastern",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1573044110650-94d0a64b4d4d?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Viva Mexico",
                location: "Dallas, TX",
                cuisine: "Mexican",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1607962813856-fd5934f344e7?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Taste of Thailand",
                location: "Charlotte, NC",
                cuisine: "Thai",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1565051593073-d4ab34f0ff1f?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Brazilian Grill",
                location: "Tampa, FL",
                cuisine: "Brazilian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1565007379345-2a63c13b9b30?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Saffron House",
                location: "Orlando, FL",
                cuisine: "Indian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1552140855-6e4dc3ca376f?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Little Tokyo",
                location: "Seattle, WA",
                cuisine: "Japanese",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1545269992-82b8d5b70398?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "La Petite Boulangerie",
                location: "Portland, OR",
                cuisine: "French",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1578926379526-1edcf11becc9?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Aussie Grill",
                location: "Las Vegas, NV",
                cuisine: "Australian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1587811146116-4cc51d65d175?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Mediterranean Bistro",
                location: "Minneapolis, MN",
                cuisine: "Mediterranean",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1622980282139-42cb3b356dd4?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Korean BBQ House",
                location: "San Antonio, TX",
                cuisine: "Korean",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1568377934945-0b6c9c8b2f65?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Caribbean Vibes",
                location: "Atlanta, GA",
                cuisine: "Caribbean",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1589824208233-bc45fc759bb0?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Vietnamese Pho",
                location: "Columbus, OH",
                cuisine: "Vietnamese",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1562068094-7e1746473f52?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Havana Nights",
                location: "New Orleans, LA",
                cuisine: "Cuban",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1615470108933-87c11b9287a0?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Russian Tea Room",
                location: "Philadelphia, PA",
                cuisine: "Russian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1524758631624-d72826b8e3c3?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Peruvian Flavors",
                location: "Indianapolis, IN",
                cuisine: "Peruvian",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1528940143847-04d853b806f9?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
            {
                name: "Spanish Tapas",
                location: "Cincinnati, OH",
                cuisine: "Spanish",
                averageRating: 0,
                image: "https://images.unsplash.com/photo-1607097544173-bf9c0bb278a6?auto=format&fit=crop&w=500&q=80",
                createdAt: new Date('2024-04-16T00:00:00Z'),
            },
        ]
        

        // Insert only if the restaurant doesn't already exist
        for (const restaurant of restaurants) {
            const existingRestaurant = await Restaurant.findOne({ name: restaurant.name, location: restaurant.location });
            if (!existingRestaurant) {
                await Restaurant.create(restaurant);
            }
        }

        console.log('Restaurants inserted successfully');
    } catch (error) {
        console.error('Error inserting restaurants:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

insertRestaurants();
