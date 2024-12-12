import { cache } from "react";
import { get as GET } from "@/app/api/api";
import Link from "next/link";

const getBrands = cache(async () => {
  return await GET(`/categories/product/tree`)?.then((res) => {
    if (res?.payload) {
      let categories = res?.payload;
      let data = {};

      (categories ?? [])?.forEach((category) => {
        if (category?.id) {
          const { slug } = category;
          if (slug === "brendovi") {
            data = category;
          }
        }
      });

      return data?.children;
    }
    return [];
  });
});

const Brands = async () => {
  let brands = await getBrands();

  if (brands?.length > 0) {
    return (
      <>
        <div className="mx-auto mt-[3rem] w-[95%] lg:w-full lg:px-[3rem]">
          <h1 className="text-[60px]">Brendovi</h1>
          <div
            className={`mt-[4rem] grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
          >
            {(brands ?? [])?.map((brand) => {
              if (brand?.id) {
                const {
                  name,
                  link: { link_path: link },
                  id,
                } = brand;

                return (
                  <div key={`brand-${id}`}>
                    <Link
                      href={`/${link}`}
                      className={`text-xl hover:underline`}
                      title={`Pogledajte sve proizvode brenda ${name}`}
                    >
                      {name}
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Brands;
