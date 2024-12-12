"use client";

import { Suspense } from "react";

import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { ThumbSuspense } from "@/_components/thumb-suspense";
import { useWishlist } from "@/hooks/hob.hooks";

const WishlistPage = () => {
  const {
    data: wishlistData,
    refetch: reload,
    isLoading: isFetching,
  } = useWishlist({
    render: false,
  });

  const renderWishlist = (isFetching, wishlistData) => {
    if (isFetching) {
      return (
        <div className="mx-auto mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-200`}
            />
          ))}
        </div>
      );
    }

    if (!isFetching && wishlistData?.length > 0) {
      return (
        <>
          <div className="mx-auto mt-[3rem] w-[95%] lg:w-full lg:px-[3rem]">
            <h1 className="text-[60px]">Lista želja</h1>
          </div>
          <div className="mx-auto mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
            {wishlistData?.map((item) => (
              <Suspense
                fallback={
                  <div
                    className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-200`}
                  />
                }
              >
                <ThumbSuspense
                  id={item?.id_product}
                  categoryId={"*"}
                  refetchWishlist={reload}
                />
              </Suspense>
            ))}
          </div>
        </>
      );
    }

    if (!isFetching && wishlistData?.length === 0) {
      return (
        <div className="mx-auto mt-[1.2rem] flex flex-col items-center justify-center py-5 text-center max-sm:w-[95%] lg:mt-[15rem]">
          <div className="p-10">
            <h1 className="text-[40px]">Vaša lista želja je prazna!</h1>{" "}
            <p className="font-extralight">
              Kada dodate artikle u listu želja, oni će se pojaviti ovde.
            </p>
            <Link href="/">
              <button className="mt-10 rounded-[30px] bg-black px-10 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:translate-y-0.5 hover:bg-opacity-80">
                Vrati se na početnu stranu
              </button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderWishlist(isFetching, wishlistData)}
      <Footer />
    </>
  );
};

export default WishlistPage;
