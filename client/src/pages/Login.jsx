import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Grid } from '@mui/material';
import { useTransition, animated } from 'react-spring';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const transitions = useTransition(true, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-10px)' },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Function to check if password and confirm password match
    const checkPasswordMatch = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match. Please try again.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      // Check if password and confirm password match
      if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsSubmitting(false);
          return;
      }
  
      // Prepare form data for submission
      const { confirmPassword, ...dataToSend } = formData;
  
      try {
          // Make the API call to login the user
          const response = await axios.post('http://localhost:8000/api/auth/login', dataToSend);
  
          // Show success notification using React Toastify
          toast.success('Registration successful! Please log in.');
  
          // Redirect to login page
          navigate('/login');
      } catch (error) {
          if (error.response && error.response.data) {
              // Handle server-side errors and show a toast with the error message
              toast.error(error.response.data.message);
          } else {
              // Handle client-side errors (e.g., network issues)
              toast.error('Login failed. Please try again.');
          }
      } finally {
          setIsSubmitting(false);
      }
  };
  

    return (
        <>
            <ToastContainer />

            {transitions(
                (styles, item) =>
                    item && (
                        <animated.div style={styles}>
                            <Container className="login-container">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} className="login-image-container">
                                        <img src="https://images.pexels.com/photos/7564196/pexels-photo-7564196.jpeg?auto=compress&cs=tinysrgb&w=600" alt="login" className="login-image" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="login-form-container">
                                            <Typography variant="h4" gutterBottom>
                                                login
                                            </Typography>
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Name"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    type="email"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    type={showPassword ? 'text' : 'password'}
                                                    label="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    required
                                                    disabled={isSubmitting}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <span className="password-toggle" onClick={handleToggleShowPassword}>
                                                                {showPassword ? 'Hide' : 'Show'}
                                                            </span>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    label="Confirm Password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    required
                                                    disabled={isSubmitting}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <span className="password-toggle" onClick={handleToggleShowConfirmPassword}>
                                                                {showConfirmPassword ? 'Hide' : 'Show'}
                                                            </span>
                                                        ),
                                                    }}
                                                />
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    style={{ marginTop: '16px' }}
                                                    disabled={isSubmitting}
                                                >
                                                    login
                                                </Button>
                                            </form>
                                            <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                                                Don&apos;t have an account?{' '}
                                                <Link component={RouterLink} to="/register" underline="hover">
                                                    Register
                                                </Link>
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </animated.div>
                    )
            )}
        </>
    );
}

export default Login;