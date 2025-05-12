import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </p>
        <div className="product-footer">
          <span className={`product-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          <div className="product-actions">
            <Link to={`/product/${product._id}`} className="btn">
              View Details
            </Link>
            <button
              className="btn"
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              style={{ marginLeft: '10px' }}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
