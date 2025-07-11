const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// GET all items
app.get('/items', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST a new item
app.post('/items', async (req, res) => {
  const { title, description, contact, phone, image } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items (title, description, contact, phone, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, contact, phone, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add item');
  }
});

// DELETE item by ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete item');
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
