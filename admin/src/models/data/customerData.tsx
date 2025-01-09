import { ICustomerListResponse } from '../interfaces/customer';

export const customerListResponseData: ICustomerListResponse = {
  status: 200,
  data: {
    customers: [
      {
        id: 1,
        fullName: "John Doe",
        phoneNumber: "123-456-7890",
        email: "johndoe@example.com",
        sex: 1,
        birthday: "1990-05-15",
        password: "hashed_password_1",
        totalSpending: 5000,
        lastOperatingTime: "2024-01-01T12:00:00Z",
        status: 1,
        deleted: 0,
        createdAt: "2023-01-01T08:00:00Z",
        updatedAt: "2023-06-01T10:00:00Z",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        phoneNumber: "234-567-8901",
        email: "janesmith@example.com",
        sex: 0,
        birthday: "1985-09-22",
        password: "hashed_password_2",
        totalSpending: 7500,
        lastOperatingTime: "2024-01-15T09:00:00Z",
        status: 1,
        deleted: 0,
        createdAt: "2023-06-01T10:30:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
      },
      {
        id: 3,
        fullName: "Alice Johnson",
        phoneNumber: "345-678-9012",
        email: "alicejohnson@example.com",
        sex: 0,
        birthday: "1995-11-12",
        password: "hashed_password_3",
        totalSpending: 3200,
        lastOperatingTime: "2024-02-20T14:00:00Z",
        status: 0,
        deleted: 1,
        createdAt: "2023-02-15T11:15:00Z",
        updatedAt: "2024-02-01T14:30:00Z",
      },
      {
        id: 4,
        fullName: "Robert Brown",
        phoneNumber: "456-789-0123",
        email: "robertbrown@example.com",
        sex: 1,
        birthday: "1980-03-18",
        password: "hashed_password_4",
        totalSpending: 15000,
        lastOperatingTime: "2024-03-01T17:45:00Z",
        status: 1,
        deleted: 0,
        createdAt: "2022-12-01T08:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
      },
      {
        id: 5,
        fullName: "Emma Wilson",
        phoneNumber: "567-890-1234",
        email: "emmawilson@example.com",
        sex: 0,
        birthday: "1992-07-07",
        password: "hashed_password_5",
        totalSpending: 9800,
        lastOperatingTime: "2024-03-10T18:30:00Z",
        status: 1,
        deleted: 0,
        createdAt: "2023-03-01T09:00:00Z",
        updatedAt: "2024-02-01T10:30:00Z",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPage: 1,
      totalRecords: 5,
    },
  },
  message: "Customer list fetched successfully.",
};
