import {
    IDiscountListResponse,
    IDiscountDetailResponse,
    IDiscountDeleteResponse,
    IDiscountUpdateStatusResponse,
  } from '@/models/interfaces/discount';
  import { discountData } from '@/models/data/discountData';
  
  const discountEndpoints = {
    list: 'discount',
    detail: ({ id }: { id: number | string }) => `discount/${id}`,
    delete: ({ id }: { id: number | string }) => `discount/delete/${id}`,
    updateStatus: ({ id }: { id: number | string }) => `discount/update/status/${id}`,
  };
  
  const discountApi = {
    getList: (): IDiscountListResponse => {
        return {
          status: 200,
          data: {
            discounts: discountData,
            pagination: {
              currentPage: 1,
              totalPages: 1,
              totalRecords: discountData.length,
            },
          },
          message: 'Successfully fetched discounts',
        };
      },
      

    async detail({ id }: { id: number | string }): Promise<IDiscountDetailResponse> {
      try {
        const discount = discountData.find((item) => item.id === id);
        if (!discount) {
          throw new Error('Discount not found');
        }
        return {
          status: 200,
          data: discount,
          message: 'Successfully fetched discount details',
        };
      } catch (error) {
        throw error;
      }
    },
  
    async delete({ id }: { id: number | string }): Promise<IDiscountDeleteResponse> {
      try {
        const index = discountData.findIndex((item) => item.id === id);
        if (index === -1) {
          throw new Error('Discount not found');
        }
        discountData.splice(index, 1); 
  
        return {
          status: 200,
          message: 'Successfully deleted discount',
        };
      } catch (error) {
        throw error;
      }
    },
  
    async updateStatus({ id, status }: { id: number | string; status: number | string }): Promise<IDiscountUpdateStatusResponse> {
      try {
        const discount = discountData.find((item) => item.id === id);
        if (!discount) {
          throw new Error('Discount not found');
        }
        discount.status = Number(status);
        discount.updatedAt = new Date().toISOString(); 
  
        return {
          status: 200,
          data: {
            id: discount.id,
            status: discount.status,
            updatedAt: discount.updatedAt,
          },
          message: 'Successfully updated discount status',
        };
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default discountApi;
  