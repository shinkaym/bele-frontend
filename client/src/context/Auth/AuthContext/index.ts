import { createContext } from 'react'
import { IEmployee } from '@/models/interfaces/employee' // Kiểu dữ liệu cho user, nếu có

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: IEmployee | null // Thông tin người dùng hoặc null nếu chưa đăng nhập
  signin: (userData: IEmployee, accessToken: string, refreshToken: string) => void // Hàm login
  signout: () => void // Hàm logout
  isAuthenticated:boolean
}

// Tạo context với giá trị mặc định là undefined (nếu chưa có context provider)
const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext
