"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useCartContext } from "@/app/api/cartContext";
import { useRouter } from "next/navigation";
import { post, fetch as FETCH } from "@/app/api/api";
import classes from "./Cart.module.css";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { currencyFormat } from "@/helpers/functions";
import leafcut from "@/assets/shapes/leaf-cut.png";
import leaf from "@/assets/shapes/leaf-little-meat.png";
import { useCart, useRemoveFromCart, useSummary } from "@/hooks/hob.hooks";
import { PromoCode } from "@/_components/promo-code";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Form } from "@/_components/cart/form";

const CartProductBox = dynamic(
  () => import("../../components/CartProductBox"),
  { loading: () => <p>Loading...</p> },
);

const CheckoutPage = ({ paymentoptions, deliveryoptions, countries }) => {
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    type: "personal",
    customer_type_billing: "personal",
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: null,
    town_name_billing: "",
    zip_code_billing: "",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: null,
    id_country_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    object_number: "",
    address: "",
    zip_code: "",
    town: "",
    note: "",
    company_name: "",
    pib: "",
    maticni_broj: "",
    agreed: null,
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_address: "",
    shipping_object_number: "",
    shipping_zip_code: "",
    shipping_town: "",
    shipping_note: "",
    shipping_company_name: "",
    gcaptcha: token,
    delivery: null,
    id_country_shipping: 193,
    payment: null,
    country: "",
    height: "",
    weight: "",
    foot_size: "",
    product_size_agreement: null,
    company_name_shipping: "",
    pib_shipping: "",
    maticni_broj_shipping: "",
    floor_shipping: "",
    apartment_number_shipping: "",
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  });

  //fetchujemo sve artikle iz korpe
  const {
    data: items,
    refetch: refreshCart,
    isFetching: isFetchingCart,
  } = useCart();

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const {
    data: { summary, isFetching: isFetchingSummary },
    refetch: refreshSummary,
  } = useSummary({ formData: formData, delivery: formData?.delivery });

  const [postErrors, setPostErrors] = useState({ fields: null });
  const [isClosed, setIsClosed] = useState(false);
  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();

  const router = useRouter();

  const [cart, mutateCart] = useCartContext();
  const [cartData, setCartData] = useState([]);
  const [secondAddress, setSecondAddress] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [expandArea, setExpandArea] = useState(false);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const required = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "zip_code",
    "object_number",
    "town",
    "agreed",
    "shipping_first_name",
    "shipping_last_name",
    "shipping_email",
    "shipping_phone",
    "shipping_address",
    "shipping_object_number",
    "shipping_address",
    "shipping_zip_code",
    "shipping_town",
    "delivery",
    "payment",
    "id_country_shipping",
  ];
  const companyrequired = [
    "company_name",
    "pib",
    "maticni_broj",
    "shipping_company_name",
  ];
  const errorMsg = "Polje je obavezno";
  const errorSelect = "Morate izabrati jednu opciju";
  const errorCheck = "Morate prihvatiti uslove";
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const cartItems = items?.items ?? [];

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    if (target.type === "radio" && target.checked) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const filterOutProductsOutOfStock = (data) => {
    const productsOutOfStock = [];
    data?.forEach((item) => {
      if (!item?.product?.inventory?.inventory_defined) {
        productsOutOfStock.push({
          cart: {
            id: null,
            item_id: null,
          },
          product: {
            name: item?.product?.basic_data?.name,
            sku: item?.product?.basic_data?.sku,
            slug: item?.product?.slug,
            image: item?.product?.image,
            id: item?.product?.id,
          },
        });
      }
    });
    setPostErrors((prevErrors) => ({
      ...prevErrors,
      fields: productsOutOfStock,
    }));
  };

  useEffect(() => {
    if (items?.items && !isClosed) {
      filterOutProductsOutOfStock(items?.items);
    }
  }, [items?.items]);

  const formSubmitHandler = () => {
    setRefreshReCaptcha((r) => !r);
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (
        (formData.type === "company" &&
          companyrequired.includes(key) &&
          (item === "" || item == null)) ||
        (required.includes(key) && (item === "" || item == null))
      ) {
        if (key.includes("shipping")) {
          if (secondAddress) {
            err.push(key);
          }
        } else {
          err.push(key);
        }
      }
    }
    if (err.length > 0) {
      setErrors(err);
    } else {
      const ret = {
        customer_type_billing: formData.type,
        id_company_shipping: null,
        id_company_address_shipping: null,
        company_name_shipping:
          formData.type === "company"
            ? secondAddress
              ? formData.shipping_company_name
              : formData.company_name
            : null,
        pib_shipping: formData.type === "company" ? formData.pib : null,
        maticni_broj_shipping:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_shipping: secondAddress
          ? formData.shipping_first_name
          : formData.first_name,
        last_name_shipping: secondAddress
          ? formData.shipping_last_name
          : formData.last_name,
        phone_shipping: secondAddress
          ? formData.shipping_phone
          : formData.phone,
        email_shipping: secondAddress
          ? formData.shipping_email
          : formData.email,
        address_shipping: secondAddress
          ? formData.shipping_address
          : formData.address,
        object_number_shipping: formData.object_number,
        floor_shipping: "",
        apartment_number_shipping: "",
        id_town_shipping: null,
        town_name_shipping: secondAddress
          ? formData.shipping_town
          : formData.town,
        zip_code_shipping: secondAddress
          ? formData.shipping_zip_code
          : formData.zip_code,
        id_municipality_shipping: null,
        municipality_name_shipping: "",
        id_country_shipping: formData?.id_country_shipping,
        country_name_shipping: "Srbija",
        note_shipping: secondAddress ? formData.shipping_note : formData.note,
        id_company_billing: null,
        id_company_address_billing: null,
        company_name_billing:
          formData.type === "company" ? formData.company_name : null,
        pib_billing: formData.type === "company" ? formData.pib : null,
        maticni_broj_billing:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_billing: formData.first_name,
        last_name_billing: formData.last_name,
        phone_billing: formData.phone,
        email_billing: formData.email,
        address_billing: formData.address,
        object_number_billing: formData.object_number,
        floor_billing: "",
        apartment_number_billing: "",
        id_town_billing: null,
        town_name_billing: formData.town,
        zip_code_billing: formData.zip_code,
        id_municipality_billing: null,
        municipality_name_billing: "",
        id_country_billing: null,
        country_name_billing: "Srbija",
        note_billing: formData.note,

        delivery_method: formData.delivery,
        delivery_method_options: formData.delivery_method_options,

        payment_method: formData.payment,
        payment_method_options: [],

        promo_code: null,
        promo_code_options: [],

        note: formData.note,
        gcaptcha: token,
        accept_rules: 1,
      };
      if (errors.length === 0) {
        setLoading(true);
      }

      post("/checkout/one-page", ret)
        .then((response) => {
          const creditCardForm = response?.payload?.payment_provider_data?.form;
          const paypalForm = response?.payload?.payment_provider_data?.form;

          if (paypalForm && paypalForm?.includes("paypal")) {
            //redirect
            window.location.href = paypalForm;
          }

          const orderToken = response?.payload?.order?.order_token;
          if (response?.code === 200) {
            if (creditCardForm) {
              const dom = document.createElement("div");
              dom.innerHTML = creditCardForm;
              document.body.appendChild(dom);

              const formData = document.getElementById("bank_send_form");
              formData.submit();
              mutateCart();
            } else {
              router.push(`/kupovina/${orderToken}`);

              // mutateCart();
            }

            const totalValue = (items?.items ?? [])
              ?.map(
                (item) =>
                  item?.product?.price?.per_item?.total * item?.cart?.quantity,
              )
              ?.reduce((acc, curr) => acc + curr, 0);

            window?.dataLayer?.push({
              event: "begin_checkout",
              ecommerce: {
                currency: "RSD",
                value: totalValue,
                items: (items?.items ?? [])?.map((item) => ({
                  item_name: item?.product?.basic_data?.name,
                  item_id: item?.product?.id,
                  price:
                    Number(item?.product?.price?.per_item?.total) *
                    Number(item?.cart?.quantity),
                  quantity: item?.cart?.quantity,
                })),
              },
            });
          } else {
            setLoading(false);
            if (response?.payload?.fields) {
              setPostErrors({
                fields: response?.payload?.fields,
              });
            }
          }
        })
        .catch((error) => console.warn(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refreshCart();
    }
  }, [isSuccess]);

  const bill =
    summary?.totals?.items_discount > 5000
      ? 100
      : Math.round((summary?.totals?.items_discount / 5000) * 100);

  const createOptionsArray = (data) => {
    const { delivery_method_id, delivery_method_name, prop_name, selected } =
      data;

    const { id, name } = selected;

    let arr = [];

    arr.push({
      id: delivery_method_id,
      name: delivery_method_name,
      data: [
        {
          id: prop_name,
          selected: {
            id: id,
            name: name,
          },
        },
      ],
    });

    arr = arr?.filter(
      (v, i, a) =>
        a?.findIndex(
          (t) =>
            t?.id === v?.id &&
            t?.data?.[0]?.selected?.id === v?.data?.[0]?.selected?.id,
        ) === i,
    );

    return arr;
  };

  const queryClient = useQueryClient();

  const { data: delivery_form } = useQuery({
    queryKey: [
      "delivery-option-form",
      {
        delivery_method: formData?.delivery_method,
        delivery: formData?.delivery,
      },
    ],
    queryFn: async () => {
      return await FETCH(
        `checkout/delivery-option-form/${formData?.delivery}`,
        {
          order_data: {},
        },
      ).then((res) => res?.payload);
    },
  });

  const onChange = ({ value, prop_name, selected }) => {
    let data = {};
    if (value) {
      let method_id = formData?.delivery_method;
      let method_name = (deliveryoptions ?? [])?.find(
        (o) => o?.id === formData?.delivery_method,
      )?.name;

      data = {
        delivery_method_id: method_id,
        delivery_method_name: method_name,
        prop_name,
        selected,
      };

      const arr = createOptionsArray(data);
      setErrors(errors?.filter((error) => error !== "delivery_method_options"));
      setFormData({
        ...formData,
        delivery_method_options: arr,
      });
    }

    // queryClient.invalidateQueries({ queryKey: ["summary"] });
  };

  const renderCart = () => {
    switch (true) {
      case isFetchingCart:
        return (
          <div className={`mx-auto mt-10 w-[95%]`}>
            <div className={`h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
            <div className={`mt-5 h-5 w-full animate-pulse bg-slate-200`} />
          </div>
        );
      case !isFetchingCart && items?.items?.length === 0:
        return (
          <>
            <div className="nocontent-holder mx-auto mt-[1.2rem] flex items-center justify-center max-md:w-[95%] lg:mt-[13rem]">
              <div className="relative z-[4] flex flex-col items-center justify-center rounded-3xl border border-[#f8f8f8] p-10 text-center">
                <div className="text-center">
                  <span className="text-2xl font-medium">Vaša korpa</span>
                </div>
                <div className="mt-6 text-center text-lg font-medium">
                  Trenutno ne postoji sadržaj u Vašoj korpi.
                </div>
                <div className="mt-5 text-center">
                  <Link href="/">
                    <button className="mt-10 rounded-[30px] bg-black px-10 py-4 font-medium text-white hover:bg-opacity-80">
                      Vrati se na početnu stranu
                    </button>
                  </Link>
                </div>
                <div className="help-container mt-10 text-center">
                  <p className="font-medium">Pomoć pri kupovini:</p>
                  <ul className="mt-2">
                    <li>
                      - Ukoliko Vam je potrebna pomoć u svakom trenutku nas
                      možete kontaktirati pozivom na broj call centra{" "}
                      <a href={`tel:${process.env.TELEPHONE}`}>
                        {process.env.TELEPHONE}
                      </a>
                      .
                    </li>
                    <li>
                      - Pogledajte uputstvo za{" "}
                      <Link href="kako-kupiti" className="underline">
                        Pomoć pri kupovini
                      </Link>
                      .
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      case !isFetchingCart && items?.items?.length > 0:
        return (
          <>
            <div className="relative z-[3] grid grid-cols-5 gap-x-3 gap-y-3 max-xl:mx-auto max-xl:w-[95%]">
              <div className="col-span-5 p-1 md:pr-[2rem] md:pt-[3rem] xl:col-span-3 2xl:pl-[5rem]">
                <div className={`py-5 xl:hidden`}>
                  <div className={`mt-2 max-xl:w-full xl:w-[400px]`}>
                    {/*bar for measuring*/}
                    <div className="mt-3 h-1 w-full bg-[#f5f5f7]">
                      <div
                        className="relative h-full bg-black transition-all duration-500"
                        style={{
                          width: `${bill}%`,
                        }}
                      >
                        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-end">
                          <span className="rounded-full border-2 border-black bg-white px-[0.275rem] py-1 text-[0.5rem] font-bold text-black">
                            {bill}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`mt-3 text-base text-[#e10000] ${
                        summary?.totals?.items_discount > 5000 ? "hidden" : ""
                      }`}
                    >
                      Do besplatne dostave nedostaje ti još{" "}
                      {currencyFormat(5000 - summary?.totals?.items_discount)}
                    </p>
                  </div>
                  {summary?.total > 5000 && (
                    <p className="mt-3 text-base font-bold">
                      Besplatna dostava
                    </p>
                  )}
                </div>

                <p className="text-[28px] font-light">Informacije za dostavu</p>
                <div className="mt-[3rem] grid grid-cols-2 gap-x-4 pb-4 max-xl:text-base xl:pl-[1rem] xl:pr-[5rem]">
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="hidden">
                        Ime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`ml-2 flex items-end rounded-[30px] max-sm:text-sm ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        } bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                        type="text"
                        id="name"
                        name="first_name"
                        placeholder="Ime*"
                        value={formData.first_name}
                        onChange={formChangeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="surname" className="hidden">
                        Prezime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`ml-2 max-sm:text-sm ${
                          errors.includes("last_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                        type="text"
                        id="surname"
                        name="last_name"
                        placeholder="Prezime*"
                        value={formData.last_name}
                        onChange={formChangeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="hidden">
                        Email:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={formChangeHandler}
                        className={`ml-2 max-sm:text-sm ${
                          errors.includes("email")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                        placeholder="Email*"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="hidden">
                        Država:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <select
                        className={`ml-2 max-sm:text-sm ${
                          errors.includes("id_country_shipping")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                        placeholder="Država*"
                        name="id_country_shipping"
                        id="id_country_shipping"
                        value={formData.id_country_shipping}
                        onChange={formChangeHandler}
                      >
                        {countries.map((country) => {
                          return (
                            <option key={country?.id} value={country?.id}>
                              {country?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
                    <div className="flex flex-col gap-2 max-xl:mt-2">
                      <label htmlFor="phone" className="hidden">
                        Telefon:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={formChangeHandler}
                        className={`ml-2 max-sm:text-sm ${
                          errors.includes("phone")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                        placeholder="Telefon*"
                      />
                    </div>
                    <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="address" className="hidden">
                          Adresa dostave:
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={formChangeHandler}
                          className={`ml-2 max-sm:text-sm ${
                            errors.includes("address")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                          placeholder="Adresa*"
                        />
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="object_number" className="hidden">
                          Broj{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="object_number"
                          id="object_number"
                          value={formData.object_number}
                          onChange={formChangeHandler}
                          className={`ml-2 max-sm:text-sm ${
                            errors.includes("object_number")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                          placeholder="Broj*"
                        />
                      </div>
                    </div>
                    <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="zip_code" className="hidden">
                          Poštanski broj:
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="zip_code"
                          id="zip_code"
                          value={formData.zip_code}
                          onChange={formChangeHandler}
                          className={`ml-2 max-sm:text-sm ${
                            errors.includes("zip_code")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                          placeholder="Poštanski broj*"
                        />
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="town" className="hidden">
                          Grad{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="town"
                          id="town"
                          value={formData.town}
                          onChange={formChangeHandler}
                          className={`ml-2 max-sm:text-sm ${
                            errors.includes("town")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          } rounded-[30px] bg-black/20 px-6 py-4 text-white placeholder:text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3`}
                          placeholder="Grad*"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-col gap-2">
                      <label htmlFor="note" className="hidden">
                        Napomena:
                      </label>
                      <textarea
                        type="text"
                        name="note"
                        rows="4"
                        id="note"
                        value={formData.note}
                        onChange={formChangeHandler}
                        className={`relative ml-2 rounded-[30px] bg-black/20 px-6 pb-0 pt-4 text-white focus:bg-black/40 focus:ring-0 max-xl:mx-3 max-sm:text-sm ${
                          expandArea
                            ? "ease h-[100px] transition-all"
                            : "ease h-[58px] transition-all"
                        } placeholder:text-white ${
                          errors.includes("note")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }`}
                        placeholder="Napomena"
                      ></textarea>
                      <button
                        onClick={() => setExpandArea((prevState) => !prevState)}
                        className="absolute right-[4px] top-[4px] z-[10] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black text-[34px] font-thin text-white"
                      >
                        {expandArea ? "-" : "+"}
                      </button>
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <>
                    <div className="col-span-3 grid grid-cols-1 gap-y-3 max-xl:col-span-5 max-md:mt-0">
                      <div className="mt-[4rem] grid grid-cols-2 gap-4">
                        <div className="col-span-1 pr-4 max-md:col-span-2 md:pr-[1.6rem] xl:pr-[3rem]">
                          <span className="text-[30px] font-light max-md:ml-2">
                            Način dostave{" "}
                          </span>
                          <div className="pb-5 pl-3 pt-7 max-md:pl-5 2xl:pl-5">
                            <div className="relative flex flex-col gap-2">
                              {errors.includes("delivery") && (
                                <span
                                  className={`${classes.errorMsg} absolute -top-5 text-red-500`}
                                >
                                  {errorSelect}
                                </span>
                              )}
                              <div className="flex flex-col gap-1 max-xl:text-sm">
                                {deliveryoptions.map((option) => {
                                  return (
                                    <div
                                      key={option?.id}
                                      className={`flex flex-col gap-2`}
                                    >
                                      <div
                                        className="flex flex-row items-center gap-3 rounded-[30px] bg-black/20 px-6 py-4 text-white hover:bg-black/40"
                                        key={option.type}
                                      >
                                        <input
                                          type="radio"
                                          name="delivery"
                                          value={option.id}
                                          checked={
                                            formData.delivery === option.id
                                          }
                                          id={"delivery" + option.id}
                                          onChange={(e) => {
                                            if (
                                              e.target.value !==
                                              "in_store_pickup"
                                            ) {
                                              setFormData({
                                                ...formData,
                                                delivery_method_options: [],
                                                delivery_method: e.target.value,
                                                delivery: e.target.value,
                                              });
                                            } else {
                                              setFormData({
                                                ...formData,
                                                delivery: e.target.value,
                                                delivery_method: e.target.value,
                                              });
                                            }
                                          }}
                                          className="h-5 w-5 border-black bg-black text-[#191919] focus:border-none focus:outline-none focus:ring-0"
                                        />
                                        <label
                                          htmlFor={"delivery" + option.id}
                                          className="text-[15px] font-extralight md:text-[17px]"
                                        >
                                          {option.name}
                                        </label>
                                      </div>
                                      {(formData?.delivery_method ||
                                        formData?.delivery) === option?.id &&
                                        delivery_form?.status &&
                                        delivery_form?.fields?.length > 0 && (
                                          <Form
                                            errors={errors}
                                            fields={delivery_form?.fields}
                                            onChange={onChange}
                                            formData={formData}
                                          />
                                        )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 pr-4 max-md:col-span-2 md:pr-[4rem]">
                          <span className="text-[30px] font-light max-md:ml-2">
                            Način plaćanja
                          </span>
                          <div className="pb-5 pl-5 pt-7">
                            <div className="relative flex flex-col gap-2">
                              {errors.includes("payment") && (
                                <span
                                  className={`${classes.errorMsg} absolute -top-5 text-red-500`}
                                >
                                  {errorSelect}
                                </span>
                              )}
                              <div className="flex flex-col gap-1">
                                {(paymentoptions ?? []).map((option) => (
                                  <div
                                    className="flex flex-row items-center gap-3 rounded-[30px] bg-black/20 px-6 py-4 text-white hover:bg-black/40"
                                    key={option.id}
                                  >
                                    <input
                                      type="radio"
                                      name="payment"
                                      value={option.id}
                                      checked={formData.payment === option.id}
                                      id={"payment" + option.id}
                                      onChange={formChangeHandler}
                                      className="h-5 w-5 border-black bg-black text-[#191919] focus:border-none focus:outline-none focus:ring-0"
                                    />
                                    <label
                                      htmlFor={"payment" + option.id}
                                      className="text-[15px] font-extralight md:text-[17px]"
                                    >
                                      {option.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-span-5 rounded-[40px] bg-[#b5a89eb8] py-[3rem] pl-2 md:pl-[3rem] lg:-ml-[3rem] xl:col-span-2">
                <div className={`flex w-[98%] flex-col md:w-[80%]`}>
                  <p className="text-[30px]">Proizvodi u korpi</p>
                  <div className="customScroll max-h-[411px] overflow-y-scroll">
                    {(items?.items ?? [])?.map(
                      ({
                        product: {
                          categories,
                          basic_data: {
                            id_product,
                            name,
                            brand_name,
                            sku,
                            short_description,
                          },
                          price,
                          inventory,
                          image,
                          link: { link_path: slug_path },
                          amount,
                        },
                        cart: { quantity, cart_item_id },
                      }) => {
                        return (
                          <Suspense fallback={<div>Loading...</div>}>
                            <CartProductBox
                              cart_item_id={cart_item_id}
                              key={id_product}
                              id={id_product}
                              amount={amount}
                              name={name}
                              categories={categories}
                              brand_name={brand_name}
                              price={price}
                              isClosed={isClosed}
                              refreshSummary={refreshSummary}
                              quantity={+quantity}
                              inventory={inventory}
                              image={image}
                              sku={sku}
                              short_description={short_description}
                              refreshCart={refreshCart}
                              slug_path={slug_path}
                            />
                          </Suspense>
                        );
                      },
                    )}
                  </div>
                  {/* <div className="flex gap-4 my-[2rem]">
                    <div className="relative w-full">

                      <input
                        id="coupon"
                        type="text"
                        placeholder="-- Ovde unesite kupon"
                        className="h-[58px] w-full rounded-[30px] bg-[#f7f8fa] pt-[30px] px-5 bg-black/20 focus:bg-black/40 placeholder:text-white border-none focus:border-none focus:ring-0"
                      />
                      <button className="h-[52px] w-fit rounded-[26px] bg-black  text-white max-md:mt-2 md:absolute top-[3px] right-[3px] pl-4 pr-[4rem] font-extralight">
                        Aktiviraj
                      </button>

                    </div>
                    <button className="bg-black rounded-full h-[52px] w-[58px] text-white flex justify-center items-center text-[30px] font-extralight">?</button>
                  </div> */}
                </div>
                <div className="col-span-2 mt-0 flex w-[98%] flex-col gap-4 rounded-[30px] border border-[#b7a89e] bg-[#b7a89e] px-4 py-5 max-xl:col-span-5 max-md:mt-5 max-sm:px-[0.45rem] md:w-[80%]">
                  <PromoCode />
                  <div className="flex flex-col gap-0">
                    <div className="flex flex-row items-center justify-between border-b-[1px] border-b-[#cebcaed1] py-1 max-xl:text-base">
                      <span className="text-[16px] font-extralight max-xl:text-sm">
                        Ukupna vrednost korpe:{" "}
                      </span>
                      <span className="text-[16px] max-xl:text-sm max-sm:ml-auto sm:mr-3">
                        {currencyFormat(summary?.totals?.with_vat)}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b-[1px] border-b-[#cebcaed1] py-1 max-xl:text-base">
                      <span className="text-[16px] font-extralight max-xl:text-sm">
                        Popust:
                      </span>
                      <span className="text-[16px] max-xl:text-sm max-sm:ml-auto sm:mr-3">
                        {currencyFormat(
                          summary?.totals?.items_discount_amount +
                            summary?.totals?.cart_discount_amount,
                        )}
                      </span>
                    </div>
                    {summary?.totals?.promo_code_amount > 0 && (
                      <div className="flex flex-row items-center justify-between border-b-[1px] border-b-[#cebcaed1] py-1 max-xl:text-base">
                        <span className="text-[16px] font-extralight max-xl:text-sm">
                          Promo kod:
                        </span>
                        <span className="text-[16px] max-xl:text-sm max-sm:ml-auto sm:mr-3">
                          {currencyFormat(summary?.totals?.promo_code_amount)}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-row items-center justify-between border-b-[1px] border-[#cebcaed1] py-1">
                      <span className="text-[16px] font-extralight max-xl:text-sm">
                        Dostava:
                      </span>
                      <span className="text-[16px] max-xl:text-sm max-sm:ml-auto sm:mr-3">
                        {currencyFormat(summary?.totals?.delivery_amount)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-row items-center justify-between pt-2">
                      <span className="text-[20px] max-xl:text-[16px]">
                        Ukupno za plaćanje:{" "}
                      </span>
                      <span className="text-[1.5rem] max-xl:text-[16px] sm:mr-3">
                        {currencyFormat(summary?.totals?.total)}
                      </span>
                    </div>{" "}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="relative mt-2 flex items-center gap-3 py-3">
                    <input
                      type="checkbox"
                      id="agreed"
                      name="agreed"
                      checked={formData.agreed === "1"}
                      onChange={formChangeHandler}
                      value={formData.agreed === "1" ? "" : "1"}
                      className="bg-[#191919] text-[#191919] focus:border-none focus:outline-none focus:ring-0"
                    />
                    <label
                      htmlFor="agreed"
                      className="font-light max-md:text-xs"
                    >
                      Saglasan sam sa{" "}
                      <a
                        className={`underline`}
                        href={`/uslovi-koriscenja`}
                        target={`_blank`}
                      >
                        opštim uslovima korišćenja
                      </a>{" "}
                      HOB ONLINE SHOP-a.
                    </label>
                    {errors.includes("agreed") && (
                      <span
                        className={`${classes.errorMsg} absolute -top-3.5 text-red-500`}
                      >
                        {errorCheck}
                      </span>
                    )}
                    <br />
                  </div>
                  <button
                    onClick={formSubmitHandler}
                    className="w-fit rounded-[30px] bg-black px-4 text-start text-sm font-medium uppercase text-white hover:opacity-90 max-xl:w-full max-md:mt-4 max-md:w-[98%] max-md:py-4 md:py-3 xl:pl-4 xl:pr-[4rem]"
                  >
                    Potvrdi porudžbenicu{" "}
                  </button>
                  <div className={`float-right mt-7 max-xl:hidden`}>
                    <div className={`mt-2 max-xl:w-full xl:w-[400px]`}>
                      {/*bar for measuring*/}
                      <div className="mt-3 h-1 w-full bg-[#f5f5f7]">
                        <div
                          className="relative h-full bg-black transition-all duration-500"
                          style={{
                            width: `${
                              (summary?.totals?.items_discount / 5000) * 100 >
                              100
                                ? 100
                                : (summary?.totals?.items_discount / 5000) * 100
                            }%`,
                          }}
                        >
                          <div className="absolute right-0 top-0 flex h-full w-full items-center justify-end">
                            <span className="rounded-full border-2 border-black bg-white px-[0.275rem] py-1 text-[0.5rem] font-bold text-black">
                              {summary?.totals?.items_discount > 5000
                                ? 100
                                : Math.round(
                                    (summary?.totals?.items_discount / 5000) *
                                      100,
                                  )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`mt-3 text-base text-[#e10000] ${
                          summary?.totals?.items_discount > 5000 ? "hidden" : ""
                        }`}
                      >
                        Do besplatne dostave nedostaje ti još{" "}
                        {currencyFormat(5000 - summary?.totals?.items_discount)}
                      </p>
                    </div>
                    {summary?.totals?.items_discount > 5000 && (
                      <p className="mt-3 text-base">Besplatna dostava</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <div className="placeholder relative overflow-hidden">
        <Image
          src={leafcut}
          width={400}
          height={500}
          alt="HOB"
          className="absolute left-0 top-[2rem] z-[1]"
        />
        <Image
          src={leaf}
          width={300}
          height={300}
          alt="HOB"
          className="absolute -right-[6rem] top-[6rem] z-[1] overflow-hidden opacity-[0.6]"
        />
        {renderCart()}
        {loading && (
          <div className="fixed left-0 top-0 z-[300] flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-xl text-white">Vaš zahtev se obrađuje...</p>
              <i className="fa-solid fa-spinner animate-spin text-6xl text-white"></i>
            </div>
          </div>
        )}
      </div>
      <NoStockModal
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        removeFromCart={removeFromCart}
        setIsClosed={setIsClosed}
      />
    </GoogleReCaptchaProvider>
  );
};

export default CheckoutPage;

const NoStockModal = ({
  postErrors,
  setPostErrors,
  removeFromCart,
  setIsClosed,
  className,
}) => {
  return (
    <div
      onClick={(e) => {}}
      className={
        postErrors?.fields?.length > 0
          ? `visible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`
          : `invisible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500`
      }
    >
      <div
        className={`relative inset-0 m-auto h-fit w-fit rounded-md bg-white p-[1rem] max-sm:mx-2`}
      >
        <div className={`mt-[3rem] px-[0.25rem] md:px-9`}>
          <h3 className={`mt-4 text-center text-xl font-semibold ${className}`}>
            U korpi su proizvodi koji trenutno nisu na stanju.
          </h3>
          <p className={`mt-2 text-center text-base font-normal ${className}`}>
            Kako bi završili porudžbinu, morate izbrisati sledeće artikle iz
            korpe:
          </p>
          <div
            className={`divide-y-black mt-[0.85rem] flex flex-col divide-y px-5`}
          >
            {(postErrors?.fields ?? [])?.map(
              ({
                cart: { id, item_id },
                product: { id: id_product, name, sku, slug, image },
                errors,
              }) => {
                let deleted_items_count = 0;
                //ako je deleted_items_count jednak broju proizvoda koji nisu na lageru, gasimo modal
                if (deleted_items_count === postErrors?.fields?.length) {
                  setPostErrors(null);
                }

                return (
                  <div
                    key={id}
                    className={`flex items-start gap-2 py-[1.55rem]`}
                  >
                    <Link href={`/${slug}`}>
                      <Image
                        src={image?.[0]}
                        alt={name ?? sku ?? slug ?? "Ecommerce"}
                        width={150}
                        height={100}
                        className={``}
                      />
                    </Link>
                    <div className={`flex flex-col`}>
                      <Link
                        href={`/${slug}`}
                        className={`text-sm font-normal ${className}`}
                      >
                        {name}
                      </Link>
                      <ul className={`flex flex-col gap-1`}>
                        {(errors ?? ["Trenutno nije na stanju."])?.map(
                          (error) => (
                            <li
                              key={error}
                              className={`text-[13px] font-bold text-[#e10000] ${className}`}
                            >
                              {error}
                            </li>
                          ),
                        )}
                      </ul>
                      <button
                        onClick={async () => {
                          await removeFromCart({ id: id_product });
                          //nakon brisanja, iz postErrors.fields filtriramo taj item i izbacujemo ga
                          let arr = [];
                          arr = (postErrors?.fields ?? [])?.filter(
                            (item) => item.product.id !== id_product,
                          );
                          setPostErrors({
                            ...postErrors,
                            fields: arr,
                          });
                        }}
                        className={`mt-1 flex w-[10rem] items-center justify-between bg-[#000] px-2 py-[0.225rem] font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
                      >
                        Ukloni iz korpe{" "}
                        <i className="fa-solid fa-trash ml-auto"></i>
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className={`mt-2 flex items-center justify-end`}>
          <button
            className={`ml-auto mt-1 flex items-center justify-between bg-[#000] px-12 py-2 text-center font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
            onClick={() => {
              setPostErrors(null);
              setIsClosed(true);
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
