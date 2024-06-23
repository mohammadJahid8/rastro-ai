import { getProduct, getProducts, getSuggestions } from '@/actions/dataFetcher';
import ProductCard from '@/components/global/ProductCard';
import ProductDetails from '@/components/global/ProductDetails';
import { SkeletonCard } from '@/components/global/SkeletonCard';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
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
    console.log(error);
  }

  let suggestions = null;
  try {
    suggestions = await getSuggestions(params.id);
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div>
      <ProductDetails product={product} suggestions={suggestions} />
    </div>
  );
};

export default page;
