import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>ShopSmart</h3>
                <p>Your one-stop shop for quality products at affordable prices.</p>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/cart">Cart</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Categories</h3>
                <ul className="footer-links">
                  <li><a href="/">Electronics</a></li>
                  <li><a href="/">Clothing</a></li>
                  <li><a href="/">Home & Kitchen</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Contact Us</h3>
                <ul className="footer-links">
                  <li>Email: support@shopsmart.com</li>
                  <li>Phone: +1 (123) 456-7890</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 ShopSmart. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
