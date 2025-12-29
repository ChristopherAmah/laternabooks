import React, { useState } from "react";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";
import hero6 from "../assets/hero6.jpg";
import hero7 from "../assets/hero7.jpg";
import hero8 from "../assets/hero8.jpg";
import hero9 from "../assets/hero9.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slides = [
  {
    images: [hero1, hero2, hero3],
    title: "Welcome to LaternaBooks",
  },
  {
    images: [hero4, hero9, hero6],
    title: "Discover Your Next Read",
  },
  {
    images: [hero7, hero8, hero5],
    title: "Explore Our Collection",
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

const Hero = () => {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
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
              {/* Images side by side */}
              {slide.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`LaternaBooks-${i}`}
                  className="w-1/3 h-full object-cover"
                />
              ))}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text + Button */}
              <motion.div
                key={animationKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <motion.h1
                  variants={childVariants}
                  className="text-white text-4xl md:text-[90px] font-bold mb-6"
                >
                  {slide.title}
                </motion.h1>
                <motion.div variants={childVariants}>
                  <Link
                    to="/category"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-sans px-5 py-2 rounded-full shadow-lg transition inline-block"
                  >
                    Shop Categories
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
