const pool = require('../config/database');

// Create tables
const createTables = async () => {
  const queries = [
    // Users table (Admin)
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Services table
    `CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2),
      image_url VARCHAR(500),
      icon VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Quotes table
    `CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      service_id INT REFERENCES services(id),
      address TEXT,
      description TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Testimonials table
    `CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      rating INT CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      service_id INT REFERENCES services(id),
      approved BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Blog posts table
    `CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content TEXT,
      excerpt VARCHAR(500),
      author_id INT REFERENCES users(id),
      featured_image VARCHAR(500),
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Service areas table
    `CREATE TABLE IF NOT EXISTS service_areas (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      radius INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Seed initial data
const seedData = async () => {
  try {
    // Check if services already exist
    const result = await pool.query('SELECT COUNT(*) FROM services');
    if (result.rows[0].count > 0) return;

    const services = [
      { name: 'Termite Control', description: 'Professional termite elimination and prevention', price: 299.99, icon: 'termite' },
      { name: 'Ant Control', description: 'Effective ant pest management', price: 149.99, icon: 'ant' },
      { name: 'Rodent Control', description: 'Safe and humane rodent removal', price: 199.99, icon: 'rodent' },
      { name: 'Cockroach Control', description: 'Complete cockroach elimination', price: 179.99, icon: 'cockroach' },
      { name: 'Bed Bug Treatment', description: 'Comprehensive bed bug treatment', price: 249.99, icon: 'bed-bug' },
      { name: 'Mosquito Control', description: 'Mosquito reduction and prevention', price: 129.99, icon: 'mosquito' }
    ];

    for (const service of services) {
      await pool.query(
        'INSERT INTO services (name, description, price, icon) VALUES ($1, $2, $3, $4)',
        [service.name, service.description, service.price, service.icon]
      );
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = { createTables, seedData };
