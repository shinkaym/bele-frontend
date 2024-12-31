import { AddIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { EToastOption } from '@/models/enums/option'
import { EStatus } from '@/models/enums/status'
import { IVariant } from '@/models/interfaces/variant'
import { UInputAlert, UToast } from '@/utils/swal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Search from '../Forms/Search'
import Pagination from '../Pagination'
type variants = {
  variants: IVariant[]
  onSearch: (query: string) => void
}

function VariantTable({ variants, onSearch }: variants) {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 3
  const totalPages = Math.ceil(variants.length / limit)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  //Call Alert
  const handleDelete = async (id: number | string, captchaCode = 'ABCD') => {
    await UInputAlert(captchaCode,'text', (value) => {
      if (value === captchaCode) {
        //call api in here...

        UToast(EToastOption.SUCCESS, 'Delete Variant Successfully!')
      } else {
        UToast(EToastOption.ERROR, 'Captcha is wrong')
      }
    },{
      autocomplete: 'off', // Disable autocomplete
      maxlength: '4',
    })
  }

  const handleAddStock = async(value?: number | string)=>{
    await UInputAlert('Add Stock','number', (value) => {
      console.log(value); 
      // call api 
    })
  }

  const handleStatus = (value?: number | string) => {
    console.log(value)
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='flex items-center justify-between mb-6'>
        <Search onSearch={(query: string) => onSearch(query)} />
        <Button type='link' to='/tables/variant/add' size='sm'>
          Add
        </Button>
      </div>
      <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Id
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Thumbnail
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Product Name
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Price
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Stock
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Color
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Size
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Created At
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Status
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, key) => (
              <tr key={key}>
                <td className='border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark'>
                  <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant.id}</h5>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <div className='flex items-center'>
                    <img src={variant.thumbnail} alt={variant.product.name} className='bg-boxdark object-cover w-10' />
                  </div>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {variant.product.name}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {variant.price}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant.stock}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant?.variantAttributeValue?.color?.name}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant?.variantAttributeValue?.size?.name}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {new Date(variant.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <Button
                    type='button'
                    color={variant.status === 1 ? 'success' : 'danger'}
                    value={variant.id}
                    onClick={handleStatus}
                  >
                    {variant.status === 1 ? EStatus.ACTIVE : EStatus.INACTIVE}
                  </Button>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <div className='flex items-center space-x-3.5'>
                    <button type='button' className='hover:text-primary' onClick={() => handleAddStock(variant.id)}>
                      <AddIcon width={24} height={24} />
                    </button>
                    <Link to={`/tables/Variant/edit/${variant.id}`} className='hover:text-primary'>
                      <EditIcon width={24} height={24} />
                    </Link>
                    <button type='button' className='hover:text-primary' onClick={() => handleDelete(variant.id)}>
                      <DeleteIcon width={24} height={24} />
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
          totalPages={Math.ceil(variants.length / 3)}
          onPageChange={handlePageChange}
          siblingCount={1}
          className='pagination-container flex justify-center items-center mb-6'
        />
      )}
    </div>
  )
}

export default VariantTable
