import { ISetting } from '@/models/interfaces'
import { createContext } from 'react'

// Định nghĩa kiểu dữ liệu cho context

// Tạo context với giá trị mặc định là undefined (nếu chưa có context provider)
const SettingContext = createContext<ISetting | null>(null)

export default SettingContext
