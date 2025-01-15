// AddressFormModal.tsx
import React from 'react'
import { IAddressFormData } from '@/models/interfaces'
import { Controller, useForm } from 'react-hook-form'
import Input from './Forms/Input'
import Button from './Button'
import Popup from './Popup'
import ForwardedCheckboxGroup from './Forms/CheckboxGroup'

interface AddressFormModalProps {
  initialData?: IAddressFormData
  onClose: () => void
  onSubmit: (data: IAddressFormData) => void
}

const AddressFormModal: React.FC<AddressFormModalProps> = ({ initialData, onClose, onSubmit }) => {
  const { control, handleSubmit } = useForm<IAddressFormData>({
    defaultValues: initialData || {
      name: '',
      phoneNumber: '',
      city: '',
      district: '',
      ward: '',
      street: '',
      isDefault: false
    }
  })

  return (
    <Popup onPopupClose={onClose} className='lg:w-[800px] w-full'>
      <h2 className='text-2xl font-semibold mb-4'>{initialData ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-3 mb-5'>
          <div className='mb-4'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => <Input placeholder='Họ và tên' type='text' {...field} label='Họ và tên:' />}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <Input placeholder='Số điện thoại' type='text' {...field} label='Số điện thoại:' />
              )}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='city'
              control={control}
              render={({ field }) => <Input placeholder='Thành phố' type='text' {...field} label='Thành phố:' />}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='district'
              control={control}
              render={({ field }) => <Input placeholder='Quận/Huyện' type='text' {...field} label='Quận/Huyện:' />}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='ward'
              control={control}
              render={({ field }) => <Input placeholder='Phường/Xã' type='text' {...field} label='Phường/Xã:' />}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='street'
              control={control}
              render={({ field }) => <Input placeholder='Đường' type='text' {...field} label='Đường:' />}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='isDefault'
              control={control}
              render={({ field }) => (
                <ForwardedCheckboxGroup
                  options={[{ value: 'true', label: 'Đặt làm mặc định' }]}
                  name='isDefault'
                  selectedValues={field.value ? ['true'] : []}
                  onChange={(values) => field.onChange(values.includes('true'))}
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
          onClick={() => handleSubmit}
        >
          {initialData ? 'Cập nhật' : 'Thêm'}
        </Button>
      </form>
    </Popup>
  )
}

export default AddressFormModal
