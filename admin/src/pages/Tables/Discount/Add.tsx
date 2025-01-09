import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Input from '@/components/common/Forms/Input'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import { IOptions } from '@/models/interfaces/options'
import Button from '@/components/common/Button'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import discountApi from '@/apis/modules/discount.api'
import { useNavigate } from 'react-router-dom'

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    discount: z
      .number()
      .min(0, 'Discount must be greater than or equal to 0')
      .max(100, 'Discount cannot exceed 100'),
    expireDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    expireTime: z
      .string()
      .refine(
        (time) =>
          /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time),
        'Invalid time format, expected HH:mm'
      ),
    status: z.union([z.number(), z.string()])
  })
  .superRefine((data, ctx) => {
    const currentDate = new Date();
    const [currentYear, currentMonth, currentDay] = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    ];

    const expireDate = new Date(data.expireDate);
    const [expireYear, expireMonth, expireDay] = [
      expireDate.getFullYear(),
      expireDate.getMonth() + 1,
      expireDate.getDate(),
    ];

    if (
      expireYear === currentYear &&
      expireMonth === currentMonth &&
      expireDay === currentDay
    ) {
      const [currentHours, currentMinutes] = [currentDate.getHours(), currentDate.getMinutes()];
      const [expireHours, expireMinutes] = data.expireTime.split(':').map(Number);

      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const expireTimeInMinutes = expireHours * 60 + expireMinutes;

      if (expireTimeInMinutes <= currentTimeInMinutes) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['expireTime'],
          message: 'Expire time must be later than the current time if it is today.',
        });
      }
    }
  });

type FormValues = z.infer<typeof schema>

type Props = {}

function AddDiscount({}: Props) {
  const navigate = useNavigate()
  const [statusOptions, setStatusOptions] = useState<IOptions[]>([])
  useEffect(() => {
    setStatusOptions([
      { value: 0, label: 'Inactive' },
      { value: 1, label: 'Active' }
    ])
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await discountApi.add({
        name: data.name,
        discountValue: data.discount,
        expireDate: `${data.expireDate}T${data.expireTime}:00.000`,
        status: data.status as number
      })
      if (res.status === 201) {
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
      <Breadcrumb pageName='Add Discount' parentPageName='Discounts' parentTo='/tables/discount' />

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
              name='expireTime'
              control={control}
              render={({ field }) => (
                <Input
                  type='time'
                  label='Expire Time'
                  error={errors.expireTime?.message}
                  {...field}
                  {...register('expireTime')}
                  className='border border-gray-300 mb-6'
                />
              )}
            />
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
            Add
          </Button>
          <Button type='link' to='/tables/discount' color='secondary' className='max-h-12'>
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddDiscount
