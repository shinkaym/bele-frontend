import DeleteIcon from '@/components/icons/Crud/DeleteIcon'
import EditIcon from '@/components/icons/Crud/EditIcon'
import { EToastOption } from '@/models/enums/option'
import { EStatus } from '@/models/enums/status'
import { IAttributeValue } from '@/models/interfaces/attribute'
import { UInputAlert, UToast } from '@/utils/swal'
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
  const totalPage = Math.ceil(attributeValues.length / limit)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  //Call Alert
  const handleDelete = async (id: number | string, captchaCode = 'ABCD') => {
    await UInputAlert(
      captchaCode,
      'text',
      (value) => {
        if (value === captchaCode) {
          //call api in here...

          UToast(EToastOption.SUCCESS, 'Delete Variant Successfully!')
        } else {
          UToast(EToastOption.ERROR, 'Captcha is wrong')
        }
      },
      {
        autocomplete: 'off', // Disable autocomplete
        maxlength: '4'
      }
    )
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
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Id
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Name
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Value
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                AttributeType
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Created At
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Status
              </th>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {attributeValues.map((value, key) => (
              <tr key={key}>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{value.id}</h5>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {value.name}
                  </h5>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{value.value}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {value.attributeType.name}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {new Date(value.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <Button
                    type='button'
                    color={value.status === 1 ? 'success' : 'danger'}
                    value={value.id}
                    onClick={handleStatus}
                  >
                    {value.status === 1 ? EStatus.ACTIVE : EStatus.INACTIVE}
                  </Button>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <div className='flex justify-center space-x-3.5'>
                    <Link to={`/tables/attribute-value/edit/${value.id}`} className='hover:text-primary'>
                      <EditIcon width={24} height={24} />
                    </Link>
                    <button type='button' className='hover:text-primary' onClick={() => handleDelete(value.id)}>
                      <DeleteIcon width={24} height={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={Math.ceil(attributeValues.length / 3)}
          onPageChange={handlePageChange}
          siblingCount={1}
          className='pagination-container flex justify-center items-center mb-6'
        />
      )}
    </div>
  )
}

export default AttributeValueTable
