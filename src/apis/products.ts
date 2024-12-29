
import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";
import { relativeServerLinkToURL } from "@/lib/utils";

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
  docs: Product[];
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

export interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  detailDescription?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  stock?: number;
}

export interface DeleteProductRequest {
  id: string;
}

export interface GetProductDetail {
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

  async updateProduct(request: UpdateProductRequest) {
    const { id, ...actualRequest } = request;
    return axiosInstance.patch(
      API_ROUTES.UPDATE_PRODUCT.replace(":id", id),
      actualRequest
    )
  }

  async deleteProduct(request: DeleteProductRequest) {
    return axiosInstance.delete(
      API_ROUTES.DELETE_PRODUCT.replace(":id", request.id),
    )
  }

  async getProductDetail(request: GetProductDetail): Promise<Product> {
    const result = await axiosInstance.get<Product>(
      API_ROUTES.GET_PRODUCT.replace(":id", request.id)
    )

    if (result.data.imageUrl) {
      try {
        new URL(result.data.imageUrl);
      } catch {
        result.data.imageUrl = relativeServerLinkToURL(result.data.imageUrl);
      }
    }
    return result.data;
  }
}

export const productService = new ProductService();

