import authApi from '@/apis/modules/auth.api'
import { IEmployee } from '@/models/interfaces/employee'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthContext'
import Loader from '@/components/common/Loader'

// Định nghĩa kiểu dữ liệu cho props của AuthProvider
interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<IEmployee | null>(null) // Khởi tạo user với giá trị null
  const [loading, setLoading] = useState<boolean>(true) // Trạng thái loading khi gọi API
  const navigate = useNavigate()

  // Hàm signin nhận dữ liệu user, accessToken và refreshToken
  const signin = (userData: IEmployee, accessToken: string, refreshToken: string) => {
    Cookies.set('accessToken', accessToken)
    Cookies.set('refreshToken', refreshToken)
    setIsAuthenticated(true)
    setUser(userData)
    navigate('/') // Điều hướng về trang chính sau khi đăng nhập thành công
  }

  // Hàm logout
  const signout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setIsAuthenticated(false)
    setUser(null) // Reset user về null khi logout
    navigate('/signin') // Điều hướng về trang đăng nhập
  }

  // Kiểm tra token khi trang được load
  useEffect(() => {
    const fetchApi = async () => {
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        try {
          const data = await authApi.getMe(accessToken)
          if (data) {
            setUser(data) // Cập nhật thông tin người dùng khi có token
            setIsAuthenticated(true)
          } 
        } catch (error) {
          console.error('Error fetching user data:', error)
          navigate('/signin') // Điều hướng đến trang đăng nhập nếu có lỗi API
        }
      }
      setLoading(false) // Đặt trạng thái loading về false khi đã kiểm tra xong
    }
    fetchApi()
  }, [navigate])

  if (loading) {
    return <Loader /> // Hiển thị loading trong khi đang kiểm tra token
  }

  return <AuthContext.Provider value={{ user, signin, signout , isAuthenticated }}>{children}</AuthContext.Provider>
}

export default AuthProvider
