"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper"; // Samo Navigation
import Image from "next/image";
import Link from "next/link";
import element from "@/assets/shapes/rcmndplaceholderlement.png";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import Wishlist from "../../assets/Icons/heart.png";
import WishlistActive from "../../assets/Icons/heart-active.png";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
import { deleteMethod, get, list, post } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";
import cart from "@/assets/Icons/shopping-bag.png";
import { useRouter } from "next/navigation";
import { ThumbSuspense } from "@/_components/thumb-suspense";

const BestSellers = ({ action_products, setWishlistId = () => { } }) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <>
      <div className={`relative mx-auto w-[90%] max-sm:mt-10`}>
        <h3
          className={`relative mb-5 mr-auto w-fit text-[60px] uppercase max-md:text-[40px] max-md:leading-[46px]`}
        >
          Trenutno sniženi proizvodi
        </h3>
      </div>
      <div className={`mx-auto w-[95%] xl:w-[75%] 2xl:w-[60%]`}>
        <div className="mt-[4rem] flex justify-between gap-[1rem] max-lg:gap-0 max-md:flex-wrap md:flex-row 3xl:gap-[3.8rem]">
          <Swiper
            slidesPerView={1}
            modules={[Navigation]}
            navigation={true}
            slidesPerGroup={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 1,
              },
            }}
            rewind={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            spaceBetween={30}
            className="homeSwiper"
            style={{
              width: "100%",
              height: "fit-content !important",
            }}
          >
            {(action_products || [])?.map(({ id }) => {
              return (
                <SwiperSlide key={id} className={`!h-auto !overflow-hidden`}>
                  <ThumbSuspense
                    id={id}
                    categoryId={"*"}
                    refetchWishlist={() => { }}
                    className="rounded-lg transition-transform duration-300 hover:scale-110"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
