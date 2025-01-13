// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse, IChangePasswordFormData, ICustomer, IUpdateInfoFormData } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const customerEndpoints = {
  updateInfo: 'Customer',
  changePassword: 'Customer',
  getInfo: 'Auth/GetMe'
}

const customerApi = {
  async getInfo(): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.get(customerEndpoints.updateInfo)
  },
  async updateInfo(data: IUpdateInfoFormData): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.put(customerEndpoints.updateInfo, { data })
  },
  async changePassword(data: IChangePasswordFormData): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.post(customerEndpoints.changePassword, { data })
  }
}

export default customerApi
