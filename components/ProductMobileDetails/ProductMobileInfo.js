"use client";
import Variants from "../Variants/Variants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { get } from "@/app/api/api";
import { toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CampaignsDetails from "../ProductDetails/CampaignsDetails";
import PlusMinusInputTwo from "../PlusMinusInputTwo";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";
import UpsellProducts from "../UpsellProducts/UpsellProducts";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

import Wishlist from "../../assets/Icons/heart.png";
import Cancel from "../../assets/Icons/cancel.png";
import WishlistActive from "@/assets/Icons/heart-active.png";
import check from "@/assets/Icons/check.png";
import outofstock from "@/assets/Icons/outofstock.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import returnicon from "@/assets/Icons/return.png";
import info from "@/assets/Icons/info.png";
import delivery from "@/assets/Icons/delivery.png";
import arrow from "@/assets/Icons/right-arrow.png";
import "react-toastify/dist/ReactToastify.css";
import {
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
  relatedProducts,
  crosssellProducts,
  upsellProducts,
}) => {
  const [productVariant, setProductVariant] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const campaignsDate =
    product?.data?.item?.price?.discount?.campaigns[0]?.duration;

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

  const [productAmount, setProductAmount] = useState(1);
  const globalAddToCart = useGlobalAddToCart();
  const globalAddToWishList = useGlobalAddToWishList();
  const [setVariant, setVariantOnOff] = useState(true);
  const { data: isInWishlist, refetch } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });
  const { mutate: addToWishlist, isSuccess: isAddedToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemovedFromWishlist } =
    useRemoveFromWishlist();

  useEffect(() => {
    refetch();
  }, [isAddedToWishlist, isRemovedFromWishlist]);

  const addToCart = (e) => {
    switch (true) {
      case product?.product_type === "single":
        switch (true) {
          case product?.data?.item?.inventory?.inventory_defined:
            globalAddToCart(
              product?.data?.item?.basic_data?.id_product,
              productAmount,
            );
            toast.success(`Proizvod dodat u korpu!`, {
              position: toast.POSITION.TOP_CENTER,
            });
            break;
          case !product?.data?.item?.inventory?.inventory_defined:
            toast.error(`Proizvod nije na stanju!`, {
              position: toast.POSITION.TOP_CENTER,
            });
        }
        break;
      case product?.product_type === "variant":
        switch (true) {
          case !productVariant?.id:
            toast.error(`Izaberite varijaciju!`, {
              position: toast.POSITION.TOP_CENTER,
            });
            break;
          case productVariant?.id &&
            productVariant?.inventory?.inventory_defined:
            globalAddToCart(
              productVariant?.basic_data?.id_product,
              productAmount,
            );
            toast.success(`Proizvod dodat u korpu!`, {
              position: toast.POSITION.TOP_CENTER,
            });
            break;
          case productVariant?.id &&
            !productVariant?.inventory?.inventory_defined:
            toast.error(`Proizvod nije na stanju!`, {
              position: toast.POSITION.TOP_CENTER,
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
  const [openModal, setOpenModal] = useState(false);

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

  const [text, setText] = useState("Dodajte u korpu");
  const [text2, setText2] = useState("Kupi odmah");
  useEffect(() => {
    if (
      product?.data?.item?.price?.max?.price?.original ||
      (product?.data?.item?.price?.price_defined &&
        product?.data?.item?.inventory?.amount) ||
      (productVariant?.data?.item?.price?.max?.price?.original &&
        productVariant?.data?.item?.inventory?.amount)
    ) {
      setText("Dodajte u korpu");
    } else if (
      !product?.data?.item?.price?.price_defined ||
      !product?.data?.item?.inventory?.amount ||
      !productVariant?.data?.item?.price?.price_defined ||
      !productVariant?.data?.item?.inventory?.amount
    ) {
      setText("Pošaljite upit");
    }
  }, [product, productVariant]);
  const handleTextChangeAddToCart = () => {
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText("Izaberite boju");
    }
  };
  const handleTextChangeBuyNow = () => {
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText2("Izaberite boju");
    }
  };
  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodajte u korpu");
      setText2("Kupi odmah");
    }
  }, [productVariant]);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {product ? (
        <>
          <div className="col-span-4 mt-[2rem]">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/`}
                className="text-[0.75rem] font-normal text-[#191919] hover:text-[#e10000]"
              >
                Početna
              </Link>{" "}
              <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
              {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
                return (
                  <div className="flex items-center gap-2">
                    <Link
                      href={
                        index === arr.length - 1
                          ? `/${breadcrumb?.slug_path}`
                          : `/${breadcrumb?.slug_path}`
                      }
                      className="text-[0.75rem] font-normal text-[#191919] hover:text-[#e10000]"
                    >
                      {breadcrumb?.name}
                    </Link>
                    {index !== arr.length - 1 && (
                      <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
                    )}
                  </div>
                );
              })}
              <i className="fas fa-chevron-right text-[0.65rem] text-[#191919]"></i>
              <h1 className="text-[0.75rem] font-normal text-[#e10000]">
                {breadcrumbs?.end?.name}
              </h1>
            </div>
            <div className="mt-2 flex flex-col">
              <h1 className="leading-[44px] max-md:text-[40px]">
                {product?.data?.item?.basic_data?.name}
              </h1>
              <h2 className="mt-[1.063rem] text-[0.688rem] text-[#636363]">
                Šifra:&nbsp;
                {productVariant?.id
                  ? productVariant?.basic_data?.sku
                  : product?.data?.item?.basic_data?.sku}
              </h2>
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
                className={`mt-[2.125rem] flex items-center gap-3 text-[26px]`}
              >
                <ProductPrice
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
                />
                {product?.data?.item?.price?.discount?.active && (
                  <span className="text-[16px] text-[#877372] line-through">
                    {currencyFormat(
                      product?.data?.item?.price?.price?.original,
                    )}
                  </span>
                )}
              </div>
              {product?.data?.item?.price?.discount?.active && (
                <div className="mt-3">
                  <h2 className="text-[16px] font-semibold text-[#8e7c7a]">
                    Ušteda:{" "}
                    {currencyFormat(
                      product?.data?.item?.price?.discount?.amount,
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
              {product?.data?.item?.price?.discount?.campaigns?.length > 0 && (
                <CampaignsDetails campaignsDate={campaignsDate} />
              )}
              <p
                className="font-regular mt-[2.438rem] max-w-[90%] text-sm max-md:mt-[1.5rem]"
                dangerouslySetInnerHTML={{ __html: desc?.description }}
              ></p>
            </div>
            {product?.product_type === "variant" && (
              <div className="py-[2.75rem] max-md:py-[1.5rem]">
                <Variants
                  firstVariantOption={productVariant ? false : true}
                  product={product}
                  productSlug={path}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                  setSelectedColor={setSelectedColor}
                  productVariant={productVariant}
                  setVariant={false}
                  setVariantOnOff={setVariantOnOff}
                  slug={path}
                />
              </div>
            )}
            {/* <button className="flex items-center gap-2">
              <Image
                  src={"/icons/measure.png"}
                  alt="measure"
                  width={30}
                  height={20}
              />
              <span
                  onClick={() => setOpenModal(!openModal)}
                  className="text-[13px] font-bold"
              >
                Pomoć za veličine
              </span>
            </button> */}

            <div className="mt-[3rem] flex items-center gap-[1rem]">
              <PlusMinusInputTwo
                setCount={setProductAmount}
                amount={productAmount}
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
                    (productVariant?.price?.price_defined ||
                      productVariant?.inventory?.inventory_defined)
                  ) {
                    addToCart();
                  }
                  if (
                    product?.product_type === "single" &&
                    (!product?.data?.item?.price?.price_defined ||
                      !product?.data?.item?.inventory?.inventory_defined)
                  ) {
                    router?.push(`/kontakt?slug=${product?.data?.item?.slug}`);
                  } else if (
                    product?.product_type === "single" &&
                    (product?.data?.item?.price?.price_defined ||
                      product?.data?.item?.inventory?.inventory_defined)
                  ) {
                    addToCart();
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
                    removeFromWishlist({ id: isInWishlist?.wishlist_item_id });
                  } else {
                    addToWishlist({
                      id: product?.data?.item?.basic_data?.id_product,
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

            <div className="mt-5 flex items-center gap-[30px] py-5 md:hidden">
              {/* <div className="flex flex-col items-center">
                <div
                  className="relative cursor-pointer bg-black rounded-full h-[66px] w-[66px] flex items-center justify-center"
                  onClick={() => setDeliveryModal(true)}
                >
                  <Image
                    src={delivery}
                    width={34}
                    height={34}
                    alt="HOB"
                    className="invert"
                  />
                </div>
                <p>Dostava</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="relative cursor-pointer bg-black rounded-full h-[66px] w-[66px] flex items-center justify-center"
                  onClick={() => setInfoModal(true)}
                >
                  <Image
                    src={info}
                    width={34}
                    height={34}
                    alt="HOB"
                    className="invert"
                  />
                </div>
                <p>Informacije</p>
              </div> */}
              <div className="flex flex-col items-center">
                <div
                  className="relative flex h-[66px] w-[66px] cursor-pointer items-center justify-center rounded-full bg-black"
                  onClick={() => setReturnModal(true)}
                >
                  <Image
                    src={returnicon}
                    width={30}
                    height={30}
                    alt="HOB"
                    className="invert"
                  />
                </div>
                <p>Dostupnost proizvoda</p>
              </div>
            </div>
            <div className="mt-[5.125rem] max-md:mt-[2rem] max-md:w-full">
              <div
                className={`flex max-h-[300px] flex-col gap-2 overflow-y-auto`}
              >
                {specification?.length > 0 &&
                  specification?.map((item) => {
                    return (
                      <div key={item?.set?.id}>
                        <div
                          onClick={() =>
                            setActiveTab(
                              activeTab === item?.set?.id
                                ? null
                                : item?.set?.id,
                            )
                          }
                          className={`rounded-[30px] bg-[#fff3e7] pl-3 pr-[2px] ${
                            activeTab === item?.set?.id && "bg-[#fff3e7]"
                          } flex cursor-pointer items-center justify-between py-[2px]`}
                        >
                          <span className={`uppercase`}>{item?.set?.name}</span>
                          <div className="rounded-full bg-black p-2">
                            <Image
                              src={arrow}
                              width={20}
                              height={20}
                              className={`invert ${
                                activeTab === item?.set?.id
                                  ? "ease rotate-[270deg] transition-all"
                                  : "ease rotate-[90deg] transition-all"
                              }`}
                            />
                          </div>
                        </div>
                        {activeTab === item?.set?.id && (
                          <div
                            className={`customScroll max-h-[150px] overflow-y-auto py-4 pl-6 pr-3`}
                          >
                            <p className={`text-sm`}>
                              {item?.groups?.map((group, groupIndex) => {
                                return (
                                  <div key={groupIndex}>
                                    {group?.attributes?.map(
                                      (attribute, attributeIndex) => {
                                        return (
                                          <div key={attributeIndex}>
                                            <p
                                              className={`my-1 text-lg font-medium`}
                                            >
                                              {attribute?.attribute?.name}
                                            </p>
                                            {attribute?.values?.map(
                                              (val, valIndex) => {
                                                return (
                                                  <p
                                                    className="text-16 font-light"
                                                    key={valIndex}
                                                  >
                                                    - {val?.name}
                                                  </p>
                                                );
                                              },
                                            )}
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                );
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                <div>
                  <div
                    onClick={() =>
                      setActiveTab(
                        activeTab === "declaration" ? null : "declaration",
                      )
                    }
                    className={`rounded-[30px] bg-[#fff3e7] pl-3 pr-[2px] ${
                      activeTab === "declaration" && "bg-[#fff3e7]"
                    } flex cursor-pointer items-center justify-between py-[2px]`}
                  >
                    DEKLARACIJA{" "}
                    <div className="rounded-full bg-black p-2">
                      <Image
                        src={arrow}
                        width={20}
                        height={20}
                        className={`invert ${
                          activeTab === "declaration"
                            ? "ease rotate-[270deg] transition-all"
                            : "ease rotate-[90deg] transition-all"
                        }`}
                      />
                    </div>
                  </div>
                  {activeTab === "declaration" && (
                    <div
                      className={`customScroll max-h-[150px] overflow-y-auto py-4 pl-6 pr-3`}
                    >
                      <p className={`text-sm`}>
                        {declaration?.manufacture_name && (
                          <span>
                            Proizvođač: {declaration?.manufacture_name}
                          </span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.country_name && (
                          <span>
                            Zemlja porekla: {declaration?.country_name}
                          </span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.name && (
                          <span>Naziv: {declaration?.name}</span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.year && (
                          <span>Godina proizvodnje: {declaration?.year}</span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.importer_name && (
                          <span>Uvoznik: {declaration?.importer_name}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    onClick={() =>
                      setActiveTab(activeTab === "desc" ? null : "desc")
                    }
                    className={`rounded-[30px] bg-[#fff3e7] pl-3 pr-[2px] ${
                      activeTab === "desc" && "bg-[#fff3e7]"
                    } flex cursor-pointer items-center justify-between py-[2px]`}
                  >
                    OPIS{" "}
                    <div className="rounded-full bg-black p-2">
                      <Image
                        src={arrow}
                        width={20}
                        height={20}
                        className={`invert ${
                          activeTab === "desc"
                            ? "ease rotate-[270deg] transition-all"
                            : "ease rotate-[90deg] transition-all"
                        }`}
                      />
                    </div>
                  </div>
                  {activeTab === "desc" && (
                    <div
                      className={`customScroll max-h-[150px] overflow-y-auto py-4 pl-6 pr-3`}
                    >
                      <p
                        className={`text-[16px] font-light`}
                        dangerouslySetInnerHTML={{ __html: desc?.description }}
                      ></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="fixed right-0 top-[30%] z-[100] flex max-w-[114px] flex-col gap-[30px] rounded-l-lg bg-white px-5 py-[37px] drop-shadow-2xl max-md:hidden">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={FreeDelivery}
                  alt="free delivery"
                  width={50}
                  height={50}
                />
                <p className="regular text-sm">Besplatna dostava</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={Calendar}
                  alt="free delivery"
                  width={47}
                  height={42}
                />
                <p className="regular text-sm">2 dana isporuka</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={DeliveryStatus}
                  alt="free delivery"
                  width={46}
                  height={46}
                />
                <p className="regular text-sm">Povrat do 14 dana</p>
              </div>
            </div>
          </div>
          <div
            className={
              deliveryModal
                ? `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-100 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
                : `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-0 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
            }
          >
            <div
              className={`flex flex-col rounded-lg bg-white p-[40px] max-md:overflow-y-scroll md:h-[490px] md:w-[890px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Dostava</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setDeliveryModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="text-[15px] font-light">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  croonus.com vrši kurirska služba „YU – PD Express“ d.o.o .
                  Beograd – D Express, na teritoriji Republike Srbije, radnim
                  danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
                </p>
                <p className="mt-[30px] text-[15px] font-light">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="mt-[30px] text-[15px] font-light">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              infoModal
                ? `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-100 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
                : `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-0 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
            }
          >
            <div
              className={`flex flex-col rounded-lg bg-white p-[40px] max-md:overflow-y-scroll md:h-[490px] md:w-[890px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Informacije</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setInfoModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="text-[15px] font-light">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  croonus.com vrši kurirska služba „YU – PD Express“ d.o.o .
                  Beograd – D Express, na teritoriji Republike Srbije, radnim
                  danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
                </p>
                <p className="mt-[30px] text-[15px] font-light">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="mt-[30px] text-[15px] font-light">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              returnModal
                ? `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-100 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
                : `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-0 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
            }
          >
            <div
              className={`flex flex-col rounded-lg bg-white p-[40px] max-md:overflow-y-scroll md:h-[490px] md:w-[890px]`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-bold">Dostupnost proizvoda</p>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setReturnModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="text-[15px] font-light">
                  Na našem sajtu možete pregledati širok asortiman proizvoda.
                  Trudimo se da svi artikli budu dostupni u svakom trenutku i u
                  željenim količinama.
                </p>
                <p className="mt-[10px] text-[15px] font-light">
                  Molimo vas za razumevanje ukoliko neki proizvod trenutno nije
                  na raspolaganju.
                </p>
                <p className="mt-[10px] text-[15px] font-light">
                  Naši operateri će vas kontaktirati putem e-maila ili telefona
                  radi konačne potvrde vaše porudžbine.
                </p>
                <p className="mt-[30px] text-[15px] font-light">
                  Hvala vam na razumevanju i poverenju.
                </p>
                <p className="mt-[10px] text-[15px] font-light">HOB tim</p>
              </div>
            </div>
          </div>

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
          {relatedProducts?.length > 0 && (
            <RelatedProducts
              relatedProducts={relatedProducts}
              loading={loading}
            />
          )}
          {upsellProducts?.length > 0 && (
            <UpsellProducts upsellProducts={upsellProducts} loading={loading} />
          )}
          {crosssellProducts?.length > 0 && (
            <CrosssellProducts
              crosssellProducts={crosssellProducts}
              loading={loading}
            />
          )}
        </>
      ) : (
        notFound()
      )}
      <div
        className={
          openModal
            ? `fixed right-0 top-0 z-[1000000000000000000] h-screen w-full translate-x-0 border-l bg-white transition-all duration-500`
            : `fixed right-0 top-0 z-[1000000000000000000] h-screen w-full translate-x-full border-l bg-white transition-all duration-500`
        }
      >
        <i
          className={`fas fa-times ml-auto cursor-pointer p-2 text-lg`}
          onClick={() => setOpenModal(false)}
        ></i>
        <div className={`mt-5 h-full overflow-y-auto p-1`}>
          <h2 className={`w-full border-b pb-2 text-[1.2rem]`}>
            Tabele mera za žene (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>XS</th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>XXL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`px-2 py-2 text-left font-bold`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>89-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>60-64</td>
                  <td className={`text-left`}>64-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-76</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-86</td>
                </tr>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`px-2 py-2 text-left font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>110-114</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`mt-10 w-full border-b pb-2 text-[1.2rem]`}>
            Tabele mera za žene (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>27</th>
                  <th className={`text-left`}>28</th>
                  <th className={`text-left`}>29</th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>62-65</td>
                  <td className={`text-left`}>65-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-74</td>
                  <td className={`text-left`}>74-78</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-28</td>
                  <td className={`text-left`}>68-92</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>90-93</td>
                  <td className={`text-left`}>93-96</td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>105-110</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`mt-10 w-full border-b pb-2 text-[1.2rem]`}>
            Tabele mera za muškarce (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>2XL</th>
                  <th className={`text-left`}>3XL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>104-108</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                  <td className={`text-left`}>118-112</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-104</td>
                </tr>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`mt-10 w-full border-b pb-2 text-[1.2rem]`}>
            Tabele mera za muškarce (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                  <th className={`text-left`}>36</th>
                  <th className={`text-left`}>38</th>
                  <th className={`text-left`}>40</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b bg-[#f8f8f8] !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>78-81</td>
                  <td className={`text-left`}>81-84</td>
                  <td className={`text-left`}>84-87</td>
                  <td className={`text-left`}>87-90</td>
                  <td className={`text-left`}>90-94</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>

                <tr className={`border-b !py-2`}>
                  <td className={`py-2 pl-2 text-left font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-105</td>
                  <td className={`text-left`}>105-108</td>
                  <td className={`text-left`}>108-112</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
