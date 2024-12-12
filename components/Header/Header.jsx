"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import HeaderContainerLinks from "./HeaderContainerLinks";
import { get, list } from "@/app/api/api";
import HeaderIcons from "./HeaderIcons";
import SearchProducts from "./SearchProducts";
import { usePathname, useRouter } from "next/navigation";
import cancel from "@/assets/Icons/cancel.png";

const Header = ({ categories }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState();
  const [subCategory, setSubcategory] = useState(false);
  const menuRef = useRef(null);

  let category = false;
  category = pathname !== "/";

  const [landingPagesList, setLandingPagesList] = useState([]);

  useEffect(() => {
    const getLandingPages = async () => {
      const data = await list(`/landing-pages/list`).then((response) =>
        setLandingPagesList(response?.payload),
      );
    };
    getLandingPages();
  }, []);

  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    const category = categories.filter((category) => category?.id === isActive);
    setIsActive(category[0]?.id);
  }, [isActive]);

  const [activeCategory, setActiveCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: [],
    image: null,
  });

  const [activeSubCategory, setActiveSubCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug_path: null,
    data: [],
    image: null,
  });

  useEffect(() => {
    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (categories) {
      setIsActive(categories[0]?.id);
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      router?.refresh();
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
        setSubcategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/kategorija" || "")) {
      setOpen(false);
      setVisible(false);
      setSubcategory(false);
    }
  }, [pathname]);

  const resetActiveCategory = () => {
    setActiveCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setActiveSubCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
  };
  const [visible, setVisible] = useState("");
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 40)
        return setVisible(
          "sticky top-0 translate-y-0 transition-all duration-500 ",
        );
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setVisible(
          "sticky top-0 -translate-y-full transition-all duration-500",
        );
        resetActiveCategory();
      } else {
        setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`max-xl:hidden ${visible} relative z-[200] w-full bg-[#dcccc0]`}
        id="header"
      >
        <div className="relative flex items-center justify-between border-b border-black px-[2rem] py-5 2xl:px-[5rem]">
          <div className="flex">
            <div className="afterline flex">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={155}
                  height={39}
                  className="object-cover"
                  layout="responsive"
                  alt="logo"
                />
              </Link>
            </div>
            <div className={`ml-[3.4rem] flex items-center gap-4 2xl:gap-7`}>
              <Link href="/">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname === "/" ? "activeCategory" : ""
                  }`}
                >
                  {" "}
                  Početna
                </span>
              </Link>
              <button
                className={`ease cursor-pointer rounded-[24px] py-[8px] pl-6 pr-[40px] text-[18px] font-normal transition-all hover:bg-black hover:bg-opacity-[0.2] hover:text-white 3xl:text-[20px] ${
                  open ? "bg-black bg-opacity-[0.2] text-white" : "bg-[#fff3e6]"
                }`}
                onClick={() => {
                  setOpen(!open), resetActiveCategory();
                }}
              >
                Proizvodi
              </button>
              <Link href="/brendovi">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname === "/brendovi" ? "activeCategory" : ""
                  }`}
                >
                  {" "}
                  Brendovi
                </span>
              </Link>
              <div
                ref={menuRef}
                className={
                  open
                    ? `fixed left-0 top-0 z-[99] flex h-screen w-fit translate-x-0 bg-[#dcccc0] bg-opacity-[97%] transition-all duration-[600ms]`
                    : `fixed left-0 top-0 z-[99] flex h-screen w-screen -translate-x-full bg-[#dcccc0] bg-opacity-[97%] transition-all duration-[600ms] lg:w-[76%] 2xl:w-[64%]`
                }
              >
                <div className="mx-auto my-auto flex h-[70%] w-full items-start justify-start pl-[2rem]">
                  <div className="hidescroll flex h-full min-w-max flex-col gap-3 overflow-y-scroll 2xl:max-h-[500px] 3xl:max-h-[680px]">
                    <button
                      className="absolute right-[2.2rem] top-[3rem]"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Image src={cancel} width={24} height={24} alt="HOB" />
                    </button>
                    <div className="flex flex-col">
                      <div className="mt-10 flex flex-col border-r-2 border-black pr-4">
                        {(categories ?? [])?.map((item) => {
                          if (item?.name !== "Brendovi") {
                            return item?.children ? (
                              <Link
                                key={item.id}
                                href={`/${item?.link?.link_path}`}
                                className="cursor-pointer px-3 py-1 text-2xl uppercase text-black hover:underline"
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => {
                                  item?.children
                                    ? setSubcategory(item?.children)
                                    : setSubcategory([]);
                                }}
                              >
                                {item?.name}
                              </Link>
                            ) : (
                              <Link
                                href={`/${item?.link?.link_path}`}
                                onMouseEnter={() => {
                                  item?.children
                                    ? setSubcategory(item?.children)
                                    : setSubcategory([]);
                                }}
                                key={item?.id}
                                className="px-3 py-1 text-2xl uppercase hover:underline"
                                onClick={() => setOpen(false)}
                              >
                                {item?.name}
                              </Link>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  {subCategory?.length > 0 ? (
                    <>
                      {subCategory?.some(
                        (item) => item?.children && item?.children.length > 0,
                      ) ? (
                        <div className="hidescroll my-auto mt-10 grid h-[100%] grid-cols-2 gap-x-10 gap-y-[18px] self-start overflow-y-scroll transition delay-150 ease-in-out md:w-[700px] md:max-w-[700px] xl:w-[870px] xl:max-w-[870px] xl:grid-cols-3 xl:pl-[22px] 2xl:max-h-[500px] 2xl:gap-x-20 3xl:max-h-[680px] 3xl:grid-cols-3 3xl:pl-[30px]">
                          {subCategory?.map((item) => (
                            <div
                              className="col-span-1 flex flex-col"
                              key={item.id}
                            >
                              <Link
                                href={`/${item?.link?.link_path}`}
                                onClick={() => {
                                  setOpen(false);
                                  setSubcategory([]);
                                }}
                              >
                                <p className="text-[1.5rem] leading-tight hover:underline">
                                  {item?.name}
                                </p>
                              </Link>
                              <div className={`mt-5 pl-2`}>
                                {item?.children
                                  ? item?.children?.map((child) => (
                                      <Link
                                        href={`/${child?.link?.link_path}`}
                                        key={child?.id}
                                        onClick={() => {
                                          setOpen(false);
                                          setSubcategory([]);
                                        }}
                                      >
                                        <div className="w-max whitespace-nowrap px-1 py-1 text-base hover:underline">
                                          <p className="">{child?.name}</p>
                                        </div>
                                      </Link>
                                    ))
                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="hidescroll grid grid-cols-2 gap-x-10 gap-y-[18px] self-start overflow-y-scroll transition delay-150 ease-in-out md:w-[700px] md:max-w-[700px] xl:w-[870px] xl:max-w-[870px] xl:grid-cols-3 xl:pl-[22px] 2xl:gap-x-20 3xl:grid-cols-3 3xl:pl-[30px]">
                          {subCategory?.map((item) => (
                            <div
                              className="col-span-1 flex h-fit flex-col"
                              key={item.id}
                            >
                              <Link
                                href={`/${item?.link?.link_path}`}
                                onClick={() => {
                                  setOpen(false);
                                  setSubcategory([]);
                                }}
                              >
                                <h1 className="text-xl font-light hover:underline">
                                  {item?.name}
                                </h1>
                              </Link>
                              <div className="mt-2 pl-2">
                                {item?.children
                                  ? item?.children?.map((child) => (
                                      <Link
                                        href={`/${child?.link?.link_path}`}
                                        key={child?.id}
                                        onClick={() => {
                                          setOpen(false);
                                          setSubcategory([]);
                                        }}
                                      >
                                        <div className="px-1 py-1 text-sm font-light hover:bg-croonus-2">
                                          <p className="">{child?.name}</p>
                                        </div>
                                      </Link>
                                    ))
                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="fixed bottom-0 w-full bg-black px-[2rem] py-[1rem] text-white">
                  <div className="mx-auto flex px-1">
                    {landingPagesList?.items?.slice(0, 2).map((item, index) => {
                      return (
                        <div key={index} className="afterlinewhite">
                          <Link
                            href={`/promo/${item?.slug}`}
                            key={item?.id}
                            className="px-3 py-1 text-sm font-medium uppercase hover:underline"
                            onClick={() => {
                              setOpen(false);
                              setSubcategory([]);
                            }}
                          >
                            {item?.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Link href="/novo">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname?.includes("/novo") ? "activeCategory" : ""
                  }`}
                >
                  {" "}
                  Novo
                </span>
              </Link>
              <Link href="/o-nama">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname?.includes("/o-nama") ? "activeCategory" : ""
                  }`}
                >
                  {" "}
                  O nama
                </span>
              </Link>
              <Link href="/blog">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname?.includes("/blog") ? "activeCategory" : ""
                  }`}
                >
                  {" "}
                  Blog
                </span>
              </Link>
              <Link href="/kontakt">
                <span
                  className={`activeCategoryHover relative block w-fit text-[18px] font-normal text-black 3xl:text-[20px] ${
                    pathname?.includes("/kontakt") ? "activeCategory" : ""
                  }`}
                >
                  Kontakt
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <SearchProducts />
            <HeaderIcons />
          </div>
        </div>
        {activeCategory?.open && (
          <div
            onMouseLeave={() => {
              setActiveCategory({
                id: null,
                name: null,
                slug: null,
                data: [],
                image: null,
                open: false,
              });
            }}
            className={`absolute right-0 top-[110px] z-[200] w-full bg-white max-lg:hidden`}
          >
            <div className="relative h-full px-20 py-6 pb-2">
              <div className="flex h-full justify-between">
                <div className="flex gap-x-[10rem] pb-2">
                  <div className={`flex flex-col items-start justify-start`}>
                    {landingPagesList?.items?.map((item, index) => {
                      return (
                        <Link
                          onClick={resetActiveCategory}
                          href={`/promo/${item?.slug}`}
                          className="mb-1 block text-lg font-medium uppercase text-red-500 transition-all duration-300 hover:translate-x-5 hover:text-slate-500"
                        >
                          {item?.name}
                        </Link>
                      );
                    })}
                    {activeCategory?.data?.map((category, index) => {
                      return category?.children?.length > 0 ? (
                        <button
                          key={index}
                          className={`${
                            category?.id === activeSubCategory?.id ||
                            pathname.includes(category?.slug)
                              ? "font-bold"
                              : "font-normal"
                          } block text-lg uppercase text-black hover:underline`}
                          onClick={() => {
                            setActiveSubCategory({
                              id:
                                category?.id === activeSubCategory?.id
                                  ? null
                                  : category?.id,
                              name:
                                category?.name === activeSubCategory?.name
                                  ? null
                                  : category?.name,
                              slug_path:
                                category?.slug_path ===
                                activeSubCategory?.slug_path
                                  ? null
                                  : category?.slug_path,
                              data:
                                category?.children === activeSubCategory?.data
                                  ? []
                                  : category?.children,
                              open: !activeSubCategory?.open,
                              image: category?.image ?? null,
                            });
                          }}
                        >
                          {category?.name}
                        </button>
                      ) : (
                        <Link
                          href={`/${category?.link?.link_path}`}
                          key={index}
                          className={`${
                            category?.id === activeCategory?.id
                              ? "activeCategory"
                              : "font-normal"
                          } block text-lg uppercase text-black hover:underline`}
                          onClick={() => {
                            setActiveCategory({
                              id: null,
                              name: null,
                              slug: null,
                              data: [],
                              image: null,
                              open: false,
                            });
                          }}
                        >
                          {category?.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="h-full">
                    <h3 className="mb-4 text-[15px] font-bold uppercase text-black">
                      {activeSubCategory?.name}
                    </h3>
                    {activeSubCategory?.name && (
                      <Link
                        className={`pb-7 text-[15px] font-normal text-[#39ae00] hover:underline`}
                        href={`/${activeSubCategory?.link?.link_path}`}
                        onClick={() => {
                          resetActiveCategory();
                        }}
                      >
                        Pogledaj sve
                      </Link>
                    )}

                    <div className="mt-3 flex h-full max-h-[180px] flex-col flex-wrap gap-x-[3.3rem] gap-y-[0.1rem]">
                      {activeSubCategory &&
                        activeSubCategory?.data?.map((childCategory) => (
                          <Link
                            href={`/${childCategory?.link?.link_path}`}
                            onClick={resetActiveCategory}
                            key={childCategory?.id}
                            className={`block text-[15px] lowercase text-black first-letter:uppercase hover:underline ${
                              pathname?.includes(childCategory?.link?.link_path)
                                ? "font-bold"
                                : "font-normal"
                            }`}
                          >
                            {childCategory.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className={`ml-auto`}>
                  <div className="relative aspect-video h-[200px]">
                    {(activeCategory?.image || activeSubCategory?.image) && (
                      <Image
                        src={
                          activeSubCategory?.image
                            ? activeSubCategory?.image
                            : activeCategory?.image
                        }
                        alt="img-modal"
                        fill
                        priority
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div
        onClick={() => {
          setActiveCategory({
            open: false,
            id: null,
            name: null,
            slug: null,
            data: [],
            image: null,
          });
        }}
        className={
          activeCategory?.open
            ? "visible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500"
            : "invisible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500"
        }
      />
    </>
  );
};

export default Header;
