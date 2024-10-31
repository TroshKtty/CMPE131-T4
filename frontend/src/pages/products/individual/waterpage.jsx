import "./styles.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Product from "@/components/Product/Product";
import image1 from "/water.jpg"

export default function TomatoProductPage() {
  const productImages = [image1];
  return (
  <>
  <div className="main">
      <div className="left-side">
          <Product images={productImages}/>
      </div>

      <div style={{paddingRight: "50px", width: "700px"}}>
          <h1>Crystal Geyser Natural Alpine Spring Water, 16.9 Fl. Oz., 32 Count, 35 lbs</h1>
          <hr/>

          <h3>About this Item:</h3>
          <ul style={{paddingLeft: "40px"}}>
              <li>
                  Natural Alpine Spring Water Bottle
              </li>
              <li style={{marginTop: "5px"}}>
                  32-count of 16.9-ounce bottles
              </li>
              <li style={{marginTop: "5px"}}>
                  Pure and refreshing spring water bottled at the spring source
              </li >
              <li style={{marginTop: "5px"}}>
                  Environmentally friendly 100% recyclable packaging
              </li>
              <li style={{marginTop: "5px"}}>
                  BPA free
              </li>
            </ul>
            
            <br/>
            <hr/>

          <h3 style={{paddingTop: "5px"}}>Specifications:</h3>
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