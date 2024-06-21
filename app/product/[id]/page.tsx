import Product from '@/components/global/Product';
import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';

async function getProduct(id: string) {
  const response = await axiosInstance.get(`/products/${id}`);

  return response?.data;
}

const page = async ({ params }: any) => {
  const product = await getProduct(params.id);

  return (
    <div>
      <Product product={product} />
    </div>
  );
};

export default page;
