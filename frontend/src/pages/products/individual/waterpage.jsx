import "./styles.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Product from "@/components/Product/Product";
import image1 from "/water.jpg"

// export default function WaterProductPage() {
//   return (
//     <div className="individualpage">
//       <div className="product-display">
//         <section className="water-image">
//           <img src="/water.jpg" alt="Water Image" />
//         </section>
//         <section className="product-details">
//           <h1>Crystal Geyser Natural Alpine Spring Water, 16.9 Fl. Oz., 32 Count, 35 lbs</h1>
//           <div className="section1">
//             <ul>
//               <h3>About this Item:</h3>
//               <li>
//                 <div className="DescriptionProduct" id="Description1">
//                   Natural Alpine Spring Water Bottle
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description2">
//                   32-count of 16.9-ounce bottles
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description3">
//                     Pure and refreshing spring water bottled at the spring source
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description3">
//                     Environmentally friendly 100% recyclable packaging
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description4">
//                   BPA free
//                 </div>
//               </li>
//             </ul>

//             <section className="product-details">
//             <div className="section3">
//             <ul>
//               <h3>KEY advantages of drinking water:</h3>
//               <li>
//                 <div className="DescriptionProduct" id="Description1">
//                   Prevents dehydration
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description2">
//                   Boosts heavier skin
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description3">
//                   Helps maintain your body temperature
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description4">
//                   Drinking more water can aid in weight loss
//                 </div>
//               </li>
//               <li>
//                 <div className="DescriptionProduct" id="Description5">
//                   Proper hydration aids in digestive health
//                 </div>
//               </li>
//             </ul>
            

//         <section className="product-details">
//           <div className="section2">
//             <ul>
//               <p>Specifications:</p>
//               <div className="Specification" id="spec1">
//                 Bottled Drinking Water Type
//               </div>
//               <div className="Description" id="spring">
//                 Spring Waters
//               </div>

//               <div className="Specification" id="spec2">
//                 Container Material
//               </div>
//               <div className="Description" id="plastic">
//                 Plastic
//               </div>

//               <div className="Specification" id="spec3">
//                 Flavor
//               </div>
//               <div className="Description" id="unflavored">
//                 Unflavored
//               </div>

//               <div className="Specification" id="spec4">
//                 Retail Packaging
//               </div>
//               <div className="Description" id="multipack">
//                 Multipack
//               </div>

//               <div className="Specification" id="spec5">
//                 Brand
//               </div>
//               <div className="Description" id="crystal">
//                 Crystal Geyser
//               </div>
//             </ul>

//           </div>
//         </section>

//           </div>
//         </section>

//         </div>
//         </section>

//         <section className="product-details">
//           <p className="price-per-pound">Price: $5.74</p>
//           <button type="button">ADD TO CART</button>
//           </section>

//       </div>
//     </div>
//   );
// }

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