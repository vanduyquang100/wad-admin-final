import { productService } from "@/apis/products";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useUpdateProduct = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: productService.updateProduct,
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
