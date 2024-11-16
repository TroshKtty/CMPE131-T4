import React from 'react';
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const categories = [
    { name: "Fruits", image: "fruits.jpg", link: "/search?category=fruits" },
    { name: "Bakery", image: "bread.jpg", link: "/search?category=bakery" },
    { name: "Vegetables", image: "vegetables.jpg", link: "/search?category=vegetables" },
    { name: "Meat", image: "meat.jpg", link: "/search?category=meat" },
    { name: "Fish", image: "fish.jpg", link: "/search?category=fish" },
    { name: "Beverages", image: "beverage.jpg", link: "/search?category=beverages" },
    { name: "Snacks", image: "chips.jpg", link: "/search?category=snacks" },
    { name: "Dairy Alternatives", image: "dairy.jpg", link: "/search?category=dairy%2520alternatives" },
    { name: "Grains", image: "grains.jpg", link: "/search?category=grains" },
    { name: "Dairy", image: "dairy1.jpg", link: "/search?category=dairy" },
    { name: "Condiments", image: "honey.jpg", link: "/search?category=condiments" },
    { name: "Dips", image: "dip.jpg", link: "/search?category=dips" },
    { name: "Frozen Desserts", image: "icecream.jpg", link: "/search?category=frozen%2520desserts" },
    { name: "Frozen Foods", image: "amypizza.jpg", link: "/search?category=frozen%2520foods" },
  ];

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

        <div className="carousel-container">
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 0.5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item"
          >
            {categories.map((category, index) => (
              <a key={index} className={`box ${category.name.toLowerCase().replace(' ', '-')}`} href={category.link}>
                <h3>{category.name}</h3>
                <img src={category.image} alt={category.name} />
              </a>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}