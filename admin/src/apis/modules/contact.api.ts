// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {
    IContactDetailResponse,
    IContactListResponse,
    IContactDeleteResponse,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    IContactUpdateStatusResponse,
    IContactAddResponse,
  } from '@/models/interfaces/contact';
  import axiosPublic from '../client/public.client';
  import { contactListResponseData, contactDetailResponseData } from '@/models/data/contactData';
  
  const contactEndpoints = {
    list: 'contact',
    detail: ({ id }: { id: number }) => `contact/${id}`,
    delete: ({ id }: { id: number }) => `contact/delete/${id}`,
    updateStatus: ({ id }: { id: number }) => `contact/update/status/${id}`,
    add: 'contact/add',
    update: ({ id }: { id: number }) => `contact/update/${id}`,
  };
  
  const contactApi = {
    // Lấy danh sách contact
    list(): IContactListResponse {
      try {
        // return await axiosPublic.get(contactEndpoints.list)
        return contactListResponseData;
      } catch (error) {
        throw error;
      }
    },
  
    // Lấy thông tin chi tiết của một contact
    detail({ id }: { id: number }): IContactDetailResponse {
      try {
        // return await axiosPublic.get(contactEndpoints.detail({ id }))
        return contactDetailResponseData;
      } catch (error) {
        throw error;
      }
    },
  
    // Xóa một contact
    async delete({ id }: { id: number }): Promise<IContactDeleteResponse> {
      try {
        return await axiosPublic.delete(contactEndpoints.delete({ id }));
      } catch (error) {
        throw error;
      }
    },
  
    // Sửa trạng thái của contact
    async updateStatus({ id, status }: { id: number; status: number }): Promise<IContactUpdateStatusResponse> {
      try {
        return await axiosPublic.patch(contactEndpoints.updateStatus({ id }), { status });
      } catch (error) {
        throw error;
      }
    },
  
    // Thêm một contact
    async add(data: {
      title: string;
      message: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      status: number;
    }): Promise<IContactAddResponse> {
      try {
        const response = await axiosPublic.post(contactEndpoints.add, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default contactApi;
=======
=======
>>>>>>> Stashed changes
    IContactUpdateStatusResponse
  } from '@/models/interfaces/contact'
  import axiosPublic from '../client/public.client'
  import { IApiResponse } from '@/models/interfaces/api'
  import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
  
  const contactEndpoints = {
    list: 'contacts',
    detail: ({ id }: { id: number }) => `contacts/${id}`,
    delete: ({ id }: { id: number }) => `contacts/${id}`,
    updateStatus: ({ id }: { id: number }) => `contacts/${id}/status`,
    add: 'contacts',
    update: ({ id }: { id: number }) => `contacts/${id}`
  }
  
  const contactApi = {
    async list(params: {
        page: number
        limit: number
        query: string
        field: EFieldByValue
        status: any
        sort: EFieldByValue
        order: ESortOrderValue
      }): Promise<IApiResponse<IContactListResponse>> {
      try {
        const response = await axiosPublic.get(contactEndpoints.list, { params })
        return response.data
      } catch (error) {
        throw error
      }
    },
  
    async detail({ id }: { id: number }): Promise<IApiResponse<IContactDetailResponse>> {
      try {
        const response = await axiosPublic.get(contactEndpoints.detail({ id }))
        return response.data
      } catch (error) {
        throw error
      }
    },
  
    async delete({ id }: { id: number }): Promise<IApiResponse<IContactDeleteResponse>> {
      try {
        const response = await axiosPublic.delete(contactEndpoints.delete({ id }))
        return response.data
      } catch (error) {
        throw error
      }
    },
  
    async updateStatus({ id, status }: { id: number; status: number }): Promise<IApiResponse<IContactUpdateStatusResponse>> {
      try {
        const response = await axiosPublic.put(contactEndpoints.updateStatus({ id }), { status })
        return response.data
      } catch (error) {
        throw error
      }
    },
  }
  
  export default contactApi
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  