import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiURL } from "../contexts/Constants/constants";
const api = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor thêm token vào request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Gửi request với token:", config.headers.Authorization);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor xử lý lỗi response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      // Nếu lỗi 401 (Unauthorized) → Token không hợp lệ
      if (status === 401) {
        console.error("Token không hợp lệ hoặc hết hạn. Đăng xuất...");
        // Xóa token khỏi localStorage
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
