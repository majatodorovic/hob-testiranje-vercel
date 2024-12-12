"use client";
import { useCartBadge, useWishlistBadge } from "@/hooks/hob.hooks";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Burger from "@/assets/Icons/hamburger.png";
import search from "@/assets/Icons/search-mobile.png";
import Wishlist from "@/assets/Icons/heart.png";
import Cart from "@/assets/Icons/shopping-bag-mobile.png";
import {
  MobileHeader,
  MobileMenu,
  MobileSearch,
} from "@/_components/mobile-nav";

export const NavigationMobile = () => {
  const [open, setOpen] = useState({
    open: false,
    type: "",
  });

  const [search, setSearch] = useState({
    term: "",
  });

  useEffect(() => {
    if (open.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open.open]);

  return (
    <>
      <MobileHeader setOpen={setOpen} />
      <MobileMenu open={open} setOpen={setOpen} />
      <MobileSearch
        open={open}
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};
