"use client";
import { useGlobalRemoveFromWishlist } from "@/app/api/globals";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
import React, { useState, useCallback, useEffect } from "react";
import { useCartContext } from "@/app/api/cartContext";
import { useGlobalAddToCart } from "@/app/api/globals";
import { get, list, deleteMethod as DELETE } from "@/app/api/api";
import CartProductBox from "../CartProductBox";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import cartimg from "@/assets/Icons/shopping-bag.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const WishlistItems = ({ items, product, border }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();
  const globalAddToCart = useGlobalAddToCart();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cart, , wishList] = useCartContext();
  const [stickerHovered, setStickerHovered] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const addToCart = useGlobalAddToCart();

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState({
    status: false,
    id: null,
  });
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);

  useEffect(() => {
    const getCart = async () => {
      const cartResponse = await list("/cart").then((response) =>
        setCartData(response?.payload?.items),
      );
    };
    getCart();
  }, [cart]);
  const isStickerHovered = stickerHovered === product?.id;
  const [, , , mutateWishList] = useCartContext();
  const [idProduct, setIdProduct] = useState(null);

  const removeFromWishlist = async (id, name) => {
    return DELETE(`/wishlist/${id}`).then((response) => {
      if (response?.code === 200) {
        toast.success(`Proizvod ${name} je uspešno uklonjen iz liste želja!`, {
          position: "top-center",
          autoClose: 2000,
        });
        mutateWishList();
      } else {
        toast.error("Došlo je do greške!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };
  const variantOptionSize = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "velicina";
  });
  const variantOptionColor = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "boja";
  });
  useEffect(() => {
    if (selected?.length === 2) {
      setLoading({
        id: idProduct,
        status: true,
      });
      const getVariant = async (selected) => {
        const res = await get(`/product-details/basic-data/${idProduct}`);
        if (
          res?.payload?.data?.variant_items &&
          res?.code === 200 &&
          selected?.length === 2
        ) {
          const variantItems = res?.payload?.data?.variant_items;
          const variant = variantItems?.find((item) =>
            item?.variant_key_array?.every((variantKey) =>
              selected?.some(
                (selection) =>
                  selection?.attribute_key === variantKey?.attribute_key &&
                  selection?.value_key === variantKey?.value_key,
              ),
            ),
          );
          !variant?.basic_data?.name
            ? toast.error(`Došlo je do greške, molimo Vas pokušajte ponovo.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            : toast.success(
                `Proizvod ${variant?.basic_data?.name} je dodat u korpu`,
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                },
              );
          addToCart(variant?.basic_data?.id_product, 1);
          setSelected([]);
          setIdProduct(null);
          setLoading({
            id: null,
            status: false,
          });
          return variant;
        }
      };
      getVariant(selected);
    }
  }, [selected, idProduct]);
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
  });
  const [image, setImage] = useState({
    image: null,
    id: null,
  });
  return (
    <>
      <div
        className="item hoveredColor relative col-span-1 mt-[2rem] lg:mt-[5rem]"
        onMouseEnter={() => {
          setNavigationEnabled({
            enabled: true,
            id: product?.basic_data?.id_product,
          });
        }}
        onMouseLeave={() =>
          setNavigationEnabled({
            enabled: false,
            id: null,
          })
        }
      >
        <div className="item hoveredColor relative w-full overflow-hidden rounded-[40px] max-md:h-[320px]">
          <Swiper
            modules={[Navigation, Pagination]}
            // onSwiper={(swiper) => setSwiper(swiper)}
            pagination={true}
            direction={"horizontal"}
            loop={true}
            initialSlide={product?.image?.findIndex(
              (item) => item === product?.image[0],
            )}
            navigation={
              navigationEnabled.enabled === true &&
              navigationEnabled.id === product?.basic_data?.id_product
            }
            breakpoints={{
              320: {
                navigation: {
                  enabled: false,
                },
              },
              1024: {
                navigation: {
                  enabled: true,
                },
                pagination: {
                  enabled: false,
                },
                direction: "horizontal",
              },
            }}
            className={`categoryImageSwiper relative`}
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            {product?.image?.map((item, index) => {
              return (
                <SwiperSlide>
                  <Link href={`/${product?.slug}`} className="z-50">
                    <Image
                      src={convertHttpToHttps(
                        image?.id === product?.basic_data?.id_product
                          ? image?.image
                          : item,
                      )}
                      alt={product?.basic_data?.name}
                      sizes={
                        "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                      }
                      width={0}
                      height={0}
                      priority={true}
                      className={`h-full w-full overflow-hidden object-fill opacity-100 transition-all duration-200`}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            onClick={() => {
              addToCart(product?.basic_data?.id_product, 1, false),
                toast.success(
                  `Proizvod ${product?.basic_data?.name} je dodat u korpu`,
                  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastStyle: { zIndex: 9999 },
                  },
                );
            }}
            className="favorites absolute bottom-4 right-4 z-[100] cursor-pointer rounded-full bg-black px-4 pb-4 pt-3"
          >
            <Image
              src={cartimg}
              alt="cart"
              width={26}
              height={26}
              className={`max-w-[26px] invert`}
            />
          </button>
          {product?.price?.discount?.active && (
            <div
              className={`absolute left-2 top-2 z-[1] text-[13px] text-white`}
            >
              <div className={`rounded-full bg-black px-2 py-3`}>
                -
                {(
                  ((product?.price?.price?.original -
                    product?.price?.price?.discount) /
                    product?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </div>
            </div>
          )}
          {product?.stickers?.length > 0 && (
            <div
              className={`absolute right-2 top-2 z-[1] flex flex-col gap-2 text-center text-[13px] text-white`}
            >
              {product?.stickers?.map((sticker) => {
                return (
                  <div
                    className={`rounded-[20px] bg-[#a16d57] px-[0.85rem] py-2 text-[14px]`}
                  >
                    {sticker?.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="relative z-[50] mt-[0.813rem] px-3 pt-[12px]">
          <div className="mb-2 flex items-start justify-between">
            <Link
              href={`/${product?.slug}`}
              scroll={true}
              className="relative z-[5] flex"
            >
              <p className="clamp2 beforelineleft pl-2 text-left text-[20px] leading-[22px] max-md:leading-4 max-md:text-[0.85]">
                {product?.basic_data?.name}
              </p>
            </Link>
            <div
              onClick={() => {
                removeFromWishlist(items, product?.basic_data?.name);
              }}
              className="favorites -mt-3 p-1"
            >
              <i className="fa-solid fa-times cursor-pointer text-lg hover:text-red-500" />
            </div>
          </div>
          <p className="clamp3 pl-2 text-left text-[16px] font-extralight leading-[18px]">
            {product?.basic_data?.short_description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 max-md:items-start md:items-center">
          <div
            className={`ml-3 mr-2 mt-3 flex w-full gap-4 rounded-[30px] bg-[#fff3e6] py-1 pl-3 text-[24px] max-md:items-start max-md:items-center max-md:gap-0 max-md:gap-4 md:text-center`}
          >
            <ProductPrice
              price={product?.price}
              inventory={product?.inventory}
            />
            {product?.price?.discount?.active && (
              <span
                className={`text-[14px] line-through max-md:text-[#877372] md:mt-3`}
              >
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistItems;
