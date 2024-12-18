import { ICategory } from '../interfaces/category'

export const categoryData: ICategory[] = [
  {
    id: 1,
    name: 'Shirt',
    parentName: null, 
    status: 1,
    slug: 'shirt',
    createdAt: '2023-01-15T00:00:00Z',
    UpdateAt: '2023-01-15T00:00:00Z',
    parentId: 0
  },
  {
    id: 2,
    name: 'Polo Shirt',
    parentName: 'Shirt',
    status: 1,
    slug: 'mobile-phones',
    createdAt: '2023-01-15T00:00:00Z',
    UpdateAt:'2023-01-15T00:00:00Z',
    parentId: 1
  }
]
