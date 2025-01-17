import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './Button'
import Loader from './Loader'
import Popup from './Popup'
import { IChangePasswordFormData } from '@/models/interfaces'
import PasswordInput from './Forms/PasswordInput'

interface IChangePasswordModalProps {
  onClose: () => void
  onSubmit: (data: IChangePasswordFormData) => void
}

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Mật khẩu hiện tại không được để trống' }),
    newPassword: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
    }),
    confirmPassword: z.string().min(1, { message: 'Xác nhận mật khẩu không được để trống' })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
    path: ['confirmPassword']
  })

const ChangePasswordModal: React.FunctionComponent<IChangePasswordModalProps> = ({ onClose, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })

  const handleFormSubmit = async (data: IChangePasswordFormData) => {
    setLoading(true)
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.log('🚀 ~ handleFormSubmit ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popup onPopupClose={onClose} className='lg:w-[700px] w-11/12'>
      <h2 className='text-2xl font-semibold mb-4'>Thay đổi mật khẩu</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='mb-4'>
          <Controller
            name='currentPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <PasswordInput
                placeholder='Mật khẩu hiện tại'
                error={errors.currentPassword?.message}
                {...field}
                label='Mật khẩu hiện tại:'
              />
            )}
          />
        </div>

        <div className='mb-4'>
          <Controller
            name='newPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <PasswordInput
                placeholder='Mật khẩu mới'
                error={errors.newPassword?.message}
                {...field}
                label='Mật khẩu mới:'
              />
            )}
          />
        </div>

        <div className='mb-4'>
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <PasswordInput
                placeholder='Xác nhận mật khẩu mới'
                error={errors.confirmPassword?.message}
                {...field}
                label='Xác nhận mật khẩu mới:'
              />
            )}
          />
        </div>

        <Button
          type='button'
          color='black'
          textColor='white'
          className='w-full rounded-md py-3 hover:opacity-85 uppercase'
          onClick={() => handleSubmit(handleFormSubmit)} // Sửa lại để gọi handleSubmit với handleFormSubmit
        >
          Thay đổi mật khẩu
        </Button>
      </form>
      {loading && <Loader type='inside' />}
    </Popup>
  )
}

export default ChangePasswordModal
