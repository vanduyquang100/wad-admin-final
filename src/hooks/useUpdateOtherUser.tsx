import { userService } from "@/apis/users";
import { QUERY_PARAMS } from "@/constants/queries";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateOtherUser = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.updateOtherUser,
    onSuccess: () => {
      props?.successCallBackFn?.();
      queryClient.invalidateQueries(QUERY_PARAMS.GET_USER);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
