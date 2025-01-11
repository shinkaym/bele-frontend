import { IApiResponse, IVariantProductColor } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const variantEndpoints = {
  list: 'Variant',
  detail: (id: string | number) => `variant/${id}`
}

const variantApi = {
  async detailColor(params: {
    productId: number
    colorId: number
  }): Promise<IApiResponse<{ variants: IVariantProductColor[] }>> {
    return axiosPublic.get(variantEndpoints.list, { params })
  }
}

export default variantApi
