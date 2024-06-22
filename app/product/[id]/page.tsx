import { getProduct } from '@/actions/getProductById';
import { getProducts } from '@/app/page';
import ProductCard from '@/components/global/ProductCard';
import ProductsCard from '@/components/global/ProductsCard';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  let product;
  try {
    product = await getProduct(params.id);
  } catch (error: any) {
    //TODO: error handling
    console.log(error);
  }

  let products = null;
  try {
    products = await getProducts();
  } catch (error: any) {
    console.log(error);
  }

  console.log(product);

  return (
    <div className='flex lg:flex-row flex-col gap-4 h-full lg:px-10'>
      <div className='lg:w-1/3 xl:w-[30%] 3xl:w-[25%] '>
        <div className='flex items-start gap-4 w-full'>
          <div className='w-12 hidden lg:block'>
            <Link
              href={'/'}
              className='bg-white w-12 shadow-md h-9 rounded-[8px] p-1 flex justify-center items-center group'
            >
              <ChevronLeft className='h-6 w-6 text-black ' />
            </Link>
          </div>
          <ProductCard product={product} />
        </div>
      </div>
      <div className='lg:w-2/3 xl:w-[70%] 3xl:w-[75%]  px-5 lg:px-0'>
        <div className='columns-1 xs:columns-2 md:columns-3 3xl:columns-5 gap-2 '>
          {products?.map((item: any, index: number) => (
            <ProductsCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
