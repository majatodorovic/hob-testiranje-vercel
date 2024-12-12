import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import { NavigationMobile } from "@/components/Navigation/NavigationMobile";
import { UserProvider } from "@/context/userContext";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import Header from "@/components/Header/Header";
import { get } from "@/app/api/api";
import { QueryProvider } from "@/components/QueryProvider";
import { Suspense } from "react";
import { Analytics } from "@/_components/analytics";
const getCategories = async () => {
  return await get("/categories/product/tree").then(
    (response) => response?.payload,
  );
};
export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <html lang="sr-RS">
      <head>
        <link
          rel={`stylesheet`}
          href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`}
        />
        <Script
          src={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/regular.js`}
        ></Script>
        <link
          rel="stylesheet"
          href={`https://unpkg.com/aos@next/dist/aos.css`}
        />
        <link rel="preconnect" href={`https://fonts.googleapis.com`} />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <meta
          name="google-site-verification"
          content="GNV8fBpQhj98btQUat81dZo3nmXEzjiWnv5RZ0KlS0I"
        />
        <meta
          name="facebook-domain-verification"
          content="5lwyif19z201fp8ivtv8u8us73g9vu"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative">
        <QueryProvider>
          <UserProvider>
            <CartContextProvider>
              {/*<TrackingScripts />*/}
              <Header categories={categories} />
              <NavigationMobile categories={categories} />
              {children}
              <CookieAlert />
            </CartContextProvider>
          </UserProvider>
        </QueryProvider>
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Početna | HOB",
  description: "Dobrodošli na HOB Online Shop",
  robots: "index, follow",
  openGraph: {
    title: "HOB - kozmetika, oprema za salone",
    description: "Dobrodošli na HOB Online Shop",
    type: "website",
    url: "https://hobbrandgroup.rs",
    images: [
      {
        url: "https://api.hobbrandgroup.croonus.com/croonus-uploads/config/b2c/logo-77e63453bf041487c784ae743f48ae77.webp",
        width: 800,
        height: 600,
        alt: "HOB Brand Group",
      },
    ],
    site_name: "hobbrandgroup.rs",
    locale: "sr_RS",
  },
};
