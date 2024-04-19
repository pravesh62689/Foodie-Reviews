import  { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user profile data from the server
    // setUserData(fetchedData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Save user profile data to the server
    console.log('Saving user data:', userData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <form onSubmit={handleSave}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={userData.name || ''}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={userData.email || ''}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={userData.phone || ''}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}

export default UserProfile;
