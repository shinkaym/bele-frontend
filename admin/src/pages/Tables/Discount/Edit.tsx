import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Input from '@/components/common/Forms/Input'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import { IOptions } from '@/models/interfaces/options'
import ForwardedRadioGroup from '@/components/common/Forms/RadioGroup'
import Button from '@/components/common/Button'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import discountApi from '@/apis/modules/discount.api'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  discount: z.number().min(0, 'Discount must be greater than or equal to 0').max(100, 'Discount cannot exceed 100'),
  expireDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  status: z.union([z.number(), z.string()])
})

type FormValues = z.infer<typeof schema>

type Props = {}

function EditDiscount({}: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [statusOptions, setStatusOptions] = useState<IOptions[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    setStatusOptions([
      { value: 0, label: 'Inactive' },
      { value: 1, label: 'Active' }
    ])

    const fetchDiscount = async () => {
      try {
        const res = await discountApi.detail({ id: Number(id) })
        if (res.status === 200) {
          const discount = res.data
          reset({
            name: discount.name,
            discount: discount.discount,
            expireDate: discount.expireDate,
            status: discount.status
          })
          UToast(EToastOption.SUCCESS, res.message)
        } else {
          UToast(EToastOption.ERROR, res.message)
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'An unexpected error occurred.')
      }
    }

    fetchDiscount()
  }, [id, reset, navigate])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await discountApi.update({
        id: Number(id),
        data: {
          name: data.name,
          discount: data.discount,
          expireDate: data.expireDate,
          status: data.status as number
        }
      })
      if (res.status === 200) {
        UToast(EToastOption.SUCCESS, res.message)
        navigate('/tables/discount')
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    }
  }
  return (
    <div className='flex flex-col gap-10'>
      <Breadcrumb pageName='Edit Discount' parentPageName='Discounts' parentTo='/tables/discount' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  label='Discount Name'
                  error={errors.name?.message}
                  {...field}
                  {...register('name')}
                  placeholder='Enter discount name'
                  className='border border-gray-300 mb-6'
                />
              )}
            />
            <Controller
              name='discount'
              control={control}
              render={({ field }) => (
                <Input
                  type='number'
                  label='Discount (%)'
                  error={errors.discount?.message}
                  {...field}
                  {...register('discount', { valueAsNumber: true })}
                  placeholder='Enter discount percentage'
                  className='border border-gray-300 mb-6'
                />
              )}
            />
          </div>
          <div>
            <Controller
              name='expireDate'
              control={control}
              render={({ field }) => (
                <Input
                  type='date'
                  label='Expire Date'
                  error={errors.expireDate?.message}
                  {...field}
                  {...register('expireDate')}
                  className='border border-gray-300 mb-6'
                />
              )}
            />
            <Controller
              name='status'
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <SelectGroup
                  {...register('status')}
                  value={field.value ?? 0}
                  onChange={(value) => field.onChange(value)}
                  options={statusOptions}
                  label='Status'
                  className='mb-6'
                />
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-6'>
          <Button type='button' className='max-h-12 mr-4'>
            Save Changes
          </Button>
          <Button type='link' to='/tables/discount' color='secondary' className='max-h-12'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditDiscount
