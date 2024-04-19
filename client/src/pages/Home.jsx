import React, { useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Box,
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTheme } from '@mui/material/styles';
import featuredRestaurantsData from '../data/featuredRestaurantsData';
import latestReviewsData from '../data/latestReviewsData';
import topChefsData from '../data/topChefsData';
import trendingRestaurantsData from '../data/trendingRestaurantsData';
import userTestimonialsData from '../data/userTestimonialsData';
import '../styles/Home.css';

function Home() {
  const theme = useTheme();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Refs for sections
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const topChefsRef = useRef(null);
  const trendingRestaurantsRef = useRef(null);
  const reviewsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Observe sections for animation
  useEffect(() => {
    const sections = [
      heroRef,
      featuredRef,
      topChefsRef,
      trendingRestaurantsRef,
      reviewsRef,
      testimonialsRef,
      ctaRef,
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  return (
    <Container className="home-container">
      {/* Hero Section */}
      <Box ref={heroRef} className="hero-section">
        <Typography variant="h3" className="hero-title">
          Welcome to Foodie Reviews!
        </Typography>
        <Typography variant="h6" className="hero-subtitle">
          Discover top-rated restaurants, dishes, and reviews.
        </Typography>
        <Button variant="contained" color="primary" href="/register" className="hero-cta">
          Get Started
        </Button>
      </Box>

      {/* Featured Restaurants */}
      <div ref={featuredRef} className="section featured-section">
        <Typography variant="h4" className="section-title">
          Featured Restaurants
        </Typography>
        <Carousel responsive={responsive}>
          {featuredRestaurantsData.map((restaurant) => (
            <Card key={restaurant.id} className="restaurant-card">
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6" className="restaurant-name">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" className="restaurant-description">
                  {restaurant.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>

      {/* Top Chefs Section */}
      <div ref={topChefsRef} className="section top-chefs-section">
        <Typography variant="h4" className="section-title">
          Top Chefs
        </Typography>
        <Grid container spacing={4}>
          {topChefsData.map((chef) => (
            <Grid item xs={12} sm={6} md={4} key={chef.id}>
              <Card className="chef-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={chef.image}
                  alt={chef.name}
                />
                <CardContent>
                  <Typography variant="h6" className="chef-name">
                    {chef.name}
                  </Typography>
                  <Typography variant="body2" className="chef-bio">
                    {chef.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Trending Restaurants Section */}
      <div ref={trendingRestaurantsRef} className="section trending-restaurants-section">
        <Typography variant="h4" className="section-title">
          Trending Restaurants
        </Typography>
        <Carousel responsive={responsive}>
          {trendingRestaurantsData.map((restaurant) => (
            <Card key={restaurant.id} className="restaurant-card">
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6" className="restaurant-name">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" className="restaurant-description">
                  {restaurant.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>

      {/* Latest Reviews Section */}
      <div ref={reviewsRef} className="section reviews-section">
        <Typography variant="h4" className="section-title">
          Latest Reviews
        </Typography>
        <Carousel responsive={responsive}>
          {latestReviewsData.map((review) => (
            <Card key={review.id} className="review-card">
              <CardContent>
                <Typography variant="body1" className="review-text">
                  "{review.text}"
                </Typography>
                <Typography variant="subtitle1" className="review-author">
                  - {review.author}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>

      {/* User Testimonials Section */}
      <div ref={testimonialsRef} className="section testimonials-section">
        <Typography variant="h4" className="section-title">
          User Testimonials
        </Typography>
        <Carousel responsive={responsive}>
          {userTestimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card">
              <CardContent>
                <Typography variant="body1" className="testimonial-text">
                  "{testimonial.text}"
                </Typography>
                <Typography variant="subtitle1" className="testimonial-author">
                  - {testimonial.author}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>

      {/* Call-to-Action Section */}
      <Box ref={ctaRef} className="section cta-section">
        <Typography variant="h5" gutterBottom>
          Join Our Community!
        </Typography>
        <Button variant="contained" color="primary" href="/register">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
