import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateInfoModal from '@/components/common/UpdateInfoModal'
import ChangePasswordModal from '@/components/common/ChangePasswordModal'
import { IChangePasswordFormData, IUpdateInfoFormData } from '@/models/interfaces'
import { EToastOption } from '@/models/enum'
import { UToast } from '@/utils/swal'
import { fetchCustomerInfo } from '@/redux/slices/customer.slice'
import customerApi from '@/apis/modules/customer.api'
import { AppDispatch, RootState } from '@/redux/store'
import CustomerInfoSection from '@/components/common/CustomerInfoSection'
import { formatDate } from '@/utils'

const AccountInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const info = useSelector((state: RootState) => state.customer.info)
  const loading = useSelector((state: RootState) => state.customer.loading)
  const error = useSelector((state: RootState) => state.customer.error)
  const [isInfoUpdateModalOpen, setIsInfoUpdateModalOpen] = useState<boolean>(false)
  const [isPasswordUpdateModalOpen, setIsPasswordUpdateModalOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchCustomerInfo())
  }, [dispatch])

  const handleUpdateInfo = async (data: IUpdateInfoFormData) => {
    try {
      const res = await customerApi.updateInfo({
        ...data,
        birthday: new Date(data.birthday).toISOString()
      })
      if (res.status === 200) {
        UToast(EToastOption.SUCCESS, 'Cập nhật thông tin thành công')
        dispatch(fetchCustomerInfo())
      } else UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } finally {
      setIsInfoUpdateModalOpen(false)
    }
  }

  const handleChangePassword = async (data: IChangePasswordFormData) => {
    try {
      const res = await customerApi.changePassword(data)
      if (res.status === 200) UToast(EToastOption.SUCCESS, 'Thay đổi mật khẩu thành công')
      else UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } finally {
      setIsPasswordUpdateModalOpen(false)
    }
  }

  const infoOptions = [
    { label: 'Họ và tên', value: info?.fullName || 'N/A' },
    { label: 'Số điện thoại', value: info?.phoneNumber || 'N/A' },
    { label: 'Giới tính', value: info?.sex || 'N/A' },
    { label: 'Ngày sinh', value: info?.birthday ? formatDate(info.birthday!) : 'N/A' },
    {
      label: 'Ngày cập nhật tài khoản',
      value: info?.updatedAt ? formatDate(info.updatedAt!) : info?.createdAt ? formatDate(info.createdAt!) : 'N/A'
    }
  ]

  const info2Options = [
    { label: 'Email', value: info?.email || 'N/A' },
    { label: 'Mật khẩu', value: '********' }
  ]

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <CustomerInfoSection
        title='Thông tin tài khoản'
        options={infoOptions}
        onClick={() => setIsInfoUpdateModalOpen(true)}
      />
      <CustomerInfoSection
        title='Thông tin đăng nhập'
        options={info2Options}
        onClick={() => setIsPasswordUpdateModalOpen(true)}
      />
      {isInfoUpdateModalOpen && (
        <UpdateInfoModal
          onClose={() => setIsInfoUpdateModalOpen(false)}
          onSubmit={handleUpdateInfo}
          initialData={info}
        />
      )}
      {isPasswordUpdateModalOpen && (
        <ChangePasswordModal onClose={() => setIsPasswordUpdateModalOpen(false)} onSubmit={handleChangePassword} />
      )}
    </div>
  )
}

export default AccountInfo
