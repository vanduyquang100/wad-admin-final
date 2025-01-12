import { imageService, UploadImageResponse } from "@/apis/images";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useUploadImage = (props?: {
  successCallBackFn?: (result: UploadImageResponse) => void;
  errorCallbackFn?: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: imageService.uploadImage,
    onSuccess: (data) => {
      props?.successCallBackFn?.(data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const { response } = error;
      const { message } = response?.data ?? { message: "Error happened" };

      props?.errorCallbackFn?.(message);
    },
  });
};
