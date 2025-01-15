import { IAddress, IAddressFormData, IApiResponse } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const addressApi = {
  async getAll(): Promise<IApiResponse<{ address: IAddress[] }>> {
    return axiosPrivate.get('Address')
  },
  async update(id: number, data: IAddressFormData): Promise<IApiResponse<IAddress>> {
    return axiosPrivate.put(`Address/${id}`, data)
  },
  async add(data: IAddressFormData): Promise<IApiResponse<IAddress>> {
    return axiosPrivate.post('Address', data)
  },
  async delete(id: number): Promise<IApiResponse<void>> {
    return axiosPrivate.delete(`Address/${id}`)
  }
}

export default addressApi
