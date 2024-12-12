"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper as Slider, SwiperSlide as Slide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper";

const SinglePost = ({ post }) => {
  const [blogGallery, setBlogGallery] = useState([
    post?.images?.thumb_image,
    ...post?.gallery,
  ]);

  return (
    <div className={`mx-auto mt-5 w-[95%] lg:w-full lg:px-[3rem]`}>
      <div className="grid grid-cols-5 gap-[2rem]">
        <div className="col-span-2 max-md:col-span-5">
          <Slider
            modules={[Navigation]}
            navigation
            className={`blogSlider rounded-md`}
            watchSlidesProgress
          >
            {blogGallery?.map((image, index) => {
              return (
                <Slide key={index} className={`rounded-md`}>
                  <div
                    className={`relative h-[250px] rounded-md 2xl:h-[500px] 3xl:h-[600px]`}
                  >
                    <Image
                      src={image}
                      alt={post?.basic_data?.title}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      priority
                      className={`h-full w-full rounded-md bg-fixed object-cover`}
                    />
                  </div>
                </Slide>
              );
            })}
          </Slider>
        </div>
        <div className="col-span-3 max-md:col-span-5 md:px-[4rem]">
          <section className={`flex flex-col gap-3`}>
            <div className={`border-b border-black py-5`}>
              <p className={`text-[1.5rem] font-normal`}>
                {post?.basic_data?.short_description}
              </p>
            </div>
            <div
              className={`font prose mt-5 !max-w-full text-[1.5rem] font-normal prose-a:text-[#04b400]`}
              dangerouslySetInnerHTML={{
                __html: post?.basic_data?.description,
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
