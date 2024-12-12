"use client";
import { useState } from "react";
import Image from "next/image";
import { post } from "@/app/api/api";
import Link from "next/link";
import back from "@/assets/Icons/right-chevron.png";
import hide from "@/assets/Icons/hide-password.png";
import show from "@/assets/Icons/show-password.png";
import { useRouter } from "next/navigation";
import classes from "@/components/Registration/Registration.module.css";
import { toast } from "react-toastify";
const ResetPasswordComponent = ({ token }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pin: "",
    password: "",
    passwordconfirmed: "",
    token: token,
  });
  const required = ["pin", "password", "token"];
  const [errors, setErrors] = useState([]);

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    if (target.type === "radio" && target.checked) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };
  const formSubmitHandler = () => {
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (
        (required.includes(key) && (item === "" || item == null)) ||
        (required.includes(key) && (item === "" || item == null))
      ) {
        err.push(key);
      }
    }

    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        pin: formData.pin,
        password: formData.password,
        token: formData.token,
      };
      if (errors.length === 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      post("/customers/sign-in/reset-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success("Uspešno ste resetovali šifru.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/nalog");
          } else {
            toast.error("Greška. Proverite da li ste uneli ispravne podatke.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          if (response?.code === 500 || response?.code === 400) {
            toast.error("Greška. Proverite da li ste uneli ispravne podatke.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((error) => console.warn(error));
    }
  };

  const errorMsg = "Polje je obavezno";
  const errorSelect = "Morate izabrati jednu opciju";
  const errorCheck = "Morate prihvatiti uslove";

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
  };

  return (
    <div className="mx-auto mb-[6rem] mt-[3rem] flex w-[90%]">
      <div>
        <Link href="/nalog">
          <div className="ease ml-[1re] mr-[4rem] mt-[0.4rem] cursor-pointer rounded-[50%] bg-croonus-3 p-[0.4rem] text-white transition-all hover:translate-y-0.5">
            <Image
              src={back}
              alt="back button"
              className="rotate-180 transform invert"
              width={22}
              height={22}
            />
          </div>
        </Link>
      </div>
      <div></div>
      <div>
        <h3 className="mb-[2rem] ml-[4rem] mt-1 pb-0 text-3xl">
          Resetujte lozinku
        </h3>
        <div className="mb-[1.4rem] flex flex-col">
          <label htmlFor="pin" className="mb-[0.4rem]">
            Unesite PIN koji ste dobili na mail:{" "}
            <span className="snap-mandatory text-red-500">*</span>
          </label>
          <input
            onChange={formChangeHandler}
            type="text"
            id="pin"
            name="pin"
            value={formData.pin}
            className={`h-[58px] text-black max-sm:text-sm ${
              errors.includes("pin")
                ? "border-red-500 focus:border-red-500"
                : "border-none focus:border-none"
            } bg-[#f5f5f6] focus:ring-0 max-xl:mx-3`}
            placeholder="PIN*"
          />
        </div>
        <div className="flex">
          <div className="mb-[1.4rem] mr-[0.4rem] flex flex-col">
            <label htmlFor="password" className="mb-[0.4rem]">
              Unesite novu lozinku:{" "}
              <span className="snap-mandatory text-red-500">*</span>
            </label>
            <input
              onChange={formChangeHandler}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              className={`h-[58px] text-black max-sm:text-sm ${
                errors.includes("password")
                  ? "border-red-500 focus:border-red-500"
                  : "border-none focus:border-none"
              } bg-[#f5f5f6] focus:ring-0 max-xl:mx-3`}
              placeholder="Nova lozinka*"
            />
          </div>
          <button onClick={togglePasswordVisibility}>
            {showPassword ? (
              <Image src={hide} alt="hide password" width={22} height={22} />
            ) : (
              <Image src={show} alt="show password" width={22} height={22} />
            )}
          </button>
          <div className="ml-[1.4rem] mr-[0.4rem] flex flex-col">
            <label htmlFor="password" className="mb-[0.4rem]">
              Potvrdite lozinku:{" "}
              <span className="snap-mandatory text-red-500">*</span>
            </label>
            <input
              onChange={formChangeHandler}
              type={showPassword2 ? "text" : "password"}
              id="passwordconfirmed"
              name="passwordconfirmed"
              value={formData.passwordconfirmed}
              className={`h-[58px] text-black max-sm:text-sm ${
                errors.includes("passwordconfirmed")
                  ? "border-red-500 focus:border-red-500"
                  : "border-none focus:border-none"
              } bg-[#f5f5f6] focus:ring-0 max-xl:mx-3`}
              placeholder="Potvrda lozinke*"
            />
          </div>
          <button onClick={togglePasswordVisibility2}>
            {showPassword2 ? (
              <Image src={hide} alt="hide password" width={22} height={22} />
            ) : (
              <Image src={show} alt="show password" width={22} height={22} />
            )}
          </button>
        </div>
        <button
          onClick={formSubmitHandler}
          className="mr-4 bg-croonus-3 px-[2rem] py-[0.8rem] text-white hover:bg-opacity-80"
        >
          Sačuvaj
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
