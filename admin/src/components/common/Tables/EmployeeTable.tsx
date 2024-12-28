import { IEmployee } from '@/models/interfaces/employee'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { employeeStatus } from '@/constants'
import { EEmployeeStatus } from '@/models/enums/status'
import { formatDate } from '@/utils'

type EmployeeTableProps = {
  employees: IEmployee[]
}

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Id
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Name
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Phone Number
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Email
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Sex
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Role
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Status
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Created At
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Updated At
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((em, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.id}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.name}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {em.phoneNumber}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.email}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.sex}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.role}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                {employeeStatus.find(s => s.value === em.status)?.title || EEmployeeStatus.UNKNOWN}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(em.createdAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(em.updatedAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex items-center space-x-3.5'>
                  <Link to={`/tables/employee/edit/${em.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => {}}>
                    <DeleteIcon width={24} height={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable
