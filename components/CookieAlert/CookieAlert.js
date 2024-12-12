"use client";
import Cookie from "../../assets/Icons/cookie.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CookieAlert = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(true);
  let cookiesExist = false;
  useEffect(() => {
    const isAllowedCookie = Cookies.get("cookiesAllowed");
    if (isAllowedCookie) cookiesExist = true;
    setCookiesAllowed(cookiesExist);
  }, [cookiesAllowed, cookiesExist]);

  
  return (
    <>
      {!cookiesAllowed && (
        <div className="fixed right-0 bottom-0 bg-white z-[30] px-[1rem] py-[2rem] max-lg:w-full w-[20%] shadow-2xl rounded-tl-2xl max-lg:rounded-t-2xl">
        <div className="flex flex-col gap-2 text-center mt-[1rem] items-center justify-center">
          <Image
            src={Cookie}
            alt="Cookie"
            width={50}
            height={50}
            className="object-contain self-start mx-auto"
          />
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-[14px] font-medium">
              Ova web stranica koristi kolačiće"
            </h2>
            <p className="text-[11px]">
              Koristimo kolačiće(cookies) da bismo učinili da ova web stranica pravilno funkcioniše i da bismo mogli dalje da unapređujemo web lokaciju kako bismo poboljšali Vaše korisničko iskustvo, personalizovani sadržaj i oglase, omogućili funkcije društvenih medija i analizirali saobraćaj. Nastavljajući da koristite našu web stranicu, prihvatate upotrebu kolačića.
            </p>
          </div>
        </div>
        <div className="border border-[#f0f0f0] p-2 flex flex-col justify-between items-center w-full my-3 rounded-lg">
 
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="cookie"
                  id="obavezni"
                  defaultChecked={true}
                  className="w-3 rounded h-3 text-black"
                />
                <label htmlFor="cookie" className="text-[11px]">
                  Obavezni
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="cookie"
                  id="Trajni"
                  defaultChecked={true}
                  className="w-3 rounded h-3 text-black"
                />
                <label htmlFor="cookie" className="text-[11px]">
                 Trajni


                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="cookie"
                  id="Statistika"
                  defaultChecked={true}
                  className="w-3 rounded h-3 text-black"
                />
                <label htmlFor="cookie" className="text-[11px]">
                  Statistika


                </label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="cookie"
                  id="Marketing"
                  defaultChecked={true}
                  className="w-3 rounded h-3 text-black"
                />
                <label htmlFor="cookie" className="text-[11px]">
                 Marketing


                </label>
              </div>
            </div>
        </div>
        <button
              className="text-[12px] bg-croonus-2 rounded-xl text-white px-4 py-2 hover:bg-opacity-80 ml-auto mt-2 flex"
              onClick={() => {
                Cookies.set("cookiesAllowed", true, { expires: 365 });
                setCookiesAllowed(true);
              }}
            > Slažem se
            </button>
      </div>
      )}
    </>
  );
};

export default CookieAlert;
