import axiosInstance from "@/utils/axiosInstance";

export async function getProduct(id: string) {
  const response = await axiosInstance.get(`/product/${id}`);
  return response?.data;
}
