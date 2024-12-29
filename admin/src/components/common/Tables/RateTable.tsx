import { IRate } from '@/models/interfaces/rate'
import { AddIcon, DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils'
import { useState } from 'react'
import rateApi from '@/apis/modules/rate.api'
import Swal from 'sweetalert2'
import { rateStatus, rateTableHeaders } from '@/constants'
import { ERateStatus } from '@/models/enums/status'
import ReCAPCHAModal from '../ReCAPCHAModal'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../OrderStatusBadge'
import XCircleIcon from '@/components/icons/XCircle'
import CheckCircle from '@/components/icons/CheckCircle'

type RateTableProps = {
  rates: IRate[]
  onRefresh: () => void
}

const RateTable = ({ rates, onRefresh }: RateTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [currentRate, setCurrentRate] = useState<IRate | null>(null)
  const [isOpenDeleteReCaptchaModal, setIsOpenDeleteReCaptchaModal] = useState(false)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false)
  const [isOpenStatusListModal, setIsOpenStatusListModal] = useState(false)
  const [isOpenConfirmStatusChangeModal, setIsOpenConfirmStatusChangeModal] = useState(false)

  const handleDeleteClick = (rateId: number) => {
    setSelectedId(rateId)
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
        const response = await rateApi.delete({ id: selectedId })

        if (response.status === 200) {
          onRefresh()
          Swal.fire('Deleted!', response.message, 'success')
        } else {
          Swal.fire('Error!', response.message, 'error')
        }
      } catch (error) {
        Swal.fire('Error!', 'An unexpected error occurred.', 'error')
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

  const handleStatusClick = (rate: IRate) => {
    setCurrentRate(rate)
    setIsOpenStatusListModal(true)
  }

  const handleUpdateStatus = (status: number) => {
    setSelectedStatus(status)
    setIsOpenStatusListModal(false)
    setIsOpenConfirmStatusChangeModal(true)
  }

  const handleConfirmStatusChange = async () => {
    if (currentRate && selectedStatus !== null) {
      try {
        const response = await rateApi.updateStatus({
          id: currentRate.id,
          status: selectedStatus
        })
        if (response.status === 200) {
          onRefresh()
          Swal.fire('Success!', 'Order status updated successfully', 'success')
        } else {
          Swal.fire('Error!', response.message, 'error')
        }
      } catch (error) {
        Swal.fire('Error!', 'An unexpected error occurred.', 'error')
      } finally {
        setIsOpenConfirmStatusChangeModal(false)
        setSelectedStatus(null)
      }
    }
  }

  const handleCancelStatusChange = () => {
    setIsOpenConfirmStatusChangeModal(false)
    setIsOpenStatusListModal(false)
    setSelectedStatus(null)
  }

  const getStatusName = (status: number | null): string => {
    const s = rateStatus.find((s) => s.value === status)
    return s ? s.title : ERateStatus.UNKNOWN
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {rateTableHeaders.map((h) => (
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
          {rates.map((ra, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>{ra.id}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex items-center'>
                  <img src={ra.pImage} alt={ra.pName} className='bg-boxdark object-cover w-10' />
                  <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] ml-2'>
                    {ra.pName}
                  </h5>
                </div>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{ra.name}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>{ra.star}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{ra.content}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] flex justify-center'>
                  {ra.reply ? (
                    <CheckCircle width={24} height={24} className='text-green-500' />
                  ) : (
                    <XCircleIcon width={24} height={24} className='text-red-500' />
                  )}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  <StatusBadge status={ra.status} statusList={rateStatus} onClick={() => handleStatusClick(ra)} />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(ra.createdAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(ra.updatedAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex items-center space-x-3.5'>
                  {ra.reply ? (
                    <button type='button' className='hover:text-primary' onClick={() => {}}>
                      <EditIcon width={24} height={24} />
                    </button>
                  ) : (
                    <button type='button' className='hover:text-primary' onClick={() => {}}>
                      <AddIcon width={24} height={24} />
                    </button>
                  )}
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(ra.id)}>
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
          title='Are you sure you want to delete this rate?'
          className='bg-red-500'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenStatusListModal && currentRate && (
        <StatusModal
          status={currentRate.status}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelStatusChange}
          statusList={rateStatus}
          modalTitle='Rate'
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

export default RateTable
