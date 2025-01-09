import productApi from '@/apis/modules/product.api'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
import { EToastOption } from '@/models/enums/option'
import { EStatus } from '@/models/enums/status'
import { IProduct } from '@/models/interfaces/product'
import { UInputAlert, UToast } from '@/utils/swal'
import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../Button'
import Search from '../Forms/Search'
import Pagination from '../Pagination'
import TinyMCEEditor from '../TinyMCEEditor'
type Props = {
  Products: IProduct[]
  onSearch: (query: string) => void
}

function ProductTable({ Products, onSearch }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 3
  const totalPage = Math.ceil(Products.length / limit)

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

  const handleView = async (id: number | string) => {
    const product = productApi.getProductById(Number(id))
    const container = document.createElement('div')
    ReactDOM.createRoot(container).render(<TinyMCEEditor value={product?.description || ''} />)
    Swal.fire({
      title: 'Product Description',
      html: container,
      width: '60%', // Điều chỉnh kích thước modal nếu cần
      showConfirmButton: true
    })
  }
  const handleStatus = (value?: number | string) => {
    console.log(value)
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='flex items-center justify-between mb-6'>
        <Search onSearch={(query: string) => onSearch(query)} />
        <Button type='link' to='/tables/product/add' size='sm'>
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
              <th className='min-w-[200px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Product
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Category
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Base Price
              </th>
              <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Slug
              </th>
              <th className='min-w-[6px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                View
              </th>
              <th className='min-w-[60px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
                Like
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
            {Products.map((pro, key) => (
              <tr key={key}>
                <td className='border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark'>
                  <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{pro.id}</h5>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <div className='flex items-center'>
                    <img src={pro.thumbnail} alt={pro.name} className='bg-boxdark object-cover w-10' />
                    <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] ml-2'>
                      {pro.name}
                    </h5>
                  </div>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {pro.category.name}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {pro.basePrice}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{pro.slug}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{pro.view}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{pro.like}</p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                    {new Date(pro.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <Button
                    type='button'
                    color={pro.status === 1 ? 'success' : 'danger'}
                    value={pro.id}
                    onClick={handleStatus}
                  >
                    {pro.status === 1 ? EStatus.ACTIVE : EStatus.INACTIVE}
                  </Button>
                </td>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                  <div className='flex justify-center space-x-3.5'>
                    <button type='button' className='hover:text-primary' onClick={() => handleView(pro.id)}>
                      <EyeIcon width={24} height={24} />
                    </button>
                    <Link to={`/tables/product/edit/${pro.id}`} className='hover:text-primary'>
                      <EditIcon width={24} height={24} />
                    </Link>
                    <button type='button' className='hover:text-primary' onClick={() => handleDelete(pro.id)}>
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
          totalPage={Math.ceil(Products.length / 3)}
          onPageChange={handlePageChange}
          siblingCount={1}
          className='pagination-container flex justify-center items-center mb-6'
        />
      )}
    </div>
  )
}

export default ProductTable
