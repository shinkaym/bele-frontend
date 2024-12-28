// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import axiosPublic from '../client/public.client'
import { variantData } from '@/models/data/variantData'
import { IVariant } from '@/models/interfaces/variant'

const variantEndpoints = {
  list: 'variant',
  detail: (id: string | number) => `variant/${id}`
}

const variantApi = {
  getList(): IVariant[] {
    return variantData
    // return axiosPublic.get(attributeValueEndpoints.list)
  },
  getVariantById(id: number): IVariant | undefined {
    return variantData.find((val) => val.id === id)
    // return axiosPublic.get(attributeValueEndpoints.detail(id))
  }
}

export default variantApi
