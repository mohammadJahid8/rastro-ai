/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { getProducts, getSuggestions } from '@/actions/dataFetcher';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '@/providers/context/context';
import ProductsCard from './ProductsCard';
import { Props } from './Products';

export const Products = ({
  initialProducts,
  productId,
  suggestionPage,
}: Props) => {
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
      <div>
        {products?.map((item: any, index: number) => (
          <div>
            <ProductsCard key={item.id} product={item} />
          </div>
        ))}
      </div>
      <div ref={ref} className='invisible'>
        Load more
      </div>
    </>
  );
};
