import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>OFS</h1>
        </div>
        <nav className="nav">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/customer-login">Login</Link>
        </nav>
      </header>

      {/* Banner Section */}
      <section className="banner">
        <div className="banner-text">
          <h2>Shop Fresh, Organic Products</h2>
          <p>Everything you need for a healthy lifestyle, delivered to your door.</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories">
        <h2>Featured Categories</h2>
        <div className="category-grid">
          <div className="category">
            <img src="https://via.placeholder.com/150" alt="Fruits" />
            <p>Fresh Fruits</p>
          </div>
          <div className="category">
            <img src="https://via.placeholder.com/150" alt="Vegetables" />
            <p>Organic Vegetables</p>
          </div>
          <div className="category">
            <img src="https://via.placeholder.com/150" alt="Dairy" />
            <p>Dairy Products</p>
          </div>
          <div className="category">
            <img src="https://via.placeholder.com/150" alt="Snacks" />
            <p>Healthy Snacks</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 OFS. All rights reserved.</p>
        <p>Contact us at: support@ofs.com</p>
      </footer>
    </div>
  );
};

export default HomePage;
