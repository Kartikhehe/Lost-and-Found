const express = require("express");
require('dotenv').config();
const { Pool } = require('pg');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

app.post('/items', async (req, res) => {
    const { title, description, location, date, contact, status, image } = req.body;
    try{
        const result = await pool.query(
            "INSERT INTO my_schema.items (title, description, location, date, contact, status, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [title, description, location, date, contact, status, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM my_schema.items ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/items/:id', async (req, res) => {
    const id = req.params.id;
  const { title, description, location, date, contact, status, image } = req.body;

  try {
    const result = await pool.query(
      "UPDATE my_schema.items SET title=$1, description=$2, location=$3, date=$4, contact=$5, status=$6, image=$7 WHERE id=$8 RETURNING *",
      [title, description, location, date, contact, status, image, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
  try {
    await pool.query("DELETE FROM my_schema.items WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
