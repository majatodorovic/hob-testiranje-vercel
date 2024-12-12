import { handleOpen, handleSearch } from "@/_components/mobile-nav";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { RenderPrice } from "@/_components/thumb-suspense";

export const SearchResults = ({ search_results, setOpen, setSearch }) => {
  return (
    <div className={`mt-5 flex flex-col overflow-y-auto`}>
      {search_results?.items && search_results?.items?.length > 0 && (
        <div className={`flex flex-col divide-y`}>
          {(search_results?.items || [])?.slice(0, 6)?.map((item) => {
            if (item?.id) {
              const {
                id,
                basic_data: { name },
                image,
                link: { link_path },
                price,
                inventory,
              } = item;
              return (
                <div
                  key={`search-result-${id}`}
                  className={`flex items-start gap-2 py-2`}
                >
                  {image?.[0] && (
                    <Image
                      src={convertHttpToHttps(image?.[0])}
                      alt={name}
                      width={70}
                      className={`rounded-full`}
                      height={50}
                    />
                  )}
                  <div className={`flex flex-col gap-2`}>
                    <Link
                      href={`/${link_path}`}
                      onClick={() => {
                        handleOpen(false, null)(setOpen);
                        handleSearch("")(setSearch);
                      }}
                    >
                      <p className={`line-clamp-1 text-lg`}>{name}</p>
                    </Link>
                    <RenderPrice price={price} inventory={inventory} />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
