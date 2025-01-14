import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/auh.slice'
import cartReducer from './slices/cart.slice'
import customerReducer from './slices/customer.slice'
import productReducer from './slices/product.slice'
import settingReducer from './slices/setting.slice'

const rootReducer = combineReducers({
  products: productReducer,
  customer: customerReducer,
  settings: settingReducer,
  auth: authReducer,
  cart: cartReducer
})

export default rootReducer
