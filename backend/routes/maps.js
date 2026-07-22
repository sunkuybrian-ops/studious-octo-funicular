const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get service areas
router.get('/areas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM service_areas');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch service areas' });
  }
});

// Add service area (admin only)
router.post('/areas', async (req, res) => {
  try {
    const { name, latitude, longitude, radius } = req.body;

    const result = await pool.query(
      'INSERT INTO service_areas (name, latitude, longitude, radius) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, latitude, longitude, radius]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add service area' });
  }
});

module.exports = router;
