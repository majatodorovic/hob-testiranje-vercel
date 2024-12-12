import StaticPage from "@/components/StaticPage/StaticPage";
import { get, list } from "@/app/api/api";
import { headers } from "next/headers";

const DynamicStaticPage = async ({ params }) => {
  const { slug } = await params;
  return <StaticPage slug={slug} />;
};

export default DynamicStaticPage;

const getSEO = (slug) => {
  return get(`/static-pages/seo/${slug}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const [data, header_list] = await Promise.all([getSEO(slug), headers()]);

  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | HOB",
    description: data?.meta_description ?? "Dobrodošli na HOB Online Shop",
    keywords: data?.meta_keywords ?? [],
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
