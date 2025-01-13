// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse, ICustomer, IJwt } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'
import axiosPublic from '../client/public.client'

const authEndpoints = {
  login: 'Auth/Login',
  register: 'Auth/Register',
  getMe: 'Auth/GetMe',
  logout: 'Auth/Logout',
  refresh: `Auth/RefreshToken`,
  getOTP: 'Auth/GetOTP',
  validateOTP: 'Auth/ValidateOTP',
  createNewPassword: 'Auth/CreateNewPassword'
}

const authApi = {
  async login(data: { email: string; password: string }): Promise<{ customer: ICustomer; jwt: IJwt }> {
    return axiosPublic.post(authEndpoints.login, { ...data })
  },
  async logout(): Promise<{ message: string; status: number }> {
    return axiosPrivate(authEndpoints.logout)
  },
  async refresh(refreshToken: string): Promise<{ jwt: IJwt }> {
    return axiosPrivate.post(authEndpoints.refresh, { refreshToken })
  },
  async register(data: {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    phoneNumber: string
  }): Promise<IApiResponse<{ customer: ICustomer }>> {
    return axiosPublic.post(authEndpoints.register, { ...data })
  },
  async getMe(): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.get(authEndpoints.getMe)
  },
  async getOTP(email: string): Promise<{ status: number; message: string }> {
    return axiosPublic.post(authEndpoints.getOTP, email)
  },
  async validateOTP(data: { email: string; otp: string }): Promise<IApiResponse<{ jwt: string }>> {
    return axiosPublic.post(authEndpoints.validateOTP, { ...data })
  },
  async createNewPassword(
    data: { password: string; confirmPassword: string },
    jwt: string
  ): Promise<IApiResponse<ICustomer>> {
    return axiosPublic.post(
      authEndpoints.createNewPassword,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${jwt}` // Thêm JWT vào header Authorization
        }
      }
    )
  }
}

export default authApi
