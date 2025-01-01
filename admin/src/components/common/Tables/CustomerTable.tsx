import { ICustomer } from '@/models/interfaces/customer'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { customerStatus, customerTableHeaders } from '@/constants'
import { ECustomerStatus } from '@/models/enums/status'
import { formatDate } from '@/utils'
import { useState } from 'react'
import customerApi from '@/apis/modules/customer.api'
import Swal from 'sweetalert2'
import ReCAPCHAModal from '../ReCAPCHAModal'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'

type CustomerTableProps = {
  customers: ICustomer[]
  onRefresh: () => void
}

const CustomerTable = ({ customers, onRefresh }: CustomerTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<ICustomer | null>(null)
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
        const response = await customerApi.delete({ id: selectedId })

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

  const handleStatusClick = (customer: ICustomer) => {
    setCurrent(customer)
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
        const response = await customerApi.updateStatus({
          id: current.id,
          status: selectedStatus
        })

        if (response.status === 200) {
          onRefresh()
          Swal.fire('Success!', 'Customer status updated successfully', 'success')
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
    const s = customerStatus.find((s) => s.value === status)
    return s ? s.title : ECustomerStatus.UNKNOWN
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {customerTableHeaders.map((h) => (
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
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark text-center'>{customer.id}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.fullName}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.phoneNumber}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.email}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                {customer.sex === 1 ? 'Male' : customer.sex === 0 ? 'Female' : 'Unknown'}
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.birthday}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.totalSpending}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.lastOperatingTime}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <StatusBadge
                  status={Number(customer.status)}
                  statusList={customerStatus}
                  onClick={() => handleStatusClick(customer)}
                />
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.createdAt}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{customer.updatedAt}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <Link to={`/customers/edit/${customer.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(customer.id)}>
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
          title='Are you sure you want to delete this customer?'
          className='bg-red-500'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenStatusListModal && current && (
        <StatusModal
          status={Number(current.status)}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelStatusChange}
          statusList={customerStatus}
          modalTitle='Customer'
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

export default CustomerTable
