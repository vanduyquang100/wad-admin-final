
import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";

export interface GetAllOrdersFilters extends Record<string, unknown> {
  page: number;
  limit?: number;
  status?: string;
}

export interface AllOrdersResponse {
  orders: Order[];
  pagination: {
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface GetOrderDetail {
  id: string;
}

class OrderService {
  async getAllOrders(filter: GetAllOrdersFilters): Promise<AllOrdersResponse> {
    const result = await axiosInstance.get<AllOrdersResponse>(
      API_ROUTES.ALL_ORDERS,
      {
        params: filter
      }
    )

    return result.data;
  }

  async getOrderDetail(request: GetOrderDetail): Promise<Order> {
    const result = await axiosInstance.get<Order>(
      API_ROUTES.GET_ORDER.replace(":id", request.id)
    )
    return result.data;
  }
}

export const orderService = new OrderService();

