"use client";

import { sortKeys } from "@/helpers/const";
import { useEffect, useState } from "react";
import Filter from "./Filter";

const FiltersMobile = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  tempSelectedFilters,
  setTempSelectedFilters,
  setSort,
  sort,
  changeFilters,
  setChangeFilters,
  setFilterOpen,
  setLastSelectedFilterKey,
  setPage,
}) => {
  const [openIndex, setOpenIndex] = useState({
    key: null,
  });

  const [activeFilter, setActiveFilter] = useState(null);
  const handleClick = (filter) => {
    setActiveFilter(filter);
  };
  const [activeFilters, setActiveFilters] = useState([]);
  useEffect(() => {
    setActiveFilters(selectedFilters);
  }, [selectedFilters]);

  const [activeSort, setActiveSort] = useState({ label: "" });
  const [sortingActive, setSortingActive] = useState(false);
  return (
    <>
      <div className="flex h-full flex-col px-[0.7rem]">
        <div
          className={`sticky top-0 flex w-full items-center justify-center border-b py-3 text-center`}
        >
          <p className="mx-auto self-center text-center text-[1rem] font-light text-[#171717]">
            Filteri
          </p>
          <i
            className={`fas fa-times mr-3 cursor-pointer text-[1.44rem] text-[#171717]`}
            onClick={() => setFilterOpen(false)}
          ></i>
        </div>
        <div className="mx-auto flex w-[95%] flex-col overflow-hidden border-b border-b-[#f5f5f5] py-[23px]">
          <div
            className="flex cursor-pointer flex-row items-center justify-between"
            onClick={() => setSortingActive(!sortingActive)}
          >
            <p className="text-[1rem] font-light">Sortiranje</p>
            <div className="flex cursor-pointer items-center">
              <p className="text-[1.2rem] font-light">
                {sortingActive ? "-" : "+"}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={
                sortingActive
                  ? `mt-0 flex flex-row flex-wrap gap-[11px] py-[20px] transition-all duration-[750ms]`
                  : `-mt-52 flex flex-row flex-wrap gap-[11px] py-[20px] transition-all duration-[750ms]`
              }
            >
              {sortKeys?.map((item, index) => {
                const isActive = activeSort?.label === item?.label;
                return (
                  <div
                    key={index}
                    className={
                      isActive && sort.field !== "" && sort.direction !== ""
                        ? `cursor-pointer select-none rounded-lg border-2 border-[#191919] bg-[#191919] px-3 py-[10px] font-medium text-white`
                        : `cursor-pointer select-none rounded-lg border-2 border-[#e8e8e8] px-3 py-[10px]`
                    }
                    onClick={() => {
                      setActiveSort({
                        label:
                          activeSort?.label === item?.label
                            ? null
                            : item?.label,
                      });
                      setSort({
                        field: item?.field,
                        direction: item?.direction,
                      });
                    }}
                  >
                    <p className="text-[13px] font-light">{item?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {availableFilters?.map((filter, index) => {
          const isOpen = openIndex.key === filter.key;
          return (
            <div key={index}>
              <div
                className="mx-auto flex w-[95%] cursor-pointer select-none items-center justify-between border-b border-b-[#f5f5f5] py-[1.375rem]"
                onClick={() =>
                  setOpenIndex({
                    key: openIndex?.key === filter?.key ? null : filter?.key,
                  })
                }
                key={filter?.key}
              >
                <p className="text-[1rem] font-light">
                  {filter?.attribute?.name}
                </p>
                <div>
                  <p className={`text-[1.2rem] font-light text-[#171717]`}>
                    {isOpen ? `-` : `+`}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className={
                    isOpen
                      ? `mt-[15px] block h-auto translate-y-0 py-[1rem] transition-all duration-[750ms]`
                      : `hidden h-min -translate-y-full py-[1rem] transition-all duration-[750ms]`
                  }
                >
                  <Filter
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    changeFilters={changeFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    setPage={setPage}
                    tempSelectedFilters={tempSelectedFilters}
                    setLastSelectedFilterKey={setLastSelectedFilterKey}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`sticky bottom-0 mt-auto flex items-center justify-center divide-x`}
        >
          <button
            className={`flex-1`}
            onClick={() => {
              setTempSelectedFilters([]);
              setSelectedFilters([]);
              setFilterOpen(false);
            }}
          >
            <p className={`py-3 text-center text-[1.2rem] font-light`}>
              Resetuj
            </p>
          </button>
          <button
            className={`flex-1`}
            onClick={() => {
              setSelectedFilters(tempSelectedFilters);
              setFilterOpen(false);
            }}
          >
            <p className={`py-3 text-center text-[1.2rem] font-light`}>
              Primeni
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersMobile;
