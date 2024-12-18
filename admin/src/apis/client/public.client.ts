import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Địa chỉ API public
  timeout: 10000, // Thời gian chờ (ms)
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Thêm interceptor nếu cần (tùy chọn)
axiosPublic.interceptors.response.use(
  (response) => response.data, // Xử lý khi thành công
  (error) => {
    console.error('Public API error:', error)
    return Promise.reject(error) // Trả về lỗi
  }
)

export default axiosPublic
