const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// POST /items
app.post('/items', async (req, res) => {
  const { item_name, place_found, details, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO myschema.items (item_name, place_found, details, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [item_name, place_found, details, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /items
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM myschema.items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /items/:id
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, place_found, details, image } = req.body;
  try {
    const result = await pool.query(
      'UPDATE myschema.items SET item_name = $1, place_found = $2, details = $3, image = $4 WHERE id = $5 RETURNING *',
      [item_name, place_found, details, image, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /items/:id
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM myschema.items WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json({ message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});