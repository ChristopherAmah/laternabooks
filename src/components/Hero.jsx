import React, { useState } from "react";
import library from '../assets/library.jpg';
import book from '../assets/books.jpg';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

const slides = [
  {
    image: library,
    title: "Explore the World of Books",
    subtitle: "Discover stories that inspire and transform",
    buttonText: "Shop Now",
  },
  {
    image: book,
    title: "Read, Learn, Grow",
    subtitle: "Fuel your mind with endless knowledge",
    buttonText: "Browse Collection",
  },
  {
    image: library,
    title: "Build Your Library",
    subtitle: "Curate your personal collection today",
    buttonText: "Start Reading",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="carousel relative h-[70vh]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={() => setAnimationKey((prev) => prev + 1)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition duration-500"></div>

              {/* Animated Text */}
              <motion.div
                key={animationKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
              >
                <motion.h2
                  variants={childVariants}
                  className="text-white text-3xl md:text-5xl font-bold mb-3"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  variants={childVariants}
                  className="text-white text-base md:text-lg mb-5 max-w-xl"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.button
                  variants={childVariants}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  {slide.buttonText}
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
