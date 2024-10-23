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
    <div>
        <h1>Hello</h1>
        <Product images={productImages}/>
    </div>
    );
}