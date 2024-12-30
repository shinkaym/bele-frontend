import { IEmployeeListResponse } from '../interfaces/employee';

export const employeeListResponseData: IEmployeeListResponse = {
  status: 200,
  data: {
    employees: [
      {
        id: 1,
        name: "John Doe",
        phoneNumber: "123-456-7890",
        email: "johndoe@example.com",
        sex: "Male",
        role: "Manager",
        status: 1,
        createdAt: "1734974964.4281",
        updatedAt: "1734974964.4281",
        accessToken:'',
        refreshToken:'',
      },
      {
        id: 2,
        name: "Jane Smith",
        phoneNumber: "234-567-8901",
        email: "janesmith@example.com",
        sex: "Female",
        role: "Developer",
        status: 1,
        createdAt: "1734974964.4281",
        updatedAt: "1734974964.4281",
        accessToken:'',
        refreshToken:'',
      },
      {
        id: 3,
        name: "Alice Brown",
        phoneNumber: "345-678-9012",
        email: "alicebrown@example.com",
        sex: "Female",
        role: "Designer",
        status: 1,
        createdAt: "1734974964.4281",
        updatedAt: "1734974964.4281",
        accessToken:'',
        refreshToken:'',
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 2,
      totalRecords: 5,
    },
  },
  message: "Data fetched successfully."
};


export const accountsData = employeeListResponseData.data.employees.map((employee) => ({
  id:employee.id,
  email: employee.email,
  password: "123",
}));