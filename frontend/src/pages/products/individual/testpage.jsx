import "./styles.css";
import Product from "@/components/Product/Product";

import image1 from "/s1.jpg"
import image2 from "/s2.jpg"
import image3 from "/s3.jpg"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function TestProductPage() {
    const productImages = [image1, image2, image3];
    return (
    <>
    <div className="main">
        <div className="left-side">
            <Product images={productImages}/>
        </div>

        <div style={{paddingRight: "50px", width: "700px"}}>
            <h1>Organic Tester Title With Caviar 2 oz, 3-pack</h1>
            <hr/>

            <h3 style={{paddingTop: "5px"}}>About This Item:</h3>
            <p style={{paddingBottom: "5px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Aperiam reprehenderit ab omnis est eum, reiciendis, eius 
                eveniet ratione consectetur, quaerat voluptates voluptatum 
                libero. Accusantium aliquam eum debitis explicabo, ratione hic?
            </p>
            <hr/>

            <h3 style={{paddingTop: "5px"}}>Specifications:</h3>
            <table>
                <tr>
                    <td>Steve</td>
                    <td>Manager</td>
                </tr>

                <tr>
                    <td>SURAJ</td>
                    <td>Assistant Manager</td>
                </tr>

                <tr>
                    <td>Khushboo</td>
                    <td>Analysist</td>
                </tr>

                <tr>
                    <td>Kartik</td>
                    <td>Worker</td>
                </tr>

                <tr>
                    <td>Saksham</td>
                    <td>Worker</td>
                </tr>
            </table>
        </div>

        <div style={{border: "1px solid rgb(165, 165, 165)", padding: "15px", width: "300px"}}>
            <h3>Buy New: </h3>
            <h1>$249.99</h1> 
            <hr></hr>
            <h3 style={{paddingTop: "10px"}}>Delivery information </h3>
            <h4 style={{paddingTop: "10px"}}> Lorem ipsum dolor sit amet, consectetur 
                adipisicing elit. Cupiditate sequi, recusandae a ducimus, qui perspiciatis 
                consequuntur omnis facere facilis eos neque quod iste. Provident accusamus ab 
                iusto iste impedit laudantium? 
            </h4>
            <button type="button" className="buttonNew">ADD TO CART</button>
        </div>
    </div>
    </>
    );
}