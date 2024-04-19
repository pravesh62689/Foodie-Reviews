import  { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

// eslint-disable-next-line react/prop-types
function RestaurantReviews({ restaurantId }) {
  // eslint-disable-next-line no-unused-vars
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews for the restaurant from the server
    // setReviews(fetchedReviews);
  }, [restaurantId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemText primary={review.title} secondary={review.content} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default RestaurantReviews;
