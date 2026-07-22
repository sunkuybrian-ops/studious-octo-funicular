# Pest Control Company Website

A full-stack web application for a pest control company featuring service listings, quote requests, testimonials, blog, and admin dashboard.

## Features

- 🐛 **Service Listings** - Browse termite, ant, rodent, and other pest control services
- 📝 **Quote Requests** - Contact form for service quotes
- ⭐ **Testimonials** - Customer reviews and ratings
- 🗺️ **Service Area Map** - Interactive map showing service coverage
- 📚 **Blog** - Pest control tips and educational content
- 🔧 **Admin Dashboard** - Manage services, testimonials, blog posts, and quotes

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- RESTful API

### Frontend
- React + Vite
- Tailwind CSS
- Leaflet Maps
- React Router

## Project Structure

```
├── backend/           # Express API server
├── frontend/          # React application
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see `.env.example` files in backend and frontend)

4. Start development servers:
   ```bash
   npm run dev
   ```

This will run both backend and frontend concurrently.

## Development

- **Backend only**: `npm run backend`
- **Frontend only**: `npm run frontend`

## License

MIT
