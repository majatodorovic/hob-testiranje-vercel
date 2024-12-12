"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useCartContext } from "@/app/api/cartContext";
import Image from "next/image";
import { list } from "@/app/api/api";

const HeaderModal = () => {
  const [, , , , , , openHeader, mutateOpenHeader, chooseCategory] =
    useCartContext();
  const [chooseChildCategory, setChooseChildCategory] = useState(null);

  useEffect(() => {
    setChooseChildCategory(null);
  }, [chooseCategory]);

  const [landingPagesList, setLandingPagesList] = useState([]);

  useEffect(() => {
    const getLandingPages = async () => {
      const data = await list(`/landing-pages/list`).then((response) =>
        setLandingPagesList(response?.payload),
      );
    };
    getLandingPages();
  }, []);

  return (
    <Dialog
      open={openHeader}
      onClose={() => mutateOpenHeader(false)}
      className="absolute right-0 top-[110px] z-50 h-[257px] w-full bg-white max-lg:hidden"
      as="div"
    >
      <Dialog.Panel className="relative h-full px-20 py-6">
        <div className="flex h-full justify-between">
          <div className="flex gap-x-[10rem]">
            <div>
              {landingPagesList?.items?.map((item, index) => {
                return (
                  <Link
                    onClick={() => {
                      setOpen(false);
                    }}
                    href={`/promo/${item?.slug}`}
                    className="mb-1 block text-lg font-medium uppercase text-red-500 transition-all duration-300 hover:translate-x-5 hover:text-slate-500"
                  >
                    {item?.name}
                  </Link>
                );
              })}
              {chooseCategory?.children?.map((category, index) => (
                <button
                  key={index}
                  className={`${
                    category?.id === chooseChildCategory?.id
                      ? "font-bold"
                      : "font-normal"
                  } block text-lg uppercase text-black`}
                  onClick={() => setChooseChildCategory(category)}
                >
                  {category?.name}
                </button>
              ))}
            </div>
            <div className="h-[85%]">
              <h3 className="mb-4 text-[15px] font-bold uppercase text-black">
                {chooseChildCategory?.name}
              </h3>
              <div className="flex h-full flex-col flex-wrap gap-x-6">
                {chooseChildCategory &&
                  chooseChildCategory?.children?.map((childCategory) => (
                    <Link
                      href={`/${childCategory?.link?.link_path}`}
                      onClick={() => mutateOpenHeader(false)}
                      key={childCategory?.id}
                      className="block text-[15px] lowercase text-black first-letter:uppercase"
                    >
                      {childCategory.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="relative aspect-video">
            <Image
              src="/fashion-img.png"
              alt="img-modal"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default HeaderModal;
