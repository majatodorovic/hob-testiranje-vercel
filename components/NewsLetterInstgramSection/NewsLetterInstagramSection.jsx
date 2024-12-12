"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { post } from "@/app/api/api";
import { toast } from "react-toastify";
import send from "@/assets/Icons/send.png";
import aos from "aos";
const NewsLetterInstagramSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError(true);
    } else {
      setError(false);
      await post("/newsletter", { email: email }).then((response) => {
        if (!response?.code) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError(true);
        } else {
          setEmail("");
          setError(false);
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  useEffect(() => {
    aos.init();
  }, []);

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration={"2000"}
        className="mx-auto grid gap-14 md:px-[3rem] 3xl:mt-[4rem]"
      >
        <div className="self-center text-center">
          <h5 className="relative mx-auto w-fit text-[70px] text-black max-2xl:pt-3 max-md:text-[60px] 2xl:text-[100px]">
            Newsletter
          </h5>
          <p className="mx-auto my-5 w-[98%] text-[1.5rem] leading-[28px] text-black md:my-8 2xl:w-[40%] 2xl:leading-[36px]">
            Pretplatite se na naš newsletter kako biste bili u toku sa svim
            dešavanjima i novim proizvodima!
          </p>
          <form
            className="h-[68px relative mx-auto w-[60%] max-md:w-[90%] 2xl:w-[30%]"
            onSubmit={onSubmit}
          >
            <input
              placeholder="Unesite svoj email"
              title="Unesi svoj email"
              type="text"
              id="email"
              name="email"
              onChange={changeHandler}
              value={email}
              className={`${
                error ? "border-red-500" : "border-[#bbaea3]"
              } placeholder:text-normal w-full rounded-[40px] border bg-black bg-opacity-[0.2] px-4 py-[18px] pl-[30px] text-[1.5rem] placeholder:text-white focus:border-[#cecece] focus:outline-none focus:ring-0 max-md:w-full`}
            />
            <button
              className="absolute right-[3px] top-[3px] z-10 flex h-[64px] w-[68px] items-center justify-center rounded-full bg-[#9f7361]"
              type="submit"
            >
              <Image
                src={send}
                width={28}
                height={34}
                className="-rotate-[18deg] invert"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterInstagramSection;
