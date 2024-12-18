import { IProduct } from "../interfaces/product";

export const productData: IProduct[] = [
  {
    id: 1,
    name: "Men's Polo Shirt Pique Cotton",
    categoryId:2,
    categoryName: "Polo Shirt",
    description:"<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>",
    thumbnail:"http://localhost:5173/src/assets/images/product/shirt.webp",
    basePrice: 100000,
    slug: "mens-polo-shirt-pique-cotton",
    view: 100,
    like: 100,
    status: 1,
    attributeType:['color','size'],
    discountId:1,
    discountName:'20%',
    updateAt: "2023-01-15T00:00:00Z",
    createdAt: "2023-01-15T00:00:00Z",
  }
];
