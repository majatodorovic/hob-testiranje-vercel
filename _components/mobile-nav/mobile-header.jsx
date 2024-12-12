import Image from "next/image";
import Burger from "@/assets/Icons/hamburger.png";
import Link from "next/link";
import search from "@/assets/Icons/search-mobile.png";
import Wishlist from "@/assets/Icons/heart.png";
import Cart from "@/assets/Icons/shopping-bag-mobile.png";
import { useCartBadge, useWishlistBadge } from "@/hooks/hob.hooks";
import { handleOpen } from "@/_components/mobile-nav";

export const MobileHeader = ({ setOpen }) => {
  const { data: cartCount } = useCartBadge();
  const { data: wishlistCount } = useWishlistBadge();

  return (
    <div className="sticky top-0 z-[100] w-full bg-[#dcccc0] bg-opacity-90 backdrop-blur-md xl:hidden">
      <div className="mx-auto flex w-[95%] items-center justify-between py-3">
        <div
          onClick={() => {
            handleOpen(true, "menu")(setOpen);
          }}
        >
          <Image alt={``} src={Burger} width={38} height={38} />
        </div>
        <Link href="/">
          <div className="relative">
            <Image alt={`logo`} src={"/logo.png"} width={130} height={33} />
          </div>
        </Link>
        <div className="relative flex items-center gap-4">
          <div
            onClick={() => {
              handleOpen(true, "search")(setOpen);
            }}
          >
            <Image src={search} width={30} height={30} alt="" />
          </div>

          <Link href={`/lista-zelja`}>
            <div className="relative">
              <Image src={Wishlist} width={30} height={30} alt="" />
              {wishlistCount ? (
                <span className="absolute -right-1 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e10000] text-xs text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </div>
          </Link>
          <a href="/korpa">
            <div className="relative">
              <Image src={Cart} width={33} height={33} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e10000] text-xs text-white">
                  {Math.round(cartCount)}
                </span>
              )}
            </div>
          </a>
        </div>
      </div>{" "}
    </div>
  );
};
