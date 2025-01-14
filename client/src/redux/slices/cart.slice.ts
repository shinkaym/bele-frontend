import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import cartApi from '@/apis/modules/cart.api'
import { IApiResponse } from '@/models/interfaces'
import { ICart } from '@/models/interfaces'

// Định nghĩa kiểu dữ liệu cho state của Cart
interface CartState {
  data: ICart
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  data: {
    totalMoney:0,
    cartItems:[]
  },
  loading: false,
  error: null
}

// Thunk để lấy danh sách giỏ hàng
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response: IApiResponse<{ cart: ICart }> = await cartApi.list()
    return response.data!.cart
  } catch (error) {
    return rejectWithValue('Failed to fetch cart')
  }
})

// Thunk để thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: { variantId: number; quantity: number }, { rejectWithValue }) => {
    try {
      const response: IApiResponse<{ cart: ICart }> = await cartApi.add(data)
      return response.data!.cart
    } catch (error) {
      return rejectWithValue('Failed to add item to cart')
    }
  }
)

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (_, { rejectWithValue }) => {
    try {
      const response: IApiResponse<{ cart: ICart }> = await cartApi.delete()
      return response.data!.cart
    } catch (error) {
      return rejectWithValue('Failed to remove item from cart')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.data = {
        totalMoney:0,
        cartItems:[]
      }
      state.error = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { resetCart } = cartSlice.actions

export default cartSlice.reducer
