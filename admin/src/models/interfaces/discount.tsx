import { IPagination } from './pagination';

export interface IDiscount{
    id:number
    name:string
    discount:number
    expireDate:string
    status:number
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
  
  export interface IDiscountAddResponse {
    status: number;
    data: IDiscount;
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
      id: number;
      status: number;
      updatedAt: string;
    };
    message: string;
  }

  export interface IDiscountUpdateResponse {
    status: number;
    data: {
      name:string,
      discount:number,
      expireDate:string,
      status:number,
      updatedAt:string,
    };
    message: string;
  }