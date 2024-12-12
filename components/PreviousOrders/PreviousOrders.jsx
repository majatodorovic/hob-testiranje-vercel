"use client";
import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";

import pen from "../../assets/Icons/pen.png";

const PreviousOrders = () => {
  const [previousOrders, setPreviousOrders] = useState();

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      const fetchPreviousOrders = await list(
        "/customers/previous-orders/",
      ).then((response) => {
        setPreviousOrders(response?.payload);
      });
      return fetchPreviousOrders;
    };
    fetchPreviousOrders();
  }, []);

  return (
    <>
      <div className="max-md:hidden">
        <div className="mb-[2rem] mt-5 min-h-[7rem] items-center justify-between rounded-lg bg-[#f8f8f8] p-[1.4rem] sm:w-[90%]">
          <h1 className="pb-0 text-3xl max-sm:mt-3">Prethodne kupovine</h1>
        </div>
        <table className="my-1rem mr-auto table w-[90%] table-fixed max-md:w-full">
          <tbody>
            <tr className="divide-x divide-white bg-croonus-2 text-white">
              <td className="rounded-tl-lg py-[0.7rem] pl-[1.4rem]">#</td>
              <td className="py-[0.7rem] pl-[1.4rem]">Datum i vreme</td>
              <td className="py-[0.7rem] pl-[1.4rem]">Ukupan iznos</td>
              <td className="rounded-tr-lg py-[0.7rem] pl-[1.4rem]">Detalji</td>
            </tr>
            {previousOrders?.items?.map((order, index) => {
              return (
                <>
                  <tr
                    className={`divide-x divide-white ${
                      index % 2 !== 0 ? "bg-[#ededed]" : "bg-croonus-gray"
                    }`}
                  >
                    <td className="py-[0.7rem] pl-[1.4rem]">{order?.slug}</td>
                    <td className="py-[0.7rem] pl-[1.4rem]">
                      {order?.created_at}
                    </td>
                    <td className="py-[0.7rem] pl-[1.4rem]">
                      {order?.total_with_vat}
                    </td>
                    <td className="py-[0.7rem] pl-[1.4rem]">
                      <Link href={`/customer-orders/${order?.order_token}`}>
                        Pogledajte više
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        <div className="mb-[2rem] flex min-h-[7rem] items-center justify-between rounded-lg bg-[#f8f8f8] p-[1.4rem] sm:w-[90%]">
          <h1 className="pb-0 text-3xl">Prethodne kupovine</h1>
        </div>
        {previousOrders?.items?.map((order, index) => {
          return (
            <>
              <div className="mb-[2rem] rounded-lg border border-[#f0f0f0]">
                <h5 className="rounded-tl-lg rounded-tr-lg bg-[#d3c2a8] p-2 text-lg">
                  Porudžbenica{" "}
                  <span className="font-medium">{order?.slug}</span>
                </h5>
                <p className="ml-[0.4rem] mt-[1rem] font-light">
                  Kreirana:{" "}
                  <span className="font-medium">{order?.created_at}</span>
                </p>
                <p className="ml-[0.4rem] font-light">
                  Ukupan iznos porudžbine:{" "}
                  <span className="font-medium">{order?.total_with_vat}</span>
                </p>
                <div className="ml-[0.4rem] mt-[2rem] py-[0.7rem] font-medium">
                  <Link href={`/customer-orders/${order?.id}`}>
                    Pogledajte više
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default PreviousOrders;
