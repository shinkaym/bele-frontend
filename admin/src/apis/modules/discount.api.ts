import {
  IDiscountListResponse,
  IDiscountDetailResponse,
  IDiscountDeleteResponse,
  IDiscountUpdateStatusResponse,
  IDiscountAddResponse,
  IDiscountUpdateResponse
} from '@/models/interfaces/discount'
import axiosPublic from '../client/public.client'
import { discountData } from '@/models/data/discountData'

const discountEndpoints = {
  list: 'discount',
  detail: ({ id }: { id: number}) => `discount/${id}`,
  delete: ({ id }: { id: number}) => `discount/delete/${id}`,
  updateStatus: ({ id }: { id: number}) => `discount/update/status/${id}`,
  add: 'discount/add',
  update: ({ id }: { id: number }) => `discount/update/${id}`
}

const discountApi = {
  getList: (): IDiscountListResponse => {
    return {
      status: 200,
      data: {
        discounts: discountData,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalRecords: discountData.length
        }
      },
      message: 'Successfully fetched discounts'
    }
  },

  async detail({ id }: { id: number }): Promise<IDiscountDetailResponse> {
    try {
      const discount = discountData.find((item) => item.id === id)
      if (!discount) {
        throw new Error('Discount not found')
      }
      return {
        status: 200,
        data: discount,
        message: 'Successfully fetched discount details'
      }
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IDiscountDeleteResponse> {
    try {
      const index = discountData.findIndex((item) => item.id === id)
      if (index === -1) {
        throw new Error('Discount not found')
      }
      discountData.splice(index, 1)

      return {
        status: 200,
        message: 'Successfully deleted discount'
      }
    } catch (error) {
      throw error
    }
  },

  async updateStatus({ id, status }: { id: number; status: number }): Promise<IDiscountUpdateStatusResponse> {
    try {
      const discount = discountData.find((item) => item.id === id)
      if (!discount) {
        throw new Error('Discount not found')
      }
      discount.status = Number(status)
      discount.updatedAt = new Date().toISOString()

      return {
        status: 200,
        data: {
          id: discount.id,
          status: discount.status,
          updatedAt: discount.updatedAt
        },
        message: 'Successfully updated discount status'
      }
    } catch (error) {
      throw error
    }
  },

  async add({
    name,
    discount,
    expireDate,
    status,
    deleted,
    createdAt
  }: {
    name: string
    discount: number
    expireDate: string
    status: number
    deleted: boolean
    createdAt: string
  }): Promise<IDiscountAddResponse> {
    try {
      const newDiscount = {
        id: discountData.length + 1, // Auto-increment ID
        name,
        discount,
        expireDate,
        status,
        deleted,
        createdAt,
        updatedAt: new Date().toISOString()
      }

      discountData.push(newDiscount)

      return {
        status: 201,
        data: newDiscount,
        message: 'Successfully added discount'
      }
    } catch (error) {
      throw error
    }
  },

  async update({
    id,
    data
  }: {
    id: number
    data: {
      name: string
      discount: number
      expireDate: string
      status: number
    }
  }): Promise<IDiscountUpdateResponse> {
    try {
        const response = await axiosPublic.put(discountEndpoints.update({ id }), data)
        return response.data
      } catch (error) {
        throw error
      }
  }
}

export default discountApi
