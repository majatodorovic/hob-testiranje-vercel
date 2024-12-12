"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import React, { useEffect, useState } from "react";
import { generateProductSchema } from "@/_functions";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import UpsellProducts from "@/components/UpsellProducts/UpsellProducts";
import CrosssellProducts from "@/components/CrosssellProducts/CrosssellProducts";

const ProductDetails = ({
  product,
  productGallery,
  desc,
  path,
  breadcrumbs,
  specification,
  declaration,
  canonical,
  id,
}) => {
  const [rawGallery, setRawGallery] = useState(productGallery);
  const [loading, setLoading] = useState(false);
  const filteredImages = productGallery?.filter((image) => {
    return !image?.variant_key;
  });
  const [gallery, setGallery] = useState(filteredImages);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (color !== null) {
      setGallery(filteredImages);
      const newImage = rawGallery?.find((item) => {
        return item?.variant_key?.includes(color);
      });
      if (newImage) {
        setGallery((prev) => [newImage, ...prev]);
      }
    }
  }, [color]);

  const product_schema = generateProductSchema(
    product,
    {
      gallery: gallery,
    },
    canonical,
  );
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      <div className="grid grid-cols-4 gap-x-[2.063rem]">
        <ProductGallery
          productGallery={gallery}
          color={color}
          loading={loading}
          setLoading={setLoading}
          product={product}
        />
        <ProductInfo
          product={product}
          desc={desc}
          path={path}
          color={color}
          loading={loading}
          setColor={setColor}
          breadcrumbs={breadcrumbs}
          specification={specification}
          declaration={declaration}
        />
      </div>

      <div className={`mt-5 px-2 md:px-[2rem]`}>
        <RelatedProducts id={id} />
      </div>

      <div className={`mt-5 px-2 md:px-[2rem]`}>
        <UpsellProducts id={id} />
      </div>

      <div className={`mt-5 px-2 md:px-[2rem]`}>
        <CrosssellProducts id={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
