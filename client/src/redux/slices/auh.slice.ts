import authApi from '@/apis/modules/auth.api'
import { IApiResponse, ICustomerLogin, ICustomerResponse, IJwt } from '@/models/interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { error } from 'console'
import Cookies from 'js-cookie'

interface AuthState {
  isAuthenticated: boolean
  customer: ICustomerResponse | null
  loading: boolean
  error:string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  customer: null,
  loading: false,
  error:null
}

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (refreshToken: string | null, { rejectWithValue }) => {
    try {
      if (refreshToken) {
        const { jwt }: { jwt: IJwt } = await authApi.refresh(refreshToken)
        const expireRefreshToken = Cookies.get('expireRefreshToken')
        // Save new tokens to cookies
        if (expireRefreshToken && jwt) {
          Cookies.set('accessToken', jwt.accessToken, { expires: new Date(jwt.expireAccessToken) })
          Cookies.set('expireAccessToken', jwt.expireAccessToken)
          Cookies.set('refreshToken', jwt.refreshToken, { expires: new Date(expireRefreshToken) })
          const dataCustomer: IApiResponse<ICustomerResponse> = await authApi.getMe()
          if (dataCustomer.data) {
            return dataCustomer.data
          }
          return null
        }
      }
    } catch (error) {
      return rejectWithValue('Error fetching user data')
    }
  }
)

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ICustomerLogin>) => {
      const { customer, jwt } = action.payload
      console.log(customer)
      const expireAccessToken = new Date(jwt.expireAccessToken)
      const expireRefreshToken = new Date(jwt.expireRefreshToken || '')

      // Save tokens in cookies
      Cookies.set('accessToken', jwt.accessToken, { expires: expireAccessToken })
      Cookies.set('refreshToken', jwt.refreshToken, { expires: expireRefreshToken })
      Cookies.set('expireAccessToken', jwt.accessToken)
      Cookies.set('expireRefreshToken', jwt.refreshToken)

      state.isAuthenticated = true
      state.customer = customer
    },
    logout: (state) => {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      Cookies.remove('expireAccessToken')
      Cookies.remove('expireRefreshToken')
      state.isAuthenticated = false
      state.customer = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = action.payload ? true : false
        state.customer = action.payload || null
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
