const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/items', itemsRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
