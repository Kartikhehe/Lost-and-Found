import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './images/iitk_logo.jpg'

function Login() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ p: 4, width: 320, textAlign: 'center' }}>
        <img
          src={logo}
          alt="IITK Logo"
          style={{ height: 100, marginBottom: 20 }}
        />

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your username"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your password"
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          color="primary"
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2, color: 'red' }}>
                    New User? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/register')}>Register here</span>
                  </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
