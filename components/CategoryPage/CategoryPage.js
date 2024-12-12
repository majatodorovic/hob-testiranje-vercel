"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import FilterIcon from "../../assets/Icons/filter.png";
import Thumb from "../Thumb/Thumb";
import { list, post } from "@/app/api/api";
import Filters from "../Filters/Filters";
import Link from "next/link";

const CategoryPage = ({
  filter,
  singleCategory,
  products,
  productsFromSection,
  slug = "",
  text = "",
}) => {
  const [productData, setProductData] = useState({
    products: productsFromSection?.items ?? [],
    pagination: productsFromSection?.pagination ?? {},
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(
    productData?.pagination?.items_per_page ?? 8,
  );
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);

  useEffect(() => {
    const fetchData = async (limit, sort, page, filters) => {
      // if (page < 2) {
      //   setLoading(true);
      // }
      let res;
      if (slug) {
        res = await list(`/products/section/list/${slug}`, {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        });
      } else {
        res = await list(`/products/category/list/${singleCategory?.id}`, {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        });
      }
      const newProducts = res?.payload?.items;
      const newPagination = res?.payload?.pagination;
      if (isBeingFiltered) {
        setProductData({
          products: newProducts,
          pagination: newPagination,
        });
        setIsBeingFiltered(false);
      } else {
        setProductData((prevData) => {
          const uniqueProductIds = new Set(
            prevData?.products?.map(
              (product) => product?.basic_data?.id_product,
            ),
          );
          const filteredNewProducts = newProducts?.filter(
            (product) =>
              !uniqueProductIds?.has(product?.basic_data?.id_product),
          );
          return {
            products: [...prevData?.products, ...(filteredNewProducts ?? [])],
            pagination: newPagination,
          };
        });
        setIsBeingFiltered(false);
      }

      setLoading(false);
    };

    fetchData(
      limit,
      sort,
      selectedFilters?.length > 0 ? 1 : page,
      selectedFilters,
    );
  }, [
    limit,
    sort,
    page,
    productData?.pagination?.selected_page,
    selectedFilters,
  ]);

  useEffect(() => {
    if (changeFilters) {
      if (slug) {
        post(`/products/section/filters/${slug}`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      } else {
        post(`/products/category/filters/${singleCategory?.id}`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      }
    }
    setChangeFilters(false);
  }, [changeFilters]);

  // useEffect(() => {
  //   const updateProductsCountBasedOnTempSelectedFilters = async (
  //     tempSelectedFilters
  //   ) => {
  //     const res = await list(`/products/category/list/${singleCategory?.id}`, {
  //       filters: tempSelectedFilters,
  //       limit,
  //       page,
  //       sort,
  //     });
  //
  //     setProductData((prevData) => ({
  //       products:
  //         prevData.products.length === 0 || tempSelectedFilters.length === 0
  //           ? res?.payload?.items
  //           : prevData.products,
  //       pagination: res?.payload?.pagination,
  //     }));
  //
  //     setLoading(false);
  //   };
  //
  //   updateProductsCountBasedOnTempSelectedFilters(tempSelectedFilters);
  // }, [tempSelectedFilters]);

  //infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bufferPercentage = 1;
      const buffer = Math.floor(window.innerHeight * bufferPercentage);

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - buffer &&
        productData?.pagination?.total_pages >
          productData?.pagination?.selected_page
      ) {
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, productData, page]);

  const breadCrumbsText = singleCategory?.breadcrumb_text;
  const breadCrumbs = breadCrumbsText?.split(">");

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    const generateBreadcrumbs = (category) => {
      category?.parents?.forEach((parent) => {
        if (
          !breadcrumbs.some((breadcrumb) => breadcrumb.name === parent?.name)
        ) {
          setBreadcrumbs((prevBreadcrumbs) => [
            ...prevBreadcrumbs,
            {
              name: parent?.name,
              slug: parent?.slug,
            },
          ]);
        }
      });
    };

    if (singleCategory) {
      generateBreadcrumbs(singleCategory);
    }
  }, [singleCategory, breadcrumbs]);
  return (
    <>
      <div className="">
        {" "}
        <div className="mt-[9rem] flex items-center justify-between bg-white px-[3%] max-md:sticky max-md:top-[56px] max-md:z-[51] max-md:mt-[2rem] max-md:py-2">
          <h1 className="text-[1.313rem] font-bold text-[#191919] max-md:text-[1rem]">
            {singleCategory?.basic_data?.name ?? text ?? ""}
          </h1>
          <div
            className="flex h-[50px] w-[243px] cursor-pointer items-center border-2 border-[#171717] pl-[14px] max-md:h-[40px] max-md:w-[132px] max-md:border-none max-[365px]:w-[150px] md:gap-[30px]"
            onClick={() => setOpenFilter(true)}
          >
            <Image
              src={FilterIcon}
              alt="Filter"
              width={20}
              height={20}
              className={`max-md:ml-auto`}
            />
            <h1 className="text-[13.74px] font-bold uppercase text-[#191919] max-md:hidden max-md:pl-4">
              Filteri
            </h1>
          </div>
        </div>{" "}
        {breadcrumbs?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-[3%]">
            <Link
              href={`/`}
              className="text-[0.95rem] font-normal text-[#191919] hover:text-[#e10000]"
            >
              Početna
            </Link>{" "}
            <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
            {breadcrumbs?.map((breadcrumb, index, arr) => {
              return (
                <div className="flex items-center gap-2">
                  <Link
                    href={
                      index === arr.length - 1
                        ? `/${breadcrumb?.slug}`
                        : `/${breadcrumb?.slug}`
                    }
                    className="text-[0.95rem] font-normal text-[#191919] hover:text-[#e10000]"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr.length - 1 && (
                    <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
                  )}
                </div>
              );
            })}
            <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
            <h1 className="text-[0.95rem] font-normal text-[#191919]">
              {singleCategory?.basic_data?.name}
            </h1>
          </div>
        )}
        <div
          className={`${
            tempSelectedFilters?.length > 0
              ? `mx-[3%] mt-[4.125rem] flex flex-wrap items-center gap-[0.25rem]`
              : `hidden`
          }`}
        >
          {tempSelectedFilters?.map((filter) => {
            const splitFilter = filter?.column?.split("|");
            const filterName = splitFilter[1];
            return (
              <div
                className={`relative flex items-center gap-2 rounded-lg bg-croonus-2 text-[0.65rem] font-normal text-white max-md:text-[0.7rem]`}
              >
                <div className={`flex items-center gap-2 px-1`}>
                  <h1>
                    {filterName?.charAt(0).toUpperCase() + filterName?.slice(1)}
                    :
                  </h1>
                  <span>
                    {filter?.value?.selected?.map((item, index, arr) => {
                      const isLastItem = index === arr.length - 1;
                      return `${filterName === "cena" ? item + "RSD" : item}${
                        isLastItem ? "" : ","
                      }`;
                    })}
                  </span>
                </div>
                <div
                  onClick={() => {
                    const newSelectedFilters = tempSelectedFilters.filter(
                      (item) => item.column !== filter.column,
                    );
                    setTempSelectedFilters(newSelectedFilters);
                    setSelectedFilters(newSelectedFilters);
                    setChangeFilters(true);
                    if (tempSelectedFilters.length === 1) {
                      window.history.replaceState(
                        null,
                        "",
                        singleCategory
                          ? `/${singleCategory.link?.link_path}`
                          : `/sekcija/${slug}`,
                      );
                    }
                  }}
                  className={`right-0 flex h-full flex-1 cursor-pointer flex-col items-center justify-center self-stretch rounded-r-lg bg-croonus-2`}
                >
                  <i
                    className={`fa fa-solid fa-trash cursor-pointer px-1 py-[0.35rem] text-[0.65rem] text-white hover:text-red-500`}
                    onClick={() => {
                      const newSelectedFilters = tempSelectedFilters.filter(
                        (item) => item.column !== filter.column,
                      );
                      setTempSelectedFilters(newSelectedFilters);
                      setSelectedFilters(newSelectedFilters);
                      setChangeFilters(true);
                      setIsBeingFiltered(true);
                      if (tempSelectedFilters.length === 1) {
                        window.history.replaceState(
                          null,
                          "",
                          singleCategory
                            ? `/${singleCategory.slug_path}`
                            : `/sekcija/${slug}`,
                        );
                      }
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-[0.625rem] mt-[4.125rem]">
          <div className="grid gap-[11px] gap-y-[40px] max-md:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
            {loading ? (
              <>
                {Array.from({ length: 12 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="col-span-1 h-[500px] w-full animate-pulse bg-slate-300 object-cover max-md:h-[250px]"
                    />
                  );
                })}
              </>
            ) : productData?.products?.length > 0 ? (
              <Thumb
                data={productData?.products ?? productsFromSection}
                slider={false}
                loading={loading}
                category={true}
              />
            ) : (
              <div
                className={`col-span-2 flex items-center justify-center text-center md:col-span-2 lg:col-span-3 2xl:col-span-4`}
              >
                <h1 className={`text-center text-[1rem] font-normal`}>
                  Nijedan proizvod ne odgovara zadatim kriterijumima, ili
                  izabrana kategorija trenutno ne sadrži nijedan proizvod.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed right-0 top-0 z-[6000] flex h-screen w-[26.125rem] translate-x-0 flex-col justify-between overflow-y-auto bg-white shadow-lg transition-all duration-500 max-md:w-screen`
            : `fixed right-0 top-0 z-[6000] flex h-screen w-[26.125rem] translate-x-full flex-col justify-between bg-white shadow-lg transition-all duration-500`
        }
      >
        <div>
          <div className="border-b border-l-0 border-r-0 border-t-0 border-b-[#ededed] py-[1.563rem]">
            <div className="mx-[1.25rem] flex items-center justify-end text-center">
              <h1 className="mx-auto self-center text-[0.938rem] font-bold text-[#191919]">
                Filtriraj
              </h1>
              <div className="self-end">
                <i
                  className="fas fa-times ml-auto cursor-pointer text-xl text-[#a3a3a3]"
                  onClick={() => setOpenFilter(false)}
                ></i>
              </div>
            </div>
          </div>
          <div className="mx-[1.25rem] mt-[1.245rem] h-full max-h-full">
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              availableFilters={availableFilters}
              changeFilters={changeFilters}
              setTempSelectedFilters={setTempSelectedFilters}
              tempSelectedFilters={tempSelectedFilters}
              setChangeFilters={setChangeFilters}
              setSort={setSort}
              sort={sort}
              setIsBeingFiltered={setIsBeingFiltered}
            />
          </div>
        </div>
        <div className="sticky bottom-0 border-t border-t-[#ededed] bg-white">
          <div className="mx-[1.25rem] flex items-center gap-[20px] py-[2.813rem]">
            <button
              className="flex h-[3.188rem] w-[7.625rem] items-center justify-center border border-[#191919] text-center text-sm font-bold uppercase text-[#191919] transition-colors duration-500 hover:bg-[#191919] hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters([]);
                setTempSelectedFilters([]);
                setChangeFilters(true);
                setSort({ field: "", direction: "" });
                setOpenFilter(false);
                setPage(1);
              }}
            >
              Obriši
            </button>
            <button
              className="flex h-[3.188rem] w-[237px] items-center justify-center border bg-[#191919] text-center text-sm font-bold uppercase text-white hover:bg-opacity-80"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters(tempSelectedFilters);
                setChangeFilters(true);
                setOpenFilter(false);
                setIsBeingFiltered(true);
              }}
            >
              Prikaži rezultate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
