import { authenticationService } from "@/apis/authentication";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useLogin = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: authenticationService.logIn,
    onSuccess: () => {
      props?.successCallBackFn?.();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
