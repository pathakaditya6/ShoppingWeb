import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/home" className="nav-logo">ShopKart</Link>
      </div>
      <div className="nav-right">
        <Link to="/home">Home</Link>
        <Link to="/cart">
          Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
        </Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
}

export default Header;
