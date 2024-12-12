"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/_components/button";
import leaf from "@/assets/shapes/leaf-little-rose.png";
import frakles from "@/assets/shapes/frakles.png";

const CategoryOne = ({ category }) => (
  <div className="col-span-1 flex h-full flex-col px-[1rem] pb-[30px] max-xl:col-span-3 sm:px-[2rem] 2xl:px-[3rem]">
    <Link href={`/${category?.link?.link_path}`}>
      <div className="relative mt-[5rem] h-[480px] w-full max-md:h-[300px]">
        {category?.images?.image && (
          <Image
            src={category?.images?.image}
            alt="category"
            fill
            className="z-[4] rounded-b-[50px] rounded-t-[190px] object-cover"
          />
        )}
        <div className="absolute -left-[2rem] -top-[2rem] z-[1] h-[480px] w-[360px] rounded-b-[50px] rounded-t-[190px] border border-black max-md:h-[300px] max-md:w-[300px]" />
      </div>
      <h3 className="relative text-[22px] max-md:mt-4 max-md:pl-5 md:mt-[2rem] md:text-[33px]">
        {category?.basic_data?.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-[1.5rem] max-md:pl-5">
        {category?.basic_data?.short_description}
      </p>
    </Link>
    <Link href={`/${category?.link?.link_path}`} className="!mt-auto pt-5">
      <Button>Pogledajte više</Button>
    </Link>
  </div>
);

const CategoryTwo = ({ category }) => (
  <div
    data-aos="zoom-in"
    className="col-span-1 mx-auto flex h-full w-full flex-col rounded-b-[50px] rounded-t-[250px] bg-[#a26d57] px-[1rem] pb-[30px] pt-[60px] max-xl:col-span-3 max-md:mt-[3rem] sm:px-[2rem] md:w-[90%] 2xl:px-[30px]"
  >
    <Link href={`/${category?.link?.link_path}`}>
      <div className="relative h-[500px] w-full max-md:h-[340px]">
        {category?.images?.image && (
          <>
            <Image
              src={category?.images?.image}
              alt="category"
              fill
              className="z-[2] rounded-b-[50px] rounded-t-[190px] object-cover"
            />
            <Image
              src={frakles}
              width={200}
              height={200}
              alt="HOB"
              className="absolute -bottom-[6rem] -right-[4rem] z-[1] max-sm:hidden"
            />
            <Image
              src={leaf}
              width={300}
              height={300}
              alt="HOB"
              className="absolute -left-[13rem] -top-[9rem] z-[1] opacity-[0.2]"
            />
          </>
        )}
      </div>
      <h3 className="relative mt-4 text-[22px] max-md:pl-5 md:mt-[2rem] md:text-[33px]">
        {category?.basic_data?.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-[1.5rem] font-normal max-md:pl-5">
        {category?.basic_data?.short_description}
      </p>
    </Link>
    <Link href={`/${category?.link?.link_path}`} className=" pt-5">
      <Button>Pogledajte više</Button>
    </Link>
  </div>
);

const CategoryThree = ({ category }) => (
  <div className="col-span-1 px-[1rem] pb-[30px] max-xl:col-span-3 sm:px-[2rem] 2xl:px-[3rem]">
    <Link href={`/${category?.link?.link_path}`}>
      <div className="relative mt-[5rem] h-[480px] w-full max-md:h-[300px] max-md:mt-[150px]">
        {category?.images?.image && (
          <Image
            src={category?.images?.image}
            alt="category"
            fill
            className="z-[4] rounded-b-[50px] rounded-t-[190px] object-cover"
          />
        )}
        <div className="absolute -right-[2rem] -top-[2rem] z-[1] h-[480px] w-[360px] rounded-b-[50px] rounded-t-[190px] border border-black max-md:h-[300px] max-md:w-[300px]" />
      </div>
      <h3 className="relative mt-[2rem] text-[22px] max-md:pl-5 md:text-[33px]">
        {category?.basic_data?.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-[1.5rem] font-normal max-md:pl-5">
        {category?.basic_data?.short_description}
      </p>
    </Link>
    <Link href={`/${category?.link?.link_path}`} className="!mt-auto pt-5">
      <Button className="ma- mt-5">Pogledajte više</Button>
    </Link>
  </div>
);

const NewCategoriesSections = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div
      data-aos="fade-up"
      className={
        "mx-auto mt-16 max-md:w-[95%] md:w-full md:px-[2rem] 2xl:mt-28 3xl:px-[6rem]"
      }
    >
      <div className="grid grid-cols-3 3xl:gap-3">
        {categories?.[0] && <CategoryOne category={categories?.[0]} />}
        {categories?.[1] && <CategoryTwo category={categories?.[1]} />}
        {categories?.[2] && <CategoryThree category={categories?.[2]} />}
      </div>
    </div>
  );
};

export default NewCategoriesSections;
