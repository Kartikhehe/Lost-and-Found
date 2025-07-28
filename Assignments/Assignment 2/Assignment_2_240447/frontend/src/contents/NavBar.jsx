import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../images/iitk_logo.jpg'

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);

  const checkToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        setUsername(decoded.username);
      } catch (err) {
        console.error('Invalid token:', err);
        setUsername(null);
      }
    } else {
      setUsername(null);
    }
  };

  useEffect(() => {
    checkToken();
    }, [location]);

   const handleLoginClick = () => {
    navigate('/login');
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setUsername(null);
    navigate('/');
    window.location.reload(); 
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box component="img"
        src={logo}
        alt="IITK Logo"
        sx={{
          height: 48,
          width: 48,
          marginRight: 2,
          borderRadius: '50%',
          backgroundColor: 'white',
          padding: '2px'
        }}
        />
        <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.5rem',
            lineHeight: 1,
          }}
        >
          Lost and Found
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.9rem',
            color: '#eeeeee',
            marginLeft: '4px'
          }}
        >
          IIT Kanpur
        </Typography>
      </Box>
        {username ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Hello, {username}</Typography>
            <Button color="inherit" onClick={handleLogoutClick}>
              LOGOUT
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            LOGIN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
