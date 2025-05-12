import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use relative URL to work in any environment
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add the product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-header">
        <h1>{product.name}</h1>
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-price">${product.price.toFixed(2)}</p>

          <div className="product-detail-description">
            {product.description}
          </div>

          <p className={`product-detail-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          {product.inStock && (
            <div className="cart-item-quantity">
              <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={incrementQuantity}>+</button>
            </div>
          )}

          <div className="product-actions">
            <button
              className="btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <Link to="/" className="btn" style={{ marginLeft: '10px' }}>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
