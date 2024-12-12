import { Suspense } from "react";

import Loading from "@/components/sections/categories/Loader";
import NewProducts from "@/components/sections/NewProducts";
import Footer from "@/components/Footer/Footer";


const NewProductsPage = () => {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <NewProducts />
        <Footer />
      </Suspense>
    </>
  );
};

export default NewProductsPage;

export const metadata = {
    title: "Novo | HOB",
    description: "Dobrodošli na houseofbeauty.com Online Shop",
    keywords: [
        "House of beauty"
    ],
};
