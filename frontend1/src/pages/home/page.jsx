import "./styles.css";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Header */}
      <section className="banner">
        <div className="banner-text">
          <h2>Shop Fresh, Organic Products</h2>
          <p>
            Everything you need for a healthy lifestyle, delivered to your door.
          </p>
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
    </div>
  );
}
