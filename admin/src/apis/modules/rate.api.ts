// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IRateTableResponse, IRate } from '@/models/interfaces/rate'
import { IRateTableResponseData } from '@/models/data/rateData'

const rateEndpoints = {
  list: 'rate',
  detail: (id: string | number) => `rate/${id}`
}

const rateApi = {
  getAll():IRateTableResponse{
  // getAll():Promise<IRateTableResponse>{
    // return axiosPublic.get(rateEndpoints.list)
    return IRateTableResponseData
  },
  // getId(id: number):Promise<IRate>{
    // return axiosPublic.get(rateEndpoints.detail(id))
  // }
}

export default rateApi
