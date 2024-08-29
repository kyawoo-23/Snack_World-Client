"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "./custom-carousel.css";

type Props = {
  images: string[];
  name: string;
};

export default function Carousel({ images, name }: Props) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.2}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx}>
          <div className='relative w-full h-[560px]'>
            <Image
              src={image}
              alt={name}
              fill
              className='object-cover'
              quality={100}
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
