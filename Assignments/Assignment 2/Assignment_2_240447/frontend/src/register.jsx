import React , { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './images/iitk_logo.jpg'

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password,
      });

      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleRegister}
        >
          Register
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 2, color: 'red' }}>
          Already Registered? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/login')}>Login here</span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
