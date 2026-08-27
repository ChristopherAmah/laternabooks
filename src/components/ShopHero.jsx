import React from "react";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

const ShopHero = () => {
  return (
    <div className="carousel relative h-[56vh] min-h-[22rem] overflow-hidden sm:h-[68vh] md:h-[78vh]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopHero;
