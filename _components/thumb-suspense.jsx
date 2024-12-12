import { useEffect, useState } from "react";
import { useGlobalAddToCart } from "@/app/api/globals";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Wishlist from "@/assets/Icons/heart.png";
import WishlistActive from "@/assets/Icons/heart-active.png";
import { toast } from "react-toastify";
import cart from "@/assets/Icons/shopping-bag.png";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { currencyFormat } from "@/helpers/functions";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/hooks/hob.hooks";
import { useRouter } from "next/navigation";

export const ThumbSuspense = ({
  id,
  categoryId,
  productsPerViewMobile = 1,
  refetchWishlist = () => { },
}) => {
  const { data: product } = useProductThumb({
    slug: id,
    id: id,
    categoryId: categoryId,
  });
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const { data: isInWishlist, refetch } = useIsInWishlist({ id: id });
  const { mutate: addToWishlist, isSuccess: isAddedToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemovedFromWishlist } =
    useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();
  const [swiper, setSwiper] = useState();
  const [idProduct, setIdProduct] = useState(null);
  const [loading, setLoading] = useState({
    status: false,
    id: null,
  });

  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
  });

  useEffect(() => {
    refetch();
    refetchWishlist();
  }, [isAddedToWishlist, isRemovedFromWishlist]);

  const handleDiscountPercentage = () => {
    let product_type = product?.product_type;
    let res;

    const formatDiscount = (item) => {
      let discount = item?.calc?.calc_name;

      if (typeof discount === "string") {
        discount = parseFloat(discount);
        if (!isNaN(discount)) {
          discount = discount.toFixed(0) + "%";
        }
      }
      return discount;
    };
    if (product_type === "variant") {
      res = product?.price?.max?.discount?.campaigns?.map(formatDiscount);
    } else {
      res = product?.price?.discount?.campaigns?.map(formatDiscount);
    }
    return res;
  };
  const discounts = handleDiscountPercentage();
  const hasDiscounts = Array.isArray(discounts)
    ? discounts.length > 0
    : Boolean(discounts);

  return (
    <div
      className="item hoveredColor md:ease group relative col-span-1 flex h-full flex-col rounded-2xl py-2 md:transition-all 2xl:px-4"
      onMouseEnter={() => {
        setNavigationEnabled({
          enabled: true,
          id: product?.basic_data?.id_product,
        });
      }}
      onMouseLeave={() => {
        setNavigationEnabled({
          enabled: false,
          id: product?.basic_data?.id_product,
        });
      }}
    >
      <div className={`item relative w-full overflow-hidden rounded-[40px]`}>
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
          {(product?.image ?? [])?.map((item, index) => {
            return (
              <SwiperSlide className={`overflow-hidden`}>
                <Link href={`/${product?.link?.link_path}`}>
                  <Image
                    loading={`eager`}
                    fetchPriority={`high`}
                    priority={true}
                    src={convertHttpToHttps(item)}
                    alt={product?.basic_data?.name}
                    sizes="100vw"
                    width={0}
                    height={0}
                    className={`!h-auto !w-full rounded-[40px] opacity-100 transition-all duration-200 group-hover:scale-105`}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          onClick={() => {
            if (isInWishlist?.exist) {
              removeFromWishlist({ id: isInWishlist?.wishlist_item_id });
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                ecommerce: null,
              });
              window?.dataLayer?.push({
                event: "remove_from_wishlist",
                ecommerce: {
                  currency: "RSD",
                  value: product?.price?.discount?.active
                    ? product?.price?.price?.discount
                    : product?.price?.price?.original,
                  items: [
                    {
                      item_name: product?.basic_data?.name,
                      item_id: product?.basic_data?.id_product,
                      price: product?.price?.price?.original,
                      item_brand: product?.basic_data?.brand_name,
                      item_category1: product?.categories?.[0]?.name,
                      item_variant: null,
                      quantity: 1,
                    },
                  ],
                },
              });
            } else {
              addToWishlist({ id: product?.basic_data?.id_product });
              window?.dataLayer?.push({
                event: "add_to_wishlist",
                ecommerce: {
                  currency: "RSD",
                  value: product?.price?.discount?.active
                    ? product?.price?.price?.discount
                    : product?.price?.price?.original,
                  items: [
                    {
                      item_name: product?.basic_data?.name,
                      item_id: product?.basic_data?.id_product,
                      item_price: product?.price?.price?.original,
                      item_brand: product?.basic_data?.brand_name,
                      item_category1: product?.categories?.[0]?.name,
                      item_variant: null,
                      quantity: 1,
                    },
                  ],
                },
              });
            }
          }}
          className={`favorites absolute bottom-7 left-4 z-[3] cursor-pointer rounded-full p-1`}
        >
          {!isInWishlist?.exist ? (
            <>
              <Image
                src={Wishlist}
                alt="wishlist"
                width={30}
                height={30}
                className={`favorite`}
              />
              <Image
                src={WishlistActive}
                alt="wishlist"
                width={30}
                height={30}
                className={`activeWishlist !hidden`}
              />
            </>
          ) : (
            <>
              <Image
                src={WishlistActive}
                alt="wishlist"
                width={30}
                height={30}
                className={``}
              />
            </>
          )}
        </div>
        <button
          onClick={() => {
            if (
              product?.product_type === "variant" ||
              !product?.inventory?.inventory_defined ||
              !product?.price?.price_defined
            ) {
              router.push(`/${product?.link?.link_path}`);
            } else {
              addToCart({ id: product?.basic_data?.id_product, quantity: 1 });
              window?.dataLayer?.push({
                event: "add_to_cart",
                ecommerce: {
                  currency: "RSD",
                  value: product?.price?.discount?.active
                    ? product?.price?.price?.discount
                    : product?.price?.price?.original,
                  items: [
                    {
                      item_name: product?.basic_data?.name,
                      item_id: product?.basic_data?.id_product,
                      price: product?.price?.discount?.active
                        ? product?.price?.price?.discount
                        : product?.price?.price?.original,
                      item_brand: product?.basic_data?.brand_name,
                      item_category1: product?.categories?.[0]?.name,
                      item_variant: product?.basic_data?.name,
                      quantity: 1,
                    },
                  ],
                },
              });
            }
          }}
          className="favorites absolute bottom-7 right-1 z-[5] cursor-pointer rounded-full bg-[#9f7361] px-4 pb-4 pt-3"
        >
          <Image
            src={cart}
            alt="cart"
            width={26}
            height={26}
            className={`max-w-[26px] invert`}
          />
        </button>
        {hasDiscounts ? (
          <div className={`absolute left-2 top-2 z-[1] text-[13px] text-white`}>
            <div className={`rounded-full bg-[#9f7361] px-2 py-3`}>
              {Array.isArray(discounts) ? discounts[0] : discounts}
            </div>
          </div>
        ) : null}
        {product?.stickers?.length > 0 && (
          <div
            className={`absolute right-2 top-2 z-[1] flex flex-col gap-2 text-center text-[13px] text-white`}
          >
            {(product?.stickers ?? [])?.map((sticker) => {
              return (
                <div
                  className={`rounded-[20px] bg-[#9f7361] px-[0.85rem] py-2 text-[14px]`}
                >
                  {sticker?.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative mt-[0.813rem] flex flex-col pl-2">
        <Link
          href={`/${product?.link?.link_path}`}
          className="mb-2 line-clamp-2 text-left leading-[22px] max-2xl:text-[18px] max-md:leading-[22px] 2xl:text-[22px]"
        >
          {product?.basic_data?.name}
        </Link>
        {product?.basic_data?.short_description && (
          <p className="clamp3 text-left text-[14px] font-extralight leading-[18px] max-md:hidden md:text-[16px]">
            {product?.basic_data?.short_description}
          </p>
        )}

        <div className="md:hidden">
          {product?.basic_data?.short_description ? (
            <p className="clamp3 text-left text-[14px] font-extralight leading-[22px] max-md:hidden md:text-[16px]">
              {product?.basic_data?.short_description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="relative z-[2] mt-auto flex flex-wrap items-center gap-1 pt-3">
        <div
          className={`flex w-full flex-wrap gap-2 rounded-[30px] bg-[#fff3e6] py-1 pl-3 text-center text-[20px] max-md:flex-col max-md:items-start max-md:gap-0 max-md:pr-2 max-md:text-left md:ml-3 md:mr-2 md:items-center md:text-[24px]`}
        >
          {product?.inventory?.inventory_defined &&
            (product?.price?.price_defined ||
              product?.price?.min?.price_defined) ? (
            <>
              <RenderPrice
                price={product?.price}
                inventory={product?.inventory}
              />
              {(product?.price?.discount?.active ||
                product?.price?.min?.discount?.active) && (
                  <span className={`text-[14px] text-[#897375] line-through`}>
                    {product?.price?.discount?.active
                      ? currencyFormat(product?.price?.price?.original)
                      : product?.price?.min?.price?.original ===
                        product?.price?.max?.price?.original
                        ? currencyFormat(product?.price?.min?.price?.original)
                        : `${currencyFormat(
                          product?.price?.min?.price?.original,
                        )} - ${currencyFormat(
                          product?.price?.max?.price?.original,
                        )}`}
                  </span>
                )}
            </>
          ) : (
            <div
              className={`flex w-full flex-wrap gap-2 rounded-[30px] bg-[#fff3e6] py-1 pl-1 text-center text-[16px] max-md:flex-col max-md:items-start max-md:gap-0 max-md:pr-2 max-md:text-left md:ml-3 md:mr-2`}
            >
              Cena na upit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const RenderPrice = ({ price, className }) => {
  const isRange =
    price?.max?.price?.original > 0 && price?.min?.price?.original > 0;
  const hasDiscount = price?.min?.discount?.active || price?.discount?.active;

  const renderPriceWithDiscount = () => {
    const minDiscount = currencyFormat(price?.min?.price?.discount);
    const maxDiscount = currencyFormat(price?.max?.price?.discount);

    if (isRange && minDiscount === maxDiscount) {
      return (
        <div className="group relative inline-block">
          <span className="invisible absolute -top-8 left-[15%] rounded bg-[#a16d57] p-[6px] text-[10px] font-normal text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
            Cena sa popustom
            <svg
              className="absolute left-[45%] z-50 h-6 w-6 -translate-x-1/2 -translate-y-[2px] transform fill-current stroke-current text-[#a16d57]"
              width="8"
              height="8"
            >
              <rect
                x="12"
                y="-10"
                width="8"
                height="8"
                transform="rotate(45)"
              />
            </svg>
          </span>
          <div className={`${className} text-[1.2rem]`}>{minDiscount}</div>
        </div>
      );
    } else {
      return (
        <div className="group relative inline-block">
          <span className="invisible absolute -top-8 left-[15%] rounded bg-[#a16d57] p-[6px] text-[10px] font-normal text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
            Cena sa popustom
            <svg
              className="absolute left-[45%] z-50 h-6 w-6 -translate-x-1/2 -translate-y-[2px] transform fill-current stroke-current text-[#a16d57]"
              width="8"
              height="8"
            >
              <rect
                x="12"
                y="-10"
                width="8"
                height="8"
                transform="rotate(45)"
              />
            </svg>
          </span>
          <div className={`${className} ${isRange ? "text-[1.2rem]" : ""}`}>
            {isRange
              ? `${minDiscount} - ${maxDiscount}`
              : currencyFormat(price?.price?.discount)}
          </div>
        </div>
      );
    }
  };

  const renderPriceWithoutDiscount = () => {
    const minPrice = currencyFormat(price?.min?.price?.original);
    const maxPrice = currencyFormat(price?.max?.price?.original);

    if (isRange && minPrice === maxPrice) {
      return <span className={`text-[1.2rem]`}>{minPrice}</span>;
    } else {
      return (
        <span className={`text-[1.2rem]`}>
          {isRange
            ? `${minPrice} - ${maxPrice}`
            : currencyFormat(price?.price?.original)}
        </span>
      );
    }
  };

  return (
    <>
      {hasDiscount ? renderPriceWithDiscount() : renderPriceWithoutDiscount()}
    </>
  );
};
