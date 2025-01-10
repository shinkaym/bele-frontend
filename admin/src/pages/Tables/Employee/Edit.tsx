import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams } from 'react-router-dom'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Input from '@/components/common/Forms/Input'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import { IOptions } from '@/models/interfaces/options'
import ForwardedRadioGroup from '@/components/common/Forms/RadioGroup'
import Button from '@/components/common/Button'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import employeeApi from '@/apis/modules/employee.api'
import { IApiResponse } from '@/models/interfaces/api'
import { IEmployeeDetailResponse } from '@/models/interfaces/employee'
import InputPassword from '@/components/common/InputPassword'

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().refine(
      (value) => !value || value.length >= 6, //
      {
        message: 'Password must be at least 6 characters if provided'
      }
    ),
    rePassword: z.string().refine((value) => !value || value.length >= 6, {
      message: 'Password confirmation must be at least 6 characters if provided'
    }),
    sex: z.enum(['Male', 'Female']),
    role: z.union([z.number(), z.string()]),
    status: z.union([z.number(), z.string()])
  })
  .superRefine(({ password, rePassword }, ctx) => {
    if (password && !rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password confirmation is required',
        path: ['rePassword']
      })
    }

    if (password && rePassword && password !== rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['rePassword']
      })
    }
  })

type FormValues = z.infer<typeof schema>

type Props = {}

function Edit({}: Props) {
  const { id } = useParams<{ id: string }>()
  const [roleOptions, setRoleOptions] = useState<IOptions[]>([])
  const [statusOptions, setStatusOptions] = useState<IOptions[]>([])
  const [sexOptions, setSexOptions] = useState<IOptions[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      rePassword: '',
      sex: 'Male',
      role: 0,
      status: 0
    }
  })

  useEffect(() => {
    setRoleOptions([
      { value: 1, label: 'Admin' },
      { value: 2, label: 'Product Management' }
    ])
    setStatusOptions([
      { value: 0, label: 'Inactive' },
      { value: 1, label: 'Active' }
    ])
    setSexOptions([
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ])

    const fetchEmployee = async () => {
      try {
        const res: IApiResponse<IEmployeeDetailResponse> = await employeeApi.detail({ id: Number(id) })
        if (res.status === 200) {
          const employee = res?.data?.account
          if (employee) {
            reset({
              name: employee.fullName,
              phoneNumber: employee.phoneNumber,
              email: employee.email,
              sex: employee.sex as 'Male' | 'Female',
              role: employee.role.id,
              status: employee.status
            })
          }
        } else {
          UToast(EToastOption.ERROR, res.message)
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'An unexpected error occurred.')
      }
    }

    fetchEmployee()
  }, [id, reset])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const req = {
        id: Number(id),
        data: {
          fullName: data.name,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password || null,
          rePassword: data.rePassword || null,
          sex: data.sex,
          roleId: data.role as number,
          status: data.status as number
        }
      }
      const res = await employeeApi.update(req)
      if (res.status === 200) {
        UToast(EToastOption.SUCCESS, res.message)
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    }
  }

  return (
    <div className='flex flex-col gap-10'>
      <Breadcrumb pageName='Edit Employee' parentPageName='Employee' parentTo='/tables/employee' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  label='Full Name'
                  error={errors.name?.message}
                  {...field}
                  {...register('name')}
                  placeholder='Enter full name'
                  className='border border-gray-300 mb-6'
                />
              )}
            />
            <div>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    label='Email'
                    error={errors.email?.message}
                    {...field}
                    {...register('email')}
                    placeholder='Enter email'
                    className='border border-gray-300 mb-6'
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <InputPassword
                    label='Password'
                    error={errors.password?.message}
                    {...field}
                    value={field.value || ''}
                    {...register('password')}
                    placeholder='Enter password'
                    className='border border-gray-300 mb-6'
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name='sex'
                control={control}
                defaultValue={'Male'}
                render={({ field }) => (
                  <ForwardedRadioGroup
                    {...field}
                    {...register('sex')}
                    label='Sex'
                    options={sexOptions}
                    selectedValue={field.value.toString()}
                    layout='horizontal'
                    onChange={(value) => field.onChange(value)}
                    className='mb-6'
                  />
                )}
              />
            </div>
          </div>
          <div>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  label='Phone Number'
                  error={errors.phoneNumber?.message}
                  {...field}
                  {...register('phoneNumber')}
                  placeholder='Enter phone number'
                  className='border border-gray-300 mb-6'
                />
              )}
            />
            <div>
              <Controller
                name='role'
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <SelectGroup
                    {...register('role')}
                    value={field.value ?? 0}
                    onChange={(value) => field.onChange(value)}
                    options={roleOptions}
                    label='Role'
                    className='mb-6'
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name='rePassword'
                control={control}
                render={({ field }) => (
                  <InputPassword
                    label='Confirm Password'
                    error={errors.rePassword?.message}
                    {...field}
                    value={field.value || ''}
                    {...register('rePassword')}
                    placeholder='Enter confirm password'
                    className='border border-gray-300 mb-6'
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name='status'
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <ForwardedRadioGroup
                    {...field}
                    {...register('status')}
                    label='Status'
                    options={statusOptions}
                    selectedValue={field.value.toString()}
                    layout='horizontal'
                    onChange={(value) => field.onChange(value)}
                    className='mb-6'
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-6'>
          <Button type='button' className='max-h-12 mr-4'>
            Edit
          </Button>
          <Button type='link' to='/tables/employee' color='secondary' className='max-h-12'>
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Edit
