import axios from "axios";

// 상품 등록 요청
export interface ProductCreateRequest {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export const createProduct = async (data: ProductCreateRequest) => {
  const response = await axios.post("/api/products", data);
  return response.data;
};
