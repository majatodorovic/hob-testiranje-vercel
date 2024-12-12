"use client";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/master (1).webp";
import Image2 from "../../assets/Icons/visa.webp";
import Image3 from "../../assets/Icons/bancaIntesa.webp";
import Image4 from "../../assets/Icons/img1.webp";
import Image5 from "../../assets/Icons/img.webp";
import Image6 from "../../assets/Icons/img3.webp";
import Image7 from "../../assets/Icons/img4.webp";
import Image8 from "../../assets/Icons/american.webp";
import Instagram from "../../assets/Icons/instagram.png";
import Youtube from "../../assets/Icons/youtube.png";
import nailpolish from "@/assets/shapes/spilled-nailpolish.png";
import frakle from "@/assets/shapes/frakle.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import envelope from "@/assets/Icons/envelope.png";
import phone from "@/assets/Icons/phone.png";
import pin from "@/assets/Icons/pin.png";
import arrow from "@/assets/Icons/right-arrow.png";

const Footer = () => {
  const [open, setOpen] = useState({
    id: null,
  });

  const pathname = usePathname();

  return (
    <div className="footerbg mt-[14rem] max-md:mt-[3rem]">
      <Image
        src={nailpolish}
        width={600}
        height={1200}
        alt="HOB"
        className="absolute bottom-0 left-0 z-[1] max-md:opacity-[0.9]"
      />
      <div className="relative z-[2] mx-[5rem] flex items-center justify-center py-[2.625rem] max-xl:flex-col">
        <div className="md:ml-[12rem] md:mr-[3rem]">
          <Link href={`/`}>
            <Image
              src={"/logo.png"}
              width={400}
              height={200}
              alt="HOB Logo"
              objectFit="contain"
              layout="responsive"
              className="max-2xl:min-w-[200px] max-md:min-w-[120px]"
            />
          </Link>
        </div>

        <div className="flex items-center gap-[1.938rem] max-xl:mt-10 md:ml-[4rem]">
          <a
            href="https://www.instagram.com/hobbrandgroup/"
            target={"_blank"}
            className="cursor-pointer rounded-full bg-[#9f7361] p-5 transition-all duration-300 hover:scale-110"
          >
            <Image
              src={Instagram}
              width={20}
              height={20}
              alt="Instagram"
              className="invert"
            />
          </a>
        </div>
      </div>
      <div className="relative z-[2] mt-[4.8rem] flex items-center justify-center max-md:hidden max-md:flex-wrap md:gap-[44px] md:text-[1.5rem]">
        <Link href="/kako-kupiti" className="cursor-pointer hover:underline">
          Kako kupiti
        </Link>
        <Image src={frakle} width={10} height={10} alt="Hob" />

        <Link
          href="/politika-privatnosti"
          className="cursor-pointer hover:underline"
        >
          Politika privatnosti
        </Link>
        <Image src={frakle} width={10} height={10} alt="Hob" />
        <Link
          href="/uslovi-koriscenja"
          className="cursor-pointer hover:underline"
        >
          Uslovi korišćenja
        </Link>
        <Image src={frakle} width={10} height={10} alt="Hob" />
        <Link href="/reklamacije" className="cursor-pointer hover:underline">
          Reklamacije
        </Link>
        <Image src={frakle} width={10} height={10} alt="Hob" />
        <Link
          href="/pravo-na-odustajanje"
          className="cursor-pointer hover:underline"
        >
          Pravo na odustajanje
        </Link>
      </div>
      <div className="flex items-center max-md:w-full max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 md:hidden md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
        <div
          onClick={() => setOpen({ id: open?.id === 1 ? null : 1 })}
          className="flex flex-col gap-[40px] self-start max-md:self-center"
        >
          <div className="flex items-center gap-2 rounded-[20px] bg-[#9f7361] py-[2px] pl-5 pr-[2px] text-[1.063rem] text-white">
            Korisnička podrška
            <div
              className={`rounded-full px-2 py-2 ${open?.id === 1 ? "ease bg-[#fff3e7] transition-all" : "ease bg-[#9f7361] transition-all"}`}
            >
              <Image
                src={arrow}
                width={16}
                height={16}
                alt="HOB"
                className={` ${open?.id === 1 ? "ease rotate-[270deg] transition-all" : "ease rotate-[90deg] invert transition-all"}`}
              />
            </div>
          </div>

          {open?.id === 1 && (
            <div className="ease flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal transition-all">
              <Link
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/kako-kupiti" && "text-[#e10000]"
                }`}
                href="/kako-kupiti"
              >
                Kako kupiti
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/politika-privatnosti" && "text-[#e10000]"
                }`}
                href="/politika-privatnosti"
              >
                Politika privatnosti
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/uslovi-koriscenja" && "text-[#e10000]"
                }`}
                href="/uslovi-koriscenja"
              >
                Uslovi korišćenja
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/reklamacije" && "text-[#e10000]"
                }`}
                href="/reklamacije"
              >
                Reklamacije
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/pravo-na-odustajanje" && "text-[#e10000]"
                }`}
                href="/pravo-na-odustajanje"
              >
                Pravo na odustajanje
              </Link>
            </div>
          )}
        </div>
        <div
          onClick={() => setOpen({ id: open?.id === 2 ? null : 2 })}
          className="flex flex-col gap-[40px] self-start text-center max-md:self-center"
        >
          <div className="flex items-center gap-2 rounded-[20px] bg-[#9f7361] py-[2px] pl-5 pr-[2px] text-[1.063rem] text-white">
            O nama
            <div
              className={`rounded-full px-2 py-2 ${open?.id === 2 ? "ease bg-[#fff3e7] transition-all" : "ease bg-[#9f7361] transition-all"}`}
            >
              <Image
                src={arrow}
                width={16}
                height={16}
                alt="HOB"
                className={` ${open?.id === 2 ? "ease rotate-[270deg] transition-all" : "ease rotate-[90deg] invert transition-all"}`}
              />
            </div>
          </div>
          {open?.id === 2 && (
            <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/kontakt`}
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/o-nama" && "text-[#e10000]"
                }`}
              >
                Ponuda za posao
              </Link>
              <Link
                href={`/o-nama`}
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/o-nama" && "text-[#e10000]"
                }`}
              >
                Više o HOB-u
              </Link>
            </div>
          )}
        </div>
        <div
          onClick={() => setOpen({ id: open?.id === 3 ? null : 3 })}
          className="flex flex-col gap-[40px] self-start max-md:self-center"
        >
          <div className="flex items-center gap-2 rounded-[20px] bg-[#9f7361] py-[2px] pl-5 pr-[2px] text-[1.063rem] text-white">
            Možda te interesuje
            <div
              className={`rounded-full px-2 py-2 ${open?.id === 3 ? "ease bg-[#fff3e7] transition-all" : "ease bg-[#9f7361] transition-all"}`}
            >
              <Image
                src={arrow}
                width={16}
                height={16}
                alt="HOB"
                className={` ${open?.id === 3 ? "ease rotate-[270deg] transition-all" : "ease rotate-[90deg] invert transition-all"}`}
              />
            </div>
          </div>

          {open?.id === 3 && (
            <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/nokti`}
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/nokti" && "text-[#e10000]"
                }`}
              >
                Nokti
              </Link>
              <Link
                href={`/oprema-za-salone`}
                className={`cursor-pointer hover:text-[#e10000] ${
                  pathname === "/oprema-za-salone" && "text-[#e10000]"
                }`}
              >
                Oprema za salone
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="relative z-[2] mt-[3rem] flex justify-center max-md:mx-[1rem] max-md:flex-col max-md:gap-2 md:gap-[60px]">
        <div className="flex items-center gap-[18px]">
          <div className="rounded-full bg-[#9f7361] p-4">
            <Image src={pin} width={24} height={24} className="invert" />
          </div>
          <p className="cursor-pointer text-[1.5rem] hover:underline">
            {process.env.ADDRESS}
          </p>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="rounded-full bg-[#9f7361] p-4">
            <Image src={phone} width={24} height={24} className="invert" />
          </div>
          <p className="cursor-pointer text-[1.5rem] hover:underline">
            <Link href={`tel:${process.env.TELEPHONE}`}>
              {process.env.TELEPHONE}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="rounded-full bg-[#9f7361] p-4">
            <Image src={envelope} width={24} height={24} className="invert" />
          </div>
          <p className="cursor-pointer text-[1.5rem] hover:underline">
            <Link href={`mailto:${process.env.EMAIL}`}>
              {process.env.EMAIL}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative z-[2] mx-auto mt-[0.8rem] flex w-fit items-center justify-between border-b-2 border-b-black py-5 text-[#191919] max-xl:flex-col md:py-[2.75rem]">
        <div className="mx-[6rem] flex flex-col justify-center gap-[1.25rem] max-xl:mt-5 max-xl:w-full max-md:mt-10 xl:max-w-[520px] 2xl:max-w-[560px] 3xl:max-w-[578px]">
          <p className="text-center text-[0.813rem] max-md:mx-2 max-md:rounded-xl max-md:bg-[#9f7361]/10 max-md:px-1 max-md:py-1 max-md:backdrop-blur-sm md:font-extralight">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="text-center text-[0.813rem] max-md:mx-2 max-md:rounded-xl max-md:bg-[#9f7361]/10 max-md:px-1 max-md:py-1 max-md:backdrop-blur-sm md:font-extralight">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            kompletne i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva da su dostupni u svakom trenutku.
          </p>
          <div className="flex items-center justify-center gap-1 text-center max-lg:rounded-xl max-lg:bg-[#9f7361]/10 max-lg:backdrop-blur-sm max-md:mx-2 max-md:px-1 max-md:py-1 md:font-extralight">
            <div>
              <Link
                rel={"noreferrer noopener nofollow"}
                href="https://www.mastercard.rs/sr-rs/korisnici/pronadite-karticu.html"
                target="_blank"
              >
                <Image
                  src={Image1}
                  width={96}
                  height={60}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Link
                rel={"noreferrer noopener nofollow"}
                href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html"
                target="_blank"
              >
                <Image
                  src={Image2}
                  width={48}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Link
                href="https://www.bancaintesa.rs/"
                target="_blank"
                rel={"noreferrer noopener nofollow"}
              >
                <Image
                  src={Image3}
                  width={130}
                  height={70}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Image
                src={Image4}
                width={40}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image5}
                width={40}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image6}
                width={48}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image7}
                width={58}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image8}
                width={36}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[6] mx-[5rem] py-[1.25rem] text-center max-md:mx-auto max-md:w-[95%] max-md:flex-col max-md:gap-10">
        <div className="text-center text-[#191919] max-md:mx-2 max-md:rounded-xl max-md:bg-[#9f7361]/10 max-md:px-1 max-md:py-1 max-md:backdrop-blur-sm md:font-extralight">
          &copy; {new Date().getFullYear()} hobbrandgroup.rs | Sva prava
          zadržana. Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="bganimatethumb relative cursor-pointer hover:text-[#e10000]"
          >
            Croonus Technologies
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
