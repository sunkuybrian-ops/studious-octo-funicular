const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, u.name as author_name FROM blog_posts b 
       LEFT JOIN users u ON b.author_id = u.id 
       WHERE b.published = true
       ORDER BY b.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get blog post by slug
router.get('/post/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `SELECT b.*, u.name as author_name FROM blog_posts b 
       LEFT JOIN users u ON b.author_id = u.id 
       WHERE b.slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create blog post (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, excerpt, author_id, featured_image } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, slug, and content required' });
    }

    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, author_id, featured_image) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, slug, content, excerpt, author_id, featured_image]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, featured_image, published } = req.body;

    const result = await pool.query(
      `UPDATE blog_posts SET title = $1, slug = $2, content = $3, excerpt = $4, 
       featured_image = $5, published = $6, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $7 RETURNING *`,
      [title, slug, content, excerpt, featured_image, published, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

module.exports = router;
