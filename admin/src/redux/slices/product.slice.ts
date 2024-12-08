import { IProduct } from '@/models/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
  products: IProduct[]
  loading: boolean
}

const initialState: ProductState = {
  products: [],
  loading: false
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const { setProducts, setLoading } = productSlice.actions
export default productSlice.reducer
