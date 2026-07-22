const express = require('express');
const router = express.Router();

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    // This will be implemented later
    res.json({ 
      total_services: 0, 
      total_quotes: 0, 
      total_testimonials: 0,
      pending_quotes: 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
