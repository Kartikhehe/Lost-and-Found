const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //check email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    //check if user already exists
    const existingUser1 = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser1.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const existingUser2 = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser2.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists. Choose a different username.' });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert new user
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    res.status(200).json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

//login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id , username: user.username}, JWT_SECRET, { expiresIn: '1d' }); 

    res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
