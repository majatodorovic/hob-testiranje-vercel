import Link from "next/link";
import Contact from "@/components/Contact/Contact";
import { Suspense } from "react";
import Image from "next/image";
import leaf from "@/assets/shapes/leaf-cut.png";

const Kontakt = () => {
  return (
    <>
      <Image
        src={leaf}
        width={540}
        height={380}
        alt="HOB"
        className="absolute left-0 top-[5.4rem] z-[0]"
      />
      <div className={`mx-auto mt-[3rem] w-[95%] lg:w-full lg:px-[3rem]`}>
        <h1 className="text-[60px]">Kontakt</h1>
      </div>
      <Suspense>
        <Contact />
      </Suspense>
    </>
  );
};

export default Kontakt;

export const metadata = {
  title: "Kontakt | HOB",
  description: "Kontakt",
};
