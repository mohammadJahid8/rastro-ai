/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { getProducts, getSuggestions } from "@/actions/dataFetcher";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "@/providers/context/context";

import ProductsCard from "./ProductsCard";
import clsx from "clsx";

type Props = {
  initialProducts: any;
  productId?: string;
  suggestionPage?: boolean;
};

const Products = ({ initialProducts, productId, suggestionPage }: Props) => {
  const { setProducts, products } = useAppContext();

  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    let newProducts: [];

    if (suggestionPage && productId) {
      newProducts = await getSuggestions(productId, nextPage, 21);
      console.log(newProducts);
    } else {
      newProducts = await getProducts(nextPage, 21);
      console.log(newProducts);
    }

    setProducts((prevProducts: any) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      <div
        className={clsx(
          "columns-1 xs:columns-2 md:columns-3 gap-4",
          suggestionPage
            ? "lg:columns-3 2xl:columns-3 3xl:columns-4"
            : "lg:columns-5 2xl:columns-6 3xl:columns-7"
        )}
      >
        {products?.map((item: any, index: number) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
      <div ref={ref} className="invisible">
        Load more
      </div>
    </>
  );
};

export default Products;
