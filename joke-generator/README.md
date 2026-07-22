# Random Joke Generator 🎭

A full-stack application that fetches random jokes from multiple external APIs and displays them in an interactive, beautiful UI.

## Features

- 🎲 **Random Jokes** - Get jokes from multiple sources
- 💻 **Programming Jokes** - Tech-specific humor
- 🚪 **Knock-Knock Jokes** - Classic knock-knock style jokes
- 🤓 **Multiple APIs** - Integrates with multiple joke APIs
- 📜 **Joke History** - Keeps track of recent jokes
- 🎨 **Beautiful UI** - Responsive, gradient design
- ⚡ **Fast & Reliable** - Fallback mechanisms for API failures

## Tech Stack

### Backend
- Node.js + Express
- Axios for API calls
- CORS enabled
- Multiple external joke APIs

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

## External APIs Used

1. **JokeAPI** - https://v2.jokeapi.dev/
2. **Official Joke API** - https://official-joke-api.appspot.com/
3. **Programming Jokes** - Subset of Official Joke API
4. **Knock-Knock Jokes** - Subset of Official Joke API

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

1. **Backend Setup**
   ```bash
   cd joke-generator/backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Backend runs on `http://localhost:5001`

2. **Frontend Setup** (in another terminal)
   ```bash
   cd joke-generator/frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Frontend runs on `http://localhost:3001`

## API Endpoints

- `GET /api/jokes/random` - Get a random joke from any source
- `GET /api/jokes/api` - Get from JokeAPI
- `GET /api/jokes/programming` - Get programming joke
- `GET /api/jokes/knock-knock` - Get knock-knock joke
- `GET /api/jokes/official` - Get official joke
- `GET /api/health` - Health check

## Features in Detail

### Joke Display
- Shows joke text clearly
- Displays source API
- Shows category/type
- Loading animation while fetching
- Error handling with user-friendly messages

### Recent Jokes
- Keeps track of last 10 jokes
- Shows timestamp for each joke
- Displays source and category
- Scrollable history

### Responsive Design
- Works on mobile, tablet, and desktop
- Touch-friendly buttons
- Beautiful gradient background
- Smooth animations and transitions

## Error Handling

- Fallback to different APIs if one fails
- User-friendly error messages
- Automatic retry mechanism
- Console logging for debugging

## Future Enhancements

- [ ] Save favorite jokes to localStorage
- [ ] Share jokes on social media
- [ ] User ratings for jokes
- [ ] Filter jokes by category
- [ ] Dark mode toggle
- [ ] Copy to clipboard functionality
- [ ] Joke search functionality

## License

MIT
