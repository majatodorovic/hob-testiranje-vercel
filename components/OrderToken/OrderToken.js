"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Image1 from "../../assets/uspesno.png";
import { currencyFormat } from "@/helpers/functions";
const OrderSuccess = ({ order }) => {
  console.log(order);
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ecommerce: null,
    });
    window?.dataLayer?.push({
      event: "purchase",
      ecommerce: {
        transaction_id: order?.order?.slug,
        value: order?.order?.total,
        tax: order?.order?.total_vat,
        currency: "RSD",
        shipping: order?.order?.total_delivery_amount,
        items: (order?.items ?? [])?.map((item) => {
          return {
            item_name: item?.basic_data?.name,
            item_id: item?.basic_data?.id_product,
            price: item?.price?.total_with_vat,
            item_brand: item?.basic_data?.brand_name,
            item_category1: item?.basic_data?.category_breadcrumbs,
            quantity: item?.price?.quantity,
            discount: item?.price?.price_discount_amount,
            item_variant: item?.basic_data?.attributes_text,
          };
        }),
      },
    });
  }, [order]);

  let conditions;
  if (order?.credit_card !== null && order) {
    if (order?.credit_card?.payment_status?.toLowerCase() === "approved") {
      conditions = (
        <div
          className={`mx-auto mt-0 grid w-[95%] grid-cols-2 gap-x-10 gap-y-10 md:divide-y md:divide-gray-200 lg:mt-[9rem] lg:w-[90%]`}
        >
          <div className="relative col-span-2 flex items-center justify-center px-5 text-center md:col-span-1 md:px-10">
            <div
              className={`md:after:absolute md:after:right-[30px] md:after:top-[30px] md:after:my-auto md:after:h-[90%] md:after:w-[1px] md:after:bg-gray-300`}
            ></div>
            <div className="flex items-center justify-center text-center">
              <div className="flex flex-col items-center gap-4 lg:p-[3.5rem]">
                <div>
                  <Image src={Image1} alt="Reflekta" width={200} height={200} />
                </div>
                <span className="text-lg font-medium">
                  BROJ PORUDŽBENICE: {order?.slug}
                </span>
                <span>
                  Uspešno ste izvršili plaćanje, račun Vaše platne kartice je
                  zadužen!
                </span>
                <span>Podaci o transakciji:</span>
                <span className="text-lg font-medium">
                  {" "}
                  Autorizacioni kod:{" "}
                  {order.credit_card.auth_code !== null
                    ? order.credit_card.auth_code
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Status transakcije:{" "}
                  {order.credit_card.payment_status !== null
                    ? order.credit_card.payment_status
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Kod statusa transakcije:{" "}
                  {order.credit_card.transaction_status_code !== null
                    ? order.credit_card.transaction_status_code
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Datum transakcije:{" "}
                  {order.credit_card.transaction_date !== null
                    ? order.credit_card.transaction_date
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  Statusni kod 3D transakcije:{" "}
                  {order.credit_card.status_code_3D_transaction !== null
                    ? order.credit_card.status_code_3D_transaction
                    : "-"}
                </span>
                <p className="mt-3 text-base">
                  Za sve dodatne informacije možete nas kontaktirati putem call
                  centra{" "}
                  <a href={`tel:${process.env.TELEPHONE}`}>
                    {process.env.TELEPHONE}
                  </a>{" "}
                  ili putem emaila{" "}
                  <a href={`mailto:${process.env.EMAIL}`}>
                    ${process.env.EMAIL}
                  </a>
                </p>
                <div>
                  <a href="/">
                    <button className="mt-10 rounded-[30px] bg-black px-10 py-4 font-medium text-white hover:bg-opacity-80">
                      Nastavi kupovinu{" "}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-span-2 grid h-min grid-cols-2 gap-x-[1.5rem] gap-y-[1.5rem] max-md:mt-5 md:col-span-1 md:py-10`}
          >
            <div
              className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
            >
              <h1
                className={`text- border-b-2 border-b-gray-300 font-semibold`}
              >
                Pregled porudžbenice
              </h1>
              <p className={`mt-2 text-sm`}>
                Broj porudžbenice:{" "}
                <span className={`font-semibold`}>{order?.order?.slug}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Status porudžbenice:{" "}
                <span className={`font-semibold text-yellow-500`}>
                  Na čekanju
                </span>
              </p>
            </div>
            <div
              className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
            >
              <h1
                className={`text- border-b-2 border-b-gray-300 font-semibold`}
              >
                Podaci o kupcu
              </h1>
              <p className={`mt-2 text-sm`}>
                Ime i prezime: &nbsp;
                <span className={`font-semibold`}>
                  {order?.billing_address?.first_name}{" "}
                  {order?.billing_address?.last_name}
                </span>
              </p>
              <p className={`mt-2 text-sm`}>
                E-mail:
                <span className={`font-semibold`}>
                  {" "}
                  {order?.billing_address?.email}
                </span>
              </p>

              <p className={`mt-2 text-sm`}>
                Adresa dostave:
                <span>
                  {" "}
                  {order?.shipping_address?.address}{" "}
                  {order?.shipping_address?.object_number} ,{" "}
                  {order?.shipping_address?.zip_code}
                  &nbsp;{order?.shipping_address?.town_name}
                </span>
              </p>
              <p className={`mt-2 text-sm`}>
                Telefon:
                <span>{order?.shipping_address?.phone}</span>
              </p>
            </div>
            <div
              className={`scrollCustom relative col-span-2 flex h-[245px] flex-col overflow-y-auto rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
            >
              <h1
                className={`text- border-b-2 border-b-gray-300 font-semibold`}
              >
                Poručeni artikli
              </h1>
              {order?.items?.map((item) => {
                return (
                  <Link href={`/${item?.basic_data?.slug}`}>
                    <div
                      className={`mt-3 flex items-center gap-10`}
                      key={item?.basic_data?.slug}
                    >
                      {item?.basic_data?.image && (
                        <Image
                          src={item?.basic_data?.image}
                          alt={``}
                          width={100}
                          height={100}
                        />
                      )}

                      <div className={`flex flex-col gap-y-1`}>
                        <p className={`text-sm font-semibold`}>
                          {item?.basic_data?.name}
                        </p>
                        <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                        <p
                          className={`mt-2 w-fit px-2 text-center text-xs font-bold`}
                        >
                          {currencyFormat(item?.price?.total)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div
              className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] pb-7 max-md:mb-5 xl:col-span-1`}
            >
              <h1
                className={`text- border-b-2 border-b-gray-300 font-semibold`}
              >
                Podaci o prodavcu
              </h1>
              <p className={`mt-2 text-sm`}>
                Naziv:
                <span className={`font-semibold`}>{process.env.NAME}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                PIB:
                <span className={`font-semibold`}> {process.env.PIB}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Adresa:
                <span className={`font-semibold`}> {process.env.ADDRESS}</span>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      conditions = (
        <div className="mt-0 flex items-center justify-center py-10 text-center lg:mt-[9rem]">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white p-6">
            <span className="text-lg font-medium">
              Plaćanje neuspešno, račun vaše platne kartice nije zadužen!
            </span>
            <span>
              Poštovani, Vaša kupovina je uspešno evidentirana ali plaćanje
              platnom karticom nije realizovano. Uskoro ćemo Vas kontaktirati
              radi realizacije Vaše kupovine.
            </span>

            <span className="text-lg font-medium">Podaci o transakciji:</span>
            <span className="text-lg font-medium">
              {" "}
              Autorizacioni kod:{" "}
              {order.credit_card.auth_code !== null
                ? order.credit_card.auth_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Status transakcije:{" "}
              {order.credit_card.payment_status !== null
                ? order.credit_card.payment_status
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Kod statusa transakcije:{" "}
              {order.credit_card.transaction_status_code !== null
                ? order.credit_card.transaction_status_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Datum transakcije:{" "}
              {order.credit_card.transaction_date !== null
                ? order.credit_card.transaction_date
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              Statusni kod 3D transakcije:{" "}
              {order.credit_card.status_code_3D_transaction !== null
                ? order.credit_card.status_code_3D_transaction
                : "-"}
            </span>
            <p className="mt-2 text-base">
              Za sve dodatne informacije možete nas kontaktirati putem call
              centra{" "}
              <a href={`tel:${process.env.TELEPHONE}`}>
                {process.env.TELEPHONE}
              </a>{" "}
              ili putem emaila{" "}
              <a href={`mailto:${process.env.EMAIL}`}>{process.env.EMAIL}</a>
            </p>
          </div>
        </div>
      );
    }
  } else {
    conditions = (
      <div
        className={`mx-auto mt-[0rem] grid grid-cols-2 gap-x-10 md:w-[90%] md:divide-y md:divide-gray-200 lg:mt-[9rem]`}
      >
        <div className="relative col-span-2 flex items-center justify-center text-center md:col-span-1 md:px-10 md:py-10">
          <div className="flex h-full flex-col items-center gap-4 rounded-lg bg-[#f0f0f080] p-[3.5rem]">
            <div>
              <Image src={Image1} alt="Reflekta" width={130} height={130} />
            </div>
            <div>
              <p className="text-lg font-medium">
                Uspešno ste napravili porudžbenicu!
              </p>
              <p className="text-base">Hvala Vam na ukazanom poverenju. </p>

              <p className="mt-2 text-sm">
                Uskoro ćemo Vas kontaktirati u cilju dodatnog informisanja.
              </p>
              <p className="mt-2 text-sm">
                Za sve dodatne informacije možete nas kontaktirati putem call
                centra{" "}
                <a href={`tel:${process.env.TELEPHONE}`}>
                  {process.env.TELEPHONE}
                </a>{" "}
                ili putem emaila{" "}
                <a href={`mailto:${process.env.EMAIL}`}>{process.env.EMAIL}</a>
              </p>
            </div>
            <div>
              <a href="/">
                <button className="mt-10 rounded-[30px] bg-black px-10 py-4 font-medium text-white hover:bg-opacity-80">
                  Nastavi kupovinu{" "}
                </button>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`col-span-2 grid grid-cols-2 gap-x-[1.5rem] gap-y-[1.5rem] max-md:mt-5 md:col-span-1 md:py-10`}
        >
          <div
            className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
          >
            <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
              Pregled porudžbenice
            </h1>
            <p className={`mt-2 text-sm`}>
              Broj porudžbenice:{" "}
              <span className={`font-semibold`}>{order?.order?.slug}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Status porudžbenice:{" "}
              <span className={`font-semibold text-yellow-500`}>
                Na čekanju
              </span>
            </p>
          </div>
          <div
            className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
          >
            <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
              Podaci o kupcu
            </h1>
            <p className={`mt-2 text-sm`}>
              Ime i prezime: &nbsp;
              <span className={`font-semibold`}>
                {order?.billing_address?.first_name}{" "}
                {order?.billing_address?.last_name}
              </span>
            </p>
            <p className={`mt-2 text-sm`}>
              E-mail:
              <span className={`font-semibold`}>
                {" "}
                {order?.billing_address?.email}
              </span>
            </p>

            <p className={`mt-2 text-sm`}>
              Adresa dostave:
              <span className={`font-semibold`}>
                {" "}
                {order?.shipping_address?.address}{" "}
                {order?.shipping_address?.object_number} ,{" "}
                {order?.shipping_address?.zip_code}
                &nbsp;{order?.shipping_address?.town_name}
              </span>
            </p>
            <p className={`mt-2 text-sm`}>
              Telefon:
              <span className={`font-semibold`}>
                &nbsp;{order?.shipping_address?.phone}
              </span>
            </p>
          </div>
          <div
            className={`scrollCustom relative col-span-2 flex h-[245px] flex-col overflow-y-auto rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
          >
            <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
              Poručeni artikli
            </h1>
            {order?.items?.map((item) => {
              return (
                <Link href={`/${item?.basic_data?.slug}`}>
                  <div
                    className={`mt-3 flex items-center gap-10`}
                    key={item?.basic_data?.slug}
                  >
                    {item?.basic_data?.image && (
                      <Image
                        src={item?.basic_data?.image}
                        alt={``}
                        width={100}
                        height={100}
                      />
                    )}

                    <div className={`flex flex-col gap-y-1`}>
                      <h1 className={`text-sm font-semibold`}>
                        {item?.basic_data?.name}
                      </h1>
                      <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                      <p
                        className={`mt-2 w-fit px-2 text-center text-xs font-bold`}
                      >
                        {currencyFormat(item?.price?.total)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] pb-7 max-md:mb-5 xl:col-span-1`}
          >
            <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
              Podaci o prodavcu
            </h1>
            <p className={`mt-2 text-sm`}>
              Naziv:
              <span className={`font-semibold`}> {process.env.NAME}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              PIB:
              <span className={`font-semibold`}> {process.env.PIB}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Adresa:
              <span className={`font-semibold`}> {process.env.ADDRESS}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div className={["orderDataContainer"]}>{conditions}</div>;
};

export default OrderSuccess;
