"use client";

import { Suspense, useEffect, useState } from "react";
import { get, list } from "@/app/api/api";
import Image from "next/image";
import Thumb from "@/components/Thumb/Thumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Link from "next/link";
import { notFound } from "next/navigation";
import leaf from "@/assets/shapes/leaf-cut.png";
import { ThumbSuspense } from "@/_components/thumb-suspense";

const LandingPage = ({ slug }) => {
  const [loadingBasicData, setLoadingBasicData] = useState(true);
  const [loadingThumb, setLoadingThumb] = useState(true);
  const [loadingConditions, setLoadingConditions] = useState(true);

  const [data, setData] = useState({
    basic_data: [],
    thumb: null,
    conditions: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const basicDataResponse = await get(
        `/landing-pages/basic-data/${slug}`,
      ).then((res) => {
        setData((prevData) => ({
          ...prevData,
          basic_data: res?.payload,
        }));
        setLoadingBasicData(false);
      });

      const thumbResponse = await list(`/landing-pages/thumb/${slug}`).then(
        (res) => {
          setData((prevData) => ({
            ...prevData,
            thumb: res?.payload?.items,
          }));
          setLoadingThumb(false);
        },
      );

      const conditionsResponse = await list(
        `/landing-pages/conditions/${slug}`,
        { render: false },
      ).then((res) => {
        setData((prevData) => ({
          ...prevData,
          conditions: res?.payload?.items,
        }));
        setLoadingConditions(false);
      });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <>
      {data ? (
        <div className={`mx-auto w-[93.5%]`}>
          <div className={`pb-10`}>
            <div className={`flex flex-col items-start justify-center`}>
              {loadingBasicData ? (
                <div className="mb-4 h-[50px] w-full animate-pulse bg-slate-300 object-cover"></div>
              ) : (
                <>
                  <Image
                    src={leaf}
                    width={540}
                    height={380}
                    alt="HOB"
                    className="absolute left-0 top-[5.4rem] z-[0]"
                  />
                  <div
                    className={`mx-auto mt-[30px] w-[95%] md:mt-[80px] lg:w-full lg:px-[3rem]`}
                  >
                    <h1 className="text-[40px] md:text-[60px]">
                      {data?.basic_data?.name}
                    </h1>
                  </div>
                </>
              )}
              <div className={`relative w-full`}>
                {loadingBasicData ? (
                  <>
                    <div className="h-[350px] w-full animate-pulse bg-slate-300 object-cover max-md:h-[250px]"></div>
                  </>
                ) : (
                  data?.basic_data?.image && (
                    <div className={`relative mt-10`}>
                      <Image
                        src={data?.basic_data?.image}
                        alt={``}
                        width={0}
                        height={0}
                        priority
                        sizes={`100vw`}
                        quality={100}
                        className={`h-auto w-full rounded-[2rem] sm:rounded-[4rem]`}
                      />
                    </div>
                  )
                )}
              </div>
              {loadingBasicData ? (
                <div className="mt-5 h-[50px] w-full animate-pulse bg-slate-300 object-cover"></div>
              ) : (
                <>
                  <div
                    className={`${
                      data?.basic_data?.gallery?.length > 0
                        ? `grid w-full grid-cols-2 gap-x-5 gap-y-5`
                        : ``
                    } mt-10`}
                  >
                    <div
                      className={`${
                        data?.basic_data?.gallery?.length > 0 &&
                        `col-span-2 text-[1.5rem] !text-black md:col-span-1`
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: data?.basic_data?.description,
                      }}
                    />

                    <div
                      className={`${
                        data?.basic_data?.gallery?.length > 0
                          ? `col-span-2 block md:col-span-1`
                          : `hidden`
                      } `}
                    >
                      <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                      >
                        {(data?.basic_data?.gallery || [])?.map((image) => {
                          return (
                            <SwiperSlide>
                              <Image
                                src={image?.image}
                                alt={``}
                                width={0}
                                height={0}
                                priority
                                sizes={`100vw`}
                                quality={100}
                                className={`mb-auto h-auto w-full rounded-[2rem] sm:rounded-[4rem]`}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </>
              )}
              <div
                className={`grid ${
                  data?.conditions?.length > 0 ? `` : `flex-1`
                } mt-16 w-full gap-[11px] gap-x-5 gap-y-[40px] max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4`}
              >
                {loadingConditions ? (
                  <>
                    {Array.from({ length: 12 }, (x, i) => (
                      <div
                        key={i}
                        className="col-span-1 h-[500px] w-full animate-pulse bg-slate-300 object-cover max-md:h-[250px]"
                      ></div>
                    ))}
                  </>
                ) : (
                  <>
                    {(data?.conditions ?? [])?.map(({ id }) => {
                      return (
                        <Suspense
                          key={`suspense-${id}`}
                          fallback={
                            <div
                              className={`aspect-2/3 h-full w-full animate-pulse bg-slate-200`}
                            />
                          }
                        >
                          <ThumbSuspense
                            categoryId={"*"}
                            id={id}
                            refetchWishlist={() => {}}
                          />
                        </Suspense>
                      );
                    })}
                  </>
                )}
              </div>
              <div
                className={`mt-16 grid w-full grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-3 xl:grid-cols-4`}
              >
                {loadingThumb ? (
                  <>
                    {Array.from({ length: 4 }, (x, i) => (
                      <div
                        key={i}
                        className="col-span-1 h-[500px] w-full animate-pulse bg-slate-300 object-cover max-md:h-[250px]"
                      ></div>
                    ))}
                  </>
                ) : (
                  data?.thumb?.map((thumb) => {
                    return (
                      <div
                        className={`col-span-1 flex flex-col items-center justify-center gap-3 rounded-2xl border border-croonus-1 p-5`}
                      >
                        {thumb?.name && (
                          <Link href={`${thumb?.url}`}>
                            {" "}
                            <h1 className={`text-2xl font-medium`}>
                              {thumb?.name}
                            </h1>
                          </Link>
                        )}
                        {thumb?.description && (
                          <p className={`text-center`}>{thumb?.description}</p>
                        )}
                        {thumb?.thumb_image && (
                          <Link href={`${thumb?.url}`}>
                            {" "}
                            <div className={``}>
                              <Image
                                src={thumb?.thumb_image}
                                alt={``}
                                width={500}
                                height={203}
                                priority
                                quality={100}
                                style={{ objectFit: "contain" }}
                                className={`h-auto w-full`}
                              />
                            </div>
                          </Link>
                        )}
                        {thumb?.button && (
                          <Link href={`${thumb?.url}`} className={`w-full`}>
                            <button
                              className={`mt-2 w-full rounded-[5rem] bg-croonus-2 p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-opacity-90`}
                            >
                              {thumb?.button}
                            </button>
                          </Link>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        notFound()
      )}
    </>
  );
};

export default LandingPage;
