// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { ICategory } from '@/models/interfaces/category'
import { categoryData } from '@/models/data/categoryData'

const productEndpoints = {
  list: 'product',
  detail: (id: string | number) => `product/${id}`
}

const categoryApi = {
  getAll: (): ICategory[] => {
    return categoryData
  },
  getCat: (id: number) => {
    return categoryData.find((cat) => cat.id === id)
  }
}

export default categoryApi
