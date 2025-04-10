import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Fixed capitalization
import { BrowserRouter } from 'react-router-dom';
import './style.css';
import App from './App';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
