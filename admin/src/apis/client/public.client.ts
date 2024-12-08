import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://api.example.com", // Địa chỉ API public
  timeout: 10000, // Thời gian chờ (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor nếu cần (tùy chọn)
axiosPublic.interceptors.response.use(
  (response) => response, // Xử lý khi thành công
  (error) => {
    console.error("Public API error:", error);
    return Promise.reject(error); // Trả về lỗi
  }
);

export default axiosPublic;
