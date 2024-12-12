"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@/app/api/api";
import Link from "next/link";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import search from "@/assets/Icons/search.png";

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          setLoading(false);
          return res?.payload;
        });
      }
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?search=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative h-[50px]">
        <input
          type="text"
          placeholder="Pretraga..."
          className="h-full w-full rounded-[26px] border-0 bg-black bg-opacity-[0.2] px-[70px] pb-4 pl-[3.6rem] pt-4 !text-[18px] font-normal text-black placeholder:text-[18px] placeholder:font-normal placeholder:tracking-wide placeholder:text-white focus:border-0 focus:outline-none focus:ring-0 2xl:!text-[20px] 2xl:placeholder:text-[20px]"
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setLoading(true);
          }}
          value={searchTerm}
        />
        {searchTerm?.length >= 1 && searchTerm?.length < 3 ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 py-2">
            <span className={`text-[0.8rem] font-normal text-red-500`}>
              Unesite najmanje 3 karaktera.
            </span>
          </div>
        ) : (
          <div className="absolute left-1 top-[25px] -translate-y-1/2 rounded-[50%] bg-[#9f7361] px-3 py-3">
            <Image
              src={search}
              width={20}
              height={20}
              className="object-cover invert"
              alt="search"
            />
          </div>
        )}
        <div
          className={`${
            debouncedSearch?.length >= 3
              ? `hidescrollbar absolute right-0 top-[52px] flex h-[420px] w-full flex-col overflow-y-auto rounded-b-2xl border bg-black bg-opacity-[0.6] text-white`
              : `hidden`
          } `}
        >
          {searchData?.items?.length > 0 && debouncedSearch?.length >= 3 ? (
            <div className="mx-auto mt-5 w-[95%]">
              <h1 className="text-[1rem] font-normal">Rezultati pretrage</h1>
              <div className="mt-3 flex flex-col gap-5 pb-5">
                {searchData?.items?.slice(0, 6)?.map((item) => {
                  return (
                    <Link
                      href={`/${item?.link?.link_path}`}
                      onClick={(e) => {
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-row items-center gap-5">
                        <div className="relative h-[60px] w-[60px]">
                          <Image
                            src={item.image[0]}
                            alt={``}
                            fill
                            className={`rounded-full border border-white object-cover`}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="text-[0.9rem] font-normal">
                            {item?.basic_data?.name}
                          </h1>
                          <p className="w-fit rounded-[20px] bg-[#fff3e6] px-2 py-1 text-center text-[0.9rem] text-black">
                            {currencyFormat(
                              item?.price?.price?.discount ??
                                item?.price?.price?.original,
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            !isFetching && (
              <div className={`mx-auto mt-5 w-[95%]`}>
                <span className={`!text-[18px] font-normal 2xl:!text-[20px]`}>
                  Nema rezultata pretrage
                </span>
              </div>
            )
          )}
          {loading && (
            <div className={`mx-auto mt-5 w-[95%] text-center`}>
              <i className={`fas fa-spinner fa-spin text-xl text-black`}></i>
            </div>
          )}
          {!loading && searchData?.items?.length > 0 && (
            <div
              className={`sticky bottom-0 mt-auto w-full bg-[#9f7361] py-2 text-center hover:bg-opacity-80`}
            >
              <button
                onClick={() => {
                  handleSearch();
                }}
                className={`h-full w-full text-center font-normal text-white`}
              >
                Prikaži sve rezultate (
                {searchData?.pagination?.total_items > 10
                  ? `još ${searchData?.pagination?.total_items - 10}`
                  : `Pretraži`}
                )
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchProducts;
