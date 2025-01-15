import { IApiResponse, IContactAddResponse } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const contactApi = {
  // Thêm một contact mới
  async add(data: {
    title: string
    message: string
    fullName: string
    email: string
    phoneNumber: string
    status: number
    createdAt: string
  }): Promise<IApiResponse<{ contact: IContactAddResponse }>> {
    return axiosPrivate.post('contact', { ...data })
  }
}

export default contactApi
