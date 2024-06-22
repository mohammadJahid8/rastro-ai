import Navbar from '@/components/global/Navbar';
import Products from '@/components/global/Products';
import axiosInstance from '@/utils/axiosInstance';

export async function getProducts() {
  const response = await axiosInstance.get(`/products?page_size=20`);

  return response?.data;
}

export const revalidate = 3600;

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
