import { IPagination } from './pagination';

export interface IDiscount{
    id:number | string
    name:string
    discount: number
    expireDate:string
    status:number | string
    createdAt:string
    updatedAt:string
}

export interface IDiscountListResponse {
    status: number;
    data: {
      discounts: IDiscount[];
      pagination: IPagination;
    };
    message: string;
  }
  
  export interface IDiscountDetailResponse {
    status: number;
    data: IDiscount;
    message: string;
  }
  
  export interface IDiscountDeleteResponse {
    status: number;
    message: string;
  }
  
  export interface IDiscountUpdateStatusResponse {
    status: number;
    data: {
      id: number | string;
      status: number | string;
      updatedAt: string;
    };
    message: string;
  }
