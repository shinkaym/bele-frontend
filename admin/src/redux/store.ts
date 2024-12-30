import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootRuducer'

// Cấu hình Redux Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Vô hiệu hóa kiểm tra tuần tự nếu cần
    }),
  devTools: process.env.NODE_ENV !== 'production' // Bật Redux DevTools trừ khi ở production
})

// Kiểu dữ liệu để sử dụng trong ứng dụng
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
