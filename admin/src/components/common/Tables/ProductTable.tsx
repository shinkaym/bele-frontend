import { IProduct } from '@/models/interfaces/product'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { productStatus, productTableHeaders } from '@/constants'
import { EProductStatus } from '@/models/enums/status'
import { formatDate } from '@/utils'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import productApi from '@/apis/modules/product.api'
import ReCAPCHAModal from '../ReCAPCHAModal'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import TinyMCEEditor from '../TinyMCEEditor'
import Swal from 'sweetalert2'
import PlusIcon from '@/components/icons/PlusIcon'

type ProductTableProps = {
  products: IProduct[]
  onRefresh: () => void
}

const ProductTable = ({ products, onRefresh }: ProductTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<IProduct | null>(null)
  const [isOpenDeleteReCaptchaModal, setIsOpenDeleteReCaptchaModal] = useState(false)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false)
  const [isOpenStatusListModal, setIsOpenStatusListModal] = useState(false)
  const [isOpenConfirmStatusChangeModal, setIsOpenConfirmStatusChangeModal] = useState(false)

  const handleDeleteClick = (id: number) => {
    setSelectedId(id)
    setIsOpenDeleteReCaptchaModal(true)
  }

  const handleDeleteReCaptchaChange = async (token: string | null) => {
    if (token && selectedId) {
      setIsOpenConfirmDeleteModal(true)
      setIsOpenDeleteReCaptchaModal(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const res = await productApi.delete({ id: selectedId })

        if (res.status === 200) {
          onRefresh()
          UToast(EToastOption.SUCCESS, res.message)
        } else {
          UToast(EToastOption.ERROR, res.message)
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'An unexpected error occurred.')
      } finally {
        setIsOpenConfirmDeleteModal(false)
        setSelectedId(null)
      }
    }
  }

  const handleCancelDelete = () => {
    setIsOpenDeleteReCaptchaModal(false)
    setIsOpenConfirmDeleteModal(false)
    setSelectedId(null)
  }

  const handleStatusClick = (product: IProduct) => {
    setCurrent(product)
    setIsOpenStatusListModal(true)
  }

  const handleUpdateStatus = (status: number) => {
    setSelectedStatus(status)
    setIsOpenStatusListModal(false)
    setIsOpenConfirmStatusChangeModal(true)
  }

  const handleConfirmStatusChange = async () => {
    if (current && selectedStatus !== null) {
      try {
        const res = await productApi.updateStatus({
          id: current.id,
          status: selectedStatus
        })
        if (res.status === 200) {
          onRefresh()
          UToast(EToastOption.SUCCESS, res.message)
        } else {
          UToast(EToastOption.ERROR, res.message)
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'An unexpected error occurred.')
      } finally {
        setIsOpenConfirmStatusChangeModal(false)
        setSelectedStatus(null)
        setCurrent(null)
      }
    }
  }

  const handleCancelStatusChange = () => {
    setIsOpenConfirmStatusChangeModal(false)
    setIsOpenStatusListModal(false)
    setSelectedStatus(null)
    setCurrent(null)
  }

  const getStatusName = (status: number | null): string => {
    const s = productStatus.find((s) => s.value === status)
    return s ? s.title : EProductStatus.UNKNOWN
  }

  const handleView = async (id: number) => {
    const res = await productApi.detail({ id })
    const container = document.createElement('div')
    if (res.data) {
      ReactDOM.createRoot(container).render(<TinyMCEEditor value={res.data.product.description || ''} />)
    } else {
      UToast(EToastOption.ERROR, 'Failed to load product details.')
    }
    Swal.fire({
      title: 'Product Description',
      html: container,
      width: '60%',
      showConfirmButton: true
    })
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {productTableHeaders.map((h) => (
              <th
                key={h.value}
                className={`${h.className} py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap`}
              >
                {h.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((pro, key) => (
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
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{pro.basePrice}</p>
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
                  {formatDate(pro.createdAt)}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <StatusBadge status={pro.status} statusList={productStatus} onClick={() => handleStatusClick(pro)} />
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <button type='button' className='hover:text-primary' onClick={() => handleView(pro.id)}>
                    <EyeIcon width={24} height={24} />
                  </button>
                  <Link to={`/tables/variant?productId=${pro.id}`} className='hover:text-primary'>
                    <PlusIcon width={24} height={24} />
                  </Link>
                  <Link to={`/tables/product/edit/${pro.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(pro.id)}>
                    <DeleteIcon width={24} height={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDeleteReCaptchaModal && (
        <ReCAPCHAModal onChange={handleDeleteReCaptchaChange} onCancel={handleCancelDelete} />
      )}

      {isOpenConfirmDeleteModal && (
        <ConfirmationModal
          title='Are you sure you want to delete this product?'
          className='bg-red-500'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenStatusListModal && current && (
        <StatusModal
          status={current.status}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelStatusChange}
          statusList={productStatus}
          modalTitle='Product'
        />
      )}

      {isOpenConfirmStatusChangeModal && (
        <ConfirmationModal
          title={`Are you sure you want to change the status to ${getStatusName(selectedStatus)}?`}
          className='bg-blue-500'
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  )
}

export default ProductTable
