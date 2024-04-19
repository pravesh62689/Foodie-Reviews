import { Container, Typography, Button } from '@mui/material';

function AdminPanel() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {/* Add buttons for managing users, restaurants, dishes, etc. */}
      <Button variant="contained" color="primary" onClick={() => console.log('Manage Users')}>
        Manage Users
      </Button>
      <Button variant="contained" color="primary" onClick={() => console.log('Manage Restaurants')}>
        Manage Restaurants
      </Button>
      <Button variant="contained" color="primary" onClick={() => console.log('Manage Dishes')}>
        Manage Dishes
      </Button>
    </Container>
  );
}

export default AdminPanel;
