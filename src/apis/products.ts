
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

export interface CreateProductRequest {
  name: string;
  description: string;
  detailDescription: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export interface DeleteProductRequest {
  id: string;
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

  async createProduct(request: CreateProductRequest) {
    return axiosInstance.post(
      API_ROUTES.CREATE_PRODUCT,
      request
    )
  }

  async deleteProduct(request: DeleteProductRequest) {
    return axiosInstance.delete(
      API_ROUTES.DELETE_PRODUCT.replace(":id", request.id),
    )
  }
}

export const productService = new ProductService();

