import "./styles.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Product from "@/components/Product/Product";
import image1 from "/bananas.jpg"

export default function BananaProductPage() {
  const productImages = [image1];
  return (
  <>
  <div className="main">
      <div className="left-side">
          <Product images={productImages}/>
      </div>

      <div style={{paddingRight: "50px", width: "700px"}}>
          <h1>6 Fresh Organic Bananas, 2 lbs</h1>
          <hr/>

          <h3>About this Item:</h3>
          <ul style={{paddingLeft: "40px"}}>
              <li>
                  Sweet, tropical flavor
              </li>
              <li style={{marginTop: "5px"}}>
                  Good source of potassium, vitamin B6 and vitamin C and low in sodium
              </li>
              <li style={{marginTop: "5px"}}>
                  Enjoy at breakfast, lunch, dessert, or whenever you want a snack
              </li >
              <li style={{marginTop: "5px"}}>
                  Make banana bread or banana pudding
              </li>
            </ul>
            
            <br/>
            <hr/>

          <h3 style={{paddingTop: "5px"}}>Specifications:</h3>
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

      <div style={{border: "1px solid rgb(165, 165, 165)", padding: "15px", width: "300px", height: "100%"}}>
          <h3>Product Price: </h3>
          <h1>$4.99</h1> 
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
