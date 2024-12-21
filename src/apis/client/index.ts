import { SERVER_API } from "@/constants/apis";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: SERVER_API,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});