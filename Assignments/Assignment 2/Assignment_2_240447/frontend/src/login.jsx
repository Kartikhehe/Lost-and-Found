import React ,{useState} from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './images/iitk_logo.jpg'
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your password"
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <Typography variant="body2" sx={{ mt: 2, color: 'red' }}>
          New User? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/register')}>Register here</span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
