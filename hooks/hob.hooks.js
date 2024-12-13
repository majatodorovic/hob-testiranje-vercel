"use client";

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  keepPreviousData,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  post as POST,
  deleteMethod as DELETE,
  list as LIST,
  get as GET,
  put as PUT,
  fetch as FETCH,
} from "@/app/api/api";
import { toast } from "react-toastify";
import { useCartContext } from "@/app/api/cartContext";

//hook za prepoznavanje mobilnih uredjaja, vraca true ili false
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

//hook za debouncing (za search), na svaki input se resetuje timer i tek kad se neko vreme ne unosi nista se poziva funkcija
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

//hook za prepoznavanje scrolla, vraca true ili false za headerShowing i sideBarShowing
export const useScroll = () => {
  const [headerShowing, setHeaderShowing] = useState(false);
  const [sideBarShowing, setSideBarShowing] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) return setHeaderShowing(false);
      const currentScroll = window.scrollY;
      if (currentScroll > 250) {
        setHeaderShowing(true);
      } else {
        setHeaderShowing(false);
      }
      if (currentScroll > 1000) {
        setSideBarShowing(true);
      } else {
        setSideBarShowing(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { headerShowing, sideBarShowing };
};

export const useCategoryTree = () => {
  return useQuery({
    queryKey: ["categoryTree"],
    queryFn: async () => {
      return await GET(`/categories/product/tree`).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

export const useCartBadge = () => {
  const [cart] = useCartContext();

  return useQuery({
    queryKey: ["cartBadge", cart],
    queryFn: async () => {
      return await GET(`/cart/badge-count`).then((res) =>
        Math.round(res?.payload?.summary?.total_quantity),
      );
    },
    refetchOnWindowFocus: false,
  });
};

export const useWishlistBadge = () => {
  const [, , wishList] = useCartContext();

  return useQuery({
    queryKey: ["wishlistBadge", wishList],
    queryFn: async () => {
      return await GET(`/wishlist/badge-count`).then(
        (res) => res?.payload?.summary?.items_count,
      );
    },
    refetchOnWindowFocus: false,
  });
};
export const useLandingPages = () => {
  return useQuery({
    queryKey: ["LandingPages"],
    queryFn: async () => {
      return await LIST(`/landing-pages/list`).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dodavanje u korpu, proslediti id i kolicinu
export const useAddToCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id, quantity, message, type = false }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: quantity,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: type ? "replace" : "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success(message ?? "Uspešno dodato u korpu", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error(
              res?.payload?.message ?? "Greška prilikom dodavanja u korpu",
              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              },
            );
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za brisanje iz korpe, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: 0,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success("Uspešno obrisano iz korpe.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom brisanja iz korpe.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dodavanje u listu zelja, proslediti samo id kad se poziva mutate() funckija
export const useAddToWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: async ({ id, name }) => {
      return await POST(`/wishlist`, {
        id: null,
        id_product: +id,
        quantity: 1,
        id_product_parent: null,
        description: null,
        status: null,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success(`Proizvod uspešno dodat u listu želja.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom dodavanja u listu želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

//hook za briasanje iz liste zelja, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["removeFromWishlist"],
    mutationFn: async ({ id }) => {
      return await DELETE(`/wishlist/${id}`).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success("Uspešno obrisano iz liste želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom brisanja iz liste želja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za search, proslediti searchTerm inicijalno pri pozivu hook-a i pri pozivanju funkcije
export const useSearch = ({ searchTerm, isSearchPage = false }) => {
  switch (isSearchPage) {
    case false:
      return useQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload);
          }
        },
        refetchOnWindowFocus: false,
      });

    case true:
      return useQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST(`/products/search/list?categoryId="*"`, {
              search: searchTerm,
              render: false,
            }).then((res) => res?.payload?.items);
          }
        },
        refetchOnWindowFocus: false,
      });

    default:
      break;
  }
};

//hook za proveru da li je artikal u listi zelja, proslediti id artikla inicijalno i pozvati refetch pri svakom dodavanju u listu zelja
export const useIsInWishlist = ({ id }) => {
  return useQuery({
    queryKey: ["isInWishlist", { id: id }],
    queryFn: async () => {
      return await GET(`/wishlist/product-in-wishlist/${id}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

//hook za dobijanje svih proizvoda u listi zelja
export const useWishlist = ({ render = true }) => {
  return useQuery({
    queryKey: ["wishlist_items"],
    queryFn: async () => {
      return await LIST(`/wishlist`, {
        render: render,
      }).then((res) => res?.payload?.items ?? []);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za prijavljivanje na newsletter
export const useNewsletter = () => {
  return useMutation({
    mutationKey: ["newsletter"],
    mutationFn: async ({ email }) => {
      return await POST(`/newsletter`, { email: email }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(res?.payload?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Došlo je do greške. Pokušajte ponovo.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

//hook za dobijanje izabrane kategorije, proslediti slug kategorije
export const useCategory = ({ slug }) => {
  return useQuery({
    queryKey: ["category", { slug: slug }],
    queryFn: async () => {
      return await GET(`/categories/product/single/${slug}`).then(
        (res) => res?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

//hook za dobijanje filtera izaabrane kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere
export const useCategoryFilters = ({
  slug,
  page,
  limit,
  sort,
  selectedFilters,
}) => {
  return useMutation({
    mutationKey: [
      "categoryFilters",
      {
        slug: slug,
        page: page,
        limit: limit,
        sort: sort,
        selectedFilters: selectedFilters,
      },
    ],
    mutationFn: async ({
      slug,
      selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    }) => {
      return await POST(`/products/category/filters/${slug}`, {
        filters: selectedFilters,
      }).then((response) => {
        const lastSelectedFilterValues = selectedFilters?.find((item) => {
          return item?.column === lastSelectedFilterKey;
        });

        const lastSelectedFilter = availableFilters?.find((item) => {
          return item?.key === lastSelectedFilterKey;
        });

        const filterLastSelectedFromResponse = response?.payload?.filter(
          (item) => {
            return item?.key !== lastSelectedFilterKey;
          },
        );

        const indexOfLastSelectedFilter = availableFilters?.findIndex(
          (index) => {
            return index?.key === lastSelectedFilterKey;
          },
        );

        if (
          lastSelectedFilter &&
          lastSelectedFilterValues?.value?.selected?.length > 0
        ) {
          setAvailableFilters([
            ...filterLastSelectedFromResponse.slice(
              0,
              indexOfLastSelectedFilter,
            ),
            lastSelectedFilter,
            ...filterLastSelectedFromResponse.slice(indexOfLastSelectedFilter),
          ]);
        } else {
          setAvailableFilters(response?.payload);
        }
      });
    },
  });
};

//hook za dobijanje artikala iz kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere

export const useCategoryProducts = ({
  slug,
  page,
  limit,
  sort,
  setSelectedFilters,
  filterKey,
  setSort,
  setPage,
  render,
  isGTM = false,
}) => {
  switch (isGTM) {
    case false:
      return useQuery({
        queryKey: [
          "categoryProducts",
          {
            slug: slug,
            page: page,
            limit: limit,
            sort: sort,
            selectedFilters: filterKey,
          },
        ],
        queryFn: async () => {
          try {
            //vadimo filtere iz URL koji su prethodno selektovani i pushovani sa router.push()
            const selectedFilters_tmp = (filterKey ?? "::")
              ?.split("::")
              ?.map((filter) => {
                const [column, selected] = filter?.split("=");
                const selectedValues = selected?.split("_");
                return {
                  column,
                  value: {
                    selected: selectedValues,
                  },
                };
              });

            //radimo isto za sort
            const sort_tmp = (sort ?? "_")?.split("_");
            const sortObj = {
              field: sort_tmp[0],
              direction: sort_tmp[1],
            };

            //na kraju setujemo state za filtere i sort, da znamo koji su selektovani
            if (selectedFilters_tmp?.every((column) => column?.column !== "")) {
              setSelectedFilters(selectedFilters_tmp);
            }
            setSort(sortObj);
            setPage(page);

            return await LIST(`/products/category/list/${slug}`, {
              page: 1,
              limit: limit,
              sort: sortObj,
              render: render,
              filters: selectedFilters_tmp?.every(
                (column) => column?.column !== "",
              )
                ? selectedFilters_tmp
                : [],
            }).then(async (res) => {
              return res?.payload;
            });
          } catch (error) {
            return error;
          }
        },
        refetchOnWindowFocus: false,
      });
    case true:
      return useQuery({
        queryKey: [
          "categoryProductsForGTM",
          {
            slug: slug,
            page: page,
            limit: limit,
            sort: sort,
            selectedFilters: filterKey,
            gtm: isGTM,
          },
        ],
        queryFn: async () => {
          try {
            //vadimo filtere iz URL koji su prethodno selektovani i pushovani sa router.push()
            const selectedFilters_tmp = (filterKey ?? "::")
              ?.split("::")
              ?.map((filter) => {
                const [column, selected] = filter?.split("=");
                const selectedValues = selected?.split("_");
                return {
                  column,
                  value: {
                    selected: selectedValues,
                  },
                };
              });

            //radimo isto za sort
            const sort_tmp = (sort ?? "_")?.split("_");
            const sortObj = {
              field: sort_tmp[0],
              direction: sort_tmp[1],
            };

            //na kraju setujemo state za filtere i sort, da znamo koji su selektovani
            if (selectedFilters_tmp?.every((column) => column?.column !== "")) {
              setSelectedFilters(selectedFilters_tmp);
            }
            setSort(sortObj);
            setPage(page);

            return await LIST(`/products/category/list/${slug}`, {
              page: 1,
              limit: limit,
              sort: sortObj,
              render: true,
              filters: selectedFilters_tmp?.every(
                (column) => column?.column !== "",
              )
                ? selectedFilters_tmp
                : [],
            }).then(async (res) => {
              return res?.payload;
            });
          } catch (error) {
            return error;
          }
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      });
  }
};

//hook za dobijanje proizvoda na detaljnoj strani
export const useProduct = ({ slug, id }) => {
  return useSuspenseQuery({
    queryKey: ["productBasicData", id ? id : null],
    queryFn: async () => {
      return await GET(`/product-details/basic-data/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

export const useProductThumb = ({ slug, id, categoryId = "*" }) => {
  return useSuspenseQuery({
    queryKey: ["productThumb", id ? id : null],
    queryFn: async () => {
      return await GET(
        `/product-details/thumb/${slug}?categoryId=${categoryId}`,
      ).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

export const useProductSticker = ({ slug, id }) => {
  return useSuspenseQuery({
    queryKey: ["productThumb", id ? id : null],
    queryFn: async () => {
      return await GET(`/product-details/gallery/${slug}`).then((res) => {
        return res?.payload?.stickers;
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

//hook za dobijanje galerije na detaljnoj strani
export const useProductGallery = ({ slug, id }) => {
  return useQuery({
    queryKey: ["productGallery", { slug: slug, id: id ? id : null }],
    queryFn: async () => {
      return await GET(`/product-details/gallery/${slug}`).then((res) => {
        return res?.payload?.gallery;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje breadcrumbs na detaljnoj strani
export const useProductBreadcrumbs = ({ slug, categoryId }) => {
  return useQuery({
    queryKey: ["productBreadcrumbs", { slug: slug }],
    queryFn: async () => {
      return await GET(
        `/product-details/breadcrumbs/${slug}?categoryId=${categoryId ?? "*"}`,
      ).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje opisa na detaljnoj strani
export const useProductDescription = ({ slug }) => {
  return useQuery({
    queryKey: ["productDescription", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/description/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje specifikacija na detaljnoj strani
export const useProductSpecification = ({ slug }) => {
  return useQuery({
    queryKey: ["productSpecification", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/specification/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje svih artikala u korpi
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await LIST(`/cart`).then((res) => res?.payload ?? []);
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

//hook za zavrsetak kupovine, proslediti formData
export const useCheckout = ({ formData, setPostErrors, setLoading }) => {
  const [cart, mutateCart] = useCartContext();
  return useMutation({
    mutationKey: [{ keys: formData, cart: cart }],
    mutationFn: async () => {
      return await POST(`/checkout/one-page`, formData)
        .then((res) => {
          setLoading(true);
          mutateCart();
          setPostErrors({
            fields: res?.response?.data?.payload?.fields ?? [],
          });
          return res?.payload;
        })
        .catch((err) => {
          return err;
        });
    },
  });
};

//hook za dobijanje info o cenama,popustima itd u korpi
export const useSummary = ({ formData, delivery }) => {
  return useSuspenseQuery({
    queryKey: ["summary", delivery],
    queryFn: async () => {
      return await FETCH(`/checkout/summary`, {
        ...formData,
      }).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

//hook za dobijanje info o porudzbini, proslediti order_token
export const useOrder = ({ order_token }) => {
  return useQuery({
    queryKey: ["order", { order_token: order_token }],
    queryFn: async () => {
      return await GET(`/checkout/info/${order_token}`).then(
        (res) => res?.payload,
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje novih proizvoda
export const useNewProducts = () => {
  return useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      return await LIST(`/products/new-in/list`).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za kontakt
export const useContact = () => {
  return useMutation({
    mutationKey: ["contact"],
    mutationFn: async ({ form }) => {
      return await POST(`/contact/contact_page`, form).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(`Uspešno poslato.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error("Greška prilikom slanja.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
    },
  });
};

//hook za azuriranje kolicine artikla u korpi
export const useUpdateCartQuantity = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["updateCartQuantity"],
    mutationFn: async ({ id, quantity, message = true }) => {
      return await PUT(`/checkout`, {
        countable: true,
        cart_items_id: id,
        quantity: quantity,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            if (message) {
              toast.success("Količina ažurirana", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
            break;
          default:
            toast.error(res?.payload?.message ?? "Došlo je do greške!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

export const useAddPromoCode = () => {
  return useMutation({
    mutationKey: ["addPromoCode"],
    mutationFn: async ({ promo_codes }) => {
      return await POST(`/checkout/promo-code`, {
        promo_codes: promo_codes,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success("Uspešno ste dodali promo kod", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error(res?.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
        return res;
      });
    },
  });
};

export const usePromoCodesList = () => {
  return useQuery({
    queryKey: ["promoCodeList"],
    queryFn: async () => {
      return await LIST(`/checkout/promo-code`).then((res) => {
        return res?.payload;
      });
    },
  });
};

export const useRemovePromoCode = () => {
  return useMutation({
    mutationKey: ["promoCodeDelete"],
    mutationFn: async ({ id_promo_code }) => {
      return await DELETE(`/checkout/promo-code/${id_promo_code}`).then(
        (res) => {
          switch (res?.code) {
            case 200:
              toast.success(res?.payload?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
            default:
              toast.error(res?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
          }
        },
      );
    },
  });
};

export const usePromoCode = () => {
  return useQuery({
    queryKey: ["promoCodeDelete"],
    queryFn: async ({ id_promo_code }) => {
      return await LIST(`/checkout/promo-code/${id_promo_code}`).then((res) => {
        return res?.payload;
      });
    },
  });
};

export const usePromoCodeOptions = () => {
  return useQuery({
    queryKey: ["promoCodeOptions"],
    queryFn: async () => {
      return await GET(`/checkout/promo-code-options`).then((res) => {
        return res?.payload;
      });
    },
  });
};
