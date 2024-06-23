import { getProducts } from '@/actions/dataFetcher';
import Products from '@/components/global/Products';

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
