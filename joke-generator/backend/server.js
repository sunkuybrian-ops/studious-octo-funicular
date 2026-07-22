const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jokes', require('./routes/jokes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Joke Generator API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🎭 Joke Generator Backend running on port ${PORT}`);
  console.log(`GET /api/jokes/random - Get a random joke`);
  console.log(`GET /api/jokes/api - Get from JokeAPI`);
  console.log(`GET /api/jokes/programming - Get programming joke`);
  console.log(`GET /api/jokes/knock-knock - Get knock-knock joke`);
  console.log(`GET /api/jokes/official - Get official joke`);
});
