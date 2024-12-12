"use client";
import { useEffect, useState } from "react";
import { get, post } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import back from "../../assets/Icons/right-chevron.png";

const Billing = () => {
  const [customerData, setCustomerData] = useState();
  const [gender, setGender] = useState(customerData?.gender ?? "");
  const [disabled, setDisabled] = useState(true);
  const path = useParams();
  const id = path?.id;
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [data, setData] = useState({
    id: customerData?.id,
    id_customer: customerData?.id_customer,
    customer_type: customerData?.customer_type,
    name: customerData?.name,
    first_name: customerData?.first_name,
    last_name: customerData?.last_name,
    phone: customerData?.phone,
    email: customerData?.email,
    zip_code: customerData?.zip_code,
    address: customerData?.address,
    object_number: customerData?.object_number,
    id_town: customerData?.id_town,
    town_name: customerData?.town_name,
    id_country: customerData?.id_country,
    company_name: customerData?.company_name,
    pib: customerData?.pib,
    maticni_broj: customerData?.maticni_broj,
    note: null,
    set_default: 0,
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      const fetchCustomerData = await get(
        `/customers/billing-address/${id}`,
      ).then((response) => {
        setCustomerData(response?.payload);
      });
      return fetchCustomerData;
    };
    fetchCustomerData();
  }, []);

  useEffect(() => {
    setData({
      id: customerData?.id,
      id_customer: customerData?.id_customer,
      customer_type: customerData?.customer_type,
      name: customerData?.name,
      first_name: customerData?.first_name,
      last_name: customerData?.last_name,
      phone: customerData?.phone,
      email: customerData?.email,
      zip_code: customerData?.zip_code,
      address: customerData?.address,
      object_number: customerData?.object_number,
      id_town: customerData?.id_town,
      town_name: customerData?.town_name,
      id_country: customerData?.id_country,
      company_name: customerData?.company_name,
      pib: customerData?.pib,
      maticni_broj: customerData?.maticni_broj,
      note: customerData?.note,
      set_default: customerData?.set_default,
    });
  }, [customerData]);

  const formChangeHandler = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };
  const changeInputHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        id: data?.id,
        id_customer: data?.id_customer,
        customer_type: data?.customer_type,
        name: data?.name,
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone: data?.phone,
        email: data?.email,
        zip_code: data?.zip_code,
        address: data?.address,
        object_number: data?.object_number,
        id_town: data?.id_town,
        town_name: data?.town_name,
        id_country: data?.id_country,
        company_name: data?.company_name,
        pib: data?.pib,
        maticni_broj: data?.maticni_broj,
        note: data?.note,
        set_default: data?.set_default,
      };
      post("/customers/billing-address", ret)
        .then((response) => {
          setDisabled(true);
          response?.code === 200
            ? toast.success("Uspešno ste izmenili podatke.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            : toast.error(
                "Došlo je do nepoznate greške prilikom čuvanja podataka. Molimo pokušajte ponovo.",
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                },
              );
        })
        .catch((error) => console.warn(error));
    }
  };
  const [countries, setCountries] = useState([]);
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      await get(`/customers/billing-address/ddl/id_country`).then((res) => {
        setCountries(res?.payload);
      });
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (towns?.length === 0) {
      setData((prevData) => ({
        ...prevData,
        id_town: null,
      }));
    }
  }, [towns]);

  return (
    <>
      <div className="relative">
        <button
          className="ease absolute ml-[1re] mt-[0.4rem] min-w-[2.2rem] cursor-pointer rounded-[50%] bg-croonus-3 p-[0.4rem] text-white transition-all hover:translate-y-0.5 max-sm:mr-[0.6rem] sm:mr-[4rem] md:left-4 md:top-4"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            alt="back button"
            className="rotate-180 transform invert"
            width={22}
            height={22}
          />
        </button>
      </div>
      <div>
        <div className="mb-[3rem] rounded-lg bg-[#f8f8f8] p-[1.4rem] md:w-[70%]">
          <h1 className="mb-[1rem] ml-[3rem] pb-0 text-3xl">Plaćanje</h1>
          <h3 className="text-base font-normal text-[#919191] max-sm:ml-[4rem]">
            &#62; Detalji adrese
          </h3>
        </div>
        <div>
          <div className="my-4 grid grid-cols-3 gap-3 md:w-[70%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Ime adrese:{" "}
                <span className="snap-mandatory text-red-500">*</span>
              </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] text-black max-sm:text-sm`}
                type="text"
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                defaultValue={customerData?.name}
                disabled={disabled}
                onChange={formChangeHandler}
                id="name"
                name="name"
                placeholder="Ime adrese*"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Ime: <span className="snap-mandatory text-red-500">*</span>
              </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] text-black max-sm:text-sm`}
                type="text"
                onChange={formChangeHandler}
                disabled={disabled}
                id="first_name"
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }));
                }}
                defaultValue={customerData?.first_name}
                name="first_name"
                placeholder="Ime*"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="surname">
                Prezime: <span className="snap-mandatory text-red-500">*</span>
              </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                type="text"
                onChange={formChangeHandler}
                disabled={disabled}
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }));
                }}
                defaultValue={customerData?.last_name}
                id="surname"
                name="last_name"
                placeholder="Prezime*"
              />
            </div>
          </div>
          <div className="mb-[1rem] mt-[2rem] grid grid-cols-2 gap-x-10 pb-4 max-xl:text-base md:w-[70%]">
            <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
              <div className="flex flex-col gap-2 max-xl:mt-2">
                <label htmlFor="address">
                  Broj telefona:
                  <span className="snap-mandatory text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                  defaultValue={customerData?.phone}
                  id="phone"
                  onChange={formChangeHandler}
                  disabled={disabled}
                  className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                  placeholder="Broj telefona*"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">
                  Email:
                  <span className="snap-mandatory text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={formChangeHandler}
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  defaultValue={customerData?.email}
                  disabled={disabled}
                  id="email"
                  className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                  placeholder="Email*"
                />
              </div>
            </div>
          </div>
          <div className="my-4 grid grid-cols-3 gap-3 md:w-[70%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="customer_type">Tip kupca:</label>
              <select
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                value={customerData?.customer_type}
                disabled={disabled}
                id="customer_type"
                onChange={formChangeHandler}
                name="customer_type"
              >
                <option value="">Izaberite</option>
                <option value="personal">Personal</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Adresa:</label>
              <input
                type="text"
                name="address"
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
                defaultValue={customerData?.address}
                onChange={formChangeHandler}
                disabled={disabled}
                id="address"
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                placeholder="Adresa"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="object_number">Broj objekta: </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                type="text"
                id="object_number"
                onChange={formChangeHandler}
                disabled={disabled}
                name="object_number"
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    object_number: e.target.value,
                  }));
                }}
                defaultValue={customerData?.object_number}
                placeholder="Broj objekta"
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-3 gap-3 md:w-[70%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="id_country">Drzava:</label>

              <select
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                id="id_country"
                disabled={disabled}
                value={customerData?.id_country}
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    id_country: e.target.value,
                  }));
                }}
                onChange={(e) => {
                  formChangeHandler(e);
                  get(
                    `/customers/shipping-address/ddl/id_town?id_country=${e.target.value}`,
                  ).then((res) => {
                    setTowns(res?.payload);
                  });
                }}
                name="id_country"
              >
                {countries?.map((item) => {
                  return (
                    <option value={item?.id} name="id_country">
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {data?.id_country !== null && towns?.length > 0 ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="id_town">Grad:</label>

                <select
                  className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                  id="id_town"
                  onChange={formChangeHandler}
                  name="id_town"
                  disabled={disabled}
                  value={customerData?.id_town}
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      id_town: e.target.value,
                    }));
                  }}
                >
                  {towns?.map((item) => {
                    return (
                      <option value={item?.id} name="id_town">
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="town_name">Grad:</label>
                  <input
                    type={`text`}
                    className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                    onInput={(e) => {
                      setData((prev) => ({
                        ...prev,
                        town_name: e.target.value,
                      }));
                    }}
                    defaultValue={customerData?.town_name}
                    id="town_name"
                    disabled={disabled}
                    onChange={formChangeHandler}
                    name="town_name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="zip_code">Postanski broj:</label>
                  <input
                    type={`text`}
                    className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                    onInput={(e) => {
                      setData((prev) => ({
                        ...prev,
                        zip_code: e.target.value,
                      }));
                    }}
                    defaultValue={customerData?.zip_code}
                    disabled={disabled}
                    id="zip_code"
                    onChange={formChangeHandler}
                    name="zip_code"
                  />
                </div>
              </>
            )}
          </div>
          <div className="mb-[2rem] flex flex-col gap-2 md:w-[70%]">
            <label htmlFor="note" className="hidden">
              Napomena:
            </label>
            <textarea
              type="text"
              name="note"
              rows="2"
              id="note"
              onInput={(e) => {
                setData((prev) => ({
                  ...prev,
                  note: e.target.value,
                }));
              }}
              defaultValue={customerData?.note}
              onChange={formChangeHandler}
              disabled={disabled}
              className={`h-[58px] rounded-lg border-none bg-[#f5f5f6] text-black focus:ring-0 max-xl:mx-3 max-sm:text-sm`}
              placeholder="Napomena"
            />
          </div>
          <div className="termsAgree flex items-center md:w-[70%]">
            <input
              type="checkbox"
              id="set_default"
              name="set_default"
              disabled={disabled}
              onChange={() => {
                setData({
                  ...data,
                  set_default: data.set_default === 1 ? 0 : 1,
                });
              }}
              onInput={(e) => {
                setData((prev) => ({
                  ...prev,
                  set_default: e.target.value,
                }));
              }}
              defaultValue={customerData?.set_default}
              className="mr-[0.4rem] rounded-sm bg-croonus-3 text-[#191919] focus:border-none focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="set_default"
              className="text-croonus-1 max-md:text-xs"
            >
              Podesite kao podrazumevanu adresu.
            </label>
          </div>
        </div>
        <div>
          <p className="mt-4 block text-[#a7a7a7]">*Ukoliko ste pravno lice:</p>
          <div className="my-4 grid grid-cols-3 gap-3 md:w-[70%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="company_name">Naziv kompanije:</label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                disabled={disabled}
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    company_name: e.target.value,
                  }));
                }}
                defaultValue={customerData?.company_name}
                onChange={formChangeHandler}
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                placeholder="Naziv kompanije"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="pib">PIB: </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                type="text"
                id="pib"
                name="pib"
                disabled={disabled}
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    pib: e.target.value,
                  }));
                }}
                defaultValue={customerData?.pib}
                onChange={formChangeHandler}
                placeholder="PIB"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mb">MB: </label>
              <input
                className={`rounded-lg border-0 bg-[#f5f5f6] py-[0.8rem] max-sm:text-sm`}
                type="text"
                id="maticni_broj"
                name="maticni_broj"
                disabled={disabled}
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    maticni_broj: e.target.value,
                  }));
                }}
                defaultValue={customerData?.maticni_broj}
                onChange={formChangeHandler}
                placeholder="Matični broj"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setDisabled(false)}
              className="mr-4 bg-croonus-3 px-[2rem] py-[0.8rem] text-white hover:bg-opacity-80"
            >
              Izmena informacija
            </button>
            <button
              onClick={changeInputHandler}
              className="bg-black px-[2rem] py-[0.8rem] text-white hover:bg-opacity-80"
            >
              Sačuvaj izmene
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
