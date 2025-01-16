import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './Button'
import Popup from './Popup'
import { IAddressFormData } from '@/models/interfaces'
import CheckboxGroup from './Forms/CheckboxGroup'
import Input from './Forms/Input'

interface IUpdateAddressModalProps {
  onClose: () => void
  onSubmit: (data: IAddressFormData) => void
  initialData: IAddressFormData
}

const addressSchema = z.object({
  name: z.string().min(1, { message: 'Tên không được để trống' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Số điện thoại không được để trống' })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không đúng định dạng' }),
  address: z.string().min(1, { message: 'Địa chỉ không được để trống' }),
  isDefault: z.boolean()
})

const UpdateAddressModal: React.FunctionComponent<IUpdateAddressModalProps> = ({ onClose, onSubmit, initialData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IAddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData
  })

  const handleFormSubmit = async (data: IAddressFormData) => {
    await onSubmit(data)
    onClose()
  }

  return (
    <Popup onPopupClose={onClose} className='lg:w-[800px] w-11/12'>
      <h2 className='text-2xl font-semibold mb-4'>Cập nhật địa chỉ</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='grid grid-cols-2 gap-3 mb-5'>
          <div className='mb-4 col-span-2 md:col-span-1'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  name='name'
                  value={field.value}
                  onChange={field.onChange}
                  label='Tên:'
                  error={errors.name?.message}
                />
              )}
            />
          </div>

          <div className='mb-4 col-span-2 md:col-span-1'>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <Input
                  name='phoneNumber'
                  value={field.value}
                  onChange={field.onChange}
                  label='Số điện thoại:'
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </div>

          <div className='mb-4 col-span-2'>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <Input
                  name='address'
                  value={field.value}
                  onChange={field.onChange}
                  label='Địa chỉ:'
                  error={errors.address?.message}
                />
              )}
            />
          </div>

          <div className='mb-4 col-span-2 md:col-span-1'>
            <Controller
              name='isDefault'
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={[{ value: 'isDefault', label: 'Đặt làm địa chỉ mặc định' }]}
                  name='isDefault'
                  selectedValues={field.value ? ['isDefault'] : []}
                  onChange={(values) => {
                    field.onChange(values.includes('isDefault')) // Convert to boolean
                  }}
                  layout='horizontal'
                />
              )}
            />
          </div>
        </div>

        <Button
          type='button'
          color='black'
          textColor='white'
          className='w-full rounded-md py-3 hover:opacity-85 uppercase'
          onClick={() => handleSubmit(handleFormSubmit)}
        >
          Cập nhật địa chỉ
        </Button>
      </form>
    </Popup>
  )
}

export default UpdateAddressModal
