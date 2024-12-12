"use client";
import { useCartContext } from "@/app/api/cartContext";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { get } from "@/app/api/api";
import heart from "@/assets/Icons/heart.png";
import shoppingbag from "@/assets/Icons/shopping-bag.png";
const HeaderIcons = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.total_quantity ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishListCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList, wishListCount]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart, cartCount]);

  return (
    <div className="flex items-center">
      <Link href="/lista-zelja">
        <div className="relative">
          <Image
            src={heart}
            width={30}
            height={30}
            className="mx-5 cursor-pointer object-cover transition-all duration-300 hover:scale-110"
            alt="heart"
          />
          {wishListCount ? (
            <span className="absolute -bottom-[0.6rem] right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#e10000] text-xs text-white">
              {wishListCount}
            </span>
          ) : null}
        </div>
      </Link>
      <a href="/korpa" className="ml-6">
        <div className="relative rounded-[50%] bg-[#9f7361] px-5 pb-5 pt-4">
          <Image
            src={shoppingbag}
            width={34}
            height={34}
            className="object-cover invert transition-all duration-300 hover:scale-110"
            alt="shopping-bag"
          />
          {cartCount ? (
            <span className="absolute bottom-3 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e10000] text-xs text-white">
              {Math.round(cartCount)}
            </span>
          ) : null}
        </div>
      </a>
    </div>
  );
};

export default HeaderIcons;
