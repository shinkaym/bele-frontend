import authApi from '@/apis/modules/auth.api'
import Loader from '@/components/common/Loader'
import { ICustomer, ICustomerLogin } from '@/models/interfaces'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import AuthContext from '../AuthContext'

// Định nghĩa kiểu dữ liệu cho props của AuthProvider
interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [customer, setCustomer] = useState<ICustomer | null>(null) // Khởi tạo user với giá trị null
  const [loading, setLoading] = useState<boolean>(true) // Trạng thái loading khi gọi API

  // Hàm signin nhận dữ liệu user, accessToken và refreshToken
  const login = (customerLogin: ICustomerLogin) => {
    const { customer, jwt } = customerLogin
    const expireAccessToken = new Date(jwt.expireAccessToken)
    const expireRefreshToken = new Date(jwt.expireRefreshToken || '')
    // Lưu các token vào cookie với thời gian hết hạn
    Cookies.set('accessToken', jwt.accessToken, { expires: expireAccessToken })
    Cookies.set('refreshToken', jwt.refreshToken, { expires: expireRefreshToken })
    Cookies.set('expireAccessToken', jwt.accessToken)
    Cookies.set('expireRefreshToken', jwt.refreshToken)

    setIsAuthenticated(true)
    setCustomer(customer)
  }

  // Hàm logout
  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('expireAccessToken')
    Cookies.remove('expireRefreshToken')
    setIsAuthenticated(false)
    setCustomer(null) // Reset user về null khi logout
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const refreshToken = Cookies.get('refreshToken')
        if (accessToken) {
          const dataCustomer = await authApi.getMe()
          if (dataCustomer.data) {
            setCustomer(dataCustomer.data)
            setIsAuthenticated(true)
          }
          return
        }
        // if (refreshToken) {
        //   const { jwt }: { jwt: IJwt } = await axiosPrivate.post(`Auth/RefreshToken`, { refreshToken })
        //   const expireRefreshToken = Cookies.get('expireRefreshToken')
        //   if (expireRefreshToken && jwt) {
        //     Cookies.set('accessToken', jwt.accessToken, { expires: new Date(jwt.expireAccessToken) })
        //     Cookies.set('expireAccessToken', jwt.expireAccessToken)
        //     Cookies.set('refreshToken', jwt.refreshToken, { expires: new Date(expireRefreshToken) })
        //     const dataCustomer = await authApi.getMe()
        //     if (dataCustomer.data) {
        //       setCustomer(dataCustomer.data)
        //       setIsAuthenticated(true)
        //       return
        //     }
        //   } 
        // }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!customer) fetchApi()
  }, [customer])

  if (loading) {
    return <Loader /> // Hiển thị loading trong khi đang kiểm tra token
  }

  return <AuthContext.Provider value={{ customer, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export default AuthProvider
