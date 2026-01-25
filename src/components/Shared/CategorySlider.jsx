// src/components/Slide.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";




// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-accent text-white hover:bg-primary-focus"
  >
    ➜
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-accent text-white hover:bg-primary-focus"
  >
    ←
  </button>
);

const Slide = () => {
  const slides = [
    {
      id: 1,
      title: "Empower Your Learning",
      subtitle: "Join courses and manage your progress easily and efficiently.",
      img: "https://i.ibb.co.com/xtZB3Y0b/course2.png    ",
      ctaText: "Browse Courses",
      // ctaHref: "/courses",
    },
    {
      id: 2,
      title: "Built for Students & Teachers",
      subtitle:
        "A modern Course Management System built with React, Firebase, and Tailwind.",
      img: "https://i.ibb.co.com/7xPMxBHQ/course1.png",
      ctaText: "Get Started",
      // ctaHref: "/register",
    },
    {
      id: 3,
      title: "Track and Improve",
      subtitle:
        "Monitor your progress and performance with intuitive dashboards.",
      img: "https://i.ibb.co.com/wFwDBz1C/course3.png",
      ctaText: "Go to Dashboard",
      // ctaHref: "/dashboard",
    },
    {
      id: 4,
      title: "Empower Your Learning",
      subtitle: "Join courses and manage your progress easily and efficiently.",
      img: "https://i.ibb.co.com/HDffWrFR/course4.png",
      ctaText: "Browse Courses",
      // ctaHref: "/courses",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
        <div className="relative w-full  overflow-hidden py-12 bg-[#0e0e0eea]">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="relative w-full h-[300px] lg:h-[500px] ">
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
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="text-lg md:text-xl mb-6 max-w-2xl"
                >
                  {slide.subtitle}
                </motion.p>
                
                <motion.a 
                initial={{ scale: 0 }} animate={{ scale: 1 ,transition:{duration:1}}}

                href={slide.ctaHref} className="btn btn-accent">
                  {slide.ctaText}
                </motion.a>
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
