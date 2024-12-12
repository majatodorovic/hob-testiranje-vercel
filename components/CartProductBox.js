"use client";
import {
  useAddToCart,
  useDebounce,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/hob.hooks";
import classes from "./CartProductBox.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalAddToCart } from "@/app/api/globals";
import { useGlobalRemoveFromCart } from "@/app/api/globals";
import { currencyFormat } from "../helpers/functions";
import PlusMinusInputOne from "./PlusMinusInputOne";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const CartProductBox = ({
  id,
  name,
  sku,
  price,
  image,
  slug_path,
  inventory,
  className,
  key,
  refreshCart,
  quantity,
  refreshSummary,
  short_description,
  isClosed,
  brand_name,
  categories,
  cart_item_id,
}) => {
  const { mutate: removeFromCart, isSuccess: isRemoved } = useRemoveFromCart();
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  const debounceQuantity = useDebounce(productQuantity, 500);

  useEffect(() => {
    if (isUpdated || isRemoved) {
      refreshCart();
      refreshSummary();
    }
  }, [isUpdated, isRemoved]);

  const [sureCheck, setSureCheck] = useState(false);

  const handleRemoveFromCart = () => {
    removeFromCart({ id: id });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ecommerce: null,
    });
    window?.dataLayer?.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "RSD",
        value: price?.per_item?.total,
        items: [
          {
            item_id: id,
            item_name: name,
            price: price?.per_item?.total,
            item_brand: brand_name,
            item_category: categories?.[0]?.name,
            quantity: productQuantity,
          },
        ],
      },
    });
    setSureCheck(false);
  };

  return (
    <div className={`mb-[2rem] mt-[30px]`}>
      <div className="grid grid-cols-3 gap-x-7">
        <div className="col-span-1">
          <div className="relative flex w-full items-center">
            <div className="relative flex h-full w-full justify-center xl:h-[170px]">
              <Link href={`/${slug_path}`}>
                <Image
                  src={convertHttpToHttps(image[0])}
                  width={280}
                  height={250}
                  alt=""
                  className="h-full w-full overflow-hidden rounded-[14px] object-contain"
                />
              </Link>
              {price?.per_item?.discount?.active && (
                <div
                  className={`absolute right-2 top-1 rounded-full bg-[#9f7361] px-2 py-3 text-sm text-white`}
                >
                  -
                  {(
                    ((price?.per_item?.price_with_vat -
                      price?.per_item?.price_discount) /
                      price?.per_item?.price_with_vat) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative col-span-2 mt-2 flex flex-col justify-between">
          <Link
            href={`/${slug_path}`}
            className={`text-[1.5rem] leading-tight`}
          >
            {name}
          </Link>
          <span className="mt-1 block text-[14px]">Šifra: {sku}</span>
          <span className="block">{short_description}</span>
          <PlusMinusInputOne
            className={`${className} !mr-auto`}
            maxAmount={+inventory?.amount}
            quantity={productQuantity}
            setQuantity={setProductQuantity}
            updateCart={updateCart}
            id={cart_item_id}
            refreshSummary={refreshSummary}
            refreshCart={refreshCart}
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 md:hidden">
              <span>Količina:</span>
              {productQuantity}
            </div>
            <span className="mt-3 w-fit rounded-[30px] bg-[#fff3e7] px-[3.2rem] py-2 pl-4">
              {" "}
              {currencyFormat(price?.per_item?.total)}
            </span>
            {price?.per_item?.discount?.active && (
              <span className="font-semibold text-[#e10000]">
                Uštedeli ste: {currencyFormat(price?.cost?.discount_amount)}
              </span>
            )}
          </div>
          <span
            className="absolute -top-8 right-2 cursor-pointer rounded-full bg-black px-3 py-1 font-light text-white"
            onClick={() => setSureCheck(true)}
          >
            X
          </span>
          {isClosed && !inventory?.inventory_defined && (
            <div
              className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
            ></div>
          )}
        </div>

        {sureCheck && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSureCheck(false)}
          >
            <div className="rounded-lg bg-white p-5">
              <span className="text-[15px] font-bold">
                Da li ste sigurni da želite da uklonite proizvod iz korpe?
              </span>
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-red-500 hover:text-white"
                  onClick={() => setSureCheck(false)}
                >
                  Ne
                </button>
                <button
                  className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-green-500 hover:text-white"
                  onClick={handleRemoveFromCart}
                >
                  Da
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartProductBox;
