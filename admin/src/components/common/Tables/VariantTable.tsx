import { IVariant } from '@/models/interfaces/variant'
import { AddIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { variantStatus, variantTableHeaders } from '@/constants'
import { EVariantStatus } from '@/models/enums/status'
import { formatDate } from '@/utils'
import { useState } from 'react'
import variantApi from '@/apis/modules/variant.api'
import ReCAPCHAModal from '../ReCAPCHAModal'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'
import { UInputAlert, UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'

type VariantTableProps = {
  variants: IVariant[]
  onRefresh: () => void
}

const VariantTable = ({ variants, onRefresh }: VariantTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<IVariant | null>(null)
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
        const res = await variantApi.delete({ id: selectedId })

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

  const handleStatusClick = (variant: IVariant) => {
    setCurrent(variant)
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
        const res = await variantApi.updateStatus({
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
    const s = variantStatus.find((s) => s.value === status)
    return s ? s.title : EVariantStatus.UNKNOWN
  }

  const handleAddStock = async(value?: number | string)=>{
    await UInputAlert('Add Stock','number', (value) => {
      console.log(value); 
      // call api 
    })
  }


  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {variantTableHeaders.map((h) => (
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
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant.price}</p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{variant.stock}</p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {variant?.variantAttributeValue?.color?.name}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {variant?.variantAttributeValue?.size?.name}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(variant.createdAt)}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  <StatusBadge
                    status={variant.status}
                    statusList={variantStatus}
                    onClick={() => handleStatusClick(variant)}
                  />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <button type='button' className='hover:text-primary' onClick={() => handleAddStock(variant.id)}>
                    <AddIcon width={24} height={24} />
                  </button>
                  <Link to={`/tables/Variant/edit/${variant.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(variant.id)}>
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
          title='Are you sure you want to delete this variant?'
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
          statusList={variantStatus}
          modalTitle='Employee'
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

export default VariantTable
