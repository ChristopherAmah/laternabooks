import React from 'react';
import library from '../assets/library.jpg';
import book from '../assets/books.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
  <Swiper
    slidesPerView={1}
    spaceBetween={30}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    effect={'fade'}
    loop={true}
    pagination={{ clickable: true }}
    navigation={true}
    modules={[Autoplay, EffectFade, Pagination, Navigation]}
    className="mySwiper"
  >
    <SwiperSlide>
      <img src={book} alt="" className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={library} alt="" className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={book} alt="" className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={book} alt="" className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover" />
    </SwiperSlide>
  </Swiper>
</section>

  );
};

export default Hero;
