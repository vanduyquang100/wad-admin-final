import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";
import { UserRoles } from "@/constants/global";

export interface GetAllUserFilters {
  page: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  name?: string;
  email?: string;
  roles?: UserRoles[];
  includeBanned?: boolean;
}

export interface AllUserResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: User[];
}

class UserService {
  async getAllUsers(filter: GetAllUserFilters): Promise<AllUserResponse> {
    const result = await axiosInstance.get<AllUserResponse>(
      API_ROUTES.ALL_USERS,
      {
        params: filter
      }
    )

    return result.data;
  }
}

export const userService = new UserService();

