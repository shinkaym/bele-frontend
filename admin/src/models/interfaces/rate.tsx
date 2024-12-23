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

export interface IRateTableResponse {
  status: number;
  data: {
    rates: IRate[];
    pagination: IPagination;
  };
  message: string;
}
