import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store";

// Create axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;