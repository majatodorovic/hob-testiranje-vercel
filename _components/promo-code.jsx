"use client";

import {
  useAddPromoCode,
  usePromoCodeOptions,
  usePromoCodesList,
  useRemovePromoCode,
} from "@/hooks/hob.hooks";
import { useEffect, useState } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";

export const PromoCode = () => {
  const queryClient = useQueryClient();

  const [promoCode, setPromoCode] = useState("");
  const [buttonText, setButtonText] = useState("Primeni");

  const {
    mutate: activatePromoCode,
    isPending,
    data,
    isSuccess: is_activated,
  } = useAddPromoCode();

  const { mutate: deletePromoCode, isSuccess: is_deleted } =
    useRemovePromoCode();
  const { data: opt } = usePromoCodeOptions();
  const { data: codes_list, refetch: refetchList } = usePromoCodesList();

  const handleAddPromoCode = (promo_code, number_of_codes) => {
    if (number_of_codes > 1) {
      activatePromoCode({ promo_codes: [promo_code] });
      setPromoCode("");
      setButtonText("Primeni");
    } else {
      activatePromoCode({ promo_codes: [promo_code] });
    }
  };

  const handleDeletePromoCode = (id_promo_code) => {
    if (id_promo_code) {
      deletePromoCode({ id_promo_code: id_promo_code });
      setPromoCode("");
      setButtonText("Primeni");
    }
    return null;
  };

  const handlePromoCode = (action) => {
    if (action === "add") {
      return handleAddPromoCode(promoCode, opt?.number_of_promo_codes);
    }

    if (action === "remove") {
      return handleDeletePromoCode(codes_list?.[0]?.id_promo_code);
    }
  };

  useEffect(() => {
    refetchList();
    queryClient?.invalidateQueries({ queryKey: ["summary"] });
  }, [is_deleted, is_activated]);

  useEffect(() => {
    if (!data?.success) {
      setButtonText("Primeni");
    }

    if (data?.success && opt?.number_of_promo_codes === 1) {
      setButtonText("Ukloni");
    }
  }, [data]);

  useEffect(() => {
    if (codes_list?.length === 1 && opt?.number_of_promo_codes === 1) {
      setButtonText("Ukloni");
      setPromoCode(codes_list?.[0]?.code);
    } else {
      if (opt?.number_of_promo_codes > 1) {
        setButtonText("Primeni");
        setPromoCode("");
      }
    }
  }, [codes_list, opt?.number_of_promo_codes]);

  if (opt?.active) {
    return (
      <>
        <h4 className={`text-[30px] font-light max-md:ml-2`}>Promo kod</h4>
        <div className={`w-full`}>
          <form className={`flex items-center gap-2 justify-between`}>
            <input
              disabled={
                opt?.number_of_promo_codes === 1 && codes_list?.length === 1
              }
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              type={`text`}
              className={`flex-1 rounded-[30px] border-none bg-black/20 px-6 py-4 text-white placeholder:text-white focus:border-none focus:bg-black/40 focus:ring-0  max-sm:text-sm`}
              placeholder={`Unesite promo kod`}
            />
            <button
              type={"submit"}
              onClick={(e) => {
                e.preventDefault();
                if (
                  opt?.number_of_promo_codes === 1 &&
                  codes_list?.length === 1
                ) {
                  handlePromoCode("remove");
                } else {
                  handlePromoCode("add");
                }
              }}
              className={`self-stretch rounded-[30px] bg-black px-7 !text-center text-sm font-medium uppercase text-white hover:opacity-90 max-xl:w-full  max-md:w-[98%] max-md:py-4 md:py-3`}
            >
              {buttonText}
            </button>
          </form>

          {codes_list?.length > 0 && opt?.number_of_promo_codes > 1 && (
            <div className={`my-3 flex flex-col gap-2`}>
              {codes_list?.map(
                ({
                  code,
                  id_promo_code: id,
                  campaign_data: { calculations },
                }) => {
                  let currency =
                    calculations?.[0]?.currency === "percentage"
                      ? "%"
                      : calculations?.[0]?.currency;
                  let amount = calculations?.[0]?.discount_value;

                  return (
                    <div className={`flex items-center justify-between`}>
                      <p className={`text-[0.965rem] font-medium uppercase`}>
                        {code} (-{amount}
                        {currency})
                      </p>
                      <button
                        onClick={() => deletePromoCode({ id_promo_code: id })}
                        className={`text-[0.965rem] font-light underline`}
                      >
                        Ukloni
                      </button>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>
      </>
    );
  }
};
