import { IRate } from '@/models/interfaces/rate'
import { AddIcon, DeleteIcon, EyeIcon } from '@/components/icons'
import { formatDate } from '@/utils'
import { useState } from 'react'
import rateApi from '@/apis/modules/rate.api'
import { rateStatus, rateTableHeaders } from '@/constants'
import { ERateStatus } from '@/models/enums/status'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'
import XCircleIcon from '@/components/icons/XCircleIcon'
import CheckCircle from '@/components/icons/CheckCircle'
import ReplyModal from '../ReplyModal'
import { EToastOption } from '@/models/enums/option'
import { UToast } from '@/utils/swal'
import ReCAPTCHAModal from '../ReCAPTCHAModal'

type RateTableProps = {
  rates: IRate[]
  onRefresh: () => void
}

const RateTable = ({ rates, onRefresh }: RateTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [isAddClick, setIsAddClick] = useState<boolean>(false)
  const [current, setCurrent] = useState<IRate | null>(null)
  const [isOpenDeleteReCaptchaModal, setIsOpenDeleteReCaptchaModal] = useState(false)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false)
  const [isOpenStatusListModal, setIsOpenStatusListModal] = useState(false)
  const [isOpenConfirmStatusChangeModal, setIsOpenConfirmStatusChangeModal] = useState(false)
  const [isOpenReplyModal, setIsOpenReplyModal] = useState(false)

  const handleAddClick = (rate: IRate) => {
    setCurrent(rate)
    setIsAddClick(true)
    setIsOpenReplyModal(true)
  }

  const handleConfirmAdd = async (reply: string) => {
    if (current) {
      if (reply.trim() === '') {
        UToast(EToastOption.ERROR, 'Reply cannot be empty.')
        return
      } else {
        try {
          const res = await rateApi.reply({
            id: current.id,
            reply
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
          setIsOpenReplyModal(false)
          setCurrent(null)
        }
      }
    }
  }

  const handleViewClick = (rate: IRate) => {
    setCurrent(rate)
    setIsAddClick(false)
    setIsOpenReplyModal(true)
  }

  const handleCancelAddOrView = () => {
    setIsOpenReplyModal(false)
    setCurrent(null)
    setIsAddClick(false)
  }

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
        const res = await rateApi.delete({ id: selectedId })

        if (res.status === 200) {
          onRefresh()
          UToast(EToastOption.SUCCESS, res.message)
        } else {
          UToast(EToastOption.ERROR, 'An unexpected error occurred.')
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

  const handleStatusClick = (rate: IRate) => {
    setCurrent(rate)
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
        const res = await rateApi.updateStatus({
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
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  {ra.id}
                </h5>
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
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  {ra.star}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{ra.content}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[150px] flex justify-center'>
                  {ra.reply ? (
                    <>
                    <CheckCircle width={24} height={24} className='text-green-500' />
                    <p className='ml-2 truncate'>{ra.rName}</p>
                    </>
                  ) : (
                    <XCircleIcon width={24} height={24} className='text-red-500' />
                  )}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  <StatusBadge status={ra.status} statusList={rateStatus} onClick={() => handleStatusClick(ra)} />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(ra.createdAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  {ra.reply ? (
                    <button type='button' className='hover:text-primary' onClick={() => handleViewClick(ra)}>
                      <EyeIcon width={24} height={24} />
                    </button>
                  ) : (
                    <button type='button' className='hover:text-primary' onClick={() => handleAddClick(ra)}>
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
      {isOpenReplyModal && (
        <ReplyModal
          data={current}
          onCancel={handleCancelAddOrView}
          onSubmit={isAddClick ? handleConfirmAdd : () => {}}
          view={!isAddClick}
        />
      )}

      {isOpenDeleteReCaptchaModal && (
        <ReCAPTCHAModal onChange={handleDeleteReCaptchaChange} onCancel={handleCancelDelete} />
      )}

      {isOpenConfirmDeleteModal && (
        <ConfirmationModal
          title='Are you sure you want to delete this rate?'
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
