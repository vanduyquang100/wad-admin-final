import { productService } from "@/apis/products";
import { QUERY_PARAMS } from "@/constants/queries";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteProduct = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      props?.successCallBackFn?.();
      queryClient.invalidateQueries([QUERY_PARAMS.ALL_PRODUCTS]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
