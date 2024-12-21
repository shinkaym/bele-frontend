import { ICategory } from '../interfaces/category'

export const categoryData: ICategory[] = [
  {
    id: 1,
    name: 'Shirt',
    referenceCategory: null, 
    status: 1,
    slug: 'shirt',
    createdAt: '2023-01-15T00:00:00Z',
    updateAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'Polo Shirt',
    referenceCategory:{
      id: 1,
      name: 'Shirt',
      referenceCategory: null, 
      status: 1,
      slug: 'shirt',
      createdAt: '2023-01-15T00:00:00Z',
      updateAt: '2023-01-15T00:00:00Z',
    },
    status: 1,
    slug: 'mobile-phones',
    createdAt: '2023-01-15T00:00:00Z',
    updateAt:'2023-01-15T00:00:00Z',
  }
]
