import "./styles.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Product from "@/components/Product/Product";
import image1 from "/tomatoes.jpg"

export default function TomatoProductPage() {
  const productImages = [image1];
  return (
  <>
  <div className="main">
      <div className="left-side">
          <Product images={productImages}/>
      </div>

      <div style={{paddingRight: "50px", width: "700px"}}>
          <h1>4 Fresh Organic Tomatoes, 1 lb</h1>
          <hr/>

          <h3>About this Item:</h3>
          <ul style={{paddingLeft: "40px"}}>
              <li>
                  Wholesome, fresh, versatile, and delicious
              </li>
              <li style={{marginTop: "5px"}}>
                  Ideal ingredient for a variety of dishes
              </li>
              <li style={{marginTop: "5px"}}>
                  Enjoy on burgers, sandwiches, and more
              </li >
              <li style={{marginTop: "5px"}}>
                  Perfect for making tomato sauces
              </li>
              <li style={{marginTop: "5px"}}>
                  Excellent for homemade salsa
              </li>
              <li style={{marginTop: "5px"}}>
                  Create a mouthwatering salad or appetizer
              </li>
            </ul>
            
            <br/>
            <hr/>

          <h3 style={{paddingTop: "5px"}}>Specifications:</h3>
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

      <div style={{border: "1px solid rgb(165, 165, 165)", padding: "15px", width: "300px", height: "100%"}}>
          <h3>Product Price: </h3>
          <h1>$1.28</h1> 
          <hr></hr>
          <h3 style={{paddingTop: "5px"}}>Delivery information </h3>
          <p style={{paddingTop: "5px"}}> Lorem ipsum dolor sit amet, consectetur 
              adipisicing elit. Cupiditate sequi, recusandae a ducimus, qui perspiciatis 
              consequuntur omnis facere facilis eos neque quod iste. Provident accusamus ab 
              iusto iste impedit laudantium? 
          </p>
          <button type="button" className="buttonNew">Add To Cart</button>
          <button type="button" className="buttonNew">Buy Now</button>
      </div>
  </div>
  </>
  );
}
