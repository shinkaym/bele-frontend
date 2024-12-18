// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IImage } from '@/models/interfaces/image'
import { imageData } from '@/models/data/imageData'

const productEndpoints = {
  list: 'product',
  detail: (id: string | number) => `product/${id}`
}

const imageApi = {
  getAll: (): IImage[] => {
    return imageData
  },
  getImg: (id: number) => {
    return imageData.find((img) => img.id === id)
  }
}

export default imageApi
