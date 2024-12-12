"use client";
import { useEffect, useState } from "react";

import Aos from "aos";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ThumbSuspense } from "@/_components/thumb-suspense";
import { Navigation, Virtual } from "swiper";
import "swiper/css";
import "swiper/css/navigation";


const RecommendedProducts = ({ recommendedProducts, action4 }) => {
  const [products, setProducts] = useState(recommendedProducts);
  const [swiper, setSwiper] = useState(null);
  const uniqueNames = [];
  const uniqueIds = [];
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    Aos.init();
  });
  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div
      data-aos="fade-right"
      className="relative z-[3] max-sm:mx-auto max-sm:mt-[3rem] max-sm:w-[95%] md:mx-5 md:mt-[5.625rem] md:h-[624px] lg:mx-[3rem]"
    >
      <h3
        className={`relative mb-5 mr-auto w-fit text-left text-[60px] uppercase max-md:text-[40px] max-md:leading-[46px]`}
      >
        Preporučeno za vas
      </h3>
      <div className="max-lg:col-span-1 lg:col-span-4 2xl:col-span-4 4xl:col-span-5">
        <div className="relative flex flex-col justify-between max-lg:gap-3 lg:flex-row lg:items-center">
          {/* <h1 className={`text-[25px] font-bold`}>{action4}</h1> */}
          {!pathname.includes("korpa") && (
            <>
              <div className="relative flex w-full flex-row items-center gap-0 !overflow-hidden rounded-[28px] bg-[#9f7361] py-[3px] pl-1 pr-[60px] text-white max-md:hidden lg:w-[70%] 4xl:w-[60%]">
                <Swiper
                  className={`!w-auto`}
                  rewind
                  onInit={(swiper) => setSwiper(swiper)}
                  slidesPerView={2}
                  breakpoints={{
                    1280: {
                      slidesPerView: 3,
                    },
                    1520: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {recommendedProducts?.map((category) => {
                    const uniqueCategories = category?.categories?.filter(
                      (item, index, arr) =>
                        arr.findIndex((el) => el.name === item.name) === index,
                    );

                    // Check if uniqueCategories exists and has at least one element
                    if (uniqueCategories && uniqueCategories.length > 0) {
                      if (uniqueNames.includes(uniqueCategories[0]?.name)) {
                        return null;
                      } else {
                        uniqueNames.push(uniqueCategories[0]?.name);
                        return (
                          <SwiperSlide key={category.id}>
                            <button
                              className={
                                selectedCategory === uniqueCategories[0]?.id
                                  ? `ease relative line-clamp-1 w-full rounded-[25px] bg-[#fff3e6] px-5 py-2 text-center text-[24px] text-black transition-all duration-300`
                                  : `ease relative line-clamp-1 w-full rounded-[25px] px-5 py-2 text-center text-[24px] transition-all duration-300 hover:underline`
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                let newProducts = [...recommendedProducts];
                                newProducts = recommendedProducts?.filter(
                                  (item) => {
                                    return (
                                      item?.categories[0]?.id ===
                                      uniqueCategories[0]?.id
                                    );
                                  },
                                );
                                setProducts(newProducts);
                                setSelectedCategory(uniqueCategories[0]?.id);
                              }}
                            >
                              {uniqueCategories[0]?.name}
                            </button>
                          </SwiperSlide>
                        );
                      }
                    }
                    return null;
                  })}
                </Swiper>
                <div
                  onClick={() => {
                    swiper?.slideNext();
                  }}
                  className={`absolute bottom-0 right-0 top-0 z-[5] flex cursor-pointer items-center gap-2 rounded-[28px] bg-white px-4 py-2 hover:bg-opacity-80`}
                >
                  <button className={`text-[#fff3e6]`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-right"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
                <div
                  onClick={() => {
                    swiper?.slidePrev();
                  }}
                  className={`absolute bottom-0 left-0 top-0 z-[5] flex cursor-pointer items-center gap-2 rounded-[28px] bg-white px-4 py-2 hover:bg-opacity-80`}
                >
                  <button className={`text-[#fff3e6]`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-right rotate-180"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="my-[1.1rem] md:hidden">
                <select
                  onChange={(e) => {
                    if (e.target.value !== "no_value") {
                      let newProducts = [...recommendedProducts];
                      newProducts = recommendedProducts?.filter((item) => {
                        return (
                          item?.categories[0]?.id === Number(e.target.value)
                        );
                      });
                      setProducts(newProducts);
                    }
                  }}
                  className="w-full rounded-[30px] border-2 border-[#f7f7f7] bg-[#9f7361] text-white focus:border-[#fff3e6] focus:outline-0 focus:ring-0 max-md:text-[0.9rem]"
                >
                  <option value={`no_value`} className={`max-md:text-[0.9rem]`}>
                    Izaberite kategoriju
                  </option>
                  {recommendedProducts?.map((category) => {
                    const uniqueCategories = category?.categories?.filter(
                      (item, index, arr) =>
                        arr.findIndex((el) => el.name === item.name) === index,
                    );

                    // Check if uniqueCategories exists and has at least one element
                    if (uniqueCategories && uniqueCategories.length > 0) {
                      // check if category ID has already been rendered
                      if (uniqueIds.includes(uniqueCategories[0]?.id)) {
                        return null;
                      } else {
                        uniqueIds.push(uniqueCategories[0]?.id); // add ID to array
                        return (
                          <option
                            key={uniqueCategories[0]?.id}
                            value={Number(uniqueCategories[0]?.id)}
                            className={`max-md:text-[0.9rem]`}
                          >
                            {uniqueCategories[0]?.name}
                          </option>
                        );
                      }
                    }
                    return null; // Return null if uniqueCategories does not exist or is empty
                  })}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  className="block text-[1.2rem] text-[#171717] underline hover:text-[#867273] max-md:text-[0.9rem] 2xl:text-[1.5rem]"
                  href={`/sekcija/preporuceno`}
                >
                  Pogledajte preporučene proizvode
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`mt-[2.5rem] max-sm:mt-[1rem]`}>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Virtual]}
          rewind={true}
          className="mySwiper3 w-full select-none"
          virtual={{ enabled: true, addSlidesAfter: 1, addSlidesBefore: 1 }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {(products || [])?.map(({ id }) => {
            return (
              <SwiperSlide virtualIndex={id} key={`slide-${id}`} className={`!h-auto`}>
                <ThumbSuspense
                  id={id}
                  categoryId={"*"}
                  refetchWishlist={() => { }}
                  productsPerViewMobile={2}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedProducts;
