import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Slider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Drawer,
  Skeleton
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import StarHalf from '@mui/icons-material/StarHalf';

function RestaurantList() {
  // State variables
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter state variables
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [mealFilter, setMealFilter] = useState('');
  const [featureFilter, setFeatureFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Effect to fetch restaurants data
  useEffect(() => {
    const fetchWithDelay = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      fetchRestaurants();
    };
    fetchWithDelay();
  }, [
    currentPage,
    searchQuery,
    cuisineFilter,
    locationFilter,
    typeFilter,
    priceFilter,
    dietaryFilter,
    mealFilter,
    featureFilter,
    ratingFilter,
  ]);

  // Fetch restaurants data from the API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/restaurants', {
        params: {
          page: currentPage,
          search: searchQuery,
          cuisineFilter,
          locationFilter,
          typeFilter,
          priceFilter: `${priceFilter[0]},${priceFilter[1]}`,
          dietaryFilter,
          mealFilter,
          featureFilter,
          ratingFilter,
        },
      });

      const data = response.data;
      if (data && Array.isArray(data.restaurants)) {
        setRestaurants(data.restaurants);
        setTotalPages(data.totalPages);
      } else {
        console.error('Unexpected response format:', data);
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setRestaurants([]);
    }
    setLoading(false);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click
  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    fetchRestaurants();
  };

  // Handle filter changes
  const handleFilterChange = (event, filterType) => {
    const value = event.target.value;
    switch (filterType) {
      case 'cuisine':
        setCuisineFilter(value);
        break;
      case 'location':
        setLocationFilter(value);
        break;
      case 'type':
        setTypeFilter(value);
        break;
      case 'price':
        setPriceFilter(value);
        break;
      case 'dietary':
        setDietaryFilter(value);
        break;
      case 'meal':
        setMealFilter(value);
        break;
      case 'feature':
        setFeatureFilter(value);
        break;
      case 'rating':
        setRatingFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  // Handle pagination change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Toggle filter drawer visibility
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Render star rating
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} color="primary" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" color="primary" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorder key={`empty-${i}`} color="primary" />);
    }

    return stars;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurants
      </Typography>

      {/* Search bar */}
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search restaurants"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchButtonClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={toggleFilterDrawer}
          sx={{ marginLeft: 2 }}
          aria-label="Open filters"
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Filter Drawer */}
      <Drawer anchor="left" open={filterDrawerOpen} onClose={toggleFilterDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          {/* Cuisine Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Cuisine</InputLabel>
            <Select
              value={cuisineFilter}
              onChange={(e) => handleFilterChange(e, 'cuisine')}
              label="Cuisine"
            >
              <MenuItem value="">All</MenuItem>
              {/* Dynamically generate cuisine filter options based on data */}
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="Mexican">Mexican</MenuItem>
              <MenuItem value="Japanese">Japanese</MenuItem>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="Chinese">Chinese</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="Thai">Thai</MenuItem>
              {/* Add more cuisine options as needed */}
            </Select>
          </FormControl>

          {/* Location Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Location</InputLabel>
            <Select
              value={locationFilter}
              onChange={(e) => handleFilterChange(e, 'location')}
              label="Location"
            >
              <MenuItem value="">All</MenuItem>
              {/* Dynamically generate location filter options based on data */}
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="Los Angeles">Los Angeles</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
              <MenuItem value="San Francisco">San Francisco</MenuItem>
              {/* Add more locations as needed */}
            </Select>
          </FormControl>

          {/* Restaurant Type Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Restaurant Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => handleFilterChange(e, 'type')}
              label="Restaurant Type"
            >
              <MenuItem value="">All</MenuItem>
              {/* Dynamically generate restaurant type filter options based on data */}
              <MenuItem value="Fine Dining">Fine Dining</MenuItem>
              <MenuItem value="Casual Dining">Casual Dining</MenuItem>
              <MenuItem value="Fast Food">Fast Food</MenuItem>
              <MenuItem value="Cafe">Cafe</MenuItem>
              <MenuItem value="Bistro">Bistro</MenuItem>
              <MenuItem value="Food Truck">Food Truck</MenuItem>
              {/* Add more restaurant types as needed */}
            </Select>
          </FormControl>

          {/* Price Range Filter */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body2" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={priceFilter}
              onChange={(e, newValue) => handleFilterChange({ target: { value: newValue } }, 'price')}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              marks={[
                { value: 0, label: '$0' },
                { value: 50, label: '$50' },
                { value: 100, label: '$100' },
              ]}
            />
          </FormControl>

          {/* Dietary Options Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Dietary Options</InputLabel>
            <Select
              value={dietaryFilter}
              onChange={(e) => handleFilterChange(e, 'dietary')}
              label="Dietary Options"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
              {/* Add more dietary options as needed */}
            </Select>
          </FormControl>

          {/* Meal Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Meal</InputLabel>
            <Select
              value={mealFilter}
              onChange={(e) => handleFilterChange(e, 'meal')}
              label="Meal"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
              {/* Add more meal options as needed */}
            </Select>
          </FormControl>

          {/* Feature Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Features</InputLabel>
            <Select
              value={featureFilter}
              onChange={(e) => handleFilterChange(e, 'feature')}
              label="Features"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Outdoor Seating">Outdoor Seating</MenuItem>
              <MenuItem value="Takeout">Takeout</MenuItem>
              <MenuItem value="Reservations">Reservations</MenuItem>
              <MenuItem value="Wheelchair Accessible">Wheelchair Accessible</MenuItem>
              {/* Add more features as needed */}
            </Select>
          </FormControl>

          {/* Rating Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              onChange={(e) => handleFilterChange(e, 'rating')}
              label="Rating"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">1 Star & Up</MenuItem>
              <MenuItem value="2">2 Stars & Up</MenuItem>
              <MenuItem value="3">3 Stars & Up</MenuItem>
              <MenuItem value="4">4 Stars & Up</MenuItem>
              {/* Add more rating options as needed */}
            </Select>
          </FormControl>
        </Box>
      </Drawer>

      {/* Loading state */}
      {loading ? (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} style={{ marginBottom: 16 }} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Restaurant cards
        <Grid container spacing={2}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} md={6} lg={4} key={restaurant.id}>
              {/* Render restaurant card here */}
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {restaurant.description}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      {restaurant.cuisine}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {renderRatingStars(restaurant.rating)}
                    </Typography>
                  </Box>
                </CardContent>
                <Box display="flex" justifyContent="center" mt={2} mb={2}>
                  <Button variant="contained" color="primary" component={Link} to={`/restaurants/${restaurant.id}`}>
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default RestaurantList;
