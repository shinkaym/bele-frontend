// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IAttributeValue } from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'
import { accountsData, IEmployeeTableResponseData } from '@/models/data/employeeData'
import { IEmployee } from '@/models/interfaces/employee'

const authEndpoints = {
  list: 'attribute-value',
  detail: (id: string | number) => `attribute-value/${id}`
}

const authApi = {
  login(email: string, password: string): IEmployee | undefined {
    const data = accountsData.find((acc) => acc.email === email && acc.password === password)
    if (data) {
      let user = IEmployeeTableResponseData.data.employees.find((emp) => emp.id === data.id)
      if (user)
        return {
          ...user,
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gTWlhIiwiaWF0IjoxNTE2MjM5MDIyfQ.51rDAnPfmtVRHYrhHtoO1G2Yqop73dKmCoZgk_9OzX0'
        }
      return undefined
    }
    return undefined
    // return axiosPublic.get(attributeValueEndpoints.list)
  },
  getMe(token:string):IEmployee | undefined{
    if(token){
      return IEmployeeTableResponseData.data.employees.find((emp) => emp.id === 1)
    }
    return undefined
  }
}

export default authApi
