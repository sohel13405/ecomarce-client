// src/components/Slide.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router";




// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-[#89A8B2] text-white hover:bg-primary-focus"
  >
    ➜
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-[#89A8B2] text-white hover:bg-primary-focus"
  >
    ←
  </button>
);

const Slide = () => {
  const slides = [
    {
      id: 1,
      title: "Big Deals. Bigger Savings.",
      subtitle: "Shop top-quality electronics at unbeatable prices. Limited-time offers, exclusive discounts, and the newest arrivals — only at ShopeCove.",
      img: "https://i.ibb.co.com/G47bYFVM/02.png",
      ctaText: "See All Products",
      // ctaHref: "/courses",
    },
    {
      id: 2,
      title: "Upgrade Your Everyday Tech",
      subtitle:
        "Discover the latest smartphones, laptops, cameras, and accessories — carefully selected to bring innovation, style, and performance into your life",
      img: "https://i.ibb.co.com/DHv9Qn76/01.png",
      ctaText: "All Products",
      // ctaHref: "/register",
    },
    {
      id: 3,
      title: "Smart Choices Start Here",
      subtitle:
        "From cutting-edge gadgets to must-have accessories, find everything you need in one seamless shopping experience.",
      img: "https://i.ibb.co.com/4nnc5s7V/3.jpg",
      ctaText: "Products",
      // ctaHref: "/dashboard",
    },
    {
      id: 4,
      title: "Mega Tech Sale Is Live",
      subtitle: "Save up to 50% on premium electronics. Don’t miss out — upgrade your gear today with ShopeCove’s hottest deals.",
      img: "https://i.ibb.co.com/dJ1hXwFL/5.webp",
      ctaText: "Browse Products",
      // ctaHref: "/courses",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="">
        <div className="relative w-full  overflow-hidden  ">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="relative w-full h-60 lg:h-150 ">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">

                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="text-3xl md:text-5xl text-[#ffffffb7] font-bold mb-4"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="hidden lg:block text-lg md:text-xl text-[#ffffffa9] mb-6 max-w-2xl"
                >
                  {slide.subtitle}
                </motion.p>
                
              <Link to='/allproducts'>
              <motion.button 
                initial={{ scale: 0 }} animate={{ scale: 1 ,transition:{duration:1}}}

                href={slide.ctaHref} className="btn text-white border-0 bg-[#89A8B2]">
                  {slide.ctaText}
                </motion.button>
              </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Slide;
