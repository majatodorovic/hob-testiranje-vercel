"use client";
import Filter from "./Filter";
import { sortKeys } from "@/helpers/const";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import chevron from "@/assets/Icons/right-arrow.png";

const Filters = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  setSort,
  sort,
  pagination,
  products,
  setProductsPerView,
  productsPerView,
  setTempSelectedFilters,
  setLastSelectedFilterKey,
  setChangeFilters,
  filter,
  setPage,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSort, setOpenSort] = useState({
    open: false,
    key: {
      field: "",
      direction: "",
    },
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const handleClick = (filter) => {
    setActiveFilter(filter);
  };
  const [activeFilters, setActiveFilters] = useState([]);
  useEffect(() => {
    setActiveFilters(selectedFilters);
  }, [selectedFilters]);

  const filterRef = useRef(null);

  const handleClickInsideAndOutside = (e) => {
    // Close the filter if the click occurred outside of it or if the user clicked on the filter

    if (
      (!filterRef?.current?.contains(e.target) ||
        e.target?.classList?.contains("filter")) &&
      openIndex !== null
    ) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickInsideAndOutside);
    return () => {
      document.removeEventListener("click", handleClickInsideAndOutside);
    };
  }, [openIndex]);

  const sortRef = useRef(null);

  const handleClickInsideAndOutsideSort = (e) => {
    if (
      (!sortRef?.current?.contains(e.target) ||
        e.target?.classList?.contains("sortref")) &&
      openSort !== false
    ) {
      setOpenSort({
        ...openSort,
        open: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickInsideAndOutsideSort);
    return () => {
      document.removeEventListener("click", handleClickInsideAndOutsideSort);
    };
  }, [openSort]);

  const params = useSearchParams();
  const sortParam = params?.get("sort") ?? "_";

  const keys = sortParam?.split("_");

  useEffect(() => {
    if (sortParam) {
      setSort({
        field: keys[0],
        direction: keys[1],
      });
    }
  }, [sortParam]);
  return (
    <>
      <div className="relative z-[6] mx-[5rem] flex items-center justify-between rounded-[50px] bg-[#9f7361] py-[6px] pl-[6px] pr-[2rem] text-white">
        <div className={`flex items-center gap-[1rem]`}>
          {(availableFilters ?? []).map((filter, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="relative filter max-lg:hidden">
                <div
                  className="relative cursor-pointer select-none filter"
                  key={filter?.id}
                  onClick={() => {
                    setOpenIndex(openIndex === index ? null : index);
                  }}
                >
                  <div className={`relative flex items-center gap-2 filter`}>
                    <div
                      className={`ease text-center text-[18px] font-light filter transition-all ${
                        isOpen
                          ? "rounded-[44px] bg-[#fff3e6] pl-3 pr-[100px] text-black"
                          : "bg-transparent pl-3 pr-[60px]"
                      } relative flex items-center py-3`}
                    >
                      {filter?.attribute?.name}
                      <div
                        className={`${
                          isOpen ? "bg-black" : "bg-transparent"
                        } absolute right-[2px] top-[2px] flex h-[47px] w-[56px] items-center justify-center rounded-full`}
                      >
                        <Image
                          src={chevron}
                          width={16}
                          height={16}
                          alt="HOB"
                          className={`invert ${
                            isOpen
                              ? "ease rotate-[90deg] transition-all"
                              : "ease transition-all"
                          } `}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div
                    ref={filterRef}
                    className={` ${
                      filter?.name === "Cena" && "w-[330px]"
                    } customScroll absolute left-0 top-[5rem] z-[200] max-h-[500px] min-w-[300px] overflow-y-scroll rounded-2xl bg-black/60 px-[1rem] py-[1.4rem]`}
                  >
                    <div className="filter">
                      <Filter
                        filter={filter}
                        availableFilters={availableFilters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        setTempSelectedFilters={setTempSelectedFilters}
                        setLastSelectedFilterKey={setLastSelectedFilterKey}
                        setChangeFilters={setChangeFilters}
                        setPage={setPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {selectedFilters?.length > 0 && (
          <div
            className="relative ml-[6rem] mr-auto cursor-pointer select-none"
            onClick={() => {
              setSelectedFilters([]);
              setChangeFilters(true);
              setOpenIndex(null);
            }}
          >
            <div className={`relative flex items-center gap-2`}>
              <p className="text-center text-base font-medium">Izbrišite sve</p>
              <i className="fa-solid fa-times mr-2 text-lg"></i>
            </div>
          </div>
        )}
        <div className={`flex items-center gap-10`}>
          {/* <div className="col-span-1 col-start-7 flex items-center justify-end relative">
            <p className=" font-light text-base text-center">
              {pagination?.total_items} Proizvoda
            </p>
          </div> */}
          <div className="relative col-span-1 col-start-8 flex items-center justify-end">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() =>
                setOpenSort({
                  ...openSort,
                  open: !openSort.open,
                })
              }
            >
              <p className="flex items-center gap-[1.4rem] text-center text-[18px] font-light">
                Sortiranje
                <Image
                  src={chevron}
                  width={18}
                  height={18}
                  alt="HOB"
                  className={`invert ${
                    openSort?.open
                      ? "ease rotate-[90deg] transition-all"
                      : "ease transition-all"
                  } `}
                />
              </p>
            </div>
            {openSort?.open && (
              <div
                ref={sortRef}
                className="sortref absolute right-0 top-[4rem] z-[2] flex w-[300px] flex-col justify-end rounded-2xl bg-black/50 px-4 py-[1.4rem]"
              >
                {sortKeys.map((key) => {
                  const isActive =
                    openSort?.key?.field === key?.field &&
                    openSort?.key?.direction === key?.direction;
                  return (
                    <div
                      className={`sortref flex w-full cursor-pointer justify-start px-4 py-1 text-[26px] ${
                        isActive ? "" : "text-white"
                      }`}
                      onClick={() =>
                        setSort({
                          field: key?.field,
                          direction: key?.direction,
                        })
                      }
                    >
                      <p
                        className={`sortref ${
                          isActive ? `text-[#39ae00]` : ``
                        } text-[16px] font-light hover:text-[#ccc] hover:underline`}
                        onClick={() =>
                          setOpenSort({
                            open: false,
                            key: {
                              field: key?.field,
                              direction: key?.direction,
                            },
                          })
                        }
                      >
                        {key?.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
