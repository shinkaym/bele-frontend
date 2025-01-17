import { IApiResponse, IChangePasswordFormData, ICustomer, IUpdateInfoFormData } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const customerEndpoints = {
  updateInfo: 'Customer',
  changePassword: 'Customer',
  getInfo: 'Auth/GetMe'
}

const customerApi = {
  async getInfo(): Promise<IApiResponse<ICustomer>> {
    return axiosPrivate.get(customerEndpoints.getInfo)
  },
  async updateInfo(data: IUpdateInfoFormData): Promise<IApiResponse<void>> {
    return axiosPrivate.put(customerEndpoints.updateInfo, {
      ...data,
      birthDay: data.birthday
    })
  },
  async changePassword(data: IChangePasswordFormData): Promise<IApiResponse<void>> {
    return axiosPrivate.post(customerEndpoints.changePassword, { ...data })
  }
}

export default customerApi
