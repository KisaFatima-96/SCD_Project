import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <Link to="/" className="btn">
          Continue Shopping
        </Link>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <p className="cart-item-category">{item.category}</p>
            </div>

            <div className="cart-item-actions">
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div>
                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button onClick={clearCart} className="btn">
            Clear Cart
          </button>
          <button className="btn checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
