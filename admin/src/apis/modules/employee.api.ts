// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

import { IEmployeeDeleteResponse, IEmployeeDetailResponse, IEmployeeListResponse, IEmployeeUpdateStatusResponse } from '@/models/interfaces/employee'
import axiosPublic from '../client/public.client'
import { employeeListResponseData } from '@/models/data/employeeData'

const employeeEndpoints = {
  list: 'employee',
  detail: ({ id }: { id: number }) => `employee/${id}`,
  delete: ({ id }: { id: number }) => `employee/delete/${id}`,
  updateStatus: ({ id }: { id: number }) => `employee/update/status/${id}`
}

const employeeApi = {
  // async list(): Promise<IApiResponse<IEmployeeListResponse>> {
    list(): IEmployeeListResponse {
      try {
        // return await axiosPublic.get(employeeEndpoints.list)
        return employeeListResponseData
      } catch (error) {
        throw error
      }
    },
  
    async detail({ id }: { id: number }): Promise<IEmployeeDetailResponse> {
      try {
        return await axiosPublic.get(employeeEndpoints.detail({ id }))
      } catch (error) {
        throw error
      }
    },
  
    async delete({ id }: { id: number }): Promise<IEmployeeDeleteResponse> {
      try {
        return await axiosPublic.delete(employeeEndpoints.delete({ id }))
      } catch (error) {
        throw error
      }
    },
  
    async updateStatus({ id, status }: { id: number; status: number }): Promise<IEmployeeUpdateStatusResponse> {
      try {
        return await axiosPublic.patch(employeeEndpoints.updateStatus({ id }), { status })
      } catch (error) {
        throw error
      }
    }
}

export default employeeApi
