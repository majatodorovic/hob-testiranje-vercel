import { get } from "@/app/api/api";
import CategoryPage from "@/_components/category/category";
import ProductPage from "@/_components/product";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { notFound, permanentRedirect } from "next/navigation";
import { headers } from "next/headers";
import { getRobots, handleCategoryRobots } from "@/_functions";

const handleData = async (slug) => {
  return await get(`/slugs/product-categories?slug=${slug}`).then((res) => {
    return res?.payload;
  });
};

const fetchCategorySEO = async (slug) => {
  return await get(`/categories/product/single/seo/${slug}`).then(
    (response) => {
      return response?.payload;
    },
  );
};

const getProductSEO = async (id) => {
  return await get(`/product-details/seo/${id}`).then((response) => {
    return response?.payload;
  });
};

const CategoryProduct = async ({ params, searchParams }) => {
  const params_data = await params;
  const str = params_data?.path?.join("/");

  const [all_headers, data] = await Promise.all([headers(), handleData(str)]);

  const base_url = all_headers?.get("x-base_url");
  const canonical = all_headers?.get("x-canonical");

  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      return (
        <CategoryPage
          path={params_data?.path}
          searchParams={searchParams}
          base_url={base_url}
          category_id={data?.id}
        />
      );
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      return (
        <ProductPage
          path={params_data?.path}
          id={data?.id}
          category_id={
            params_data?.path?.[params_data?.path?.length - 2] ?? "*"
          }
          canonical={canonical}
        />
      );
    case data?.status === false:
      return notFound();
    default:
      permanentRedirect(`/${data?.redirect_url}`);
  }
};

export default CategoryProduct;

const defaultMetadata = {
  title: "Početna | HOB",
  description: "Dobrodošli na HOB Online Shop",
  robots: "index, follow",
  openGraph: {
    title: "Početna | HOB",
    description: "Dobrodošli na HOB Online Shop",
    type: "website",
    url: "https://hobbrandgroup.rs",
    image: "",
    site_name: "hobbrandgroup.rs",
    locale: "sr_RS",
  },
};

export async function generateMetadata({ params, searchParams }) {
  const params_data = await params;
  const search_params_data = await searchParams;

  const str = params_data?.path?.join("/");

  const [data, headersList] = await Promise.all([handleData(str), headers()]);

  let canonical = headersList?.get("x-pathname");
  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(data?.id);

      if (category) {
        let {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: { share_title, share_description, share_image },
        } = category;

        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: `${canonical_link ?? canonical}`,
          },
          openGraph: {
            title: `${share_title}` ?? "",

            description: share_description ?? "",
            images: [
              {
                url:
                  share_image ??
                  "https://api.hobbrandgroup.croonus.com/croonus-uploads/config/b2c/logo-77e63453bf041487c784ae743f48ae77.webp",
                width: 800,
                height: 600,
                alt: share_description ?? "",
                title: share_title ?? "",
                description: share_description ?? "",
              },
            ],
          },
          robots: handleCategoryRobots(
            search_params_data?.strana,
            search_params_data?.filteri,
            search_params_data?.sort,
            search_params_data?.viewed,
            robots,
          ),
        };
      } else {
        return defaultMetadata;
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(data?.id);

      let robots = getRobots(productSEO?.meta_robots);

      const image =
        productSEO?.meta_image ??
        "https://api.hobbrandgroup.croonus.com/croonus-uploads/config/b2c/logo-77e63453bf041487c784ae743f48ae77.webp";

      if (productSEO) {
        return {
          alternates: {
            canonical: `${productSEO?.meta_canonical_link ?? canonical}`,
          },
          description:
            `${productSEO?.meta_title} - ${productSEO?.meta_description}` ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title: `${productSEO?.meta_title}` ?? "",
            description: productSEO?.meta_description ?? "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt: productSEO?.meta_title ?? productSEO?.meta_description,
              },
            ],
          },
          robots: robots,
          title: `${productSEO?.meta_title}` ?? "",
        };
      } else {
        return defaultMetadata;
      }
  }
}
