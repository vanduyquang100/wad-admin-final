
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

export interface GetRevenueInTimeRange {
  start: number;
  end: number;
}

export interface GetProductRevenueInTimeRange {
  start: number;
  end: number;
}

export interface GetUserOrders {
  userId: string;
}

export interface RevenueDate {
  date: string;
  revenue: number;
}

export interface GetRevenueInTimeRangeResponse {
  totalRevenue: RevenueDate[];
}

export type GetProductRevenueInTimeRangeResponse = {
  _id: string;
  name: string;
  price: number;
  totalRevenue: number;
}[];

export type UserOrderResponse = Order[];

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

  async getRevenueInRange(request: GetRevenueInTimeRange): Promise<GetRevenueInTimeRangeResponse> {
    const result = await axiosInstance.get<GetRevenueInTimeRangeResponse>(
      API_ROUTES.GET_REVENUE,
      {
        params: {
          ...request
        }
      }
    )

    return result.data;
  }

  async getProductRevenueInRange(request: GetProductRevenueInTimeRange): Promise<GetProductRevenueInTimeRangeResponse> {
    const result = await axiosInstance.get<GetProductRevenueInTimeRangeResponse>(
      API_ROUTES.GET_PRODUCT_REVENUE,
      {
        params: {
          ...request
        }
      }
    )

    return result.data;
  }

  async getOrdersOfAUser(request: GetUserOrders): Promise<UserOrderResponse> {
    const result = await axiosInstance.get<UserOrderResponse>(
      API_ROUTES.GET_USER_ORDERS.replace(":userId", request.userId)
    )
    return result.data;
  }
}

export const orderService = new OrderService();

