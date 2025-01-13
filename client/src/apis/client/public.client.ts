import { IError } from '@/models/interfaces'
import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Địa chỉ API public
  timeout: 1000000, // Thời gian chờ (ms)
  headers: {
    'ngrok-skip-browser-warning': 'true',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Thêm interceptor nếu cần (tùy chọn)
axiosPublic.interceptors.response.use(
  (response) => response.data, // Xử lý khi thành công
  (error) => {
    if (error.response) {
      // Trường hợp lỗi trả về từ server
      const errorMessage = error.response.data?.message || 'Something went wrong'
      const data: IError = {
        status: error.response.status || 500,
        message: errorMessage
      }
      return Promise.reject(data)
    } else {
      // Nếu không có response (ví dụ: lỗi mạng)
      return Promise.reject({
        status: 500,
        message: 'Network error'
      })
    }
  }
)

export default axiosPublic
