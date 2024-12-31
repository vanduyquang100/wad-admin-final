
import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";
import { FilterCategory } from "@/constants/enums/order";

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

export interface UpdateOrderStatusRequest {
  id: string;
  status: Exclude<FilterCategory, FilterCategory.ALL>;
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

  async getOrderDetail(request: GetOrderDetail): Promise<OrderDetail> {
    const result = await axiosInstance.get<OrderDetail>(
      API_ROUTES.GET_ORDER.replace(":id", request.id)
    )
    return result.data;
  }

  async updateOrderStatus(request: UpdateOrderStatusRequest) {
    return axiosInstance.patch(
      API_ROUTES.UPDATE_ORDER_STATUS.replace(":id", request.id),
      {
        status: request.status
      }
    )
  }
}

export const orderService = new OrderService();

