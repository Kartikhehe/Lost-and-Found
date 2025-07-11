const { Pool } = require('pg');

const pool = new Pool({
  user: 'courses_gatechild',        // from Files.io
  host: '6rhske.h.filess.io',        // e.g., db.files.io
  database: 'courses_gatechild', // usually same as identifier
  password: '7d0f0aa5bd77eb627c1ce0cb71b7dfaf9c165414',
  port: 5433,
  ssl: true
});

module.exports = pool;
