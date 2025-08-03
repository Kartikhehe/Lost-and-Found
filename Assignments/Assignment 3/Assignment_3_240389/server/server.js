const express = require("express");
require('dotenv').config();
const { Pool } = require('pg');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query(
      "SELECT * FROM my_schema.users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0)
      return res.status(400).json({ error: "User already exists" });

    await pool.query(
      "INSERT INTO my_schema.users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM my_schema.users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(400).json({ error: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/items', verifyToken, async (req, res) => {
    const { title, description, location, date, contact, status, image } = req.body;
    const user_email = req.user.email;

    try {
        const result = await pool.query(
            "INSERT INTO my_schema.items (title, description, location, date, contact, status, image, user_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [title, description, location, date, contact, status, image, user_email]
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

app.get('/items/my', verifyToken, async (req, res) => {
    const user_email = req.user.email;
    try {
        const result = await pool.query("SELECT * FROM my_schema.items WHERE user_email = $1 ORDER BY id DESC", [user_email]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/items/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { title, description, location, date, contact, status, image } = req.body;
    const user_email = req.user.email;

    try {
        const existing = await pool.query("SELECT * FROM my_schema.items WHERE id = $1 AND user_email = $2", [id, user_email]);
        if (existing.rows.length === 0) return res.status(403).json({ error: "Unauthorized" });

        const result = await pool.query(
            "UPDATE my_schema.items SET title=$1, description=$2, location=$3, date=$4, contact=$5, status=$6, image=$7 WHERE id=$8 RETURNING *",
            [title, description, location, date, contact, status, image, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/items/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const user_email = req.user.email;

    try {
        const existing = await pool.query("SELECT * FROM my_schema.items WHERE id = $1 AND user_email = $2", [id, user_email]);
        if (existing.rows.length === 0) return res.status(403).json({ error: "Unauthorized" });

        await pool.query("DELETE FROM my_schema.items WHERE id = $1", [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});