import { API_ROUTES } from "@/constants/apis";
import { axiosInstance } from "./client";


export interface UploadImageRequest extends FormData {

}

export interface UploadImageResponse {
  link?: string;
}

class ImageService {
  async uploadImage(file: UploadImageRequest): Promise<UploadImageResponse> {
    const result = await axiosInstance.post<UploadImageResponse>(
      API_ROUTES.UPLOAD_IMAGE,
      file,
      {
        timeout: 10000
      }
    )

    return result.data;
  }
}

export const imageService = new ImageService();

