// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IAccountLogin, IAccountResponse } from '@/models/interfaces/account'
import axiosPrivate from '../client/private.client'
import axiosPublic from '../client/public.client'

const authEndpoints = {
  login: 'Auth/Login',
  getMe: 'Auth/GetMe',
  refresh: `Auth/RefreshToken`
}

const authApi = {
  login(email: string, password: string): Promise<IAccountLogin> {
    return axiosPublic.post(authEndpoints.login, { email, password })
  },
  getMe(): Promise<IAccountResponse> {
      return axiosPrivate.get(authEndpoints.getMe)
  }
}

export default authApi
