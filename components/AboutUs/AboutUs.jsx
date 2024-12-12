import Image from "next/image";
import leftimage from "@/public/images/2.jpg";
import rightimage from "@/public/images/1.jpg";
import logoimage from "@/assets/Images/logoimage.jpg";
import element from "@/assets/shapes/shape-little-meat.png";
import frakles from "@/assets/shapes/frakles.png";
import arrow from "@/assets/Icons/right-arrow.png";
import badge from "@/assets/Icons/badge.png";
import like from "@/assets/Icons/like.png";
import shampoo from "@/assets/Icons/shampoo.png";
import bubble from "@/assets/Icons/bubble.png";
import leaf from "@/assets/shapes/leaf-little-meat.png";
import Aos from "aos";
import Link from "next/link";
import { Button } from "@/_components/button";
import React from "react";

const AboutUs = () => {
  return (
    <div className="relative mx-[1rem] mt-[12rem] grid grid-cols-2 md:mx-[5rem] md:mt-[20rem]">
      <div className="order-1 col-span-1 max-md:order-2 max-md:col-span-2 max-md:mb-[13rem] max-md:mt-[3rem]">
        <div className="flex gap-2 md:gap-[2.6rem]">
          <div className="relative w-[460px]">
            <Image
              src={leftimage}
              width={460}
              height={560}
              alt="HOB"
              className="relative z-[3] rounded-b-[50px] rounded-tl-[290px] rounded-tr-[42px] max-md:min-w-[220px]"
            />
            <div className="absolute -left-[2rem] -top-[2rem] z-[1] h-[560px] w-[460px] rounded-b-[50px] rounded-tl-[290px] rounded-tr-[42px] border border-black max-md:hidden">
              {" "}
            </div>
          </div>

          <div className="relative">
            <Image
              src={`/slika2.jpg`}
              width={280}
              height={380}
              alt={`HOB`}
              className="relative z-[2] rounded-b-[50px] rounded-tl-[42px] rounded-tr-[290px] max-md:min-w-[120px] max-sm:right-[25px]"
            />
            <Image
              src={`/slika3.jpg`}
              width={400}
              height={600}
              alt={`HOB`}
              className="absolute z-[2] mt-2 min-w-[260px] rounded-b-[50px] rounded-tl-[290px] rounded-tr-[42px] max-sm:right-[25px] sm:mt-[2rem] md:right-[3rem] lg:min-w-[400px]"
            />
            <Image
              src={frakles}
              width={200}
              height={200}
              alt="HOB"
              className={`absolute bottom-[-8rem] right-[15rem] right-[18rem] z-[1] sm:-bottom-[17rem] sm:right-[18rem]`}
            />
          </div>
        </div>
      </div>

      <div className="order-2 col-span-1 flex flex-col justify-center max-3xl:pl-[1rem] max-md:order-1 max-md:col-span-2 3xl:px-[20%]">
        <div data-aos="fade-left" className="relative">
          <p className="relative z-[2] text-[1.5rem]">O nama</p>
          <Image
            src={element}
            width={180}
            height={100}
            alt="HOB"
            className="absolute -left-[1.8rem] -top-[3.6rem] z-[1]"
          />
        </div>
        <div data-aos="fade-left">
          <h5 className="relative mb-[1px] mt-[2rem] text-[40px] uppercase md:text-[66px] md:leading-[62px]">
            Dobrodošli u HOB
          </h5>
          <p className="mt-5 text-[1.5rem] leading-[23px]">
            Naša misija je da svaki naš kupac, bilo da je profesionalac ili
            jednostavno ljubitelj lepote, ima pristup najboljim proizvodima na
            tržištu.{" "}
          </p>
          <p className="font-ight mt-5 text-[24px] leading-[23px]">
            Zašto izabrati nas?
          </p>
        </div>
        <div className="mb-[1.6rem] mt-[3rem] flex flex-col gap-[1.8rem]">
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="flex items-center gap-[1.2rem]"
          >
            <div className="rounded-full bg-black p-4">
              <Image
                src={badge}
                width={30}
                height={30}
                alt="HOB"
                className="invert"
              />
            </div>
            <div>
              <h5 className="text-[24px] uppercase leading-[24px]">
                SAVRŠEN KVALITET
              </h5>
              <p className="">Kvalitet proizvoda je na prvom mestu.</p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="flex items-center gap-[1.2rem]"
          >
            <div className="rounded-full bg-black p-4">
              <Image src={bubble} width={30} height={30} alt="HOB" />
            </div>
            <div>
              <h5 className="text-[24px] uppercase leading-[24px]">
                Dostupni smo 24/7
              </h5>
              <p className="">Vama na usluzi!</p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="flex items-center gap-[1.2rem]"
          >
            <div className="rounded-full bg-black p-4">
              <Image
                src={like}
                width={30}
                height={30}
                alt="HOB"
                className="invert"
              />
            </div>
            <div>
              <h5 className="text-[24px] uppercase leading-[24px]">
                Zadovoljni korisnici
              </h5>
              <p className="">Usmereni smo na kupca i njegove potrebe.</p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="flex items-center gap-[1.2rem]"
          >
            <div className="rounded-full bg-black p-4">
              <Image
                src={shampoo}
                width={30}
                height={30}
                alt="HOB"
                className="invert"
              />
            </div>
            <div>
              <h5 className="text-[24px] uppercase leading-[24px]">
                Odličan izbor
              </h5>
              <p className="">Neverovatan izbor proizvođača u ponudi.</p>
            </div>
          </div>
        </div>
        <p className="mt-10 text-[1.5rem] leading-[23px] sm:mt-5">
          Radujemo se što možemo biti vaš partner u svetu lepote i nege.
        </p>
        <div>
          <Link href={`/o-nama`} className="mb-10 mt-12 block sm:mb-0 sm:mt-5">
            <Button>Pogledajte više</Button>
          </Link>
        </div>
      </div>
      <Image
        src={leaf}
        width={360}
        height={360}
        className="absolute -right-[8rem] top-[20rem] opacity-[0.2]"
      />
    </div>
  );
};

export default AboutUs;
