"use client";
import arrow from "@/assets/Icons/right-arrow.png";
import Image from "next/image";
import Link from "next/link";
import Aos from "aos";
import element from "@/assets/shapes/shape-medium-cream.png";
import leaf from "@/assets/shapes/leaf-cut.png";
import elementmeat from "@/assets/shapes/shape-banner-big-meat.png";
import { Button } from "@/_components/button";
import React from "react";

const BlogSection = ({ blog }) => {
  return (
    <>
      {blog?.[0] ? (
        <div className="relative mx-[1rem] mt-[10rem] md:mx-[5rem]">
          <Image
            src={leaf}
            width={620}
            height={800}
            alt="HOB"
            className="absolute -left-[5rem] -top-[3rem] z-[2]"
          />
          <div className="grid grid-cols-2 py-2 md:py-[2.4rem]">
            <div className="col-span-1 flex flex-col justify-center max-md:col-span-2 md:pr-[20%]">
              <div className="relative">
                <p className="relative z-[2] text-[1.5rem] font-normal">
                  Pričamo o...
                </p>
                <Image
                  src={element}
                  width={180}
                  height={100}
                  alt="HOB"
                  className={`absolute -left-[1.4rem] -top-[3rem] z-[1]`}
                />
              </div>
              <h5
                className={`relative z-[1] mb-[1px] mt-[1.2rem] text-[40px] uppercase md:text-[72px]`}
              >
                {blog[0]?.basic_data.title}
              </h5>
              <p
                className={`relative z-[1] mb-[1px] mt-[1.2rem] text-[1.5rem] font-normal`}
              >
                {blog[0]?.basic_data.short_description}
              </p>
              <Link
                className={`relative z-[5] mt-5`}
                href={`/blog/${blog[0]?.slug}`}
              >
                <Button>Pogledajte više</Button>
              </Link>
            </div>
            <div
              data-aos="zoom-in"
              className="relative col-span-1 max-md:col-span-2 max-md:mt-[2.4rem]"
            >
              <div id={blog[0]?.id} className="3xl:pr-[10%]">
                <Link href={`/blog/${blog[0]?.id}`}>
                  <div className="relative h-[300px] w-full md:h-[400px] 2xl:h-[660px]">
                    <Image
                      src={blog[0]?.images?.thumb_image}
                      fill={true}
                      alt={blog[0]?.title}
                      style={{ objectFit: "cover" }}
                      className="z-[3] rounded-[50px] rounded-[60px]"
                    />
                    <div className="absolute -right-[2rem] top-[1rem] z-[2] h-[300px] w-[400px] rounded-[60px] border border-black md:h-[660px] md:w-[720px]"></div>
                  </div>
                </Link>
              </div>
              <Image
                src={elementmeat}
                width={700}
                height={800}
                alt="HOB"
                className="absolute -bottom-[2rem] right-4 z-0 md:-bottom-[4rem] md:right-[2rem]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BlogSection;
