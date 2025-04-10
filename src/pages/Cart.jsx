import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';
import Header from '../components/Header';

function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <> 
    <Header/>
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h4>{item.title}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="cart-controls">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </>
      )}

      {showPopup && (
        <div className="popup">Order placed successfully!</div>
      )}
    </div>
    </>
  );
}

export default Cart;
