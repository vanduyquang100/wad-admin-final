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

export interface GetUserRequest {
  id: string;
}

export interface UdateUserRequest {
  name: string;
  profilePic: string;
}

export interface UdateOtherUserRequest extends Omit<Partial<User>, "_id"> {
  _id: string;
}
export interface AllUserResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: User[];
}

export interface GetUserResponse extends User { }
export interface UpdateUserResponse extends User { }

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

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const result = await axiosInstance.get<GetUserResponse>(
      API_ROUTES.GET_USER.replace(":id", request.id),
    )

    return result.data;
  }

  async updateUser(request: Partial<UdateUserRequest>): Promise<UpdateUserResponse> {
    const result = await axiosInstance.put<UpdateUserResponse>(
      API_ROUTES.PUT_ME, request
    )

    return result.data;
  }

  async updateOtherUser(request: UdateOtherUserRequest): Promise<UpdateUserResponse> {
    const { _id, ...rest } = request;
    const result = await axiosInstance.put<UpdateUserResponse>(
      API_ROUTES.UPDATE_USER.replace(":id", request._id), {
      ...rest
    }
    )

    return result.data;
  }
}

export const userService = new UserService();

