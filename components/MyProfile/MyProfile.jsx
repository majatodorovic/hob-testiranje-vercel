"use client";
import { useEffect, useState } from "react";
import { get, post } from "@/app/api/api";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [customerData, setCustomerData] = useState();
  const [gender, setGender] = useState(customerData?.gender ?? "");
  const [disabled, setDisabled] = useState(true);

  const [data, setData] = useState({
    id: customerData?.id,
    customer_type: customerData?.customer_type,
    first_name: customerData?.first_name,
    last_name: customerData?.last_name,
    phone: customerData?.phone,
    email: customerData?.email,
    gender: customerData?.gender,
    birth_date: customerData?.birth_date,
    company_name: customerData?.company_name,
    pib: customerData?.pib,
    maticni_broj: customerData?.maticni_broj,
    note: null,
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      const fetchCustomerData = await get("/customers/profile").then(
        (response) => {
          setCustomerData(response?.payload);
        },
      );
      return fetchCustomerData;
    };
    fetchCustomerData();
  }, [gender]);

  useEffect(() => {
    setGender(customerData?.gender);
    setData({
      id: customerData?.id,
      customer_type: customerData?.customer_type,
      first_name: customerData?.first_name,
      last_name: customerData?.last_name,
      phone: customerData?.phone,
      email: customerData?.email,
      gender: customerData?.gender,
      birth_date: customerData?.birth_date,
      company_name: customerData?.company_name,
      pib: customerData?.pib,
      maticni_broj: customerData?.maticni_broj,
      note: null,
    });
  }, [customerData?.gender]);

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
        customer_type: data?.customer_type,
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone: data?.phone,
        email: data?.email,
        gender: data?.gender,
        birth_date: data?.birth_date,
        company_name: data?.company_name,
        pib: data?.pib,
        maticni_broj: data?.maticni_broj,
        note: null,
      };
      post("/customers/profile", ret)
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
  return (
    <div className="max-sm:w-full">
      <div className="rounded-lg bg-[#f7f7f7] p-[1.4rem]">
        <h1 className="mb-[0.4rem] text-3xl max-sm:ml-[4rem]">Moj profil</h1>
        <h3 className="text-base font-normal text-[#919191] max-sm:ml-[4rem]">
          {" "}
          &#62; Korisnički podaci
        </h3>
      </div>
      <div className="flex max-md:flex-col">
        <div>
          <div className="mb-[1rem] mt-[2rem] grid grid-cols-2 gap-x-10 pb-4 max-xl:text-base">
            <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">
                  Ime: <span className="snap-mandatory text-red-500">*</span>
                </label>
                <input
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] text-black focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                  type="text"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }));
                  }}
                  disabled={disabled}
                  onChange={formChangeHandler}
                  id="name"
                  name="first_name"
                  placeholder="Ime*"
                  defaultValue={customerData?.first_name}
                />
              </div>
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
                  disabled={disabled}
                  id="phone"
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                  placeholder="Broj telefona*"
                  defaultValue={customerData?.phone}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">
                  Email:
                  <span className="snap-mandatory text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  disabled={disabled}
                  id="email"
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                  placeholder="Email*"
                  defaultValue={customerData?.email}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="surname">
                  Prezime:{" "}
                  <span className="snap-mandatory text-red-500">*</span>
                </label>
                <input
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                  type="text"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }));
                  }}
                  disabled={disabled}
                  id="surname"
                  name="last_name"
                  placeholder="Prezime*"
                  defaultValue={customerData?.last_name}
                />
              </div>
              <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                <div className="flex flex-col gap-2 max-xl:mt-2">
                  <label htmlFor="gender">
                    Pol <span className="snap-mandatory text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    disabled={disabled}
                    form="genderform"
                    className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                    value={gender}
                    onInput={(e) => {
                      setGender(e.target.value);
                    }}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="">Izaberite pol</option>
                    <option value="male">Muški pol</option>
                    <option value="female">Ženski pol</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 max-xl:mt-2">
                  <label htmlFor="birthday">
                    Datum rodjenja:
                    <span className="snap-mandatory text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    onInput={(e) => {
                      setData((prev) => ({
                        ...prev,
                        birth_date: e.target.value,
                      }));
                    }}
                    disabled={disabled}
                    defaultValue={customerData?.birth_date}
                    className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                    placeholder="Datum rodjenja*"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 block text-[#919191]">*Ukoliko ste pravno lice:</p>
          <div className="my-4 flex gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="company_name">Naziv kompanije:</label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    company_name: e.target.value,
                  }));
                }}
                disabled={disabled}
                className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:text-sm`}
                placeholder="Naziv kompanije"
                defaultValue={customerData?.company_name}
              />
            </div>
            <div className="w-full max-sm:w-full max-sm:max-w-[100%] sm:grid sm:grid-cols-2 sm:gap-x-3">
              <div className="max-xl:mt-2 sm:flex sm:flex-col sm:gap-2">
                <label htmlFor="pib">PIB: </label>
                <input
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:w-full max-sm:text-sm`}
                  type="text"
                  id="pib"
                  name="pib"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      pib: e.target.value,
                    }));
                  }}
                  disabled={disabled}
                  placeholder="PIB"
                  defaultValue={customerData?.pib}
                />
              </div>
              <div className="max-xl:mt-2 sm:flex sm:flex-col sm:gap-2">
                <label htmlFor="mb">MB: </label>
                <input
                  className={`rounded-lg border border-[#e0e0e0] py-[0.8rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 max-sm:w-full max-sm:text-sm`}
                  type="text"
                  id="maticni_broj"
                  name="maticni_broj"
                  onInput={(e) => {
                    setData((prev) => ({
                      ...prev,
                      maticni_broj: e.target.value,
                    }));
                  }}
                  disabled={disabled}
                  placeholder="Matični broj"
                  defaultValue={customerData?.maticni_broj}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 gap-4 pt-[2rem] max-sm:flex max-sm:flex-col">
            <button
              onClick={() => setDisabled(false)}
              className="ease min-w-[13rem] rounded-lg bg-croonus-3 px-[2rem] py-[0.8rem] text-white transition-all hover:bg-opacity-80 max-sm:px-[1rem] md:mr-4"
            >
              Izmena informacija
            </button>
            <button
              onClick={changeInputHandler}
              className="ease min-w-[13rem] rounded-lg bg-croonus-2 px-[2rem] py-[0.8rem] text-white transition-all hover:bg-opacity-80 max-sm:px-[1rem]"
            >
              Sačuvaj izmene
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
