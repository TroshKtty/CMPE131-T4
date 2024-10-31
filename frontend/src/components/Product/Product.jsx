import "./styles.css";
import PropTypes from 'prop-types'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Thumbs} from 'swiper/modules'
import {useState} from 'react';

const Product = props => {
    const [activeThumb, setActiveThumb] = useState();

    return <>
        <Swiper className="gallary" loop={true} spaceBetween={10} navigation={true} modules={[Navigation, Thumbs]} grabCursor={true} thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}>
            {
                props.images.map((item,index) => (
                    <SwiperSlide key = {index}>
                        <img src={item} alt="product images"/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper className="gallary-thumbs" loop={true} spaceBetween={10} slidesPerView={3} modules={[Navigation, Thumbs]} onSwiper={setActiveThumb}>
            {
                props.images.map((item,index) => (
                    <SwiperSlide key = {index}>
                        <div className="gallary-thumbs-wrapper">
                            <img src={item} alt="product images"/>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>
  }

  Product.propTypes = {
    images: PropTypes.array.isRequired
  }
  export default Product
