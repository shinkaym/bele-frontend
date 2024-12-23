// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IOrderTableResponse, IOrder } from '@/models/interfaces/order'
import { IOrderTableResponseData } from '@/models/data/orderData'

const orderEndpoints = {
  list: 'order',
  detail: (id: string | number) => `order/${id}`
}

const orderApi = {
  getAll():IOrderTableResponse{
  // getAll():Promise<IOrderTableResponse>{
    // return axiosPublic.get(orderEndpoints.list)
    return IOrderTableResponseData
  },
  // getId(id: number):Promise<IOrder>{
    // return axiosPublic.get(orderEndpoints.detail(id))
  // }
}

export default orderApi
