/* eslint-disable @next/next/no-img-element */
"use client";
import ProductsCard from "./ProductsCard";

const Products = ({ products }: any) => {
  return (
    <div className="columns-1 xs:columns-2 md:columns-3 lg:columns-5 2xl:columns-6 3xl:columns-7 gap-4 mt-10">
      {products?.map((item: any, index: number) => (
        <ProductsCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default Products;
