import Navbar from '@/components/global/Navbar';
import Products from '@/components/global/Products';
import axiosInstance from '@/utils/axiosInstance';

async function getProducts() {
  const response = await axiosInstance.get(`/products?page_size=20`);

  return response?.data;
}

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Products products={products} />
    </div>
  );
}
