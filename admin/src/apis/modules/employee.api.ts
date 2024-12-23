// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IEmployeeTableResponse, IEmployee } from '@/models/interfaces/employee'
import { IEmployeeTableResponseData } from '@/models/data/employeeData'

const employeeEndpoints = {
  list: 'employee',
  detail: (id: string | number) => `employee/${id}`
}

const employeeApi = {
  getAll():IEmployeeTableResponse{
  // getAll():Promise<IEmployeeTableResponse>{
    // return axiosPublic.get(employeeEndpoints.list)
    return IEmployeeTableResponseData
  },
  // getId(id: number):Promise<IEmployee>{
    // return axiosPublic.get(employeeEndpoints.detail(id))
  // }
}

export default employeeApi
