const axios = require('axios');

// Service to fetch jokes from multiple external APIs
const jokeServices = {
  // JokeAPI - Comprehensive joke API
  jokeAPI: async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json');
      if (response.data.type === 'single') {
        return {
          joke: response.data.joke,
          source: 'JokeAPI',
          type: 'single',
          category: response.data.category
        };
      } else {
        return {
          joke: `${response.data.setup} ${response.data.delivery}`,
          source: 'JokeAPI',
          type: 'twopart',
          category: response.data.category
        };
      }
    } catch (error) {
      throw new Error('JokeAPI failed: ' + error.message);
    }
  },

  // Official Joke API
  officialJoke: async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      return {
        joke: `${response.data.setup} ${response.data.punchline}`,
        source: 'Official Joke API',
        type: 'twopart',
        category: response.data.type
      };
    } catch (error) {
      throw new Error('Official Joke API failed: ' + error.message);
    }
  },

  // Programming Jokes API
  programmingJoke: async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
      const randomJoke = response.data[0];
      return {
        joke: `${randomJoke.setup} ${randomJoke.punchline}`,
        source: 'Programming Jokes API',
        type: 'twopart',
        category: 'programming'
      };
    } catch (error) {
      throw new Error('Programming Jokes API failed: ' + error.message);
    }
  },

  // Knock-Knock Jokes
  knockKnock: async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/knock-knock/random');
      const randomJoke = response.data[0];
      return {
        joke: `${randomJoke.setup} ${randomJoke.punchline}`,
        source: 'Knock-Knock Jokes API',
        type: 'twopart',
        category: 'knock-knock'
      };
    } catch (error) {
      throw new Error('Knock-Knock API failed: ' + error.message);
    }
  },

  // Random User Agent for resilience
  getRandomJoke: async () => {
    const services = [jokeServices.jokeAPI, jokeServices.officialJoke, jokeServices.programmingJoke, jokeServices.knockKnock];
    const randomService = services[Math.floor(Math.random() * services.length)];
    return randomService();
  }
};

module.exports = jokeServices;
