import axiosInstance from "@/utils/axiosInstance";

export async function getProduct(id: string) {
  const res = await fetch(
    `https://sourcerer-production.up.railway.app/api/product/${id}`
  );
  const products = await res.json();

  return products;
  // const response = await axiosInstance.get(`/product/${id}`);
  // return response?.data;
}



export async function getProducts() {
  const res = await fetch(
    'https://sourcerer-production.up.railway.app/api/products?page_size=20'
  );
  const products = await res.json();

  // const response = await axiosInstance.get(`/products?page_size=20`);

  // console.log({ products });

  return products;
}
