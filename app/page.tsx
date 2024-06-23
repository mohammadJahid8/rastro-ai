import { getProducts } from '@/actions/dataFetcher';
// import Products from '@/components/global/Products';
import dynamic from 'next/dynamic';

const Products = dynamic(() => import('@/components/global/Products'), {
  loading: () => <p>Loading...</p>,
});

export const revalidate = 30;

export default async function Home() {
  let products = null;
  try {
    products = await getProducts();
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className='px-5 md:px-10'>
      <Products products={products} />
    </div>
  );
}
