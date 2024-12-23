import { productService } from "@/apis/products";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useCreateProduct = (props?: {
  successCallBackFn?: VoidFunction;
  errorCallbackFn?: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: productService.createProduct,
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
