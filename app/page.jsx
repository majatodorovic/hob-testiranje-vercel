import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import Brands from "@/components/Brands/Brands";
import BestSellers from "@/components/BestSellers/BestSellers";
import BlogSection from "@/components/BlogSection/BlogSection";
import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const getBanners = async () => {
  return await get("/banners/index_slider").then((res) => res?.payload);
};

const getMobileBanners = async () => {
  return await get("/banners/index_slider_mobile").then((res) => res?.payload);
};

const getBannersCategories = async () => {
  return await get("/banners/promo").then((res) => res?.payload);
};

const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items,
  );
};

const getActionProducts = async () => {
  return await list("/products/section/list/action", { render: false }).then(
    (res) => res?.payload?.items,
  );
};

const getIndexBanner = async () => {
  return await get("/banners/index_banner").then((res) => res?.payload);
};

const fetchAction4 = async () => {
  const fetchAction4 = await get("/banners/akcija4").then(
    (response) => response?.payload,
  );
  return fetchAction4;
};

const getNew = async () => {
  return await list("/categories/section/recommended").then(
    (res) => res?.payload,
  );
};

const fetchBlog = async () => {
  const fetchBlog = await list("/news/category/list/all").then(
    (res) => res?.payload.items,
  );
  return fetchBlog;
};

const Home = async () => {
  const [
    banners,
    recommendedProducts,
    action_products,
    categories,
    mobileBanners,
    recommendedCategories,
    blog,
    all_headers,
  ] = await Promise.all([
    getBanners(),
    getRecommendedProducts(),
    getActionProducts(),
    getBannersCategories(),
    getMobileBanners(),
    getNew(),
    fetchBlog(),
    headers(),
  ]);

  const base_url = all_headers.get("x-base_url");

  const schema = generateOrganizationSchema(base_url);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative block overflow-hidden">
        <IndexSlider banners={banners} mobileBanners={mobileBanners} />

        {recommendedProducts?.length > 0 && (
          <RecommendedProducts recommendedProducts={recommendedProducts} />
        )}
        <Brands />
        {action_products?.length > 0 && (
          <BestSellers action_products={action_products} />
        )}
        {recommendedCategories?.length > 0 && (
          <NewCategoriesSections categories={recommendedCategories} />
        )}
        <BlogSection blog={blog} />
        <AboutUs />
        {categories?.length > 0 && (
          <RecommendedCategories categories={categories} />
        )}
        <NewsLetterInstagramSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const revalidate = 30;

export const generateMetadata = async () => {
  const [data, header_list] = await Promise.all([getSEO(), headers()]);

  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | HOB",
    description: data?.meta_description ?? "Dobrodošli na HOB Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | HOB",
      description:
        data?.social?.share_description ?? "Dobrodošli na HOB Online Shop",
      type: "website",
      images: [
        {
          url:
            data?.social?.share_image ??
            "https://api.hobbrandgroup.croonus.com/croonus-uploads/config/b2c/logo-77e63453bf041487c784ae743f48ae77.webp",
          width: 800,
          height: 600,
          alt: "HOB",
        },
      ],
      locale: "sr_RS",
    },
  };
};
