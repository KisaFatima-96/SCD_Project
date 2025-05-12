const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Sample product data
const products = [
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 999.99,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1499.99,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Smart Watch',
    description: 'Fitness and health tracking smartwatch',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    inStock: false
  },
  {
    name: 'Digital Camera',
    description: 'Professional digital camera with 4K video',
    price: 799.99,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    inStock: true
  }
];

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing products
      await Product.deleteMany({});
      console.log('Cleared existing products');
      
      // Insert new products
      const createdProducts = await Product.insertMany(products);
      console.log(`Added ${createdProducts.length} products`);
      
      mongoose.connection.close();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
