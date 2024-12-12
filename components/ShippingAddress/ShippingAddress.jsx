"use client";
import { useEffect, useState } from "react";
import { deleteMethod, list } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import pen from "../../assets/Icons/pen.png";
import trash from "../../assets/Icons/trash.png";

const ShippingAddresses = () => {
  const [shippingAddress, setShippingAddress] = useState();

  const fetchShippingAddresses = async () => {
    const response = await list("/customers/shipping-address/");
    setShippingAddress(response?.payload);
  };

  const deleteAddressHandler = (id) => {
    deleteMethod(`customers/shipping-address/${id}`)
      .then((response) => {
        if (response?.code === 200) {
          fetchShippingAddresses();
          toast.success("Uspešno ste izbrisali adresu.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setErrors("Greška.");
        }
        if (response?.code === 500 || response?.code === 400) {
          setErrors(
            "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.",
          );
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const response = await list("/customers/shipping-address/");
      setShippingAddress(response?.payload);
    };
    fetchShippingAddress();
  }, []);

  return (
    <div>
      <div className="mb-[2rem] flex min-h-[7rem] items-center justify-between gap-4 rounded-lg bg-[#f8f8f8] p-[1.4rem] max-md:flex-col sm:w-[90%]">
        <h1 className="pb-0 text-3xl">Adrese dostave</h1>
        <Link
          href="/nova-shipping-adresa"
          className="ease flex h-fit cursor-pointer whitespace-nowrap rounded-md px-[1rem] py-[0.6rem] text-xl font-semibold text-[#919191] opacity-[0.5] transition-all hover:translate-y-0.5 hover:opacity-100 max-sm:px-[0.5rem]"
        >
          <svg
            id="Capa_1"
            enable-background="new 0 0 611.802 611.802"
            height="20"
            viewBox="0 0 611.802 611.802"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g id="图层_x0020_1_31_">
                <path
                  clip-rule="evenodd"
                  d="m305.901 611.802c-17.973 0-32.676-14.703-32.676-32.676v-69.742-170.807h-170.807-69.742c-17.974 0-32.676-14.703-32.676-32.676 0-17.973 14.702-32.676 32.676-32.676h69.742 170.807v-170.807-69.742c0-17.974 14.702-32.676 32.676-32.676 17.973 0 32.676 14.702 32.676 32.676v69.742 170.807h170.807 69.742c17.973 0 32.676 14.702 32.676 32.676 0 17.973-14.703 32.676-32.676 32.676h-69.742-170.807v170.807 69.742c0 17.973-14.703 32.676-32.676 32.676z"
                  fill-rule="evenodd"
                  fill="#919191"
                />
              </g>
            </g>
          </svg>
          <span className="-mt-[0.2rem] ml-[0.4rem]">Dodaj novu adresu</span>
        </Link>
      </div>
      <table className="my-1rem mr-auto table w-[90%] table-fixed max-md:w-full">
        <tbody>
          <tr className="divide-x divide-white bg-croonus-2 text-white">
            <td className="rounded-tl-lg py-[0.7rem] pl-[1.4rem] max-sm:pl-[0.4rem] max-sm:text-sm">
              Ime adrese
            </td>
            <td className="py-[0.7rem] pl-[1.4rem] max-sm:pl-[0.4rem] max-sm:text-sm">
              Adresa
            </td>
            <td className="py-[0.7rem] pl-[1.4rem] max-sm:pl-[0.4rem] max-sm:text-sm">
              Detalji adrese
            </td>
            <td className="rounded-tr-lg py-[0.7rem] pl-[1.4rem] max-sm:pl-[0.4rem] max-sm:text-sm">
              Akcija
            </td>
          </tr>
          {shippingAddress?.items?.map((address, index) => {
            return (
              <>
                <tr
                  className={`divide-x divide-white ${index % 2 !== 0 ? "bg-[#ededed]" : "bg-croonus-gray"}`}
                >
                  <td className="py-[0.7rem] max-sm:pl-[0.4rem] max-sm:text-sm md:pl-[1.4rem]">
                    {address?.name}
                  </td>
                  <td className="py-[0.7rem] max-sm:pl-[0.4rem] max-sm:text-sm md:pl-[1.4rem]">
                    {address?.address}
                  </td>
                  <td className="py-[0.7rem] pl-[0.4rem] max-sm:text-sm md:pl-[1.4rem]">
                    <Link
                      href={`/customer-shipping/${address?.id}`}
                      className="max-sm:text-sm"
                    >
                      Pogledajte više
                    </Link>
                  </td>

                  <td className="py-[0.7rem] pl-[0.4rem] sm:pl-[2rem]">
                    <div className="flex">
                      <Link
                        href={`/customer-shipping/${address?.id}`}
                        className="ease mr-[0.8rem] cursor-pointer transition-all hover:translate-y-0.5"
                      >
                        <Image
                          src={pen}
                          alt="change address"
                          width={22}
                          height={22}
                        />
                      </Link>
                      <span className="font-thin">/</span>
                      <button
                        className="ease ml-[0.8rem] cursor-pointer transition-all hover:translate-y-0.5"
                        onClick={() => {
                          deleteAddressHandler(address?.id);
                        }}
                      >
                        <Image
                          src={trash}
                          alt="delete address"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShippingAddresses;
