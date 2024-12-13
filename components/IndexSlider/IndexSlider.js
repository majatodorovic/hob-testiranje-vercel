"use client";
import Image from "next/image";
import Link from "next/link";

import shape1 from "@/assets/shapes/shape-little-meat.png";
import leaf from "@/assets/shapes/leaf-cut.png";
import shape2 from "@/assets/shapes/shape-brown.png";
import frakles from "@/assets/shapes/frakles.png";
import { useIsMobile } from "@/hooks/hob.hooks";
import { Button } from "@/_components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";
import { useState, useEffect } from "react";
import arrow from "@/assets/Icons/right-arrow.png";

const IndexSlider = ({ banners, mobileBanners }) => {
  const is_mobile = useIsMobile();
  const [swiper, setSwiper] = useState(null);

  return (
    <div className={`relative`}>
      <Image
        src={leaf}
        width={540}
        height={380}
        alt="HOB"
        className="absolute left-0 top-[5.4rem] z-[1]"
      />
      <Swiper
        rewind
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
        }}
        slidesPerView={1}
        className={`!pb-10 sm:!pb-20 lg:!pb-[8.5rem] 2xl:!pb-[3.5rem] !hidden !md:block`}
      >
        {banners?.map((banner, index) => {
          return (
            <SwiperSlide key={index} className={`!relative  !z-[4]`}>
              <div className="mt-[3rem] grid grid-cols-2">
                <div className="order-1 col-span-1 flex items-center max-md:order-2 max-md:col-span-2">
                  <Image
                    src={shape1}
                    width={320}
                    height={140}
                    alt="HOB"
                    className="absolute left-[3rem] top-0 z-[1] max-md:hidden"
                  />

                  <div className="relative !text-left">
                    <div className="mt-[4rem] flex flex-col items-start justify-start gap-[33px] max-md:mt-[7rem] max-md:px-[1rem] max-sm:gap-[10px] md:px-[4rem]">
                      {banner?.title && (
                        <h1 className="relative z-[2] text-[54px] uppercase leading-[60px] max-md:text-[36px] max-md:leading-[100%] 2xl:text-[80px] 2xl:leading-[98px]">
                          {banner?.title}
                        </h1>
                      )}
                      {banner?.subtitle && (
                        <h2 className="text-2xl uppercase text-white max-sm:text-xl 2xl:text-4xl">
                          {banner?.subtitle}
                        </h2>
                      )}
                      {banner?.text && (
                        <p className="text-left text-[1.5rem] max-md:leading-[21px] max-sm:text-[16px] md:w-[90%]">
                          {banner?.text}
                        </p>
                      )}
                      {banner?.button && (
                        <Link
                          href={`${banner?.url ?? `/stranica-u-izradi`}`}
                          target={banner?.target ?? "_self"}
                          className="relative z-[5]"
                        >
                          <Button>{banner?.button}</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="order-2 col-span-1 max-md:order-1 max-md:col-span-2">
                  <div className="block max-sm:h-[300px] md:h-[310px] lg:h-[390px] xl:h-[400px] 2xl:h-[550px] 3xl:h-[600px]">
                    <div className="relative h-full">
                      <div className="mr-auto h-full items-center justify-between max-md:mx-[1rem] max-sm:h-[400px] md:ml-[3rem] md:w-[86%]">
                        <div className="relative max-sm:h-[400px] sm:h-full">
                          <Image
                            src={banner?.image}
                            alt={banner?.title}
                            width={0}
                            height={0}
                            sizes={`100vw`}
                            className="relative z-[2] h-full w-full rounded-b-[3rem] bg-fixed object-cover max-md:rounded-t-[60px] md:rounded-t-[3rem]"
                          />
                          <Image
                            src={shape2}
                            alt="HOB"
                            width={720}
                            height={500}
                            className="absolute -right-[0.6rem] -top-[1.4rem] z-[1] sm:-right-[2.4rem]"
                          />
                          <Image
                            src={frakles}
                            width={200}
                            height={200}
                            alt="HOB"
                            className="absolute -bottom-[3rem] -left-[5.6rem] z-[1] max-sm:hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        rewind
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
        }}
        slidesPerView={1}
        className={`!pb-10 sm:!pb-20 lg:!pb-[8.5rem] 2xl:!pb-[3.5rem] !block !md:hidden`}
      >
        {mobileBanners?.map((banner, index) => {
          return (
            <SwiperSlide key={index} className={`!relative  !z-[4]`}>
              <div className="mt-[3rem] grid grid-cols-2">
                <div className="order-1 col-span-1 flex items-center max-md:order-2 max-md:col-span-2">
                  <Image
                    src={shape1}
                    width={320}
                    height={140}
                    alt="HOB"
                    className="absolute left-[3rem] top-0 z-[1] max-md:hidden"
                  />

                  <div className="relative !text-left">
                    <div className="mt-[4rem] flex flex-col items-start justify-start gap-[33px] max-md:mt-[7rem] max-md:px-[1rem] max-sm:gap-[10px] md:px-[4rem]">
                      {banner?.title && (
                        <h1 className="relative z-[2] text-[54px] uppercase leading-[60px] max-md:text-[36px] max-md:leading-[100%] 2xl:text-[80px] 2xl:leading-[98px]">
                          {banner?.title}
                        </h1>
                      )}
                      {banner?.subtitle && (
                        <h2 className="text-2xl uppercase text-white max-sm:text-xl 2xl:text-4xl">
                          {banner?.subtitle}
                        </h2>
                      )}
                      {banner?.text && (
                        <p className="text-left text-[1.5rem] max-md:leading-[21px] max-sm:text-[16px] md:w-[90%]">
                          {banner?.text}
                        </p>
                      )}
                      {banner?.button && (
                        <Link
                          href={`${banner?.url ?? `/stranica-u-izradi`}`}
                          target={banner?.target ?? "_self"}
                          className="relative z-[5]"
                        >
                          <Button>{banner?.button}</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="order-2 col-span-1 max-md:order-1 max-md:col-span-2">
                  <div className="block max-sm:h-[300px] md:h-[310px] lg:h-[390px] xl:h-[400px] 2xl:h-[550px] 3xl:h-[600px]">
                    <div className="relative h-full">
                      <div className="mr-auto h-full items-center justify-between max-md:mx-[1rem] max-sm:h-[400px] md:ml-[3rem] md:w-[86%]">
                        <div className="relative max-sm:h-[400px] sm:h-full">
                          <Image
                            src={banner?.image}
                            alt={banner?.title}
                            width={0}
                            height={0}
                            sizes={`100vw`}
                            className="relative z-[2] h-full w-full rounded-b-[3rem] bg-fixed object-cover max-md:rounded-t-[60px] md:rounded-t-[3rem]"
                          />
                          <Image
                            src={shape2}
                            alt="HOB"
                            width={720}
                            height={500}
                            className="absolute -right-[0.6rem] -top-[1.4rem] z-[1] sm:-right-[2.4rem]"
                          />
                          <Image
                            src={frakles}
                            width={200}
                            height={200}
                            alt="HOB"
                            className="absolute -bottom-[3rem] -left-[5.6rem] z-[1] max-sm:hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* <div className={`flex items-center justify-center gap-3`}>
        <button
          className={`!rounded-full bg-[#9f7361] p-2 transition-colors duration-300 hover:bg-black`}
          onClick={() => swiper.slidePrev()}
        >
          <Image
            src={arrow}
            width={20}
            height={20}
            alt="HOB"
            className="rotate-180 invert"
          />
        </button>
        <button
          className={`!rounded-full bg-[#9f7361] p-2 transition-colors duration-300 hover:bg-black`}
          onClick={() => swiper.slideNext()}
        >
          <Image
            src={arrow}
            width={20}
            height={20}
            alt="HOB"
            className={`invert`}
          />
        </button>
      </div> */}

    </div>
  );
};

export default IndexSlider;
