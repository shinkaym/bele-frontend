// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import ICategory from "@/models/interfaces/category"

const categories: ICategory[] = [
    {
      id: 1,
      name: 'Electronics',
      parentName: '',
      status: 1,
      deleted: 0,
      slug: 'electronics',
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 2,
      name: 'Mobile Phones',
      parentName: 'Electronics',
      status: 1,
      deleted: 0,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 3,
      name: 'Laptops',
      parentName: 'Electronics',
      status: 1,
      deleted: 0,
      slug: 'laptops',
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 4,
      name: 'Home Appliances',
      parentName: '',
      status: 1,
      deleted: 0,
      slug: 'home-appliances',
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 5,
      name: 'Kitchen Appliances',
      parentName: 'Home Appliances',
      status: 1,
      deleted: 0,
      slug: 'kitchen-appliances',
      createdAt: '2023-01-15T00:00:00Z'
    }
  ]

const productEndpoints = {
    list: 'product',
    detail: (id: string | number) => `product/${id}`
  }
  
  const categoryApi = {
    getAll:():ICategory[]=>{
        return categories;
    }
  }
  
  export default categoryApi
  