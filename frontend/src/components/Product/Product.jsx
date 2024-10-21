import image1 from "/1.jpg"
import image2 from "/2.jpg"
import image3 from "/3.jpg"

import PropTypes from 'prop-types'
import {useState} from "react"

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Thumbs} from 'swiper/modules'

import "./styles.css";

export default function Product() {
    const [currentImage, setCurrentImage] = useState(0);
    const productImages = [image1, image2, image3];
    return (
        <Swiper className="gallary" loop={true} spaceBetween={10} navigation={true} modules={[Navigation, Thumbs]} grabCursor={true}> 
                    <img src={productImages[0]} alt="product image"/>
                    <img src={productImages[1]} alt="product image"/>
                    <img src={productImages[2]} alt="product image"/>
        </Swiper>

      
    );
  }