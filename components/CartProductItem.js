import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalAddToCart } from "@/app/api/globals";
import { useGlobalRemoveFromCart } from "@/app/api/globals";
import { currencyFormat } from "../helpers/functions";
import PlusMinusInputOne from "./PlusMinusInputOne";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";

const CartProductItem = ({ item }) => {
  const [productAmount, setProductAmount] = useState(
    Number(item.cart.quantity)
  );
  const addToCart = useGlobalAddToCart(true);

  useEffect(() => {
    if (productAmount != item.cart.quantity) {
      addToCart(item?.product?.id, productAmount, true);
    }
  }, [productAmount, addToCart, item.cart.quantity, item?.product?.id]);

  const per_item = item?.product?.price?.per_item;
  const total = item?.product?.price?.cost;
  const currency = item?.product?.price?.currency;
  const [sureCheck, setSureCheck] = useState(false);

  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();
  useEffect(() => {
    if (isSuccess) {
      refreshCart();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (productQuantity !== quantity) {
      setInitialAddToCart(true);
      updateCart({
        id: id,
        quantity: debounceQuantity,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
    }
    if (productQuantity === quantity && initialAddToCart) {
      updateCart({
        id: id,
        quantity: debounceQuantity,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
      if (productQuantity === 0) {
        removeFromCart({ id: id });
      }
    }
    setTimeout(() => {
      refreshSummary();
    }, 500);
  }, [debounceQuantity, updateCart, refreshSummary, quantity]);

  return (
    <>
      <div className="col-span-1">
        <div className="relative w-full flex items-center">
          <div className="xl:h-[170px] relative  h-full w-full flex justify-center">
            <Link href={`/${item?.product?.slug}`}>
              <Image
                src={convertHttpToHttps(item?.product?.image[0])}
                width={280}
                height={250}
                alt=""
                className="object-contain h-full w-full rounded-[14px] overflow-hidden"
              />
            </Link>

            {item?.product?.price?.per_item?.discount?.active && (
              <div
                className={`absolute top-[3.2rem] right-2 bg-black px-2 py-3 rounded-full text-white`}
              >
                -
                {(
                  ((item?.product?.price?.per_item?.price_with_vat -
                    item?.product?.price?.per_item?.price_discount) /
                    item?.product?.price?.per_item?.price_with_vat) *
                  100
                ).toFixed(0)}
                %
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 flex mt-2 flex-col justify-between relative">
        <div>
          <Link href={`/${item?.product?.slug}`}>
            <span className="text-[20px]">
              {item?.product?.basic_data?.name}
            </span>
          </Link>
          <span className="mt-1 font-light text-[12px] block">
            Šifra: {item?.product?.basic_data?.sku}
          </span>
          <span className="block">
            {item?.product?.basic_data?.short_description}
          </span>
        </div>
        <PlusMinusInputOne
          setCount={setProductAmount}
          count={productAmount}
          amount={productAmount}
          maxAmount={+item?.product?.inventory?.amount}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 md:hidden">
            <span>Količina:</span>
            {productAmount}
          </div>
          <span className=" bg-[fff3e7] py-2 pl-4 px-[3.2rem] bg-[#fff3e7] rounded-[30px] w-fit">
            {" "}
            {currencyFormat(total?.total, currency)}
          </span>
          {item?.product?.price?.per_item?.discount?.active && (
            <span className="font-semibold text-[#e10000]">
              Uštedeli ste:{" "}
              {currencyFormat(
                item?.product?.price?.cost?.discount_amount,
                currency
              )}
            </span>
          )}
        </div>
        <span
          className="absolute -top-6 right-2 cursor-pointer bg-black text-white rounded-full px-4 py-2 font-light"
          onClick={() => setSureCheck(true)}
        >
          X
        </span>
      </div>

      {sureCheck && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSureCheck(false)}
        >
          <div className="bg-white p-5 rounded-lg">
            <span className="text-[15px] font-bold">
              Da li ste sigurni da želite da uklonite proizvod iz korpe?
            </span>
            <div className="flex items-center gap-4 justify-center mt-5">
              <button
                className="bg-[#E5E5E5] hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg"
                onClick={() => setSureCheck(false)}
              >
                Ne
              </button>
              <button
                className="bg-[#E5E5E5] hover:bg-green-500 hover:text-white px-5 py-2 rounded-lg"
                onClick={() => removeFromCart(item?.product?.id)}
              >
                Da
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProductItem;
