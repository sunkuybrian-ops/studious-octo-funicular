const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all testimonials (approved only for public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, s.name as service_name FROM testimonials t 
       LEFT JOIN services s ON t.service_id = s.id 
       WHERE t.approved = true
       ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Get all testimonials including unapproved (admin only)
router.get('/admin/all', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, s.name as service_name FROM testimonials t 
       LEFT JOIN services s ON t.service_id = s.id 
       ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, comment, service_id } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ error: 'Name, rating, and comment required' });
    }

    const result = await pool.query(
      `INSERT INTO testimonials (name, email, rating, comment, service_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, rating, comment, service_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Approve testimonial (admin only)
router.put('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE testimonials SET approved = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve testimonial' });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

module.exports = router;
