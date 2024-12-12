"use client";

import Image from "next/image";
import arrow from "@/assets/Icons/right-arrow.png";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`ease relative cursor-pointer rounded-[1.5rem] bg-[#fff3e6] py-[0.75rem] pl-6 pr-[4.875rem] text-[1.5rem] font-normal transition-all hover:bg-black hover:bg-opacity-[0.2] hover:text-white ${className}`}
    >
      {children}
      <span className="absolute right-[3px] top-[3px] flex h-[52px] w-[50px] items-center justify-center rounded-[50%] bg-black">
        <Image
          src={arrow}
          width={20}
          height={20}
          alt="HOB"
          className="invert"
        />
      </span>
    </button>
  );
};
