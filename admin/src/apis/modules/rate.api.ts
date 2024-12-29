// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IRateDeleteResponse, IRateDetailResponse, IRateListResponse, IRateUpdateStatusResponse } from '@/models/interfaces/rate'
import axiosPublic from '../client/public.client'
import { rateListResponseData } from '@/models/data/rateData'

const rateEndpoints = {
  list: 'rate',
  detail: ({ id }: { id: number }) => `rate/${id}`,
  delete: ({ id }: { id: number }) => `rate/delete/${id}`,
  updateStatus: ({ id }: { id: number }) => `rate/update/status/${id}`
}

const rateApi = {
  // async list(): Promise<IApiResponse<IRateListResponse>> {
    list(): IRateListResponse {
      try {
        // return await axiosPublic.get(rateEndpoints.list)
        return rateListResponseData
      } catch (error) {
        throw error
      }
    },
  
    async detail({ id }: { id: number }): Promise<IRateDetailResponse> {
      try {
        return await axiosPublic.get(rateEndpoints.detail({ id }))
      } catch (error) {
        throw error
      }
    },
  
    async delete({ id }: { id: number }): Promise<IRateDeleteResponse> {
      try {
        return await axiosPublic.delete(rateEndpoints.delete({ id }))
      } catch (error) {
        throw error
      }
    },
  
    async updateStatus({ id, status }: { id: number; status: number }): Promise<IRateUpdateStatusResponse> {
      try {
        return await axiosPublic.patch(rateEndpoints.updateStatus({ id }), { status })
      } catch (error) {
        throw error
      }
    }
}

export default rateApi
