"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@/app/api/api";

export const Form = ({
  fields = [],
  onChange = () => {},
  errors = [],
  formData,
}) => {
  return (fields ?? [])?.map(
    ({ field_name, prop_name, input_type, options, required, fillFromApi }) => {
      switch (input_type) {
        case "select":
          return (
            <Select
              required={required}
              key={field_name}
              name={prop_name}
              field_name={field_name}
              options={options}
              fillFromApi={fillFromApi}
              onChange={onChange}
              errors={errors}
              formData={formData}
            />
          );
        default:
          return null;
      }
    },
  );
};

export const Select = ({
  options = [],
  name = "",
  required,
  fillFromApi = "",
  field_name = "",
  onChange = (p) => {},
  errors = [],
  formData,
}) => {
  const { data: ddl_options } = useQuery({
    queryKey: [
      {
        field_name: field_name,
        fillFromApi: fillFromApi,
      },
    ],
    queryFn: async () => {
      return await fetch(`${fillFromApi}`, {
        order_data: {},
        selected_data: {},
        field_options: {
          find_type: "markets_from_countries",
          id_countries: 193,
        },
      }).then((res) => res?.payload);
    },
  });

  const [selected, setSelected] = useState({
    id: ddl_options?.values?.[0]?.id,
    name: ddl_options?.values?.[0]?.name,
  });

  useEffect(() => {
    if (formData?.delivery_method === "in_store_pickup") {
      if (ddl_options) {
        const { values } = ddl_options;

        setSelected({
          id: values?.[0]?.id,
          name: values?.[0]?.name,
        });

        onChange({
          value: values?.[0]?.id,
          prop_name: name,
          selected: {
            id: values?.[0]?.id,
            name: values?.[0]?.name,
          },
        });
      }
    }
  }, [formData?.delivery_method]);

  if (ddl_options) {
    const { values } = ddl_options;

    return (
      <div className={`mt-2 flex flex-col gap-1`}>
        <label htmlFor={name} className={`text-[30px] font-light max-md:ml-2`}>
          {field_name}
        </label>
        <select
          required={required}
          id={name}
          defaultValue={values?.[0]?.id}
          value={selected?.id}
          className={`ml-2 rounded-[30px] border-none bg-black/20 px-6 py-4 text-white placeholder:text-white focus:border-none focus:bg-black/40 focus:ring-0 max-xl:mx-3 max-sm:text-sm ${
            errors?.includes("delivery_method_options")
              ? `border border-red-500`
              : ``
          }`}
          name={name}
          onChange={(e) => {
            if (e?.target?.value !== `none`) {
              setSelected({
                id: e?.target?.value,
                name: e.target?.options?.[e?.target?.selectedIndex]?.text,
              });
              onChange({
                value: e?.target?.value,
                prop_name: name,
                selected: {
                  id: e?.target?.value,
                  name: e?.target?.options?.[e?.target?.selectedIndex]?.text,
                },
              });
            }
          }}
        >
          {(values ?? [])?.map(({ id, name }) => {
            return (
              <option key={id ?? ""} value={id ?? ""} name={name}>
                {name ?? ""}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  return null;
};

// export const TextInput = ({
//   name = "",
//   required,
//   field_name = "",
//   onChange = (p) => {},
//   errors = [],
// }) => {
//   return (
//     <div className={`flex flex-col gap-1 mt-2 `}>
//       <label htmlFor={name} className={`text-[0.965rem] font-light`}>
//         {field_name}
//       </label>
//       <input
//         required={required}
//         id={name}
//         className={`w-full cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0 ${
//           errors?.includes("delivery_method_options")
//             ? `border border-red-500`
//             : ``
//         }`}
//         name={name}
//         onChange={(e) => {
//           onChange({
//             value: e?.target?.value,
//             prop_name: name,
//             selected: {
//               id: e?.target?.value,
//               name: e?.target?.value,
//             },
//           });
//         }}
//       />
//     </div>
//   );
// };
