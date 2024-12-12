"use client";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../assets/Icons/404.png";

const notFound = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center max-md:mt-[13rem] max-md:w-[95%] lg:mt-[13rem]">
      <title>404 | HOB</title>
      <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-[#f8f8f8] p-10 text-center">
        <Image alt={``} src={Image1} alt="404" width={100} height={100} />
        <h1 className="text-[18px] font-bold">
          Stranica koju tražite ne postoji ili je premeštena.
        </h1>
        <h2 className="mt-3 text-[15px] font-normal">
          Proverite da li ste uneli ispravan URL.
        </h2>
        <Link href={`/`}>
          <button className="mt-5 bg-black px-10 py-4 font-medium text-white hover:bg-opacity-80">
            Vrati se na početnu stranu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default notFound;
