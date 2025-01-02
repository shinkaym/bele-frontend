import mainBanner from '@/assets/images/banner/main_banner.webp'
import subBanner from '@/assets/images/banner/sub_banner.webp'
import thirdBanner from '@/assets/images/banner/third_banner.webp'
import variantBlackThumbnail from '@/assets/images/product/shirt_black.webp'
import variantMossGreenThumbnail from '@/assets/images/product/shirt_mossgreen.webp'
import variantWhiteThumbnail from '@/assets/images/product/shirt_white.webp'
import IconPlay from '@/components/icons/IconPlay'
import { TMenuItem } from '@/models/types'

import { IProduct } from '@/models/interfaces'

export const SM_LIMIT = 2
export const MD_LIMIT = 3
export const LG_LIMIT = 4
export const XL_LIMIT = 5

export const MD_BP = 768
export const LG_BP = 1024
export const XL_BP = 1280

export const menuItems: TMenuItem[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconPlay className='size-5' />
  }
]

export const slideImages = [
  {
    url: mainBanner,
    name: 'Main Banner'
  },
  {
    url: subBanner,
    name: 'Sub Banner'
  },
  {
    url: thirdBanner,
    name: 'Third Banner'
  }
]

export const productData: IProduct[] = [
  {
    id: 1,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 2,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 3,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 4,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 5,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 6,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 7,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 8,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 9,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  },
  {
    id: 10,
    name: '100% Cotton Long-Sleeve Shirt, Relax Fit',
    category: {
      id: 2,
      name: 'Polo Shirt',
      referenceCategory: {
        id: 1,
        name: 'Shirt',
        referenceCategory: null,
        status: 1,
        slug: 'shirt',
        createdAt: '2023-01-15T00:00:00Z',
        updatedAt: '2023-01-15T00:00:00Z'
      },
      status: 1,
      slug: 'mobile-phones',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    description: '<ul><li>hello</li><li>c&ocirc;&nbsp;</li><li>ba</li><li>s&agrave;i</li><li>g&ograve;n</li></ul>',
    thumbnail: variantBlackThumbnail,
    basePrice: 100000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discount: 20,
      expireDate: '2024-06-30T23:59:59Z',
      status: 1, // 1: Active
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z'
    },
    updatedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    variant: [
      {
        id: 1,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 4
        }
      },
      {
        id: 2,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 5
        }
      },
      {
        id: 3,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 6
        }
      },
      {
        id: 4,
        price: 150000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 1,
          sizeId: 7
        }
      },
      {
        id: 5,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 4
        }
      },
      {
        id: 6,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 5
        }
      },
      {
        id: 7,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 2,
          sizeId: 6
        }
      },
      {
        id: 8,
        price: 300000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 4
        }
      },
      {
        id: 9,
        price: 200000,
        status: 1,
        stock: 100,
        updatedAt: '2023-01-15T00:00:00Z',
        createdAt: '2023-01-15T00:00:00Z',
        variantAttributeValue: {
          colorId: 3,
          sizeId: 5
        }
      }
    ],
    variantAttributeTypes: {
      color: [
        {
          id: 1,
          name: 'Black',
          value: '#000000',
          thumbnail: variantBlackThumbnail
        },
        {
          id: 2,
          name: 'White',
          value: '#e3e3e3',
          thumbnail: variantWhiteThumbnail
        },
        {
          id: 3,
          name: 'Moss Green',
          value: '#2f2f2b',
          thumbnail: variantMossGreenThumbnail
        }
      ],
      size: [
        {
          id: 4,
          name: 'S'
        },
        {
          id: 5,
          name: 'M'
        },
        {
          id: 6,
          name: 'L'
        },
        {
          id: 7,
          name: 'XL'
        }
      ]
    }
  }
]
