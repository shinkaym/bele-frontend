import { ICategory } from "../interfaces/category";

const categoryData: ICategory[] = [
    {
      id: 1,
      name: 'Electronics',
      parentName: null,
      status: 1,
      deleted: 0,
      slug: 'electronics',
      createdAt: '2023-01-15T00:00:00Z',
      parentId:0
    },
    {
      id: 2,
      name: 'Mobile Phones',
      parentName: 'Electronics',
      status: 1,
      deleted: 0,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      parentId:1
    },
    {
      id: 3,
      name: 'Laptops',
      parentName: 'Electronics',
      status: 1,
      deleted: 0,
      slug: 'laptops',
      createdAt: '2023-01-15T00:00:00Z',
      parentId:1
    },
    {
      id: 4,
      name: 'Home Appliances',
      parentName: null,
      status: 1,
      deleted: 0,
      slug: 'home-appliances',
      createdAt: '2023-01-15T00:00:00Z',
      parentId:0
    },
    {
      id: 5,
      name: 'Kitchen Appliances',
      parentName: 'Home Appliances',
      status: 1,
      deleted: 0,
      slug: 'kitchen-appliances',
      createdAt: '2023-01-15T00:00:00Z',
      parentId:4
    }
  ]

  export default categoryData