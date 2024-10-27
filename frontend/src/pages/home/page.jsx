import "./styles.css";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Header */}
      <section className="banner">
        <div className="banner-text">
          <h2>Shop Fresh, Organic Products</h2>
          <p>
            <h3>Everything you need for a healthy lifestyle, delivered to your door.</h3>
          </p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Product Categories Section */}

      <section class = "category" id="category">
        <h1 class="heading">Shop by <span class="heading2">Category</span></h1>
        <div class="box-container">

            <div class="box">
                <h3>Fruits</h3>
                <img src="apples.jpg" alt=""></img>
                <a href="#" class="btn">Shop Now</a>
                
            </div>
            <div class="box">
                <h3>Vegetables</h3>
                <img src="broccoli.jpg" alt=""></img>
                <a href="#" class="btn">Shop Now</a>
            </div>
            <div class="box">
                <h3>Beverages</h3>
                <img src="coconutwater.jpg" alt=""></img>
                <a href="#" class="btn">Shop Now</a>
            </div>
            <div class="box">
                <h3>Snacks</h3>
                <img src="layschips.jpg" alt=""></img>
                <a href="#" class="btn">Shop Now</a>
            </div>

        </div>

      </section>


      {/*
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
      */}
      
    </div>
  );
}
