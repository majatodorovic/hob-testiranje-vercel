"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { get as GET } from "@/app/api/api";

export const CategoryChildren = ({ slug }) => {
  const { data: categories } = useQuery({
    queryKey: ["products", { slug }],
    queryFn: async () => {
      return await GET(`/categories/product/tree/branch/parent/${slug}`).then(
        (response) => response?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const currentSlug = categories?.slug;

  return (
    <>
      <div
        className={`relative z-[1] mt-[67px] flex flex-wrap items-center justify-center md:gap-y-2`}
      >
        {categories?.childrens &&
          (categories?.childrens ?? [])?.map((child) => (
            <div className={`mx-1 max-md:mx-[2px] max-md:my-1`} key={child?.id}>
              {currentSlug === child?.slug ? (
                <div
                  className={`group w-max whitespace-nowrap rounded-xl px-4 py-1 hover:bg-croonus-3 max-md:px-2 ${currentSlug === child?.slug
                    ? `bg-croonus-3 text-white`
                    : `bg-white text-black`
                    }`}
                >
                  <p className={`text-base group-hover:text-white md:text-xl`}>
                    {child?.basic_data?.name}
                  </p>
                </div>
              ) : (
                <Link href={`/${child?.link?.link_path}`}>
                  <div
                    className={`w-max whitespace-nowrap rounded-xl px-4 py-1 text-base hover:bg-croonus-3 hover:text-white max-md:px-2 md:text-xl ${currentSlug === child?.slug
                      ? "bg-croonus-3 text-white"
                      : "bg-[#b47c76] text-white"
                      }`}
                  >
                    <p className="">{child?.basic_data?.name}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>
    </>
  );
};
