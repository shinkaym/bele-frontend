import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/product.slice'
import customerReducer from './slices/customer.slice'

const store = configureStore({
  reducer: {
    products: productReducer,
    customer: customerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
