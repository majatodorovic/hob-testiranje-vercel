"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { list } from "@/app/api/api";
import Thumb from "../Thumb/Thumb";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/no-results.png";
import { useSearch } from "@/hooks/hob.hooks";
import { ThumbSuspense } from "@/_components/thumb-suspense";

const SearchPage = () => {
  const params = useSearchParams();
  const search = params.get("search");
  const { data: returnedProducts, isFetching } = useSearch({
    searchTerm: search,
    isSearchPage: true,
  });

  const memoizedProducts = useMemo(() => returnedProducts, [returnedProducts]);

  const renderProducts = (isLoading, products) => {
    if (isLoading) {
      return (
        <div
          className={`mt-[1.2rem] gap-y-[20px] gap-x-5 lg:mt-[5rem] w-[95%] mx-auto md:w-full md:px-[3rem]  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8]?.map((i) => {
            return (
              <div
                key={i}
                className={`aspect-2/3 w-full h-full col-span-1 bg-slate-300 animate-pulse`}
              />
            );
          })}
        </div>
      );
    }

    if (!isLoading && returnedProducts?.length > 0) {
      return (
        <div
          className={`mt-[1.2rem] gap-y-[20px] gap-x-5 lg:mt-[5rem] w-[95%] mx-auto md:w-full md:px-[3rem]  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          <h1 className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 font-bold text-[1.5rem] py-3">
            Rezultati pretrage za termin "{search}"
          </h1>
          {memoizedProducts?.map(({ id }) => {
            return (
              <Suspense
                key={id}
                fallback={
                  <div
                    className={`aspect-2/3 w-full h-full col-span-1 bg-slate-300 animate-pulse`}
                  />
                }
              >
                <ThumbSuspense id={id} />
              </Suspense>
            );
          })}
        </div>
      );
    }

    if (!isLoading && returnedProducts?.length === 0) {
      return (
        <div className="flex items-center justify-center py-10 text-center mt-[1.2rem] lg:mt-[13rem] max-md:w-[95%] mx-auto">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#f8f8f8] p-6">
            <div>
              <Image src={Image1} alt="404" width={130} height={130} />
            </div>
            <div>
              <p className="text-lg font-medium">
                Vaša pretraga nije dala nikakve rezultate.
              </p>
              <p className="text-sm">
                Trenutno ne postoji rezultat za Vašu pretragu "{search}".
              </p>
              <p className="mt-4 text-lg font-medium">Pomoć u pretrazi:</p>
              <ul className="text-sm">
                <li className="mt-2">• Proverite greške u kucanju.</li>
                <li className="mt-2">
                  • Koristite više generčkih termina za pretragu.
                </li>
                <li className="mt-2">
                  • Proizvod ili kategorija koju tražite možda nisu još uvek
                  dostupni na našoj online prodavnici.
                </li>
                <li className="mt-2">
                  • Ukoliko Vam je potrebna pomoć, u svakom trenutku nas možete
                  kontaktirati pozivom na broj call centra
                </li>
              </ul>
            </div>
            <div>
              <Link href="/">
                <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                  Vrati se na početnu stranu
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };

  return renderProducts(isFetching, returnedProducts);
};

export default SearchPage;
