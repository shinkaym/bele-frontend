import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/product.slice'
import profileReducer from './slices/profile.slice'

const store = configureStore({
  reducer: {
    products: productReducer,
    profile: profileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
