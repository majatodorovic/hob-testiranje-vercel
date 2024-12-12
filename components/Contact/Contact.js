"use client";
import { useState, useEffect, useCallback } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/app/api/api";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { get, post } from "@/app/api/api";

const Contact = () => {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const params = useSearchParams();
  const slug = params.get("slug");

  const requiredFields = [
    "customer_name",
    "phone",
    "email",
    "subject",
    "message",
    "accept_rules",
  ];
  //
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);
  //
  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
  });
  //

  useEffect(() => {
    if (slug) {
      const getProduct = async (slug) => {
        const getProduct = await get(
          `/product-details/basic-data/${slug}`,
        ).then((res) => {
          setProduct(res?.payload);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: `Upit za proizvod ${product?.data?.item?.basic_data?.name} (${product?.data?.item?.basic_data?.sku})`,
            company_sector: "",
            message: `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${product?.data?.item?.basic_data?.name} ${product?.data?.item?.basic_data?.sku}.\n\nHvala.`,
            accept_rules: false,
            gcaptcha: token,
          });
        });
      };
      getProduct(slug);
    } else return;
  }, [
    slug,
    product?.data?.item?.basic_data?.name,
    product?.data?.item?.basic_data?.sku,
  ]);

  const handleChange = ({ target }) => {
    let err = [];
    err = errors.filter((error) => error !== target.name);
    setErrors(err);

    if (target.name === "accept_rules") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };
  //
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
      setErrors(errors);
    });
    if (errors?.length > 0) {
      setLoading(false);
    } else {
      await POST(`/contact/contact_page`, {
        ...formData,
        gcaptcha: token,
      }).then((res) => {
        if (res?.code === 200) {
          toast.success("Uspešno ste poslali poruku!", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        } else {
          toast.error("Došlo je do greške! Pokušajte ponovo.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        }
      });
    }
  };
  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={refreshReCaptcha} />

      <div
        className={`mx-auto mt-5 grid w-[95%] grid-cols-5 gap-x-10 gap-y-10 lg:w-full lg:px-[3rem]`}
      >
        <div className={`col-span-5 lg:col-span-2`}>
          <div className="mt-1">
            <div className="rounded-[20px] bg-black/20 p-4">
              <div className="grid grid-cols-2 gap-2 lg:place-items-center">
                <div className="col-span-2 mr-auto lg:col-span-1">
                  <p className={`text-[30px] font-semibold leading-[30px]`}>
                    {" "}
                    HOB SHOP 1 ČAČAK
                  </p>
                </div>
                <div className="col-span-2 mr-auto lg:col-span-1">
                  <p className="">
                    <span className="font-semibold">Adresa:</span>{" "}
                    <Link
                      href="https://maps.app.goo.gl/MLsdknbYwLo2Nds28"
                      className="cursor-pointer hover:underline"
                    >
                      Sinđelićeva 25, lokal 8, 32000 Čačak
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span>{" "}
                    <Link
                      href="tel:+38132365934"
                      className="cursor-pointer hover:underline"
                    >
                      032/365 934
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span>{" "}
                    <Link
                      href="tel:+381600365935"
                      className="cursor-pointer hover:underline"
                    >
                      060/0 365 935
                    </Link>
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 16h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
              </div>
            </div>
            <div className="my-2 rounded-[20px] bg-black/20 p-4">
              <div className="grid grid-cols-2 gap-2 lg:place-items-center">
                <p className="col-span-2 text-[30px] font-semibold leading-[30px] lg:col-span-1">
                  HAIR&BEAUTY SHOP UŽICE
                </p>
                <div className="col-span-2 mr-auto lg:col-span-1">
                  <p className="mt-4">
                    <span className="font-semibold">Adresa:</span>
                    <Link
                      href="https://maps.app.goo.gl/GpCCfc1fWgbQ65EW8"
                      className="cursor-pointer hover:underline"
                    >
                      Nikole Pašića 39, 31000 Užice
                    </Link>{" "}
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span>{" "}
                    <Link
                      href="tel:+381313105198"
                      className="cursor-pointer hover:underline"
                    >
                      031/310 51 98
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span>
                    <Link
                      href="tel:+381600365939"
                      className="cursor-pointer hover:underline"
                    >
                      {" "}
                      060/0 365 939
                    </Link>
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 17h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
              </div>
            </div>

            <div className="my-2 rounded-[20px] bg-black/20 p-4">
              <div className="grid grid-cols-2 gap-2 lg:place-items-center">
                <p className="col-span-2 text-[30px] font-semibold leading-[30px] lg:col-span-1">
                  HAIR&BEAUTY SHOP KRAGUJEVAC
                </p>
                <div className="col-span-2 mr-auto lg:col-span-1">
                  <p className="mt-4">
                    <span className="font-semibold">Adresa:</span>{" "}
                    <Link
                      href="https://maps.app.goo.gl/VBrzSRvXo8v1GM3h8"
                      className="cursor-pointer hover:underline"
                    >
                      Svetozara Markovića 68/1, 34000 Kragujevac
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span>
                    <Link
                      href="tel:+38134258158"
                      className="cursor-pointer hover:underline"
                    >
                      {" "}
                      034/258 158
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Mob.tel:</span>{" "}
                    <Link
                      href="tel:+381600365938"
                      className="cursor-pointer hover:underline"
                    >
                      060/0 365 938
                    </Link>
                  </p>
                  <p>
                    <span className="block font-semibold">Radno vreme:</span>{" "}
                    <span className="font-semibold">PON-PET</span> od 09h do 17h
                    / <span className="font-semibold">SUB</span> od 09h do 13h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`col-span-5 mx-auto w-full lg:col-span-3`}
        >
          <p className={`mt-2 text-[1.5rem]`}>
            Ukoliko imate pitanja ili sugestije slobodno nam se obratite.
          </p>
          <p className={`mb-3 text-[1.5rem]`}>
            Odgovorićemo Vam u najkraćem roku.
          </p>
          <div
            className={`grid grid-cols-2 gap-5 rounded-[30px] border border-black p-2 lg:p-5`}
          >
            <div className={`col-span-2 flex flex-col gap-2 lg:col-span-1`}>
              <label className={`text-[1.5rem]`} htmlFor={`customer_name`}>
                Ime i prezime
              </label>
              <input
                required={true}
                type={`text`}
                value={formData.customer_name}
                name={`customer_name`}
                id={`customer_name`}
                onChange={handleChange}
                className={`${
                  errors.includes("customer_name")
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-[30px] bg-black/20 p-3 focus:border-[#b47c75] focus:outline-0 focus:ring-0`}
              />
            </div>
            <div className={`col-span-2 flex flex-col gap-2 lg:col-span-1`}>
              <label htmlFor={`phone`} className={`text-[1.5rem]`}>
                Telefon
              </label>
              <input
                required={true}
                type={`text`}
                value={formData.phone}
                name={`phone`}
                id={`phone`}
                onChange={handleChange}
                className={`${
                  errors.includes("phone")
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-[30px] bg-black/20 p-3 focus:border-[#b47c75] focus:outline-0 focus:ring-0`}
              />
            </div>
            <div className={`col-span-2 flex flex-col gap-2 lg:col-span-1`}>
              <label htmlFor={`email`} className={`text-[1.5rem]`}>
                Email
              </label>
              <input
                required={true}
                type={`email`}
                name={`email`}
                value={formData.email}
                id={`email`}
                onChange={handleChange}
                className={`${
                  errors.includes("email")
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-[30px] bg-black/20 p-3 focus:border-[#b47c75] focus:outline-0 focus:ring-0`}
              />
            </div>
            <div className={`col-span-2 flex flex-col gap-2 lg:col-span-1`}>
              <label htmlFor={`subject`} className={`text-[1.5rem]`}>
                Naslov poruke
              </label>
              <input
                required={true}
                type={`text`}
                value={formData.subject}
                name={`subject`}
                id={`subject`}
                onChange={handleChange}
                className={`${
                  errors.includes("subject")
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-[30px] bg-black/20 p-3 focus:border-[#b47c75] focus:outline-0 focus:ring-0`}
              />
            </div>
            <div className={`col-span-2 flex flex-col gap-2`}>
              <label htmlFor={`message`} className={`text-[1.5rem]`}>
                Poruka
              </label>
              <textarea
                name={`message`}
                id={`message`}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`${
                  errors.includes("message")
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-[30px] bg-black/20 p-3 focus:border-[#b47c75] focus:outline-0 focus:ring-0`}
              />
            </div>
            <div
              className={`col-span-2 flex flex-col items-start justify-between max-lg:gap-5 lg:flex-row lg:items-center`}
            >
              <div className={`flex items-center gap-2`}>
                <input
                  required={true}
                  type={`checkbox`}
                  name={`accept_rules`}
                  id={`accept_rules`}
                  value={formData.accept_rules}
                  onChange={handleChange}
                  className={`${
                    errors.includes("accept_rules")
                      ? "border-red-500"
                      : "border-slate-300"
                  } rounded-[30px] bg-black/20 p-3 text-[#b47c75] focus:outline-0 focus:ring-0`}
                />
                <label htmlFor={`accept_rules`}>
                  <span
                    className={`text-[1.5rem] ${
                      errors.includes("accept_rules")
                        ? "text-red-600"
                        : "text-black"
                    } `}
                  >
                    Slažem se sa{" "}
                    <Link
                      href={`/politika-privatnosti`}
                      className={`text-[#b47c75] underline`}
                    >
                      politikom privatnosti
                    </Link>{" "}
                    HOB shop-a.
                  </span>
                </label>
              </div>
              <div className={`max-lg:w-full`}>
                <button
                  type={`button`}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className={`${
                    loading ? `bg-[#b47c75]` : `bg-black`
                  } w-full rounded-lg px-5 py-2 text-[1.5rem] text-white transition-all duration-500 lg:hover:bg-[#b47c75]`}
                >
                  {loading ? (
                    <i
                      className={`fa fa-spinner fa-spin text-center text-white`}
                    ></i>
                  ) : (
                    `Pošalji`
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="workholder text-[1.5rem]">
            <h6 className="mb-3 font-medium">Ponuda za posao</h6>
            <p>
              Trenutno nemamo otvorenih pozicija ali smo u konstantnoj potrazi
              za kvalitetnim saradnicima, stoga, ukoliko ste zaniteresovani da
              radite za HOB svoju radnu biografiju možete poslati na e-mail{" "}
              <Link
                href="mailto:posao@hobbrandgroup.rs"
                className="font-semibold underline"
              >
                posao@hobbrandgroup.rs
              </Link>
            </p>
            <p className="mt-2">Hvala!</p>
          </div>
        </form>
      </div>
      <Footer />
    </Provider>
  );
};

export default Contact;
