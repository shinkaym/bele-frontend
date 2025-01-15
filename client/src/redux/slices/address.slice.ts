import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAddress, IAddressFormData } from '@/models/interfaces'
import addressApi from '@/apis/modules/address.api'

export const fetchAddresses = createAsyncThunk('address/fetchAddresses', async () => {
  const response = await addressApi.getAll()
  if (response.data) {
    return response.data.address
  }
  throw new Error('Failed to fetch addresses')
})

export const addAddress = createAsyncThunk('address/addAddress', async (data: IAddressFormData) => {
  const response = await addressApi.add(data)
  return response.data
})

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, data }: { id: number; data: IAddressFormData }) => {
    const response = await addressApi.update(id, data)
    return response.data
  }
)

export const deleteAddress = createAsyncThunk('address/deleteAddress', async (id: number) => {
  await addressApi.delete(id)
  return id
})

interface AddressState {
  addresses: IAddress[]
  loading: boolean
  error: string | null
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false
        state.addresses = action.payload
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Có lỗi khi lấy danh sách địa chỉ'
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        if (action.payload) {
          state.addresses.push(action.payload)
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (action.payload) {
          const { id } = action.payload
          const index = state.addresses.findIndex((address) => address.id === id)
          if (index !== -1) {
            state.addresses[index] = action.payload
          }
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((address) => address.id !== action.payload)
      })
  }
})

export default addressSlice.reducer
