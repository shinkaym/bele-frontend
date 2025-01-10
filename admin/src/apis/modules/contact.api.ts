// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

import {
  IContactDetailResponse,
  IContactListResponse,
  IContactDeleteResponse,
  IContactUpdateStatusResponse,
  IContactAddResponse
} from '@/models/interfaces/contact'
import { contactListResponseData, contactDetailResponseData } from '@/models/data/contactData'
import axiosPublic from '../client/public.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'

const contactEndpoints = {
  list: 'contact',
  detail: ({ id }: { id: number }) => `contact/${id}`,
  delete: ({ id }: { id: number }) => `contact/delete/${id}`,
  updateStatus: ({ id }: { id: number }) => `contact/update/status/${id}`,
  add: 'contact/add',
  update: ({ id }: { id: number }) => `contact/update/${id}`
}

const contactApi = {
  // Lấy danh sách contact với tham số
  async list(params: {
    page: number
    limit: number
    query: string
    field: string
    status: number | null
    sort: string
    order: string
  }): Promise<IContactListResponse> {
    try {
      console.log('🚀 ~ list ~ params:', params); // Log tham số truyền vào API
      const response = await axiosPublic.get(contactEndpoints.list, { params });
      console.log('🚀 ~ list ~ response:', response); // Log toàn bộ phản hồi từ axios
      return response.data; // Chỉ trả về `data`
    } catch (error: any) {
      console.error('🚀 ~ list ~ error:', error.response || error.message || error);
      throw error.response?.data || error.message || error;
    }
  }, 
  

  // Lấy thông tin chi tiết của một contact
  detail({ id }: { id: number }): IContactDetailResponse {
    try {
      // Return mock data for detail
      return contactDetailResponseData
    } catch (error) {
      throw error
    }
  },

  // Xóa một contact
  async delete({ id }: { id: number }): Promise<IContactDeleteResponse> {
    try {
      return await axiosPublic.delete(contactEndpoints.delete({ id }))
    } catch (error) {
      throw error
    }
  },

  // Sửa trạng thái của contact
  async updateStatus({ id, status }: { id: number; status: number }): Promise<IContactUpdateStatusResponse> {
    try {
      return await axiosPublic.patch(contactEndpoints.updateStatus({ id }), { status })
    } catch (error) {
      throw error
    }
  },

  // Thêm một contact mới
  async add(data: {
    title: string
    message: string
    fullName: string
    email: string
    phoneNumber: string
    status: number
  }): Promise<IContactAddResponse> {
    try {
      const response = await axiosPublic.post(contactEndpoints.add, data)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default contactApi
