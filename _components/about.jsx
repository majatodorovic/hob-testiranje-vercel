"use client";
import { useState } from "react";
import image1 from "@/assets/Images/radnjaca.jpg";
import image2 from "@/assets/Images/radnjakg.jpg";
import image3 from "@/assets/Images/radnjaue.jpg";
import Image from "next/image";
import leaf from "@/assets/shapes/leaf-cut.png";
import Link from "next/link";
import aboutusimage from "@/assets/Images/aboutus.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import mapa1 from "@/assets/Images/mapa1.jpg";
import mapa2 from "@/assets/Images/mapa2.jpg";
import mapa3 from "@/assets/Images/mapa3.jpg";
import "swiper/css";
import Footer from "@/components/Footer/Footer";

export const About = () => {
  const [swiper, setSwiper] = useState(null);
  const images = [
    {
      id: 1,
      src: image1,
      name: "• HOB SHOP 1, Čačak •",
    },
    {
      id: 2,
      src: image2,
      name: "• HAIR&BEAUTY SHOP, Kragujevac •",
    },
    {
      id: 3,
      src: image3,
      name: "• HAIR&BEAUTY SHOP, Užice •",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col justify-center gap-3 max-lg:col-span-2">
          <Image
            src={leaf}
            width={540}
            height={380}
            alt="HOB"
            className="absolute left-0 top-[5.4rem] z-[3]"
          />
          <div className="mx-auto mt-[3rem] w-[95%] lg:w-full lg:px-[3rem]">
            <h1 className="text-[60px]">O nama</h1>
            <h3 className="text-[40px]">Dobrodošli u HOB.</h3>

            <h5 className="border-b border-black pb-5 text-[1.5rem]">
              Naša misija je da svaki naš kupac, bilo da je profesionalac ili
              jednostavno ljubitelj lepote, ima pristup najboljim proizvodima na
              tržištu.
            </h5>
            <h3 className="mt-6 text-[30px]">Naša priča</h3>
            <div className="mt-[1rem] text-[1.5rem]">
              HOB BRAND GROUP DOO Čačak je osnovan 2019. godine sa jasnom
              vizijom - da postanemo vodeći distributer alata, pribora, opreme i
              kozmetike najpoznatijeg dobavljača u zemlji i inostranstvu UNITECH
              DOO Novi Sad{" "}
              <Link
                href="https://unitech.rs/"
                className="cursor-pointer font-medium hover:underline"
              >
                (www.unitech.rs)
              </Link>
              .{" "}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center max-lg:col-span-2 max-lg:mt-[1rem] max-lg:px-[1rem]">
          <Image
            src={aboutusimage}
            width={0}
            height={0}
            sizes={`100vw`}
            alt="HOB"
            className="roundedcustom"
          />
        </div>
        <div className="col-span-1 max-lg:col-span-2">
          <div className="aboutusconatiner">
            <h3 className="mt-6 text-[30px]">Naši proizvodi</h3>
            <p className="mt-[1rem] text-[1.5rem]">
              Naš asortiman uključuje sve što vam je potrebno, od profesionalne
              kozmetike, alata za frizere i kozmetičare, opreme za salone, pa
              sve do proizvoda za ličnu upotrebu.
            </p>
            <p className="mt-2 text-[1.5rem]">
              Svi naši proizvodi su pažljivo odabrani kako bi zadovoljili
              najviše standarde kvaliteta.
            </p>
            <p className="mt-2 text-[1.5rem]">
              Tim stručnjaka kompanije UNITECH svakodnevno radi na izboru pravih
              proizvoda za naše tržište.
            </p>
            <h3 className="mt-6 text-[30px]">Naš tim</h3>
            <p className="mt-[1rem] text-[1.5rem]">
              Naš tim se sastoji od vrednih, mladih stručnjaka koji su uvek
              spremni da vam pomognu u odabiru pravih proizvoda.
            </p>
            <p className="mt-2 text-[1.5rem]">
              Bez obzira da li ste profesionalac ili tek počinjete, ovde smo da
              vam pružimo podršku.
            </p>
            <h3 className="mt-6 text-[30px]">Zašto izabrati nas</h3>
            <p className="mt-[1rem] text-[1.5rem]">
              Svi naši proizvodi dolaze sa garancijom kvaliteta, a naš tim za
              podršku je uvek tu da odgovori na sva vaša pitanja.
            </p>
            <p className="mt-2 text-[1.5rem]">Zato što smo:</p>
            <ul className={`text-[1.5rem]`}>
              <li>• Posvećeni</li>
              <li>• Vredni</li>
              <li>• Dobro organizovani</li>
              <li>• Usmereni na kupca i njegove potrebe</li>
              <li>• Dostupni 7/24</li>
            </ul>
            <p className="mt-2 text-[1.5rem]">
              Radujemo se što možemo biti vaš partner u svetu lepote i nege.
            </p>
            <Swiper
              className={`keen-slider mt-[2rem] !w-full`}
              navigation={false}
              modules={[Autoplay]}
              loop
              rewind
              onSwiper={(swiper) => {
                setSwiper(swiper);
              }}
              slidesPerView={1}
              spaceBetween={1}
              breakpoints={{
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 1,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 1,
                },
                1280: {
                  slidesPerView: 1,
                  spaceBetween: 1,
                },
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
            >
              {images?.map((item, index) => {
                return (
                  <SwiperSlide
                    key={item?.id}
                    className={`keen-slider__slide flex-col number-slide${
                      index + 1
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`relative`}>
                        <div className="h-[320px] w-full pt-[0.6rem] max-lg:flex max-lg:justify-center 2xl:h-[400px]">
                          <Image
                            src={item.src}
                            width={2222}
                            height={2222}
                            className="h-full rounded-[30px] object-cover"
                            alt={"HOB"}
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-[1.5rem]">{item.name}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="col-span-1 max-lg:col-span-2">
          <div className="containerightaboutus">
            <p className="mt-[2rem] text-[1.5rem] lg:text-end">
              Za sve dodatne informacije ili savete, slobodno nas kontaktirajte
              putem e-maila na info@hobbrandgroup.rs ili telefona:
              +381600365934.
            </p>
            <p className="mt-2 text-[1.5rem] lg:text-end">
              Pozivamo vas i da posetite naše prodajne centre u Čačku,
              Kragujevcu i Užicu.
            </p>
            <div className="shopholder">
              <div className="grid grid-cols-2 gap-5">
                <div className={`col-span-2 lg:col-span-1`}>
                  <p className="text-[1.5rem] font-semibold leading-[20px]">
                    HOB SHOP 1 ČAČAK
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Adresa:</span> Sinđelićeva
                    25, lokal 8, 32000 Čačak
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span> 032/365 934
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span> 060/0 365
                    935
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 16h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
                <Link
                  href="https://maps.app.goo.gl/MLsdknbYwLo2Nds28"
                  className="col-span-2 cursor-pointer lg:col-span-1"
                >
                  <Image
                    src={mapa1}
                    alt=""
                    width={340}
                    height={120}
                    className={`w-full`}
                  />
                </Link>
              </div>
            </div>
            <div className="shopholder">
              <div className="grid grid-cols-2 gap-5">
                <div className={`col-span-2 lg:col-span-1`}>
                  <p className="text-[1.5rem] font-semibold leading-[20px]">
                    HAIR&BEAUTY SHOP KRAGUJEVAC
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Adresa:</span> Svetozara
                    Markovića 68/1, 34000 Kragujevac
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span> 034/258 158
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span> 060/0 365
                    938
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 17h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
                <Link
                  href="https://maps.app.goo.gl/VBrzSRvXo8v1GM3h8"
                  className="col-span-2 cursor-pointer lg:col-span-1"
                >
                  <Image
                    src={mapa2}
                    alt=""
                    width={340}
                    height={120}
                    className={`w-full`}
                  />
                </Link>
              </div>
            </div>
            <div className="shopholder">
              <div className="grid grid-cols-2 gap-5">
                <div className={`col-span-2 lg:col-span-1`}>
                  <p className="text-[1.5rem] font-semibold leading-[20px]">
                    HAIR&BEAUTY SHOP UŽICE
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Adresa:</span> Nikole Pašića
                    39, 31000 Užice
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span> 031/310 51 98
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span> 060/0 365
                    939
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 17h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
                <Link
                  href="https://maps.app.goo.gl/GpCCfc1fWgbQ65EW8"
                  className="col-span-2 cursor-pointer lg:col-span-1"
                >
                  <Image
                    src={mapa3}
                    alt=""
                    width={340}
                    height={120}
                    className={`w-full`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
