import React from "react";
import { convertDate } from "@/helpers/convertDate";
import Image from "next/image";

const CampaignsDetails = ({ campaignsDate }) => {
  return (
    <div className="mt-5 flex justify-between border-[#8e7c7a] border-b items-center">
      <h3 className="text-[15px] text-[#8e7c7a] font-light md:font-extralight pb-1">
        {`Akcijska cena važi od ${
          convertDate(campaignsDate?.from)?.shortDate
        } do ${convertDate(campaignsDate?.to)?.fullDate}`}{" "}
        god.
      </h3>
      {/*<button className="flex  pb-3">*/}
      {/*  <Image*/}
      {/*    src={"/icons/discount.svg"}*/}
      {/*    width={20}*/}
      {/*    height={20}*/}
      {/*    className="mr-3"*/}
      {/*  />*/}
      {/*  <h3 className="text-[17px] text-[#666666] font-normal">*/}
      {/*    {" "}*/}
      {/*    Obavesti me o sniženju*/}
      {/*  </h3>*/}
      {/*</button>*/}
    </div>
  );
};

export default CampaignsDetails;
