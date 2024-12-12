import React from "react";
import Image from "next/image";
import Cancel from "../../assets/Icons/cancel.png";

const ReturnModal = ({ returnModal, setReturnModal }) => {
  return (
    <div
      className={
        returnModal
          ? `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-100 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
          : `fixed left-0 top-0 z-[101] flex h-screen w-screen scale-0 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`
      }
    >
      <div
        className={`flex flex-col rounded-lg bg-white p-[40px] max-md:overflow-y-scroll md:h-[490px] md:w-[890px]`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold">Dostupnost proizvoda</p>
          <Image
            src={Cancel}
            alt="cancel"
            width={20}
            height={20}
            onClick={() => setReturnModal(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-[4.375rem]">
          <p className="text-[15px] font-light">
            Na našem sajtu možete pregledati širok asortiman proizvoda. Trudimo
            se da svi artikli budu dostupni u svakom trenutku i u željenim
            količinama.
          </p>
          <p className="mt-[10px] text-[15px] font-light">
            Molimo vas za razumevanje ukoliko neki proizvod trenutno nije na
            raspolaganju.
          </p>
          <p className="mt-[10px] text-[15px] font-light">
            Naši operateri će vas kontaktirati putem e-maila ili telefona radi
            konačne potvrde vaše porudžbine.
          </p>
          <p className="mt-[30px] text-[15px] font-light">
            Hvala vam na razumevanju i poverenju.
          </p>
          <p className="mt-[10px] text-[15px] font-light">HOB tim</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
