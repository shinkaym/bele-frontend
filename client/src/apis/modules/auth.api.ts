// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse, ICustomer, IJwt } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'
import axiosPublic from '../client/public.client'

const authEndpoints = {
  login: 'Auth/Login',
  register: 'Auth/Register',
  getMe: 'Auth/GetMe',
  refresh: `Auth/RefreshToken`
}

const authApi = {
  login(data: { email: string; password: string }): Promise<{ customer: ICustomer; jwt: IJwt }> {
    return axiosPublic.post(authEndpoints.login, { ...data })
  },
  register(data: {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    phoneNumber: string
  }): Promise<IApiResponse<{ customer: ICustomer }>> {
    return axiosPublic.post(authEndpoints.register, { ...data })
  },
  getMe(): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.get(authEndpoints.getMe)
  }
}

export default authApi
