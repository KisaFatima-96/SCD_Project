const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Better product images from Unsplash
const productImages = {
  'Smartphone X': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
  'Laptop Pro': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop',
  'Wireless Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  'Smart Watch': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop',
  'Digital Camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    updateProductImages();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function updateProductImages() {
  try {
    // Update each product with a better image
    for (const [productName, imageUrl] of Object.entries(productImages)) {
      await Product.updateOne(
        { name: productName },
        { $set: { imageUrl } }
      );
      console.log(`Updated image for ${productName}`);
    }
    
    console.log('All product images updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating product images:', error);
    process.exit(1);
  }
}
