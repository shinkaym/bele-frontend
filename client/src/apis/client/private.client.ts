import { IError, IJwt } from '@/models/interfaces'
import { fetchUserData } from '@/redux/slices/auh.slice'
import { fetchCart } from '@/redux/slices/cart.slice'
import { AppDispatch, RootState } from '@/redux/store'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// Tạo instance axios
const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
})

// Request Interceptor: Thêm Access Token vào header
axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response Interceptor: Xử lý authentication và authorization
axiosPrivate.interceptors.response.use(
  (response) => response.data, // Thành công
  async (error) => {
    const originalRequest = error.config

    // Xử lý lỗi Authentication (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }
        const { jwt }: { jwt: IJwt } = await axiosPrivate.post(`Auth/RefreshToken`, {
          refreshToken: refreshToken
        })
        const expireRefreshToken = Cookies.get('expireRefreshToken')
        if (expireRefreshToken) {
          // Cập nhật token mới
          Cookies.set('accessToken', jwt.accessToken, { expires: new Date(jwt.expireAccessToken) })
          Cookies.set('expireAccessToken', jwt.expireAccessToken)
          Cookies.set('refreshToken', jwt.refreshToken, { expires: new Date(expireRefreshToken) })
          console.log("Set lai token");
          originalRequest.headers.Authorization = `Bearer ${jwt.accessToken}`
          return axiosPrivate(originalRequest) // Retry request
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('expireAccessToken')
        Cookies.remove('expireRefreshToken')
        return Promise.reject(refreshError)
      }
    }

    // Các lỗi khác
    if (error.response) {
      console.log('🚀 ~ error.response:', error.response)
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

export default axiosPrivate
