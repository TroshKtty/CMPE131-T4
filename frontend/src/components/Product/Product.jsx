import { Box } from "@mui/joy";
import PropTypes from "prop-types";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

const Product = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <Box>
      {images?.length >= 1 && (
        <Swiper
          className="gallary"
          loop={images.length > 3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{
            swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} alt="product images" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {images?.length > 1 && (
        <Swiper
          className="gallary-thumbs"
          loop={true}
          spaceBetween={10}
          slidesPerView={images.length}
          modules={[Navigation, Thumbs]}
          onSwiper={setActiveThumb}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="gallary-thumbs-wrapper">
                <img src={item} alt="product images" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

Product.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Product;
