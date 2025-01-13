import { userService } from "@/apis/users";
import { QUERY_PARAMS } from "@/constants/queries";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateUser = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      props?.successCallBackFn?.();
      queryClient.invalidateQueries(QUERY_PARAMS.ME);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
