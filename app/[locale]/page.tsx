import { getProducts } from "@/actions/dataFetcher";
import Products from "@/components/global/Products";

export const revalidate = 30;

const page_size = 21;

export default async function Home() {
  let initialProducts = null;
  try {
    initialProducts = await getProducts(1, page_size);
    console.log(initialProducts);
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="mx-auto">
      <div className="px-5 md:px-10 ">
        <Products initialProducts={initialProducts} />
      </div>
    </div>
  );
}
