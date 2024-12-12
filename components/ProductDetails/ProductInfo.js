"use client";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalAddToCart } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "../../assets/Icons/heart.png";
import WishlistActive from "../../assets/Icons/heart-active.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import CampaignsDetails from "./CampaignsDetails";
import DeliveryModal from "./DeliveryModal";
import InfoModal from "./InfoModal";
import ReturnModal from "./ReturnModal";
import "react-toastify/dist/ReactToastify.css";
import { get, post } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";
import element from "@/assets/shapes/shape-little-meat.png";
import check from "@/assets/Icons/check.png";
import outofstock from "@/assets/Icons/outofstock.png";
import PlusMinusInputTwo from "../PlusMinusInputTwo";
import returnicon from "@/assets/Icons/return.png";
import info from "@/assets/Icons/info.png";
import delivery from "@/assets/Icons/delivery.png";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";
import UpsellProducts from "../UpsellProducts/UpsellProducts";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { toast } from "react-toastify";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/hob.hooks";

const ProductInfo = ({
  product,
  desc,
  path,
  isNewURL,
  setIsNewURL,
  setVariantKey,
  variantKey,
  setColor,
  breadcrumbs,
  specification,
  declaration,
  color,
  loading,
  relatedProducts,
  crosssellProducts,
  upsellProducts,
}) => {
  const [productVariant, setProductVariant] = useState(null);
  const [count, setCount] = useState(1);

  const campaignsDate =
    product?.data?.item?.price?.discount?.campaigns[0]?.duration ??
    product?.data?.item?.price?.max?.discount?.campaigns[0]?.duration;

  const router = useRouter();
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const [newURL, setNewURL] = useState(null);
  useEffect(() => {
    if (newURL) {
      window?.history?.replaceState(null, null, newURL);
    }
  }, [newURL]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };
  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (selectedColor !== null) {
      setColor(selectedColor);
    }
  }, [selectedColor]);
  const [, , , mutateWishList] = useCartContext();

  const [productAmount, setProductAmount] = useState(1);

  const [setVariant, setVariantOnOff] = useState(true);

  const { data: isInWishlist, refetch } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });
  const { mutate: addToWishlist, isSuccess: isAddedToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemovedFromWishlist } =
    useRemoveFromWishlist();

  const { mutate: addToCart } = useAddToCart();

  useEffect(() => {
    refetch();
  }, [isAddedToWishlist, isRemovedFromWishlist]);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ecommerce: null,
    });
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "RSD",
        items: [
          {
            item_name: product?.data?.item?.basic_data?.name,
            item_id: product?.data?.item?.basic_data?.id_product,
            item_brand: product?.data?.item?.basic_data?.brand_name,
            item_category1: product?.data?.item?.categories?.[0]?.name,
            item_variant: productVariant?.basic_data?.name,
            price: productVariant?.price?.discount?.active
              ? productVariant?.price?.price?.discount
              : productVariant?.price?.price?.original,
            quantity: productAmount,
          },
        ],
      },
    });
  }, []);

  const handleAddToCart = (e) => {
    switch (true) {
      case product?.product_type === "single":
        switch (true) {
          case product?.data?.item?.inventory?.inventory_defined:
            addToCart({
              id: product?.data?.item?.basic_data?.id_product,
              quantity: productAmount,
            });
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              ecommerce: null,
            });
            window?.dataLayer?.push({
              event: "add_to_cart",
              ecommerce: {
                currency: "RSD",
                value: product?.data?.item?.price?.discount?.active
                  ? product?.data?.item?.price?.price?.discount
                  : product?.data?.item?.price?.price?.original,
                items: [
                  {
                    item_name: product?.data?.item?.basic_data?.name,
                    item_id: product?.data?.item?.basic_data?.id_product,
                    price: product?.data?.item?.price?.discount?.active
                      ? product?.data?.item?.price?.price?.discount
                      : product?.data?.item?.price?.price?.original,
                    item_brand: product?.data?.item?.basic_data?.brand_name,
                    item_category1: product?.data?.item?.categories?.[0]?.name,
                    item_variant: productVariant?.basic_data?.name,
                    quantity: productAmount,
                  },
                ],
              },
            });

            break;
          case !product?.data?.item?.inventory?.inventory_defined:
            toast.error(`Proizvod nije na stanju!`, {
              position: "top-center",
            });
        }
        break;
      case product?.product_type === "variant":
        switch (true) {
          case !productVariant?.id:
            toast.error(`Izaberite varijaciju!`, {
              position: "top-center",
            });
            break;
          case productVariant?.id &&
            productVariant?.inventory?.inventory_defined:
            addToCart({
              id: productVariant?.basic_data?.id_product,
              quantity: productAmount,
            });

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              ecommerce: null,
            });
            window?.dataLayer?.push({
              event: "add_to_cart",
              ecommerce: {
                currency: "RSD",
                value: productVariant?.price?.discount?.active
                  ? productVariant?.price?.price?.discount
                  : productVariant?.price?.price?.original,
                items: [
                  {
                    item_name: productVariant?.basic_data?.name,
                    item_id: productVariant?.basic_data?.id_product,
                    price: productVariant?.price?.discount?.active
                      ? productVariant?.price?.price?.discount
                      : productVariant?.price?.price?.original,
                    item_brand: productVariant?.basic_data?.brand_name,
                    item_category1: productVariant?.categories[0]?.name,
                    item_variant: productVariant?.basic_data?.name,
                    quantity: productAmount,
                  },
                ],
              },
            });

            break;
          case productVariant?.id &&
            !productVariant?.inventory?.inventory_defined:
            toast.error(`Proizvod nije na stanju!`, {
              position: "top-center",
            });
        }
        break;
      default:
        setCount(1);
        break;
    }
  };

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (deliveryModal || infoModal || returnModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleBodyScroll();
  }, [deliveryModal, infoModal, returnModal]);

  const [text, setText] = useState("");
  const [text2, setText2] = useState("Kupi odmah");
  useEffect(() => {
    if (
      product?.data?.item?.price?.max?.price?.original ||
      (product?.data?.item?.price?.price_defined &&
        product?.data?.item?.inventory?.inventory_defined) ||
      (productVariant?.data?.item?.price?.max?.price?.original &&
        productVariant?.data?.item?.inventory?.inventory_defined)
    ) {
      setText("Dodajte u korpu");
    } else if (
      !product?.data?.item?.price?.price_defined ||
      !product?.data?.item?.inventory?.inventory_defined ||
      !productVariant?.data?.item?.price?.price_defined ||
      !productVariant?.data?.item?.inventory?.inventory_defined
    ) {
      setText("Pošaljite upit");
    }
  }, [product, productVariant]);

  const handleTextChangeAddToCart = () => {
    switch (true) {
      case product?.product_type === "variant" && !productVariant?.id && !color:
        setText("Izaberite boju");
        break;
      case product?.product_type === "variant" &&
        !productVariant?.id &&
        color !== "":
        setText("Izaberite veličinu");
        break;
      case product?.product_type === "variant" && productVariant?.id:
        setText("Dodajte u korpu");
        break;
    }
  };
  const handleTextChangeBuyNow = () => {
    switch (true) {
      case product?.product_type === "variant" && !productVariant?.id && !color:
        setText2("Izaberite boju");
        break;
      case product?.product_type === "variant" && !productVariant?.id && color:
        setText2("Izaberite veličinu");
        break;
      case product?.product_type === "variant" && productVariant?.id:
        setText2("Dodajte u korpu");
    }
  };
  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodajte u korpu");
      setText2("Kupi odmah");
    }
  }, [productVariant]);

  const [openModal, setOpenModal] = useState(false);

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if ((text2 === "Izaberite boju" || text === "Izaberite boju") && color) {
      setText("Izaberite veličinu");
      setText2("Izaberite veličinu");
    }
  }, [color]);

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
      res =
        product?.data?.item?.price?.max?.discount?.campaigns?.map(
          formatDiscount,
        );
    } else {
      res =
        product?.data?.item?.price?.discount?.campaigns?.map(formatDiscount);
    }

    return res;
  };
  console.log(product);
  return (
    <>
      {product ? (
        <>
          <div className="mt-[2rem] px-2 max-lg:col-span-4 md:pl-[3rem] lg:col-span-2">
            <div className="relative">
              <div className="flex flex-col justify-between max-md:gap-2 md:flex-row xl:w-[90%]">
                <div className="relative z-[4] flex w-fit flex-wrap items-center gap-2 gap-[10px] rounded-[24px] bg-black bg-opacity-[0.2] py-2 pl-6 pr-[4.4rem] md:py-4">
                  <div className="flex flex-wrap items-center gap-2 text-white">
                    <Link
                      href={`/`}
                      className="text-[0.95rem] font-thin text-white"
                    >
                      Početna
                    </Link>{" "}
                    <>/</>
                    {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
                      return (
                        <div className="flex items-center gap-2">
                          <Link
                            href={
                              index === arr.length - 1
                                ? `/${breadcrumb?.link?.link_path}`
                                : `/${breadcrumb?.link?.link_path}`
                            }
                            className="text-[0.95rem] font-thin text-white"
                          >
                            {breadcrumb?.name}
                          </Link>
                          {index !== arr.length - 1 && <>/</>}
                        </div>
                      );
                    })}
                    <p className="text-[0.95rem] font-normal text-white">
                      {breadcrumbs?.end?.name}
                    </p>
                  </div>

                  <p className="hidden text-[0.75rem] font-normal text-[#191919]">
                    {breadcrumbs?.end?.name}
                  </p>
                </div>
                {(product?.data?.item?.price?.discount?.active ||
                  product?.data?.item?.price?.min?.discount?.active) && (
                  <div className={`z-[1] text-[13px] text-white`}>
                    <div
                      className={`w-fit rounded-full bg-black px-[0.85rem] py-4`}
                    >
                      {handleDiscountPercentage()}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative mt-[2rem] flex flex-col md:pl-[2rem]">
                <h1 className="group relative z-[3] text-[44px] font-extralight uppercase max-md:text-[1.1rem]">
                  {product?.data?.item?.basic_data?.name}
                </h1>
                <Image
                  src={element}
                  width={150}
                  height={160}
                  alt="HOB"
                  className="absolute -left-[3.4rem] top-[1.6rem] z-[1]"
                />
                <p className="relative z-[3] mt-[6px] font-light">
                  Šifra:&nbsp;
                  {productVariant?.id
                    ? productVariant?.basic_data?.sku
                    : product?.data?.item?.basic_data?.sku}
                </p>

                {productVariant?.id ? (
                  <>
                    {!productVariant?.inventory?.inventory_defined ? (
                      <>
                        <p
                          className={`mt-5 w-fit text-sm font-bold text-[#e10000]`}
                        >
                          <div className="relative z-[3] mt-4 flex items-center gap-2">
                            <Image
                              src={outofstock}
                              width={24}
                              height={24}
                              alt="HOB"
                            />
                            <p className="text-[18px] font-extralight">
                              Nedostupno
                            </p>
                          </div>
                        </p>
                      </>
                    ) : (
                      <div className="relative z-[3] mt-4 flex items-center gap-2">
                        <Image src={check} width={24} height={24} alt="HOB" />
                        <p className="text-[18px] font-extralight">Dostupno</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {!product?.data?.item?.inventory?.inventory_defined ? (
                      <>
                        <p
                          className={`mt-5 w-fit text-sm font-bold text-[#e10000]`}
                        >
                          <div className="relative z-[3] mt-4 flex items-center gap-2">
                            <Image
                              src={outofstock}
                              width={24}
                              height={24}
                              alt="HOB"
                            />
                            <p className="text-[18px] font-extralight">
                              Nedostupno
                            </p>
                          </div>
                        </p>
                      </>
                    ) : (
                      <div className="relative z-[3] mt-4 flex items-center gap-2">
                        <Image src={check} width={24} height={24} alt="HOB" />
                        <p className="text-[18px] font-extralight">Dostupno</p>
                      </div>
                    )}
                  </>
                )}
                <div
                  className={`mt-[1.4rem] flex items-center gap-3 text-[28px]`}
                >
                  <RenderPrice
                    price={
                      productVariant?.id
                        ? productVariant?.price
                        : product?.data?.item?.price
                    }
                    inventory={
                      productVariant?.id
                        ? productVariant?.inventory
                        : product?.data?.item?.inventory
                    }
                    className={
                      product?.data?.item?.price?.discount?.active
                        ? `py-0.5 text-[32px] font-light`
                        : `py-0.5 text-[32px] font-light`
                    }
                  />
                  {(product?.data?.item?.price?.discount?.active ||
                    product?.data?.item?.price?.min?.discount?.active) && (
                    <div className="group relative inline-block">
                      <span className="invisible absolute -top-8 left-0 rounded bg-[#a16d57] p-[6px] text-[10px] font-normal text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                        Važeća MP cena
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

                      <span
                        className={`text-[14px] text-[#897375] line-through`}
                      >
                        {product?.data?.item?.price?.discount?.active
                          ? currencyFormat(
                              product?.data?.item?.price?.price?.original,
                            )
                          : product?.data?.item?.price?.min?.price?.original ===
                              product?.data?.item?.price?.max?.price?.original
                            ? currencyFormat(
                                product?.data?.item?.price?.min?.price
                                  ?.original,
                              )
                            : `${currencyFormat(
                                product?.data?.item?.price?.min?.price
                                  ?.original,
                              )} - ${currencyFormat(
                                product?.data?.item?.price?.max?.price
                                  ?.original,
                              )}`}
                      </span>
                    </div>
                  )}
                </div>
                {(product?.data?.item?.price?.discount?.active ||
                  product?.data?.item?.price?.min?.discount?.active) && (
                  <div className="mt-3">
                    <h2 className="text-[16px] text-[#8e7c7a]">
                      Ušteda:{" "}
                      {product?.data?.item?.price?.discount?.active
                        ? currencyFormat(
                            product?.data?.item?.price?.discount?.amount,
                          )
                        : currencyFormat(
                            product?.data?.item?.price?.max?.discount?.amount,
                          )}
                    </h2>
                  </div>
                )}
                {product?.data?.item?.inventory?.amount >= 2 &&
                  product?.data?.item?.inventory?.amount <= 4 && (
                    <>
                      <p
                        className={`mt-5 w-fit text-sm font-bold text-[#e10000]`}
                      >
                        Male količine
                      </p>
                    </>
                  )}
                {(product?.data?.item?.price?.discount?.campaigns?.length > 0 ||
                  product?.data?.item?.price?.max?.discount?.campaigns?.length >
                    0) && <CampaignsDetails campaignsDate={campaignsDate} />}
              </div>
              {product?.product_type === "variant" && (
                <div className="py-[2rem] max-md:py-[1.5rem] md:pl-[2rem]">
                  <Variants
                    firstVariantOption={true}
                    product={product}
                    productSlug={path?.[path?.length - 1]}
                    handleURLChange={handleURLChange}
                    updateProductVariant={updateProductVariant}
                    setSelectedColor={setSelectedColor}
                    productVariant={productVariant}
                    setVariant={false}
                    setVariantOnOff={setVariantOnOff}
                    slug={path?.[path?.length - 1]}
                  />
                </div>
              )}
              <p
                className={`max-w-[90%] pl-[2rem] text-[20px] font-extralight leading-[23px] max-md:mt-[1.5rem]`}
              >
                {product?.data?.item?.basic_data?.short_description}
              </p>

              <div className="mt-[3rem] flex items-center max-md:justify-between md:ml-[2rem] md:gap-[2rem]">
                <PlusMinusInputTwo
                  setCount={setProductAmount}
                  amount={productAmount}
                  max={
                    productVariant?.id
                      ? +productVariant?.inventory?.amount
                      : +product?.data?.item?.inventory?.amount
                  }
                />
                <button
                  className={
                    productVariant === null || productVariant.length === 0
                      ? `max-sm:w-[8.5rem] ${
                          text === "Izaberite veličinu" ||
                          text === "Izaberite boju"
                            ? `bg-red-500`
                            : `bg-[#ad706b]`
                        } relative flex h-[54px] items-center justify-center rounded-[24px] pt-1 text-lg font-extralight text-white hover:bg-opacity-80 sm:w-[15.313rem]`
                      : `max-sm:w-[8.5rem] ${
                          text === "Izaberite veličinu" ||
                          text === "Izaberite boju"
                            ? `bg-red-500`
                            : `bg-[#ad706b]`
                        } flex h-[54px] items-center justify-center rounded-[24px] pt-1 text-lg font-extralight text-white hover:bg-opacity-80 sm:w-[15.313rem]`
                  }
                  onClick={() => {
                    if (
                      product?.product_type === "variant" &&
                      productVariant?.id &&
                      (!productVariant?.price?.price_defined ||
                        !productVariant?.inventory?.inventory_defined)
                    ) {
                      router?.push(`/kontakt?slug=${productVariant?.slug}`);
                    } else if (
                      product?.product_type === "variant" &&
                      (productVariant?.price_defined ||
                        productVariant?.inventory?.inventory_defined)
                    ) {
                      handleAddToCart();
                    }
                    if (
                      product?.product_type === "single" &&
                      (!product?.data?.item?.price?.price_defined ||
                        !product?.data?.item?.inventory?.inventory_defined)
                    ) {
                      router?.push(
                        `/kontakt?slug=${product?.data?.item?.slug}`,
                      );
                    } else if (
                      product?.product_type === "single" &&
                      (product?.data?.item?.price?.price_defined ||
                        product?.data?.item?.inventory?.inventory_defined)
                    ) {
                      handleAddToCart();
                    }
                    handleTextChangeAddToCart();
                  }}
                >
                  {text}
                </button>
                <div
                  className="h-[35px] w-[39px] cursor-pointer"
                  onClick={() => {
                    if (isInWishlist?.exist) {
                      removeFromWishlist({
                        id: isInWishlist?.wishlist_item_id,
                      });
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        ecommerce: null,
                      });
                      window?.dataLayer?.push({
                        event: "remove_from_wishlist",
                        ecommerce: {
                          currency: "RSD",
                          value: product?.data?.item?.price?.discount?.active
                            ? product?.data?.item?.price?.price?.discount
                            : product?.data?.item?.price?.price?.original,
                          items: [
                            {
                              item_name: product?.data?.item?.basic_data?.name,
                              item_id:
                                product?.data?.item?.basic_data?.id_product,
                              price:
                                product?.data?.item?.price?.price?.original,
                              item_brand:
                                product?.data?.item?.basic_data?.brand,
                              item_category1:
                                product?.data?.item?.categories?.[0]?.name,
                              item_variant: null,
                              quantity: 1,
                            },
                          ],
                        },
                      });
                    } else {
                      addToWishlist({
                        id: product?.data?.item?.basic_data?.id_product,
                      });
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        ecommerce: null,
                      });
                      window?.dataLayer?.push({
                        event: "add_to_wishlist",
                        ecommerce: {
                          currency: "RSD",
                          value: product?.data?.item?.price?.discount?.active
                            ? product?.data?.item?.price?.price?.discount
                            : product?.data?.item?.price?.price?.original,
                          items: [
                            {
                              item_name: product?.data?.item?.basic_data?.name,
                              item_id:
                                product?.data?.item?.basic_data?.id_product,
                              item_price:
                                product?.data?.item?.price?.price?.original,
                              item_brand:
                                product?.data?.item?.basic_data?.brand,
                              item_category1:
                                product?.data?.item?.categories?.[0]?.name,
                              item_variant: null,
                              quantity: 1,
                            },
                          ],
                        },
                      });
                    }
                  }}
                >
                  <Image
                    src={isInWishlist?.exist ? WishlistActive : Wishlist}
                    alt="wishlist"
                    width={39}
                    height={35}
                    className="h-full object-cover"
                  />
                </div>
              </div>

              <div
                className={`ease mt-[3.2rem] transition-all max-md:mt-[2rem] max-md:w-full`}
              >
                <div className="relative flex gap-4 rounded-[34px] bg-black px-[8px] py-2 text-white max-md:flex-col md:max-w-[80%] md:flex-row">
                  {specification?.length > 0 &&
                    specification?.map((item) => (
                      <div key={item?.set?.id}>
                        <div
                          onClick={() =>
                            setActiveTab(
                              activeTab === item?.set?.id
                                ? null
                                : item?.set?.id,
                            )
                          }
                          className={`flex cursor-pointer items-center justify-between py-[2px] pl-[1rem] pr-[2px] hover:rounded-[30px] hover:bg-[#fff3e7] hover:text-black ${
                            activeTab === item?.set?.id
                              ? "rounded-[30px] bg-[#fff3e7] pl-[1rem] text-black"
                              : ""
                          } transform-all ease`}
                        >
                          <h2 className="text-[18px] font-extralight">
                            Specifikacija
                          </h2>
                          <div className="ml-[1.2rem] rounded-full bg-black px-[14px] py-[10px]">
                            <i
                              className={`fa fa-solid fa-chevron-down text-white transition-all duration-500 ${
                                activeTab === item?.set?.id
                                  ? "rotate-[180deg]"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>
                        {activeTab === item?.set?.id && (
                          <div className="hidescroll left-0 top-[5rem] z-[2] max-h-[150px] w-full overflow-y-auto rounded-[30px] bg-black/80 max-md:p-5 md:absolute md:px-[3rem] md:py-[2.4rem]">
                            {item?.groups?.map((group, groupIndex) => (
                              <div key={groupIndex}>
                                {group?.attributes?.map(
                                  (attribute, attributeIndex) => (
                                    <div key={attributeIndex}>
                                      <p className="my-1 text-lg font-medium">
                                        {attribute?.attribute?.name}
                                      </p>
                                      {attribute?.values?.map(
                                        (val, valIndex) => (
                                          <p
                                            className="text-[16px] font-light"
                                            key={valIndex}
                                          >
                                            - {val?.name}
                                          </p>
                                        ),
                                      )}
                                    </div>
                                  ),
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  <div>
                    <div
                      onClick={() =>
                        setActiveTab(
                          activeTab === "declaration" ? null : "declaration",
                        )
                      }
                      className={`flex cursor-pointer items-center justify-between py-[2px] pl-[1rem] pr-[2px] hover:rounded-[30px] hover:bg-[#fff3e7] hover:text-black ${
                        activeTab === "declaration"
                          ? "rounded-[30px] bg-[#fff3e7] pl-[1rem] text-black"
                          : ""
                      } transform-all ease text-[18px] font-extralight`}
                    >
                      <h2>Deklaracija</h2>
                      <div className="ml-[1.2rem] rounded-full bg-black px-[14px] py-[10px]">
                        <i
                          className={`fa fa-solid fa-chevron-down text-white transition-all duration-500 ${
                            activeTab === "declaration" ? "rotate-[180deg]" : ""
                          }`}
                        />
                      </div>
                    </div>
                    {activeTab === "declaration" && (
                      <div className="hidescroll left-0 top-[5rem] z-[2] max-h-[150px] w-full overflow-y-auto rounded-[30px] bg-black/80 max-md:p-5 md:absolute md:px-[3rem] md:py-[2.4rem]">
                        <p className="text-sm">
                          {declaration?.manufacture_name && (
                            <>
                              <span className="font-bold">Proizvođač: </span>
                              {declaration?.manufacture_name}
                            </>
                          )}
                        </p>
                        <p className="text-sm">
                          {declaration?.country_name && (
                            <>
                              <span className="font-bold">
                                Zemlja porekla:{" "}
                              </span>
                              {declaration?.country_name}
                            </>
                          )}
                        </p>
                        <p className="text-sm">
                          {declaration?.name && (
                            <>
                              <span className="font-bold">Naziv: </span>
                              {declaration?.name}
                            </>
                          )}
                        </p>
                        <p className="text-sm">
                          {declaration?.year && (
                            <>
                              <span className="font-bold">
                                Godina proizvodnje:{" "}
                              </span>
                              {declaration?.year}
                            </>
                          )}
                        </p>
                        <p className="text-sm">
                          {declaration?.importer_name && (
                            <>
                              <span className="font-bold">Uvoznik: </span>
                              {declaration?.importer_name}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div
                      onClick={() =>
                        setActiveTab(
                          activeTab === "description" ? null : "description",
                        )
                      }
                      className={`flex cursor-pointer items-center justify-between py-[2px] pl-[1rem] pr-[2px] hover:rounded-[30px] hover:bg-[#fff3e7] hover:text-black ${
                        activeTab === "description"
                          ? "rounded-[30px] bg-[#fff3e7] pl-[1rem] text-black"
                          : ""
                      } transform-all ease text-[18px] font-extralight`}
                    >
                      <h2>Opis</h2>
                      <div className="ml-[1.2rem] rounded-full bg-black px-[14px] py-[10px]">
                        <i
                          className={`fa fa-solid fa-chevron-down text-white transition-all duration-500 ${
                            activeTab === "description" ? "rotate-[180deg]" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {activeTab === "description" && (
                      <div className="hidescroll left-0 top-[5rem] z-[2] max-h-[150px] w-full overflow-y-auto rounded-[30px] bg-black/80 max-md:p-5 md:absolute md:px-[3rem] md:py-[2.4rem]">
                        <p
                          className="text-[16px] text-white"
                          dangerouslySetInnerHTML={{
                            __html: desc?.description,
                          }}
                        ></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <DeliveryModal
            deliveryModal={deliveryModal}
            setDeliveryModal={setDeliveryModal}
          />
          <InfoModal infoModal={infoModal} setInfoModal={setInfoModal} /> */}
          <ReturnModal
            returnModal={returnModal}
            setReturnModal={setReturnModal}
          />

          {(deliveryModal || infoModal || returnModal || openModal) && (
            <div
              className="fixed left-0 top-0 z-[100] h-screen w-screen bg-black bg-opacity-40 transition-all duration-500"
              onClick={() => {
                setDeliveryModal(false);
                setInfoModal(false);
                setReturnModal(false);
                setOpenModal(false);
              }}
            ></div>
          )}
        </>
      ) : (
        notFound()
      )}
      <div
        className={
          openModal
            ? `fixed right-0 top-0 z-[100] h-screen w-[50%] translate-x-0 border-l bg-white transition-all duration-500`
            : `fixed right-0 top-0 z-[100] h-screen w-[50%] translate-x-full border-l bg-white transition-all duration-500`
        }
      ></div>
    </>
  );
};

export default ProductInfo;

const RenderPrice = ({ price, className }) => {
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
          <div className={`${className} text-[2rem]`}>{minDiscount}</div>
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
          <div className={`${className} ${isRange ? "text-[2rem]" : ""}`}>
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
      return <span className={`text-[2rem]`}>{minPrice}</span>;
    } else {
      return (
        <span className={`text-[2rem]`}>
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
