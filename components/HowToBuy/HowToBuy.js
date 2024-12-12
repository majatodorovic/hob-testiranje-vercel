"use client";

import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import howtobuy1 from "@/assets/Images/kakokupiti.png";
import howtobuy2 from "@/assets/Images/kakokupiti2.png";
import howtobuy3 from "@/assets/Images/kakokupiti3.png";
import arrow from "@/assets/Icons/arrow.png";
import arrowrevert from "@/assets/Icons/arrowrevert.png";

const HowToBuy = () => {
  return (
    <>
      <div className="mx-auto mt-[1.2rem] max-md:mx-auto max-md:w-[95%] md:mt-[6rem] md:w-[80%]">
        <h1 className="pb-10 text-center text-[40px] text-[#191919] max-md:text-[1rem]">
          KAKO KUPITI
        </h1>
        <div>
          <div className="margin10 relative flex flex-col gap-[4rem]">
            <div className="w90 mx-auto mt-[3rem] grid grid-cols-3 max-md:overflow-hidden">
              <div className="col-span-2 max-md:col-span-3">
                <Image
                  src={howtobuy1}
                  alt="Dragacevka"
                  className="w-full rounded-[30px] shadow-2xl"
                />
              </div>
              <div className="relative col-span-1 mt-[5rem] flex flex-col justify-center gap-5 max-md:col-span-3 max-md:mt-[3rem] md:pl-[2rem]">
                <p className="pposition text-[20px] text-croonus-2">
                  U gornjem delu naše stranice nalazi se dugme{" "}
                  <span className="font-bold">"Proizvodi" (1)</span> . Klikom na
                  njega, otvoriće se stranica sa svim proizvodima sa našeg šopa.{" "}
                </p>
                <p className="pposition text-[20px]">
                  Ukoliko za određeni proizvod imate šifru artikla, uvek možete
                  iskoristiti{" "}
                  <span className="font-bold">polje za pretragu (2)</span> koje
                  se nalazi u gornjem desnom uglu.
                </p>
                <Image
                  src={arrow}
                  alt="Dragacevka zlatna"
                  className="arrowposition max-md:hidden"
                />
              </div>
            </div>
            <div className="w90 mt10 mx-auto grid grid-cols-3 max-md:mt-[3rem]">
              <div className="relative col-span-1 flex flex-col justify-center gap-5 max-md:order-2 max-md:col-span-3 md:pr-[2rem]">
                <p className="mt-[5rem] text-[20px] text-croonus-2 max-md:mt-[3rem]">
                  Kada pronađete proizvod koji želite da naručite, kliknite na
                  njegovu sliku ili naziv proizvoda, gde će Vam izaći{" "}
                  <span className="font-bold">detaljne informacije (3)</span> o
                  proizvodu koji Vas zanima.{" "}
                </p>
                <p className="text-[20px] text-croonus-2">
                  Ukoliko je to proizvod koji želite da poručite kliknite na{" "}
                  <span className="font-bold">dugme DODAJTE U KORPU (4)</span> .
                </p>
                <Image
                  src={arrowrevert}
                  alt="Dragacevka zlatna"
                  className="arrowpositionrevert max-md:hidden"
                />
              </div>
              <div className="col-span-2 max-md:order-1 max-md:col-span-3">
                <Image
                  src={howtobuy2}
                  alt="Dragacevka"
                  className="w-full rounded-[30px] shadow-2xl"
                />
              </div>
            </div>
            <div className="w90 mt10 mx-auto grid grid-cols-3 max-md:mt-[3rem]">
              <div className="col-span-2 max-md:col-span-3">
                <Image src={howtobuy3} alt="Dragacevka" className="w-full" />
              </div>
              <div className="relative col-span-1 flex flex-col justify-center gap-5 max-md:col-span-3 max-md:pl-0 md:pl-[2rem]">
                <p className="text-[20px] text-croonus-2 max-md:mt-[3rem]">
                  Nakon završenog dodavanja željenih proizvoda u korpu, ulaskom
                  u korpu popunjavate
                  <span className="font-bold"> Vaše informacije (5)</span> o
                  dostavi, načinu dostave i načinu plaćanja.{" "}
                </p>
                <p className="text-[20px] text-croonus-2">
                  Kada proverite da li su svi artikli naručeni kako želite i
                  kliknete na{" "}
                  <span className="font-bold">
                    dugme POTVRDI PORUDŽBENICU (8)
                  </span>{" "}
                  time ste završili Vaš proces naručivanja na našem shopu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowToBuy;
