import "./styles.css";

export default function BananaProductPage() {
  return (
    <div className="individualpage">
      <div className="product-display">
        <section className="banana-image">
          <img src="/bananas.jpg" alt="6 Fresh Organic Bananas" />
        </section>
        <section className="product-details">
          <h1 className="no-wrap">6 Fresh Organic Bananas, 2 lb</h1>
          <div className="section1">
            <ul>
              <h3>About this Item:</h3>
              <li>
                <div className="DescriptionProduct" id="Description1">
                  Sweet, tropical flavor
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description2">
                  Good source of potassium, vitamin B6 and vitamin C and low in sodium
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description3">
                  Enjoy at breakfast, lunch, dessert, or whenever you want a snack
                </div>
              </li>
              <li>
                <div className="DescriptionProduct" id="Description4">
                  Make banana bread or banana pudding
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
              <div className="Description" id="fruit">
                Contains Fruit
              </div>

              <div className="Specification" id="spec2">
                Fruit Type
              </div>
              <div className="Description" id="tomato">
                Banana
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
          <p className="price-per-pound">Price: $1.80</p>
          <button type="button">ADD TO CART</button>
          </section>

      </div>
    </div>
  );
}
