
import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";

export interface GetAllProductsFilters extends Record<string, unknown> {
  page: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  name?: string;
  description?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface AllProductsResponse {
  totalDoc: number;
  page: number;
  limit: number;
  totalPages: number;
  docs: Products[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

class ProductService {
  async getAllProducts(filter: GetAllProductsFilters): Promise<AllProductsResponse> {
    const result = await axiosInstance.get<AllProductsResponse>(
      API_ROUTES.ALL_PRODUCTS,
      {
        params: filter
      }
    )

    return result.data;
  }
}

export const productService = new ProductService();

