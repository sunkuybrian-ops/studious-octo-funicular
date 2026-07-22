const express = require('express');
const router = express.Router();
const jokeServices = require('../services/jokeService');

// Get a random joke
router.get('/random', async (req, res) => {
  try {
    const joke = await jokeServices.getRandomJoke();
    res.json(joke);
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get joke from specific source
router.get('/api/joke', async (req, res) => {
  try {
    const joke = await jokeServices.jokeAPI();
    res.json(joke);
  } catch (error) {
    console.error('Error fetching from JokeAPI:', error);
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get programming joke
router.get('/programming', async (req, res) => {
  try {
    const joke = await jokeServices.programmingJoke();
    res.json(joke);
  } catch (error) {
    console.error('Error fetching programming joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get knock-knock joke
router.get('/knock-knock', async (req, res) => {
  try {
    const joke = await jokeServices.knockKnock();
    res.json(joke);
  } catch (error) {
    console.error('Error fetching knock-knock joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

// Get official joke
router.get('/official', async (req, res) => {
  try {
    const joke = await jokeServices.officialJoke();
    res.json(joke);
  } catch (error) {
    console.error('Error fetching official joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
});

module.exports = router;
