import { IApiResponse, IRateAddDetail, IRateDetail } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const rateEndpoints = {
  addRating: 'Rate'
}

const rateApi = {
    async addRate(data: IRateAddDetail): Promise<IApiResponse<{rate:IRateDetail}>> {
        return axiosPrivate.post(rateEndpoints.addRating, { ...data })
      }
}

export default rateApi;