import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <section className="banner">
        <div className="banner-text">
          <h2>
            Shop Fresh, <span className="heading2">Organic</span> Products
          </h2>
          <p>
            Everything you need for a healthy lifestyle, delivered to your door.
            $5 delivery fee for orders above 20 pounds!
          </p>
          <button onClick={() => navigate("/search")}>Shop Now</button>
        </div>
      </section>

      <section className="category" id="category">
        <h1 className="heading">
          Shop by <span className="heading2">Categories</span>
        </h1>

        <div className="swiper-container">
          <ArrowLeft className="swiper-button-prev" />
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={15}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="box-container"
          >
            <SwiperSlide>
              <a className="box fruits" href="/search?category=fruits">
                <h3>Fruits</h3>
                <img src="fruits.jpg" alt="Fruits" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box bakery" href="/search?category=bakery">
                <h3>Bakery</h3>
                <img src="bread.jpg" alt="Bakery" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box vegetables" href="/search?category=vegetables">
                <h3>Vegetables</h3>
                <img src="vegetables.jpg" alt="Vegetables" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box meat" href="/search?category=meat">
                <h3>Meat</h3>
                <img src="meat.jpg" alt="Meat" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box fish" href="/search?category=fish">
                <h3>Fish</h3>
                <img src="fish.jpg" alt="Fish" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box beverages" href="/search?category=beverages">
                <h3>Beverages</h3>
                <img src="beverage.jpg" alt="Beverages" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box snacks" href="/search?category=snacks">
                <h3>Snacks</h3>
                <img src="chips.jpg" alt="Snacks" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                className="box dairy-alternatives"
                href="/search?category=dairy%2520alternatives"
              >
                <h3>Dairy Alternatives</h3>
                <img src="dairy.jpg" alt="Dairy Alternatives" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box grains" href="/search?category=grains">
                <h3>Grains</h3>
                <img src="grains.jpg" alt="Grains" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box dairy" href="/search?category=dairy">
                <h3>Dairy</h3>
                <img src="dairy1.jpg" alt="Dairy" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box condiments" href="/search?category=condiments">
                <h3>Condiments</h3>
                <img src="honey.jpg" alt="Condiments" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a className="box dips" href="/search?category=dips">
                <h3>Dips</h3>
                <img src="dip.jpg" alt="Dips" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                className="box frozen-desserts"
                href="/search?category=frozen%2520desserts"
              >
                <h3>Frozen Desserts</h3>
                <img src="icecream.jpg" alt="Frozen Desserts" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                className="box frozen-foods"
                href="/search?category=frozen%2520foods"
              >
                <h3>Frozen Foods</h3>
                <img src="amypizza.jpg" alt="Frozen Foods" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                className="box canned-goods"
                href="/search?category=canned%2520goods"
              >
                <h3>Canned Goods</h3>
                <img src="applesauce.jpg" alt="Canned Goods" />
              </a>
            </SwiperSlide>
          </Swiper>
          <ArrowRight className="swiper-button-next" />
        </div>
      </section>
    </div>
  );
}
