import { Suspense } from "react";
import ProductPage from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";

const ProductDetailPage = ({ path, id, category_id, canonical }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductPage
        path={path}
        id={id}
        categoryId={category_id}
        canonical={canonical}
      />
    </Suspense>
  );
};

export default ProductDetailPage;
