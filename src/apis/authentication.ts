import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";

class AuthenticationService {
  async logIn(props: { email: string; password: string }) {
    return axiosInstance.post(
      API_ROUTES.LOGIN,
      {
        email: props.email,
        password: props.password,
      }
    )
  }

  async me() {
    const result = await axiosInstance.get<User>(
      API_ROUTES.ME,
    );

    return result.data;
  }
}

export const authenticationService = new AuthenticationService();

