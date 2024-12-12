import {
  handleOpen,
  handleCategoryClick,
  isSelected,
  handleMapCategories,
} from "@/_components/mobile-nav/functions";
import { icons } from "@/_lib/icons";
import Image from "next/image";
import { useCategoryTree, useLandingPages } from "@/hooks/hob.hooks";
import { useState } from "react";
import Link from "next/link";

export const MobileMenu = ({ open, setOpen }) => {
  const { open: is_open, type } = open;
  const { data: categories } = useCategoryTree();
  const { data: landing_pages } = useLandingPages();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const links = [
    {
      id: 1,
      slug: "novo",
      name: "Novo",
    },
    {
      id: 2,
      slug: "o-nama",
      name: "O nama",
    },
    {
      id: 3,
      slug: "blog",
      name: "Blog",
    },
    {
      id: 4,
      slug: "kontakt",
      name: "Kontakt",
    },
  ];

  return (
    <div
      className={
        is_open && type === "menu"
          ? `fixed left-0 top-0 z-[500] h-dvh w-full translate-x-0 bg-[#dcccc0] transition-all duration-500`
          : `fixed left-0 top-0 z-[500] h-dvh w-full -translate-x-full bg-[#dcccc0] transition-all duration-500`
      }
    >
      <div className={`flex h-full flex-col`}>
        <div className={`flex h-full max-h-[80%] flex-col overflow-y-auto`}>
          <div
            className={`sticky top-0 z-[5] flex items-center justify-between border-b bg-[#dcccc0] p-4`}
          >
            <Image
              src={`/logo.png`}
              alt={`HOB Brand Group`}
              width={130}
              height={33}
            />
            <span
              className={`block rounded-md bg-white p-1 text-black`}
              onClick={() => {
                handleOpen(false, null)(setOpen);
              }}
            >
              {icons["close"]}
            </span>
          </div>
          <div className={`flex h-full flex-col`}>
            <p className={`ml-4 mt-4 text-xl font-medium uppercase`}>
              Kategorije
            </p>
            <div className={`mt-5 flex h-full flex-col`}>
              {handleMapCategories(
                categories,
                selectedCategories,
                setSelectedCategories,
                setOpen,
              )}
            </div>
          </div>
        </div>
        <div className={`mt-auto`}>
          {(links || [])?.map((link) => {
            if (link?.id) {
              const { id, name, slug } = link;
              return (
                <Link
                  key={id}
                  onClick={() => {
                    handleOpen(false, null)(setOpen);
                  }}
                  href={`/${slug}`}
                  className={`flex items-center justify-between py-2 pl-4`}
                >
                  <p className={`text-xl font-medium uppercase`}>{name}</p>
                </Link>
              );
            }
          })}
          <div
            className={`mt-2 flex flex-wrap items-center justify-center divide-x divide-white bg-black text-white`}
          >
            {(landing_pages?.items || [])?.map((page) => {
              if (page?.id) {
                const { id, name, slug } = page;
                return (
                  <Link
                    onClick={() => {
                      handleOpen(false, null)(setOpen);
                    }}
                    key={id}
                    href={`/promo/${slug}`}
                    className={`flex-1 px-4 py-2 text-center`}
                  >
                    <p className={`text-sm font-medium uppercase`}>{name}</p>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
