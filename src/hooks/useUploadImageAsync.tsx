import { imageService, UploadImageResponse } from "@/apis/images";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useUploadImageAsync = (props?: {
  successCallBackFn?: (result: UploadImageResponse) => void;
  errorCallbackFn?: (message: string) => void;
}) => {
  const mutation = useMutation({
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

  const uploadImageAsync = async (
    formData: FormData
  ): Promise<UploadImageResponse> => {
    try {
      const data = await mutation.mutateAsync(formData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { uploadImageAsync, isLoading: mutation.isLoading };
};
