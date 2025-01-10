import DeleteIcon from '@/components/icons/Crud/DeleteIcon'
import EditIcon from '@/components/icons/Crud/EditIcon'
import { EToastOption } from '@/models/enums/option'
import { ECategoryStatus } from '@/models/enums/status'
import { ICategory } from '@/models/interfaces/category'
import { UToast } from '@/utils/swal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import categoryApi from '@/apis/modules/categoy.api'
import { categoryStatus } from '@/constants'
import ConfirmationModal from '../ConfirmationModal'
import StatusModal from '../StatusModal'
import ReCAPCHAModal from '../ReCAPCHAModal'
import StatusBadge from '../StatusBadge'
type Props = {
  categories: ICategory[]
  onRefresh: () => void
}

function CategoryTable({ categories, onRefresh }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [current, setCurrent] = useState<ICategory | null>(null)
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
        const res = await categoryApi.delete(selectedId)

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

  const handleStatusClick = (category: ICategory) => {
    setCurrent(category)
    setIsOpenStatusListModal(true)
  }

  const handleUpdateStatus = (status: number) => {
    setSelectedStatus(status)
    setIsOpenStatusListModal(false)
    setIsOpenConfirmStatusChangeModal(true)
  }

  const handleConfirmStatusChange = async () => {
    console.log(current);
    if (current && selectedStatus !== null) {
      try {
        const res = await categoryApi.updateStatus(current.id, selectedStatus)
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
    const s = categoryStatus.find((s) => s.value === status)
    return s ? s.title : ECategoryStatus.UNKNOWN
  }

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Id
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Name
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Parent Name
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Slug
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Created At
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap'>
              Status
            </th>
            <th className='min-w-[80px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap text-center'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{cat.id}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{cat.name}</h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {cat.referenceCategory?.name}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>{cat.slug}</p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <p className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  {new Date(cat.createdAt).toLocaleDateString()}
                </p>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
              <h5 className='font-medium text-black dark:text-white text-sm truncate max-w-[100px]'>
                  <StatusBadge status={cat.status} statusList={categoryStatus} onClick={() => handleStatusClick(cat)} />
                </h5>
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <Link to={`/tables/category/edit/${cat.id}`} className='hover:text-primary'>
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(cat.id)}>
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
          statusList={categoryStatus}
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

export default CategoryTable
