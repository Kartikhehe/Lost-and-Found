import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            flexGrow: 1,
            fontSize: '2rem'
          }}
        >
          Lost and Found
        </Typography>
        <Button color="inherit" onClick={handleLoginClick}>
          LOGIN
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
