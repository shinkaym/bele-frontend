import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICustomer } from '@/models/interfaces'
import customerApi from '@/apis/modules/customer.api'

export const fetchCustomerInfo = createAsyncThunk('customer/fetchCustomerInfo', async () => {
  const response = await customerApi.getInfo()
  return response.data
})

interface CustomerState {
  info: ICustomer | null
  loading: boolean
  error: string | null
}

const initialState: CustomerState = {
  info: null,
  loading: false,
  error: null
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomerInfo.fulfilled, (state, action) => {
        state.loading = false
        state.info = action.payload ?? null
      })
      .addCase(fetchCustomerInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Có lỗi khi lấy thông tin cá nhân'
      })
  }
})

export default customerSlice.reducer
