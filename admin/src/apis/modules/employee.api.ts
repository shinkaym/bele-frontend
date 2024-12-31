// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

import { IEmployeeAddResponse, IEmployeeDeleteResponse, IEmployeeDetailResponse, IEmployeeListResponse, IEmployeeUpdateResponse, IEmployeeUpdateStatusResponse } from '@/models/interfaces/employee'
import axiosPublic from '../client/public.client'
import { employeeListResponseData, employeeResponseData } from '@/models/data/employeeData'

const employeeEndpoints = {
  list: 'employee',
  detail: ({ id }: { id: number }) => `employee/${id}`,
  delete: ({ id }: { id: number }) => `employee/delete/${id}`,
  updateStatus: ({ id }: { id: number }) => `employee/update/status/${id}`,
  add: 'employee/add',
  update: ({ id }: { id: number }) => `employee/update/${id}`
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
  
    // async detail({ id }: { id: number }): Promise<IEmployeeDetailResponse> {
    detail({ id }: { id: number }): IEmployeeDetailResponse {
      try {
        // return await axiosPublic.get(employeeEndpoints.detail({ id }))
        return employeeResponseData
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
    },

    async add(data: { name: string; phoneNumber: string; email: string; password: string; rePassword: string; sex: string; role: number; status: number }): Promise<IEmployeeAddResponse> {
      try {
        const response = await axiosPublic.post(employeeEndpoints.add, data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async update({ id, data }: { id: number; data: { name: string; phoneNumber: string; email: string; password: string; rePassword: string; sex: string; role: number; status: number } }): Promise<IEmployeeUpdateResponse> {
      try {
        const response = await axiosPublic.put(employeeEndpoints.update({ id }), data)
        return response.data
      } catch (error) {
        throw error
      }
    }
}

export default employeeApi
