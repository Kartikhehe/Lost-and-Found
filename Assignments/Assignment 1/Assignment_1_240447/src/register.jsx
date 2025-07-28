import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './images/iitk_logo.jpg'

function Register() {
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
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2, color: 'red' }}>
                    Already Registered? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/login')}>Login here</span>
                  </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
