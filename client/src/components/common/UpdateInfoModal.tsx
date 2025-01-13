import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from './Forms/Input'
import Button from './Button'
import Loader from './Loader'
import ForwardedRadioGroup from './Forms/RadioGroup'
import Popup from './Popup'
import CustomDatePicker from './CustomDatePicker'
import { IUpdateInfoFormData } from '@/models/interfaces'

interface IUpdateInfoModalProps {
  onClose: () => void
  onSubmit: (data: IUpdateInfoFormData) => void
}

const sexOptions = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' }
]

const updateInfoSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .min(1, { message: 'Số điện thoại không được để trống' })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không đúng định dạng' }),
  sex: z.string().min(1, { message: 'Không được để trống giới tính' }),
  birthday: z.date({ required_error: 'Không được để trống ngày sinh' })
})

const UpdateInfoModal: React.FunctionComponent<IUpdateInfoModalProps> = ({ onClose, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateInfoFormData>({
    resolver: zodResolver(updateInfoSchema)
  })

  const handleFormSubmit = async (data: IUpdateInfoFormData) => {
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
    <Popup onPopupClose={onClose} className='lg:w-[800px] w-full'>
      <h2 className='text-2xl font-semibold mb-4'>Cập nhật thông tin tài khoản</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='grid grid-cols-2 gap-3 mb-5'>
          <div className='mb-4'>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input
                  placeholder='Họ và tên'
                  type='text'
                  error={errors.name?.message}
                  {...field}
                  name='name'
                  label='Họ và tên:'
                />
              )}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='phone'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input
                  placeholder='Số điện thoại'
                  type='text'
                  error={errors.phone?.message}
                  {...field}
                  label='Số điện thoại:'
                />
              )}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='birthday'
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  label='Ngày sinh:'
                  name='birthday'
                  placeholder='Chọn ngày sinh'
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.birthday?.message}
                />
              )}
            />
          </div>
        </div>

        <div className='mb-4'>
          <Controller
            name='sex'
            control={control}
            defaultValue='Nữ'
            render={({ field }) => (
              <ForwardedRadioGroup
                options={sexOptions}
                name='sex'
                selectedValue={field.value}
                onChange={field.onChange}
                layout='horizontal'
                label='Giới tính'
              />
            )}
          />
          {errors.sex && <p className='text-red-500 text-sm mt-1'>{errors.sex.message}</p>}
        </div>

        <Button
          type='button'
          color='black'
          textColor='white'
          className='w-full rounded-md py-3 hover:opacity-85 uppercase'
          onClick={() => handleSubmit(handleFormSubmit)} // Sửa lại để gọi handleSubmit với handleFormSubmit
        >
          Cập nhật tài khoản
        </Button>
      </form>
      {loading && <Loader type='inside' />}
    </Popup>
  )
}

export default UpdateInfoModal
