import React, { useState } from "react";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

const slides = [
  {
    images: [hero1, hero2, hero3], // 3 images in slide 1
    title: "",
  },
  {
    images: [hero3, hero1, hero2], // 3 images in slide 2
    title: "",
  },
  {
    images: [hero2, hero3, hero1], // 3 images in slide 3
    title: "",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ShopHero = () => {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="carousel relative h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={() => setAnimationKey((prev) => prev + 1)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex">
              {/* 3 images side by side */}
              {slide.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${slide.title}-${i}`}
                  className="w-1/3 h-full object-cover"
                />
              ))}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition duration-500"></div>

              {/* Gradient fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent z-10"></div>

              {/* Centered Text */}
              <motion.div
                key={animationKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
              >
                <motion.h2
                  variants={childVariants}
                  className="text-white -mt-30 text-3xl md:text-[500px] font-bold mb-3"
                >
                  
                </motion.h2>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopHero;
