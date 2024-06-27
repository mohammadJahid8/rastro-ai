/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getProducts, getSuggestions } from '@/actions/dataFetcher';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '@/providers/context/context';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ProductsCard from './ProductsCard';
import axiosInstance from '@/utils/axiosInstance';

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
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;

    if (suggestionPage && productId) {
      const newProducts = await getSuggestions(productId, nextPage, 21);
      setProducts((prevProducts: any) => [...prevProducts, ...newProducts]);
    } else {
      // const res = await axiosInstance.get(
      //   `/products?page=${nextPage}&page_size=${21}`
      // );
      // console.log(res.data);
      // const newProducts = res.data;
      const newProducts = await getProducts(nextPage, 21);
      setProducts((prevProducts: any) => [
        ...(prevProducts || []),
        ...newProducts,
      ]);
    }

    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  console.log({ inView });

  const breakPoints = {
    360: 2,
    640: 3,
    1024: 5,
    1400: 6,
    1650: 7,
    1850: 8,
  };
  const breakPointSuggestion = {
    360: 2,
    640: 3,
    1024: 3,
    1400: 3,
    1650: 4,
    1850: 5,
  };

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={
          suggestionPage ? breakPointSuggestion : breakPoints
        }
      >
        <Masonry gutter='10px'>
          {products?.map((item: any, index: number) => (
            <ProductsCard key={item.id} product={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <div ref={ref} className='invisible'>
        Load more
      </div>
    </>
  );
};

export default Products;
