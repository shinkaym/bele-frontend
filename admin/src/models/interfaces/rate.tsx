import { IPagination } from './pagination';

export interface IRate {
  id: number;
  pImage: string;
  pName: string;
  name: string;
  star: number;
  content: string;
  reply: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRateListResponse {
  status: number
  data: {
    rates: IRate[]
    pagination: IPagination
  }
  message: string
}

export interface IRateDetailResponse {
  status: number
  data: IRate[]
  message: string
}

export interface IRateDeleteResponse {
  status: number
  message: string
}

export interface IRateDeleteResponse {
  status: number
  message: string
}

export interface IRateUpdateStatusResponse {
  status: number
  data: {
    id: number,
    status: number,
    updatedAt: string
  }
  message: string
}
