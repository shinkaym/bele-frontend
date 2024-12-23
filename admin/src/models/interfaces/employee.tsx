import { IPagination } from './pagination';

export interface IEmployee {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  sex: string;
  role: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeTableResponse {
  status: number;
  data: {
    employees: IEmployee[];
    pagination: IPagination;
  };
  message: string;
}
