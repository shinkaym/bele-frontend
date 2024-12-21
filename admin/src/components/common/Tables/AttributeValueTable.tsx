import DeleteIcon from '@/components/icons/Crud/DeleteIcon'
import EditIcon from '@/components/icons/Crud/EditIcon'
import { EToastOption } from '@/models/enums/option'
import { EStatus } from '@/models/enums/status'
import { IAttributeValue } from '@/models/interfaces/attribute'
import { UCaptchaAlert, UToast } from '@/utils/swal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Search from '../Forms/Search'
import Pagination from '../Pagination'
type Props = {
  attributeValues: IAttributeValue[]
  onSearch: (query: string) => void
}

function AttributeValueTable({ attributeValues, onSearch }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 3
  const totalPages = Math.ceil(attributeValues.length / limit)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  //Call Alert
  const handleDelete = async (id: number | string, captchaCode = 'ABCD') => {
    await UCaptchaAlert(captchaCode, (value) => {
      if (value === captchaCode) {
        //call api in here...

        UToast(EToastOption.SUCCESS, 'Delete Category Successfully!')
      } else {
        UToast(EToastOption.Error, 'Captcha is wrong')
      }
    })
  }
  const handleStatus = (value?: number | string) => {
    console.log(value)
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='flex items-center justify-between mb-6'>
        <Search onSearch={(query: string) => onSearch(query)} />
        <Button type='link' to='/tables/attribute-value/add' size='sm'>
          Add
        </Button>
      </div>
      <div className='max-w-full overflow-x-auto mb-6'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>Id</th>
              <th className='min-w-[150px] py-4 px-4 font-medium text-black dark:text-white'>Name</th>
              <th className='min-w-[150px] py-4 px-4 font-medium text-black dark:text-white'>Value</th>
              <th className='min-w-[150px] py-4 px-4 font-medium text-black dark:text-white'>AttributeType</th>
              <th className='min-w-[120px] py-4 px-4 font-medium text-black dark:text-white'>Created At</th>
              <th className='min-w-[100px] py-4 px-4 font-medium text-black dark:text-white'>Status</th>
              <th className='py-4 px-4 font-medium text-black dark:text-white'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attributeValues.map((value, key) => (
              <tr key={key}>
                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'>
                  <h5 className='font-medium text-black dark:text-white'>{value.id}</h5>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <h5 className='text-black dark:text-white'>{value.name}</h5>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p className='text-black dark:text-white'>{value.value}</p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p className='text-black dark:text-white'>{value.attributeType.name}</p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p className='text-black dark:text-white'>{new Date(value.createdAt).toLocaleDateString()}</p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <Button
                    type='button'
                    color={value.status === 1 ? 'success' : 'danger'}
                    value={value.id}
                    onClick={handleStatus}
                  >
                    {value.status === 1 ? EStatus.ACTIVE : EStatus.UNACTIVE}
                  </Button>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <div className='flex items-center space-x-3.5'>
                    <Link to={`/tables/attribute-value/edit/${value.id}`} className='hover:text-primary'>
                      <EditIcon size={24}/>
                    </Link>
                    <button type='button' className='hover:text-primary' onClick={() => handleDelete(value.id)}>
                      <DeleteIcon size={24}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(attributeValues.length / 3)}
          onPageChange={handlePageChange}
          siblingCount={1}
          className='pagination-container flex justify-center items-center mb-6'
        />
      )}
    </div>
  )
}

export default AttributeValueTable
