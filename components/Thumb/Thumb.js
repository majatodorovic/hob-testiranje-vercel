"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Wishlist from "../../assets/Icons/heart.png";
import WishlistActive from "../../assets/Icons/heart-active.png";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import { deleteMethod, get, list, post } from "@/app/api/api";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useCartContext } from "@/app/api/cartContext";
import cart from "@/assets/Icons/shopping-bag.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Thumb = ({
  data,
  slider,
  productsPerViewMobile,
  setWishlistId = () => {},
}) => {
  const [, , wishlist, mutateWishList] = useCartContext();
  const router = useRouter();

  const addToWishlist = async (id, name) => {
    await post("/wishlist", {
      id: null,
      id_product: id,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((response) => {
      mutateWishList();
      if (response?.code === 200) {
        toast.success(`Proizvod ${name} uspešno dodat u listu želja`, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.warn("Proizvod je već dodat u listu želja!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };
  const [allFromWishlist, setAllFromWishlist] = useState([]);
  useEffect(() => {
    const getAllFromWishlist = async () => {
      return await list(`/wishlist`).then((response) => {
        setAllFromWishlist(response?.payload?.items);
      });
    };
    getAllFromWishlist();
  }, [wishlist]);

  const [swiper, setSwiper] = useState(null);
  const [loading, setLoading] = useState({
    id: null,
    status: false,
  });
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const [productVariant, setProductVariant] = useState(null);
  const [selected, setSelected] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
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

  const products = (data ?? []).map((product, index) => {
    const variantOptionSize = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "velicina";
    });
    const variantOptionColor = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "boja";
    });

    const isInWishlist = (allFromWishlist ?? [])?.find((item) => {
      return item?.wishlist?.id_product === product?.basic_data?.id_product;
    });

    const wishlist_item = allFromWishlist?.filter(
      (item1) => item1?.product?.id === product?.basic_data?.id_product,
    );

    const wishlistId = wishlist_item?.[0]?.wishlist?.id;
    return (
      <SwiperSlide key={product?.basic_data?.id}>
        <div
          className="item md:ease relative block w-full rounded-2xl p-2 px-[6px] pt-2 lg:px-[16px]"
          onMouseEnter={() =>
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            })
          }
          onMouseLeave={() =>
            setNavigationEnabled({
              enabled: false,
              id: null,
            })
          }
        >
          {" "}
          <div className="item group relative w-full overflow-hidden rounded-[40px] max-md:h-[320px] max-md:rounded-[35px] max-md:p-1">
            <Swiper
              modules={[Navigation, Pagination]}
              // onSwiper={(swiper) => setSwiper(swiper)}
              pagination={true}
              // direction={"horizontal"}
              slidesPerView={1}
              loop={true}
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

                  // direction: "horizontal",
                },
              }}
              className={`categoryImageSwiper relative`}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {product?.image?.map((image, index) => (
                <SwiperSlide key={index} className={`!overflow-hidden`}>
                  {image && (
                    <Link href={`/${product?.link?.link_path}`}>
                      <Image
                        src={convertHttpToHttps(image)}
                        alt={product?.basic_data?.name}
                        width={0}
                        height={0}
                        sizes={"100vw"}
                        className={`z-[50] h-full w-full overflow-hidden rounded-[30px] object-cover opacity-100 group-hover:scale-105 md:transition-all md:duration-200`}
                      />
                    </Link>
                  )}
                  <div
                    onMouseEnter={() => {
                      setWishlistId(product?.basic_data?.id_product);
                    }}
                    onClick={async () => {
                      if (!isInWishlist) {
                        await post("/wishlist", {
                          id: null,
                          id_product: product?.basic_data?.id_product,
                          quantity: 1,
                          id_product_parent: null,
                          description: null,
                          status: null,
                        }).then((res) => {
                          if (res?.code === 200) {
                            toast.success("Uspešno dodato u želje.", {
                              autoClose: 2000,
                              position: "top-center",
                            });
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              ecommerce: null,
                            });
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
                                    item_category1:
                                      product?.categories?.[0]?.name,
                                    item_variant: null,
                                    quantity: 1,
                                  },
                                ],
                              },
                            });
                            mutateWishList();
                          }
                        });
                      } else {
                        setTimeout(async () => {
                          await deleteMethod(`/wishlist/${wishlistId}`).then(
                            (res) => {
                              if (res?.code === 200) {
                                toast.success("Uspešno uklonjeno iz želja.", {
                                  autoClose: 2000,
                                  position: "top-center",
                                });
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
                                        item_id:
                                          product?.basic_data?.id_product,
                                        price: product?.price?.price?.original,
                                        item_brand:
                                          product?.basic_data?.brand_name,
                                        item_category1:
                                          product?.categories?.[0]?.name,
                                        item_variant: null,
                                        quantity: 1,
                                      },
                                    ],
                                  },
                                });

                                mutateWishList();
                              } else {
                                toast.error("Došlo je do greške.", {
                                  autoClose: 2000,
                                  position: "top-center",
                                });
                              }
                            },
                          );
                        }, 500);
                      }
                    }}
                    className={`favorites absolute bottom-4 left-4 z-[55] cursor-pointer rounded-full p-1`}
                  >
                    {!isInWishlist ? (
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
                  <div
                    onClick={() => {
                      if (product?.product_type === "single") {
                        if (
                          product?.inventory?.inventory_defined &&
                          product?.price?.price_defined
                        ) {
                          addToCart(product?.basic_data?.id_product, 1, false);
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
                          window.dataLayer = window.dataLayer || [];
                          window.dataLayer.push({
                            ecommerce: null,
                          });
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
                                  item_category1:
                                    product?.categories?.[0]?.name,
                                  item_variant: product?.basic_data?.name,
                                  quantity: 1,
                                },
                              ],
                            },
                          });
                        } else {
                          router.push(`/${product?.link?.link_path}`);
                        }
                      } else {
                        router.push(`/${product?.link?.link_path}`);
                      }
                    }}
                    className="absolute bottom-4 right-4 z-[100] cursor-pointer rounded-full bg-[#9f7361] px-[1rem] pb-4 pt-3 md:px-4"
                  >
                    <Image
                      src={cart}
                      alt="cart"
                      width={26}
                      height={26}
                      priority
                      className={`z-[100] w-[26px] max-w-[26px] invert`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {product?.price?.discount?.active && (
              <div
                className={`absolute left-3 top-2 z-[1] text-[13px] text-white`}
              >
                <div className={`rounded-full bg-[#9f7361] px-2 py-3`}>
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
                      className={`rounded-l-[30px] rounded-br-[26px] rounded-tr-[48px] bg-[#a16d57] py-3 pl-3 pr-4 text-left text-[14px] font-thin`}
                    >
                      {sticker?.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative z-[50] mt-[0.813rem] px-3 pt-[12px]">
            <Link
              href={`/${product?.slug_path}`}
              scroll={true}
              className="relative z-[5] flex"
            >
              <p className="mb-2 line-clamp-2 pl-2 text-left text-[20px] leading-[22px] max-md:leading-[20px] max-md:text-[0.85]">
                {product?.basic_data?.name}
              </p>
            </Link>
            {/* <p className="text-left text-[16px] font-extralight pl-2 leading-[18px] clamp3">{product?.basic_data?.short_description}</p> */}
          </div>
          <div className="flex flex-wrap gap-1 max-md:items-start md:items-center">
            <div
              className={`ml-3 mr-2 mt-3 flex w-full gap-4 rounded-[30px] bg-[#fff3e6] py-1 pl-3 text-[24px] max-md:flex-col max-md:items-start max-md:gap-0 md:text-center`}
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
          <div className={`w-full`}>
            <div
              className={`color mt-2 flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem]`}
            >
              {loading?.status &&
              loading?.id === product?.basic_data?.id_product ? (
                <i
                  className={`fa fa-solid fa-spinner animate-spin text-xl`}
                ></i>
              ) : (
                <>
                  {variantOptionColor?.values?.map((item3) => {
                    const variantAttributeKey =
                      variantOptionColor?.attribute?.key;
                    const isSelected = selected.find(
                      (item) =>
                        item?.attribute_key === variantAttributeKey &&
                        item?.value_key === item3?.key,
                    );

                    return (
                      <div
                        key={item3?.key}
                        className={`max-sm:scale-[0.8] ${
                          isSelected ? `border border-[#242424]` : ``
                        } relative flex h-[9px] w-[9px] cursor-pointer items-center justify-center rounded-full border text-center text-xs transition-all duration-500 hover:border-[#242424] md:h-[15px] md:w-[15px]`}
                        onClick={() => {
                          setSelected((prevSelected) => {
                            // Remove previous selections with the same variantAttributeKey
                            const filteredSelections = prevSelected.filter(
                              (selection) =>
                                selection.attribute_key !== variantAttributeKey,
                            );
                            return [
                              ...filteredSelections,
                              {
                                attribute_key: variantAttributeKey,
                                value_key: item3?.key,
                              },
                            ];
                          });
                          setIdProduct(product?.basic_data?.id_product);
                        }}
                      >
                        {item3?.image && (
                          <Image
                            src={item3?.image}
                            alt=""
                            className="rounded-full"
                            fill
                            sizes={
                              "(max-width: 639px) 15px, (max-width: 767px) 15px, (max-width: 1023px) 15px, (max-width: 1279px) 15px, 15px"
                            }
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {variantOptionColor?.values?.length > 1 && (
              <div className={`hoveredColor1 mt-1 text-left text-[0.75rem]`}>
                + {variantOptionColor?.values?.length - 1}{" "}
                {variantOptionColor?.values?.length - 1 === 1
                  ? "boja"
                  : variantOptionColor?.values?.length - 1 >= 2 &&
                      variantOptionColor?.values?.length - 1 <= 4
                    ? "boje"
                    : "boja"}
              </div>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const addToCart = useGlobalAddToCart();
  if (slider) {
    return (
      <>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="mySwiper3 w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  } else {
    const [productVariant, setProductVariant] = useState(null);
    const addToCart = useGlobalAddToCart();
    const [initialSlide, setInitialSlide] = useState(0);
    const [image, setImage] = useState({
      image: null,
      id: null,
    });

    useEffect(() => {
      if (image) {
        const imagesArray = data?.map((item) => {
          return item?.image;
        });
      }
    }, [image]);

    const products = data?.map((product, index) => {
      const variantOptionSize = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "velicina";
      });
      const variantOptionColor = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "boja";
      });

      const isInWishlist = (allFromWishlist ?? [])?.find((item) => {
        return item?.wishlist?.id_product === product?.basic_data?.id_product;
      });

      return (
        <div
          className="item hoveredColor md:ease relative col-span-1 rounded-2xl px-2 py-2 md:transition-all md:hover:bg-black/20 2xl:px-4"
          onMouseEnter={() => {
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            });
          }}
        >
          <div
            className={`max-md:h-[290px] ${
              productsPerViewMobile === 1 && "h-[460px]"
            } item relative !h-[330px] w-full overflow-hidden rounded-[40px]`}
          >
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
                        className={`h-full w-full overflow-hidden rounded-[40px] object-fill opacity-100 transition-all duration-200`}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div
              onClick={() => {
                addToWishlist(
                  product?.basic_data?.id_product,
                  product?.basic_data?.name,
                );
              }}
              className={`favorites absolute bottom-4 left-4 z-[3] cursor-pointer rounded-full p-1`}
            >
              {!isInWishlist ? (
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
                if (product?.product_type === "single") {
                  if (
                    product?.inventory?.inventory_defined &&
                    product?.price?.price_defined
                  ) {
                    addToCart(product?.basic_data?.id_product, 1, false);
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
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      ecommerce: null,
                    });
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
                  } else {
                    router.push(`/${product?.slug_path}`);
                  }
                } else {
                  router.push(`/${product?.slug_path}`);
                }
              }}
              className="favorites absolute bottom-4 right-4 z-[100] cursor-pointer rounded-full bg-black px-4 pb-4 pt-3"
            >
              <Image
                src={cart}
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

          <div className="relative z-[50] mt-[0.813rem] flex flex-col pl-2">
            <Link
              href={`/${product?.slug_path}`}
              className="clamp2 beforelineleft mb-2 text-left text-[22px] leading-[22px] max-md:text-[18px] max-md:leading-[22px] max-md:text-[0.85]"
            >
              {product?.basic_data?.name}
            </Link>

            <p className="clamp3 text-left text-[14px] font-extralight leading-[18px] max-md:hidden md:text-[16px]">
              {product?.basic_data?.short_description}
            </p>
            <div className="md:hidden">
              {product?.basic_data?.short_description ? (
                <p className="clamp3 text-left text-[14px] font-extralight leading-[22px] max-md:hidden md:text-[16px]">
                  {product?.basic_data?.short_description}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <div
              className={`mt-3 flex w-full gap-4 rounded-[30px] bg-[#fff3e6] py-1 pl-3 text-center text-[20px] max-md:flex-col max-md:items-start max-md:gap-0 max-md:pr-2 max-md:text-left md:ml-3 md:mr-2 md:text-[24px]`}
            >
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
              {product?.price?.discount?.active && (
                <span
                  className={`text-[14px] text-[#897375] line-through md:mt-3`}
                >
                  {currencyFormat(product?.price?.price?.original)}
                </span>
              )}
            </div>
          </div>
          <div className={`absolute bottom-[-20px] w-full`}>
            <div
              className={`color mt-2 flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem]`}
            >
              {loading?.status &&
              loading?.id === product?.basic_data?.id_product ? (
                <i
                  className={`fa fa-solid fa-spinner animate-spin text-xl`}
                ></i>
              ) : (
                <>
                  {variantOptionColor?.values?.map((item3) => {
                    const variantAttributeKey =
                      variantOptionColor?.attribute?.key;
                    const isSelected = selected.find(
                      (item) =>
                        item?.attribute_key === variantAttributeKey &&
                        item?.value_key === item3?.key,
                    );

                    return (
                      <div
                        key={item3?.key}
                        className={`max-sm:scale-[0.8] ${
                          isSelected ? `border border-[#242424] p-[0.5px]` : ``
                        } relative flex h-[9px] w-[9px] cursor-pointer items-center justify-center rounded-full border text-center text-xs transition-all duration-500 hover:border-[#242424] md:h-[15px] md:w-[15px]`}
                        onClick={() => {
                          setSelected((prevSelected) => {
                            // Remove previous selections with the same variantAttributeKey
                            const filteredSelections = prevSelected.filter(
                              (selection) =>
                                selection.attribute_key !== variantAttributeKey,
                            );
                            return [
                              ...filteredSelections,
                              {
                                attribute_key: variantAttributeKey,
                                value_key: item3?.key,
                              },
                            ];
                          });
                          setIdProduct(product?.basic_data?.id_product);
                        }}
                      >
                        {item3?.image && (
                          <Image
                            src={item3?.image}
                            alt=""
                            className="rounded-full"
                            fill
                            sizes={
                              "(max-width: 639px) 15px, (max-width: 767px) 15px, (max-width: 1023px) 15px, (max-width: 1279px) 15px, 15px"
                            }
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {variantOptionColor?.values?.length > 1 && (
              <div className={`hoveredColor1 mt-1 text-left text-[0.75rem]`}>
                + {variantOptionColor?.values?.length - 1}{" "}
                {variantOptionColor?.values?.length - 1 === 1
                  ? "boja"
                  : variantOptionColor?.values?.length - 1 >= 2 &&
                      variantOptionColor?.values?.length - 1 <= 4
                    ? "boje"
                    : "boja"}
              </div>
            )}
          </div>
        </div>
      );
    });
    return <>{products}</>;
  }
};

export default Thumb;
