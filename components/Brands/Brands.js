"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import Aos from "aos";
import Image from "next/image";
import leaf from "@/assets/shapes/leaf-little-meat.png";
import Brand1 from "@/assets/Brands/alterego.png";
import Brand2 from "@/assets/Brands/kouho2.png";
import Brand3 from "@/assets/Brands/henbor.png";
import Brand4 from "@/assets/Brands/fanola.png";
import Brand5 from "@/assets/Brands/moser.png";
import Brand6 from "@/assets/Brands/cerlotti.png";
import Brand7 from "@/assets/Brands/didier.png";
import Brand8 from "@/assets/Brands/cnd.png";
import Brand9 from "@/assets/Brands/arcobaleno.png";
import Brand10 from "@/assets/Brands/wahl.png";
import Brand11 from "@/assets/Brands/babyliss.png";
import Brand12 from "@/assets/Brands/jaguar.png";
import Brand13 from "@/assets/Brands/eti.png";
import Brand14 from "@/assets/Brands/barber.png";
import Brand15 from "@/assets/Brands/rr.png";
import Brand16 from "@/assets/Brands/staleks.png";
import Brand17 from "@/assets/Brands/bedhead.png";
import Brand18 from "@/assets/Brands/xanitalia.png";
import Brand19 from "@/assets/Brands/selias.png";
import Link from "next/link";

const Brands = () => {
  const data = [
    { id: 1, image: Brand1 },
    { id: 2, image: Brand2 },
    { id: 3, image: Brand3 },
    { id: 4, image: Brand4 },
    { id: 5, image: Brand5 },
    { id: 6, image: Brand6 },
    { id: 7, image: Brand7 },
    { id: 8, image: Brand8 },
    { id: 9, image: Brand9 },
    { id: 10, image: Brand10 },
    { id: 11, image: Brand11 },
    { id: 12, image: Brand12 },
    { id: 13, image: Brand13 },
    { id: 14, image: Brand14 },
    { id: 15, image: Brand15 },
    { id: 16, image: Brand16 },
    { id: 17, image: Brand17 },
    { id: 18, image: Brand18 },
    { id: 19, image: Brand19 },
  ];

  return (
    <div
      data-aos="fade-up"
      className="relative mx-auto mt-[4rem] w-[90%] py-[4rem] max-lg:py-7 2xl:py-[8rem]"
    >
      <Image
        src={leaf}
        width={400}
        height={400}
        className="absolute -right-[6rem] top-[10rem] z-[1] opacity-[0.2]"
      />
      <p className="relative mr-auto w-fit text-left text-[60px] uppercase max-md:text-[40px] max-md:leading-[46px]">
        Profesionalna kozmetika & oprema
      </p>
      <p className="text-left text-[1.5rem]">
        Zastupamo svetski poznate brendove
      </p>
      <div className="mt-[2rem] flex justify-between gap-[1rem] max-lg:gap-0 max-md:flex-wrap md:mt-[4rem] md:flex-row 3xl:gap-[3.8rem]">
        <Swiper
          className={`keen-slider !w-full`}
          navigation={false}
          modules={[Autoplay]}
          rewind
          loop
          slidesPerView={3}
          spaceBetween={5}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {data?.map(({ id, image }) => {
            return (
              <SwiperSlide key={id}>
                <div className="px-[3rem] py-[1rem] max-md:m-[0.2rem] max-md:px-[0.1rem] max-md:py-[0.6rem]">
                  <Image
                    src={image}
                    alt="brand"
                    width={0}
                    height={0}
                    quality={100}
                    sizes={`100vw`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
