"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/zoom";

import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper";
import Image from "next/image";
import classes from "./styles.module.css";
import returnicon from "@/assets/Icons/return.png";
import ReturnModal from "@/components/ProductDetails/ReturnModal";

const ProductGallery = ({
  productGallery,
  color,
  loading,
  setLoadingc,
  product,
  setLoading,
}) => {
  const [returnModal, setReturnModal] = useState(false);

  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
    onClick = () => {},
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="h-full w-full object-cover"
        onClick={onClick}
      >
        <Image
          src={src}
          width={0}
          height={0}
          sizes={"100vw"}
          quality={100}
          priority={true}
          className="!h-auto !w-full"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={`HOB`}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const productImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className="w-full">
        <ImageMagnifier
          src={image?.image}
          width={2000}
          height={2000}
          onClick={() => {
            setModalImage(image?.image);
          }}
        />
      </SwiperSlide>
    );
  });
  const thumbImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <Image
          src={image?.image}
          alt={`Croonus`}
          width={2000}
          height={2000}
          priority={true}
          className="cursor-pointer max-md:hidden"
        />
      </SwiperSlide>
    );
  });

  const [newImage, setNewImage] = useState(0);
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (color) {
      const newImage = productGallery?.findIndex((item) =>
        item?.variant_key?.includes(color),
      );
      setNewImage(newImage);
      swiper?.slideTo(newImage);
    }
  }, [color]);

  return (
    <>
      <div className="col-span-2 gap-5 max-lg:col-span-4 md:flex md:flex-row-reverse">
        <div className={`relative w-full max-md:!h-auto md:h-[100vh]`}>
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            autoHeight={true}
            pagination={true}
            modules={[FreeMode, Thumbs, Pagination, Navigation]}
            initialSlide={color ? newImage : 0}
            navigation={true}
            loop={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            className={`${classes.mySwiper2} mySwiper2 !h-auto`}
            breakpoints={{
              768: {
                direction: "horizontal",
                slidesPerView: 1,
                pagination: {
                  el: ".swiper-pagination",
                  enabled: false,
                },
                navigation: {
                  enabled: true,
                },
                modules: [FreeMode, Thumbs, Navigation],
              },
              0: {
                direction: "horizontal",
                slidesPerView: 1,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                  enabled: true,
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                },
                navigation: {
                  el: ".swiper-nav-button",
                  clickable: true,
                  enabled: false,
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                },
                modules: [FreeMode, Thumbs, Pagination],
              },
            }}
          >
            {loading ? (
              <SwiperSlide>
                <div className="h-full w-full animate-pulse bg-gray-200"></div>
              </SwiperSlide>
            ) : (
              productImage
            )}
          </Swiper>
          <ul
            className={`absolute right-2 top-1/2 z-[10] flex -translate-y-1/2 transform flex-col gap-[14px] text-[13px]`}
          >
            <div
              className="relative flex h-[66px] w-[66px] cursor-pointer items-center justify-center rounded-full bg-black"
              onClick={() => setReturnModal(true)}
            >
              <Image
                src={returnicon}
                width={30}
                height={30}
                alt="HOB"
                className="invert"
              />
            </div>
          </ul>
          {modalImage && (
            <div
              className={`fixed left-0 top-0 z-[999999] flex h-full w-full items-center justify-center bg-black/80 md:hidden`}
            >
              <div className="relative h-full w-full">
                <Swiper
                  modules={[Pagination, Zoom]}
                  pagination={true}
                  direction={"vertical"}
                  zoom={{
                    maxRatio: 2.5,
                    toggle: true,
                    minRatio: 1,
                  }}
                  initialSlide={productGallery?.findIndex(
                    (item) => item?.image === modalImage,
                  )}
                  className={`${classes.mySwiper2} modalSwiper swiper-zoom-container`}
                  breakpoints={{
                    0: {
                      direction: "vertical",
                      slidesPerView: 1,
                      pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        enabled: true,
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                      },
                    },
                  }}
                >
                  {productGallery?.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className="w-full">
                        <div className="swiper-zoom-container">
                          <Image
                            src={image?.image}
                            alt={`Croonus`}
                            layout="fill"
                            objectFit="cover"
                            priority={true}
                            className="h-auto w-full cursor-pointer"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <i
                className={`fas fa-times absolute left-2 top-2 z-50 cursor-pointer rounded-xl bg-white px-2 py-1 text-xl text-[#e10000]`}
                onClick={() => {
                  setModalImage(null);
                }}
              ></i>
            </div>
          )}
        </div>
      </div>
      {returnModal && (
        <div
          className="fixed left-0 top-0 z-[100] h-screen w-screen bg-black bg-opacity-40 transition-all duration-500"
          onClick={() => {
            setReturnModal(false);
          }}
        ></div>
      )}
      <ReturnModal returnModal={returnModal} setReturnModal={setReturnModal} />
    </>
  );
};

export default ProductGallery;
