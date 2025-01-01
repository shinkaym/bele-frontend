import { useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Input from '@/components/common/Forms/Input'
import Button from '@/components/common/Button'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import tagApi from '@/apis/modules/tag.api'

const schema = z.object({
  name: z.string().min(1, 'Name is required')
})

type FormValues = z.infer<typeof schema>

type Props = {}

function Add({}: Props) {
  useEffect(() => {}, [])

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    register
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('🚀 ~ Add ~ data:', data)
    try {
      await tagApi.add({
        name: data.name
      })
      UToast(EToastOption.SUCCESS, 'Add tag successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.WARNING, 'Add tag failure!')
    }
  }

  return (
    <div className='flex flex-col gap-10'>
      <Breadcrumb pageName='Add Tag' parentPageName='Tag' parentTo='/tables/tag' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  error={errors.name?.message}
                  {...field}
                  {...register('name')}
                  placeholder='Enter name'
                  className='border border-gray-300 mb-6'
                />
              )}
            />
          </div>
          <div className='grid grid-cols-6'>
            <Button type='button' className='max-h-12 mr-4'>
              Add
            </Button>
            <Button type='link' to='/tables/tag' color='secondary' className='max-h-12'>
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Add
