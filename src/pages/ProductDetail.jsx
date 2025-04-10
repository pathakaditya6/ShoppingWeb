import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import {useCart} from '../context/CartContext';
import Header from '../components/Header';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <><Header />
    <div className="detail-container">
      <img src={product.image} alt={product.title} />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => {console.log('Adding to cart:',product);
         addToCart(product) 
        }
          } className="add-to-Cart add-more">Add to Cart</button>
      </div>
    </div>
    </>
  );
}

export default ProductDetail;
