// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IAttributeValue } from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'
import axios from 'axios'

const testEndpoints = {
  list: 'product',
  detail: (id: string | number) => `attribute-value/${id}`
}

const testApi = {
  getList() {
    return axios.post(testEndpoints.list)
    // return axiosPublic.get(testEndpoints.list)
  },
}

export default testApi
