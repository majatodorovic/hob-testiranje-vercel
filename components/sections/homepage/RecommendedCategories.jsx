import Image from "next/image";
import Link from "next/link";
import frakles from "@/assets/shapes/frakles.png";

const RecommendedCategories = ({ categories }) => {
  return (
    <div className="mt-[2rem] md:px-[3rem] 2xl:mt-[18rem]">
      <h5 className="relative ml-[2rem] uppercase max-md:text-[40px] md:text-[34px] 2xl:text-[50px]">
        Pogledajte i...
      </h5>
      <div className="mx-auto grid grid-cols-1 items-end gap-[22px] max-md:w-[95%] lg:grid-cols-2">
        {(categories ?? [])?.slice(0, 2)?.map((category, index) => (
          <Link
            className={`relative w-full`}
            key={category.id}
            href={
              category?.url ? `/promo/${category?.url}` : "/stranica-u-izradi"
            }
          >
            <Image
              src={category?.image}
              width={0}
              height={0}
              sizes={`100vw`}
              alt="banner"
              className="relative z-[2] w-full rounded-[40px] object-cover"
            />
            <div
              className={`-right-[2rem] -top-[2rem] h-[600px] w-[860px] rounded-[40px] border border-black ${
                index === 1 ? "absolute z-[1] max-2xl:-z-[10]" : "hidden"
              }`}
            ></div>
          </Link>
        ))}
      </div>
      <Image
        src={frakles}
        width={220}
        height={220}
        className="ml-auto mr-[18%] -rotate-[20deg] opacity-[0.3]"
      />
    </div>
  );
};

export default RecommendedCategories;
