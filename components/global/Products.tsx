/* eslint-disable @next/next/no-img-element */
'use client';

import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/dataFetcher';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '@/providers/context/context';




import ProductsCard from './ProductsCard';

const Products = ({ initialProducts }: any) => {
  const { setProducts, products } = useAppContext();


  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();




  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    const newProducts = await getProducts(nextPage, 21);
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
      <div className='columns-1 xs:columns-2 md:columns-3 lg:columns-5 2xl:columns-6 3xl:columns-7 gap-4 mt-10'>
        {products?.map((item: any, index: number) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
      <div ref={ref} className='invisible'>
        Load more
      </div>
    </>
  );
};

export default Products;
