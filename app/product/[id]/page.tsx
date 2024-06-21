import { getProduct } from "@/actions/getProductById";
import { getProducts } from "@/app/page";
import ProductCard from "@/components/global/ProductCard";
import Products from "@/components/global/Products";
import ProductsCard from "@/components/global/ProductsCard";
import axiosInstance from "@/utils/axiosInstance";

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
    <div className="grid grid-cols-4 md:grid-cols-5 gap-4 h-full">
      <div className="col-span-4 md:col-span-2">
        <ProductCard product={product} />
      </div>
      <div className="col-span-4 md:col-span-3 h-screen overflow-y-scroll">
        <div className="columns-2 xs:columns-2 md:columns-3 gap-2 ">
          {products?.map((item: any, index: number) => (
            <ProductsCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
