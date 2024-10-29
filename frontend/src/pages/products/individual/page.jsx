import Product from "@/components/product/Product";
import DATA from "@/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState("");
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (params.product) {
      setProduct(params.product);

      const data = DATA.find(
        (item) => item.item.toLowerCase() === params.product.toLowerCase()
      );
      if (data) {
        setProductImages(data.images);
      }
    }
  }, [params, setProduct]);

  if (
    !product ||
    !["banana", "tomato", "bottled water"].includes(product.toLowerCase())
  ) {
    return <p>product not found</p>;
  }

  return (
    <>
      {product.toLowerCase() === "bananas" && (
        <>
          <div className="main">
            <div className="left-side">
              <Product images={productImages} />
            </div>

            <div style={{ paddingRight: "50px", width: "700px" }}>
              <h1>6 Fresh Organic Bananas, 2 lbs</h1>
              <hr />

              <h3>About this Item:</h3>
              <ul style={{ paddingLeft: "40px" }}>
                <li>Sweet, tropical flavor</li>
                <li style={{ marginTop: "5px" }}>
                  Good source of potassium, vitamin B6 and vitamin C and low in
                  sodium
                </li>
                <li style={{ marginTop: "5px" }}>
                  Enjoy at breakfast, lunch, dessert, or whenever you want a
                  snack
                </li>
                <li style={{ marginTop: "5px" }}>
                  Make banana bread or banana pudding
                </li>
              </ul>

              <br />
              <hr />

              <h3 style={{ paddingTop: "5px" }}>Specifications:</h3>
              <table>
                <tr>
                  <td>Food Allergen Statements</td>
                  <td>Contains Fruit</td>
                </tr>

                <tr>
                  <td>Fruit Type</td>
                  <td>Banana</td>
                </tr>

                <tr>
                  <td>Food Condition</td>
                  <td>Fresh</td>
                </tr>

                <tr>
                  <td>Food Form</td>
                  <td>Whole</td>
                </tr>

                <tr>
                  <td>Flavor Notes</td>
                  <td>Sweet</td>
                </tr>

                <tr>
                  <td>Container Type</td>
                  <td>Bag</td>
                </tr>

                <tr>
                  <td>Nutrient Content Claims</td>
                  <td>Organic</td>
                </tr>
              </table>
            </div>

            <div
              style={{
                border: "1px solid rgb(165, 165, 165)",
                padding: "15px",
                width: "300px",
                height: "100%",
              }}
            >
              <h3>Product Price: </h3>
              <h1>$4.99</h1>
              <hr></hr>
              <h3 style={{ paddingTop: "5px" }}>Delivery information </h3>
              <p style={{ paddingTop: "5px" }}>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate sequi, recusandae a ducimus, qui perspiciatis
                consequuntur omnis facere facilis eos neque quod iste. Provident
                accusamus ab iusto iste impedit laudantium?
              </p>
              <button type="button" className="buttonNew">
                Add To Cart
              </button>
              <button type="button" className="buttonNew">
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
      {product.toLowerCase() === "tomato" && (
        <>
          <div className="main">
            <div className="left-side">
              <Product images={productImages} />
            </div>

            <div style={{ paddingRight: "50px", width: "700px" }}>
              <h1>4 Fresh Organic Tomatoes, 1 lb</h1>
              <hr />

              <h3>About this Item:</h3>
              <ul style={{ paddingLeft: "40px" }}>
                <li>Wholesome, fresh, versatile, and delicious</li>
                <li style={{ marginTop: "5px" }}>
                  Ideal ingredient for a variety of dishes
                </li>
                <li style={{ marginTop: "5px" }}>
                  Enjoy on burgers, sandwiches, and more
                </li>
                <li style={{ marginTop: "5px" }}>
                  Perfect for making tomato sauces
                </li>
                <li style={{ marginTop: "5px" }}>
                  Excellent for homemade salsa
                </li>
                <li style={{ marginTop: "5px" }}>
                  Create a mouthwatering salad or appetizer
                </li>
              </ul>

              <br />
              <hr />

              <h3 style={{ paddingTop: "5px" }}>Specifications:</h3>
              <table>
                <tr>
                  <td>Food Allergen Statements</td>
                  <td>Glutten-Free</td>
                </tr>

                <tr>
                  <td>Fruit Type</td>
                  <td>Tomato</td>
                </tr>

                <tr>
                  <td>Food Condition</td>
                  <td>Fresh</td>
                </tr>

                <tr>
                  <td>Food Form</td>
                  <td>Whole</td>
                </tr>

                <tr>
                  <td>Flavor Notes</td>
                  <td>Sweet</td>
                </tr>

                <tr>
                  <td>Container Type</td>
                  <td>Bag</td>
                </tr>

                <tr>
                  <td>Retail Packaging</td>
                  <td>Single Pack</td>
                </tr>

                <tr>
                  <td>Nutrient Content Claims</td>
                  <td>Organic</td>
                </tr>
              </table>
            </div>

            <div
              style={{
                border: "1px solid rgb(165, 165, 165)",
                padding: "15px",
                width: "300px",
                height: "100%",
              }}
            >
              <h3>Product Price: </h3>
              <h1>$1.28</h1>
              <hr></hr>
              <h3 style={{ paddingTop: "5px" }}>Delivery information </h3>
              <p style={{ paddingTop: "5px" }}>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate sequi, recusandae a ducimus, qui perspiciatis
                consequuntur omnis facere facilis eos neque quod iste. Provident
                accusamus ab iusto iste impedit laudantium?
              </p>
              <button type="button" className="buttonNew">
                Add To Cart
              </button>
              <button type="button" className="buttonNew">
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
      {product.toLowerCase() === "bottled water" && (
        <>
          {" "}
          <div className="main">
            <div className="left-side">
              <Product images={productImages} />
            </div>

            <div style={{ paddingRight: "50px", width: "700px" }}>
              <h1>
                Crystal Geyser Natural Alpine Spring Water, 16.9 Fl. Oz., 32
                Count, 35 lbs
              </h1>
              <hr />

              <h3>About this Item:</h3>
              <ul style={{ paddingLeft: "40px" }}>
                <li>Natural Alpine Spring Water Bottle</li>
                <li style={{ marginTop: "5px" }}>
                  32-count of 16.9-ounce bottles
                </li>
                <li style={{ marginTop: "5px" }}>
                  Pure and refreshing spring water bottled at the spring source
                </li>
                <li style={{ marginTop: "5px" }}>
                  Environmentally friendly 100% recyclable packaging
                </li>
                <li style={{ marginTop: "5px" }}>BPA free</li>
              </ul>

              <br />
              <hr />

              <h3 style={{ paddingTop: "5px" }}>Specifications:</h3>
              <table>
                <tr>
                  <td>Bottled Drinking Water Type</td>
                  <td>Spring Waters</td>
                </tr>

                <tr>
                  <td>Container Material</td>
                  <td>Plastic</td>
                </tr>

                <tr>
                  <td>Flavor</td>
                  <td>Unflavored</td>
                </tr>

                <tr>
                  <td>Retail Packaging</td>
                  <td>Multipack</td>
                </tr>

                <tr>
                  <td>Brand</td>
                  <td>Crystal Geyser</td>
                </tr>
              </table>
            </div>

            <div
              style={{
                border: "1px solid rgb(165, 165, 165)",
                padding: "15px",
                width: "300px",
                height: "100%",
              }}
            >
              <h3>Product Price: </h3>
              <h1>$1.28</h1>
              <hr></hr>
              <h3 style={{ paddingTop: "5px" }}>Delivery information </h3>
              <p style={{ paddingTop: "5px" }}>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate sequi, recusandae a ducimus, qui perspiciatis
                consequuntur omnis facere facilis eos neque quod iste. Provident
                accusamus ab iusto iste impedit laudantium?
              </p>
              <button type="button" className="buttonNew">
                Add To Cart
              </button>
              <button type="button" className="buttonNew">
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
