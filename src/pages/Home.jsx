import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from 'react-router-dom';
import Header from "../components/Header";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (category) => {
    const url =
      category && category !== "all"
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";

    const res = await axios.get(url);
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    setCategories(res.data);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <> <Header />
    <div className="home-container">
      <h2>Product Listing</h2>

      <div className="filter-bar">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
            <Link
            to={`/product/${product.id}`}
            className="product-card"
            key={product.id} >
                
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;
