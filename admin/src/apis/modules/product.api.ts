import { IProduct } from "@/models/interfaces/product"
import { productData } from "@/models/data/productData"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const productEndpoints = {
  list: 'product',
  detail: (id: string | number) => `product/${id}`
}

const productApi = {
   getAll: (): IProduct[] => {
      return productData
    },
    getProduct: (id: number) => {
      return productData.find((pro) => pro.id === id)
    }
}

export default productApi
