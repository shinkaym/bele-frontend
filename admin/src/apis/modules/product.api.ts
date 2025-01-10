import { IProduct } from "@/models/interfaces/product"
import { productData } from "@/models/data/productData"
import axiosPublic from "../client/public.client"
import { TProductFormData } from "@/models/types/product"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const productEndpoints = {
  list: 'product',
  detail: (id: string | number) => `product/${id}`
}

const productApi = {
   getList: (): IProduct[] => {
      return productData
    },
    getProductById: (id: number) => {
      return productData.find((pro) => pro.id === id)
    },
    addProduct:async (data:FormData)=>{
    
      return await axiosPublic.post(productEndpoints.list, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đặt header chính xác
        },
      });
    }
}

export default productApi
