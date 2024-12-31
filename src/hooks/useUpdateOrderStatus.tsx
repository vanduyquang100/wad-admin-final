import { orderService } from "@/apis/orders";
import { QUERY_PARAMS } from "@/constants/queries";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateOrderStatus = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.updateOrderStatus,
    onSuccess: () => {
      props?.successCallBackFn?.();
      queryClient.invalidateQueries(QUERY_PARAMS.ORDER_DETAIL);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
