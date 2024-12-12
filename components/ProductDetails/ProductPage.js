import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import ProductMobileDetails from "../ProductMobileDetails/ProductMobileDetails";

const getProduct = async (slug) => {
  return await get(`/product-details/basic-data/${slug}`).then(
    (res) => res?.payload,
  );
};

const getProductGallery = async (slug) => {
  return await get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery,
  );
};

const getProductLongDescription = async (slug) => {
  return await get(`/product-details/description/${slug}`).then(
    (res) => res?.payload,
  );
};

const getBreadcrumbs = async (slug, categoryId) => {
  return await get(
    `/product-details/breadcrumbs/${slug}?categoryId=${categoryId ?? "*"}`,
  ).then((res) => res?.payload);
};

const getSpecification = async (slug) => {
  return await get(`/product-details/specification/${slug}`).then(
    (res) => res?.payload,
  );
};

const getDeclaration = async (slug) => {
  return await get(`/product-details/declaration/${slug}`).then(
    (res) => res?.payload,
  );
};

const ProductPage = async ({ path, id, categoryId, canonical }) => {
  const [
    product,
    productGallery,
    desc,
    specification,
    declaration,
    breadcrumbs,
  ] = await Promise.all([
    getProduct(id),
    getProductGallery(id),
    getProductLongDescription(id),
    getSpecification(id),
    getDeclaration(id),
    getBreadcrumbs(id, categoryId),
  ]);
  return (
    <div className="">
      <div className="lg:block">
        <ProductDetails
          product={product}
          productGallery={productGallery}
          desc={desc}
          path={path}
          id={id}
          breadcrumbs={breadcrumbs}
          specification={specification}
          declaration={declaration}
          canonical={canonical}
        />
      </div>
    </div>
  );
};

export default ProductPage;
