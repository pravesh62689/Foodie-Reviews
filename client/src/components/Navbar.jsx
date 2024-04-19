import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton, Popper, Paper, List, ListItem, ListItemText, Grow } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAdmin = false;
  const isLoggedIn = false;

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="brand">
          Foodie Reviews
        </Typography>
        <Box className="navbar-buttons">
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            startIcon={<HomeIcon />}
            className="navbar-button"
            activeClassName="active"
            style={{ transition: 'border-bottom 2s' }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/restaurants"
            startIcon={<RestaurantIcon />}
            className="navbar-button"
            activeClassName="active"
            style={{ transition: 'border-bottom 2s' }}
          >
            Restaurants
          </Button>
          {isAdmin && (
            <Button
              color="inherit"
              component={NavLink}
              to="/admin"
              startIcon={<AdminPanelSettingsIcon />}
              className="navbar-button"
              activeClassName="active"
              style={{ transition: 'border-bottom 2s' }}
            >
              Admin
            </Button>
          )}
          <IconButton
            color="inherit"
            onMouseOver={handleProfileClick}
            onClick={handleProfileClick}

            className="profile-button"
          >
            {isLoggedIn ? (
              <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
            ) : (
              <PersonIcon />
            )}
          </IconButton>

        </Box>

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
              <Paper className="popdown-menu">
                <List>
                  {isLoggedIn ? (
                    <ListItem onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  ) : (
                    <>
                      <ListItem>
                        <div>
                          <Typography variant="h6" color="textPrimary">
                            Hello, Foodie!👋
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Sign in to dive into delicious adventures!
                          </Typography>
                        </div>
                      </ListItem>


                      <ListItem component={NavLink} to="/login">
                        <ListItemText primary="Login" />
                      </ListItem>
                      <ListItem component={NavLink} to="/register">
                        <ListItemText primary="Register" />
                      </ListItem>
                      <div
                        style={{ display: 'flex', justifyContent: 'space-around' }}>

                        <IconButton color="inherit" onClick={handleLogout} className="logout-button">
                          <LogoutIcon />
                        </IconButton>
                      </div>
                    </>
                  )}
                </List>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
