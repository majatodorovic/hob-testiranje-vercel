import { Suspense } from "react";
import Loading from "@/components/sections/categories/Loader";
import Category from "@/components/sections/categories/Category";
import Footer from "@/components/Footer/Footer";

const CategoryPage = ({ path, category_id, base_url }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Category path={path} category_id={category_id} base_url={base_url} />
        <Footer />
      </Suspense>
    </>
  );
};

export default CategoryPage;
