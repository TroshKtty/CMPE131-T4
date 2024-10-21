import "./styles.css";

export default function TomatoProductPage() {
  return (
    <div className="individualpage">
      <div className="product-display">
        <section className="tomato-image">
          <img src="/tomatoes.jpg" alt="4 Fresh Organic Tomatoes" />
        </section>
        <section className="product-details">
          <h1 className="no-wrap">4 Fresh Organic Tomatoes, 1 lb</h1>
          <div className="section1">
            <ul>
              <h3>About this Item:</h3>
              <li>
                <div className="DescriptionProduct" id="Description1">
                  Wholesome, fresh, versatile, and delicious
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description2">
                  Ideal ingredient for a variety of dishes
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description3">
                  Enjoy on burgers, sandwiches, and more
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description4">
                  Perfect for making tomato sauces
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description5">
                  Excellent for homemade salsa
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description6">
                  Create a mouthwatering salad or appetizer
                </div>
              </li>
            </ul>
            
            <section className="product-details">
          <div className="section2">
            <ul>
              <p>Specifications:</p>
              <div className="Specification" id="spec1">
                Food Allergen Statements
              </div>
              <div className="Description" id="glutten">
                Glutten-Free
              </div>

              <div className="Specification" id="spec2">
                Fruit Type
              </div>
              <div className="Description" id="tomato">
                Tomato
              </div>

              <div className="Specification" id="spec3">
                Food Condition
              </div>
              <div className="Description" id="fresh">
                Fresh
              </div>

              <div className="Specification" id="spec4">
                Food Form
              </div>
              <div className="Description" id="whole">
                Whole
              </div>

              <div className="Specification" id="spec5">
                Flavor Notes
              </div>
              <div className="Description" id="ideal">
                Sweet
              </div>

              <div className="Specification" id="spec6">
                Container Type
              </div>
              <div className="Description" id="container">
                Bag
              </div>

              <div className="Specification" id="spec7">
                Retail Packaging
              </div>
              <div className="Description" id="pack">
                Single Pack
              </div>

              <div className="Specification" id="spec8">
                Nutrient Content Claims
              </div>
              <div className="Description" id="container">
                Organic
              </div>
            </ul>
          </div>
        </section>
          </div>
        </section>

        <section className="product-details">
          <p className="price-per-pound">Price: $1.28</p>
          <button type="button">ADD TO CART</button>
          </section>

      </div>
    </div>
  );
}
