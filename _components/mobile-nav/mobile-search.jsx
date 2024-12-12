"use client";
import {
  handleSearch,
  handleOpen,
  SearchResults,
} from "@/_components/mobile-nav";
import { useDebounce, useSearch } from "@/hooks/hob.hooks";
import { icons } from "@/_lib/icons";
import { useRouter } from "next/navigation";

export const MobileSearch = ({ setSearch, open, setOpen, search }) => {
  const { open: is_open, type } = open;
  const { term } = search;
  const { push } = useRouter();

  const debounced_search = useDebounce(term);
  const { data: search_results } = useSearch({
    isSearchPage: false,
    searchTerm: debounced_search,
  });

  const suggested_search = ["farba za kosu", "nokti", "fanola", "alter ego"];

  const handlePushSearch = (e) => {
    e.preventDefault();
    if (debounced_search?.length >= 3) {
      push(`/search?search=${debounced_search}`);
      handleOpen(false, null)(setOpen);
      handleSearch("")(setSearch);
    }
  };

  return (
    <>
      <div
        onClick={({ target: { classList } }) => {
          if (classList.contains("mob-search")) {
            handleOpen(false, null)(setOpen);
            handleSearch("")(setSearch);
          }
        }}
        className={
          is_open && type === "search"
            ? `mob-search fixed bottom-0 left-0 right-0 top-0 z-[500] h-dvh w-dvw bg-black/70`
            : `hidden`
        }
      ></div>

      <div
        className={
          is_open && type === "search"
            ? `visible fixed bottom-0 left-0 right-0 top-0 z-[600] m-auto flex h-auto max-h-[80%] w-[95%] translate-y-0 flex-col rounded-[1rem] bg-[#dcccc0] p-4 opacity-100 transition-all duration-500`
            : `invisible fixed bottom-0 left-0 right-0 top-0 z-[600] m-auto h-auto max-h-[80%] w-[95%] translate-y-10 rounded-[1rem] bg-[#dcccc0] p-4 opacity-0 transition-all duration-500`
        }
      >
        <div className={`flex items-center justify-between`}>
          <p className={`text-2xl font-medium`}>Pretraga</p>
          <button
            className={`text-2xl`}
            onClick={() => {
              handleOpen(false, null)(setOpen);
              handleSearch("")(setSearch);
            }}
          >
            {icons["close"]}
          </button>
        </div>
        <form className={`relative mt-5`} onSubmit={handlePushSearch}>
          <input
            placeholder={"Unesite termin za pretragu..."}
            value={term}
            className={`w-full rounded-xl border border-slate-300 bg-[#f2f2f2] p-2 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-croonus-3 focus:ring-offset-2 focus:ring-offset-white`}
            type={`text`}
            onChange={({ target: { value } }) => {
              handleSearch(value)(setSearch);
            }}
          />
          <button
            onClick={handlePushSearch}
            className={`absolute right-3 top-2.5 text-slate-400`}
          >
            {icons["search"]}
          </button>
          {term?.length > 0 && term?.length < 3 && (
            <p className={`mt-1 text-sm text-red-500`}>
              Pretraga mora imati najmanje 3 karaktera
            </p>
          )}
        </form>
        <p className={`mt-3`}>Preporučene pretrage:</p>
        <div className={`mt-3 flex flex-wrap items-center gap-3`}>
          {(suggested_search || []).map((s, i) => {
            return (
              <button
                onClick={() => {
                  handleSearch(s)(setSearch);
                }}
                key={`suggested-search-${i}`}
                className={`rounded-md p-2 text-sm ${
                  s === term
                    ? `bg-croonus-3 text-white`
                    : `bg-[#f2f2f2] text-black`
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <SearchResults
          search_results={search_results}
          setOpen={setOpen}
          setSearch={setSearch}
        />
        {search_results?.items && search_results?.items?.length > 4 && (
          <button
            onClick={() => {
              handleOpen(false, null)(setOpen);
              push(`/search?search=${debounced_search}`);
              handleSearch("")(setSearch);
            }}
            className={`mt-auto w-full rounded-xl bg-black py-1.5 text-white`}
          >
            Prikaži sve rezultate
          </button>
        )}
      </div>
    </>
  );
};
