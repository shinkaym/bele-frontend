import { IPagination } from './pagination';

export interface IOrder {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  note: string;
  payMethod: string | number;
  totalMoney: number;
  shipDate: string;
  receiveDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderTableResponse {
  status: number;
  data: {
    orders: IOrder[];
    pagination: IPagination;
  };
  message: string;
}
