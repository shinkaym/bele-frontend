// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

import {
    ICustomerDeleteResponse,
    ICustomerDetailResponse,
    ICustomerListResponse,
    ICustomerUpdateStatusResponse,
  } from '@/models/interfaces/customer';
  import axiosPublic from '../client/public.client';
  import { customerListResponseData } from '@/models/data/customerData';
  
  const customerEndpoints = {
    list: 'customer',
    detail: ({ id }: { id: number }) => `customer/${id}`,
    delete: ({ id }: { id: number }) => `customer/delete/${id}`,
    updateStatus: ({ id }: { id: number }) => `customer/update/status/${id}`,
  };
  
  const customerApi = {
    // Lấy danh sách khách hàng
    list(): ICustomerListResponse {
      try {
        return customerListResponseData;
      } catch (error) {
        throw error;
      }
    },
  
    // Lấy thông tin chi tiết của khách hàng
    async detail({ id }: { id: number }): Promise<ICustomerDetailResponse> {
      try {
        return await axiosPublic.get(customerEndpoints.detail({ id }));
      } catch (error) {
        throw error;
      }
    },
  
    // Xóa khách hàng
    async delete({ id }: { id: number }): Promise<ICustomerDeleteResponse> {
      try {
        return await axiosPublic.delete(customerEndpoints.delete({ id }));
      } catch (error) {
        throw error;
      }
    },
  
    // Cập nhật trạng thái của khách hàng
    async updateStatus({
      id,
      status,
    }: {
      id: number;
      status: number;
    }): Promise<ICustomerUpdateStatusResponse> {
      try {
        return await axiosPublic.patch(customerEndpoints.updateStatus({ id }), {
          status,
        });
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default customerApi;
  