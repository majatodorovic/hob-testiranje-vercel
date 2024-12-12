import { list, post, get } from "@/app/api/api";
import CategoryPage from "./CategoryPage";
import { notFound } from "next/navigation";

const getCategoryFilters = (path) => {
  return post(`/products/category/filters/${path}`).then((res) => res?.payload);
};

const getSingleCategory = (path) => {
  return get(`/categories/product/single/${path}`).then((res) => res?.payload);
};

const Category = async ({ path, category_id, base_url }) => {
  const [filters, category] = await Promise.all([
    getCategoryFilters(category_id),
    getSingleCategory(category_id),
  ]);

  return (
    <>
      {category ? (
        <CategoryPage
          path={path}
          filter={filters}
          singleCategory={category}
          category_id={category_id}
          base_url={base_url}
        />
      ) : (
        notFound()
      )}
    </>
  );
};

export default Category;
