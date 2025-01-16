import mainBanner from '@/assets/images/banner/main_banner.png'
import subBanner1 from '@/assets/images/banner/sub_banner_1.png'
import subBanner2 from '@/assets/images/banner/sub_banner_2.png'
import MainLogo from '@/assets/images/logo/logo.png'
import SloganLogo from '@/assets/images/logo/logo_slogan.png'
import variantBlackThumbnail from '@/assets/images/product/shirt_black.webp'
import variantMossGreenThumbnail from '@/assets/images/product/shirt_mossgreen.webp'
import variantWhiteThumbnail from '@/assets/images/product/shirt_white.webp'
import SSItem1 from '@/assets/images/slideshow/1.webp'
import SSItem2 from '@/assets/images/slideshow/2.webp'
import SSItem3 from '@/assets/images/slideshow/3.webp'
import IconPlay from '@/components/icons/IconPlay'
import { TMenuItem, TMenuProfileItem } from '@/models/types'

import { EMenuProfileItemId } from '@/models/enum'
import { IApiResponse, IPagination, IProduct } from '@/models/interfaces'
import { faHeart, faBagShopping, faGlobe, faStar, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'

export const logoList = {
  mainLogo: {
    name: 'Main Logo',
    url: MainLogo
  },
  sloganLogo: {
    name: 'Slogan Logo',
    url: SloganLogo
  }
}

export const XS_LIMIT = 2
export const SM_LIMIT = 3
export const MD_LIMIT = 4
export const LG_LIMIT = 5

export const SM_BP = 480
export const MD_BP = 768
export const LG_BP = 1024

export const bannerList = {
  mainBanner: {
    name: 'Main Banner',
    url: mainBanner
  },
  subBanner: [
    {
      name: 'Sub Banner 1',
      url: subBanner1
    },
    {
      name: 'Sub Banner 2',
      url: subBanner2
    }
  ]
}

export const menuItems: TMenuItem[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconPlay className='size-5' />
  }
]

export const slideImages = [
  {
    url: SSItem1,
    name: 'SlideShow Item 1'
  },
  {
    url: SSItem2,
    name: 'SlideShow Item 2'
  },
  {
    url: SSItem3,
    name: 'SlideShow Item 3'
  }
]

export const productData: IProduct[] = [
  {
    id: 1,
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
    slug: '100-cotton-long-sleeve-shirt-relax-fit',
    view: 100,
    like: 100,
    status: 1,
    discount: {
      id: 1,
      name: '20% Off Summer Sale',
      discountValue: 20,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
    name: 'Áo dài tay 100% Cotton Relax fit',
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
    rate: {
      starAvg: 4.5,
      count: 5
    },
    tag: [
      {
        id: 1,
        name: 'New'
      },
      {
        id: 2,
        name: 'Đáng mua'
      },
      {
        id: 3,
        name: 'Outlet'
      }
    ],
    thumbnail: variantBlackThumbnail,
    basePrice: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 269000,
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
        price: 300000,
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

export const menuProfileItems: TMenuProfileItem[] = [
  {
    id: EMenuProfileItemId.AccountInfo,
    title: 'Thông tin tài khoản',
    icon: faUser,
    link: 'account-info'
  },
  {
    id: EMenuProfileItemId.OrderHistory,
    title: 'Lịch sử đơn hàng',
    icon: faBagShopping,
    link: 'order-history'
  },
  {
    id: EMenuProfileItemId.AddressNotes,
    title: 'Sổ địa chỉ',
    icon: faGlobe,
    link: 'address-notes'
  },
  {
    id: EMenuProfileItemId.Wishlist,
    title: 'Danh sách yêu thích',
    icon: faHeart,
    link: 'wishlist'
  },
  {
    id: EMenuProfileItemId.RatingProducts,
    title: 'Đánh giá và phản hồi',
    icon: faStar,
    link: 'rating-products'
  },
  {
    id: EMenuProfileItemId.Logout,
    title: 'Đăng xuất',
    icon: faPowerOff,
    link: 'logout'
  }
]

export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 5,
  DEFAULT_WISHLIST_LIMIT: 9,
  DEFAULT_PAGE: 1
}

export const test: IApiResponse<{ products: IProduct[]; pagination: IPagination }> = {
  status: 200,
  data: {
    products: [
{
  id: 1,
  name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
  categoryStatus: 1,
  description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
  discount: {
    id: 1,
    name: 'No Discount',
    discountValue: 0,
    expireDate: '9999-12-31T23:59:59.9999999',
    status: 1,
    createdAt: '2025-01-16T00:16:59.5582653',
    updatedAt: '0001-01-01T00:00:00'
  },
  basePrice: 209000,
  slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
  thumbnail:
    'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
  view: 0,
  like: 0,
  status: 1,
  rateAVG: [5, 5],
  updatedAt: '2025-01-16T00:16:59.6025446',
  createdAt: '2025-01-16T00:16:59.6025153',
  variantColors: [
    {
      variantId: 1,
      color: '#000',
      thumbnail:
        'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
      price: 209000,
      colorId: 1
    },
    {
      variantId: 2,
      color: '#000',
      thumbnail:
        'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
      price: 209000,
      colorId: 1
    },
    {
      variantId: 3,
      color: '#fff',
      thumbnail:
        'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
      price: 209000,
      colorId: 2
    },
    {
      variantId: 4,
      color: '#fff',
      thumbnail:
        'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
      price: 209000,
      colorId: 2
    }
  ],

  tags: [
    {
      id: 1,
      name: 'New'
    }
  ]
},
      {
        id: 2,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 3,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 4,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 5,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 6,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 7,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 8,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      },
      {
        id: 9,
        name: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao',
        categoryStatus: 1,
        description: 'Áo giữ nhiệt Ex-Warm Lenzing Modal cổ cao cho mùa đông ấm áp.',
        discount: {
          id: 1,
          name: 'No Discount',
          discountValue: 0,
          expireDate: '9999-12-31T23:59:59.9999999',
          status: 1,
          createdAt: '2025-01-16T00:16:59.5582653',
          updatedAt: '0001-01-01T00:00:00'
        },
        basePrice: 209000,
        slug: 'ao-giu-nhiet-ex-warm-modal-co-cao',
        thumbnail:
          'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
        view: 0,
        like: 0,
        status: 1,
        rateAVG: [5, 5],
        updatedAt: '2025-01-16T00:16:59.6025446',
        createdAt: '2025-01-16T00:16:59.6025153',
        variantColors: [
          {
            variantId: 1,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 2,
            color: '#000',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-DEN.jpg',
            price: 209000,
            colorId: 1
          },
          {
            variantId: 3,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          },
          {
            variantId: 4,
            color: '#fff',
            thumbnail:
              'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/November2024/24CMHU.GN003_-TRANG.jpg',
            price: 209000,
            colorId: 2
          }
        ],

        tags: [
          {
            id: 1,
            name: 'New'
          }
        ]
      }
    ],
    pagination: {
      currentPage: 1,
      totalPage: 1
    }
  },
  message: 'Get products success !'
}
