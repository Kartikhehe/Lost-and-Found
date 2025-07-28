const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../cloudinary');
const authenticateToken = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

//upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(400).json({ error: 'Image upload failed' });
  }
});

// create item
router.post('/', authenticateToken, async (req, res) => {
  const { title, status, contact, phone, place, description, date, image} = req.body;
   const user_id = req.user.id;
  try {
    const result = await pool.query(
      `INSERT INTO items (title, status, contact, phone, place, description, date, image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, status, contact, phone, place, description, date, image, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update item
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, status, contact, phone, place, description, date, image} = req.body;
  const user_id = req.user.id;
  try {
    const itemCheck = await pool.query('SELECT * FROM items WHERE id = $1 AND user_id = $2', [id, user_id]);
    if (itemCheck.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    const result = await pool.query(
      `UPDATE items SET title=$1, status=$2, contact=$3, phone=$4, place=$5, description=$6, date=$7, image=$8 WHERE id=$9 RETURNING *`,
      [title, status, contact, phone, place, description, date, image, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete item
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const itemCheck = await pool.query('SELECT * FROM items WHERE id = $1 AND user_id = $2', [id, user_id]);
    if (itemCheck.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    
    await pool.query(`DELETE FROM items WHERE id=$1`, [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
