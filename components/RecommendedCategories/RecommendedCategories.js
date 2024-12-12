"use client";

import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const RecommendedCategories = ({ categories }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div
      data-aos="fade-left"
      className="grid grid-cols-1 gap-[1.25rem] max-sm:mx-5 max-sm:mt-[3rem] md:mx-5 md:mt-[5.625rem] lg:mx-[5rem] lg:grid-cols-2"
    >
      {categories?.map((category, index) => {
        return (
          <div className="col-span-1" key={index}>
            <div className="relative h-[350px] lg:h-[450px] 2xl:h-[500px]">
              {category?.images?.image && (
                <Image
                  src={category?.images?.image}
                  alt={category.slug}
                  fill
                  priority={true}
                  className="h-full bg-fixed max-xl:object-cover"
                />
              )}
              <Link href={`/${category?.link?.link_path}`}>
                <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full flex-col items-center justify-center">
                  <div className="relative z-[53]">
                    <h1 className="text-[5rem] font-light uppercase text-white max-lg:text-[3.5rem] lg:text-[4rem] 2xl:text-[8.5rem]">
                      {category?.basic_data?.name}
                    </h1>
                    <p className="text-[1.5rem] text-white max-sm:self-center max-sm:text-center sm:self-end sm:text-right md:-mt-8">
                      {category?.basic_data?.short_description}
                    </p>
                  </div>
                </div>
              </Link>
              <Link href={`/${category?.link?.link_path}`}>
                <div className="absolute bottom-0 left-0 right-0 top-0 z-[50] h-full w-full bg-transparent transition-all duration-500 hover:bg-black hover:bg-opacity-30"></div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCategories;
