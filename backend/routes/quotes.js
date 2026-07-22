const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*, s.name as service_name FROM quotes q 
       LEFT JOIN services s ON q.service_id = s.id 
       ORDER BY q.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Create quote
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service_id, address, description } = req.body;

    if (!name || !email || !service_id) {
      return res.status(400).json({ error: 'Name, email, and service required' });
    }

    const result = await pool.query(
      `INSERT INTO quotes (name, email, phone, service_id, address, description) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, phone, service_id, address, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});

// Update quote status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE quotes SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update quote' });
  }
});

// Delete quote (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM quotes WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

module.exports = router;
