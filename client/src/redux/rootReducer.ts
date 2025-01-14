import { combineReducers } from '@reduxjs/toolkit'
import customerReducer from './slices/customer.slice'
import productReducer from './slices/product.slice'
import settingReducer from './slices/setting.slice'
import authReducer from './slices/auh.slice'


const rootReducer = combineReducers({
  products: productReducer,
  customer: customerReducer,
  settings: settingReducer,
  auth: authReducer
})

export default rootReducer
