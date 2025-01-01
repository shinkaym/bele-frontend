import { IOrder } from '@/models/interfaces/order'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils'
import Swal from 'sweetalert2'
import { useState } from 'react'
import orderApi from '@/apis/modules/order.api'
import { orderStatus, orderTableHeaders } from '@/constants'
import ConfirmationModal from '../ConfirmationModal'
import { EOrderStatus } from '@/models/enums/status'
import ReCAPCHAModal from '../ReCAPCHAModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'

type OrderTableProps = {
  orders: IOrder[]
  onRefresh: () => void
}

const OrderTable = ({ orders, onRefresh }: OrderTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<IOrder | null>(null)
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
        const response = await orderApi.delete({ id: selectedId })

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

  const handleStatusClick = (order: IOrder) => {
    setCurrent(order)
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
        const response = await orderApi.updateStatus({
          id: current.id,
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
    const s = orderStatus.find((s) => s.value === status)
    return s ? s.title : EOrderStatus.UNKNOWN
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {orderTableHeaders.map((h) => (
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
          {orders.map((or, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  {or.id}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{or.email}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{or.name}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {or.phoneNumber}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{or.address}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{or.note}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {or.payMethod}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {or.totalMoney}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{or.shipDate}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {or.receiveDate}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  <StatusBadge status={or.status} statusList={orderStatus} onClick={() => handleStatusClick(or)} />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(or.createdAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {formatDate(or.updatedAt)}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <Link to={`/tables/order/edit/${or.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(or.id)}>
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
          title='Are you sure you want to delete this order?'
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
          statusList={orderStatus}
          modalTitle='Order'
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

export default OrderTable
