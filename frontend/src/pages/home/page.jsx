import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Header */}
      <section className="banner">
        <div className="banner-text">
          <h2>Shop Fresh, Organic Products</h2>
          <p>
            <h3>
              Everything you need for a healthy lifestyle, delivered to your
              door.
            </h3>
          </p>
          <button onClick={() => navigate("/search")}>Shop Now</button>
        </div>
      </section>

      {/* Product Categories Section */}

      <section className="category" id="category">
        <h1 className="heading">
          Shop by <span className="heading2">Category</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <h3>Fruits</h3>
            <img src="apples.jpg" alt=""></img>
            <a
              className="btn"
              onClick={() => navigate("/search?category=fruits")}
            >
              Shop Now
            </a>
          </div>
          <div className="box">
            <h3>Vegetables</h3>
            <img src="broccoli.jpg" alt=""></img>
            <a
              className="btn"
              onClick={() => navigate("/search?category=vegetables")}
            >
              Shop Now
            </a>
          </div>
          <div className="box">
            <h3>Beverages</h3>
            <img src="coconutwater.jpg" alt=""></img>
            <a
              className="btn"
              onClick={() => navigate("/search?category=beverages")}
            >
              Shop Now
            </a>
          </div>
          <div className="box">
            <h3>Snacks</h3>
            <img src="layschips.jpg" alt=""></img>
            <a
              className="btn"
              onClick={() => navigate("/search?category=snacks")}
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
