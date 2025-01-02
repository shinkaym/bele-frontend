import { IEmployee } from '@/models/interfaces/employee'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { Link } from 'react-router-dom'
import { employeeStatus, employeeTableHeaders } from '@/constants'
import { EEmployeeStatus } from '@/models/enums/status'
import { formatDate } from '@/utils'
import { useState } from 'react'
import employeeApi from '@/apis/modules/employee.api'
import Swal from 'sweetalert2'
import ReCAPCHAModal from '../ReCAPCHAModal'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import StatusBadge from '../StatusBadge'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'

type EmployeeTableProps = {
  employees: IEmployee[]
  onRefresh: () => void
}

const EmployeeTable = ({ employees, onRefresh }: EmployeeTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<IEmployee | null>(null)
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
        const res = await employeeApi.delete({ id: selectedId })

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

  const handleStatusClick = (employee: IEmployee) => {
    setCurrent(employee)
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
        const res = await employeeApi.updateStatus({
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
    const s = employeeStatus.find((s) => s.value === status)
    return s ? s.title : EEmployeeStatus.UNKNOWN
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {employeeTableHeaders.map((h) => (
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
          {employees.map((em, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px] text-center'>
                  {em.id}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.name}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {em.phoneNumber}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.email}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.sex}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{em.role}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  <StatusBadge status={em.status} statusList={employeeStatus} onClick={() => handleStatusClick(em)} />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {em.createdAt ? formatDate(em.createdAt) : 'N/A'}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {em.updatedAt ? formatDate(em.updatedAt) : 'N/A'}
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <Link to={`/tables/employee/edit/${em.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(em.id)}>
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
          title='Are you sure you want to delete this employee?'
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
          statusList={employeeStatus}
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

export default EmployeeTable
