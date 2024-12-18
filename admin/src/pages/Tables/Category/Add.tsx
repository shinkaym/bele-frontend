import categoryApi from '@/apis/modules/categoy.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import Loader from '@/components/common/Loader'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { ICategoryFormData, ICategory } from '@/models/interfaces/category'
import { IOptions } from '@/models/interfaces/options'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

function Add({}: Props) {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<IOptions[]>([])
  const [categoryData, setCategoryData] = useState<ICategory[]>([])

  useEffect(() => {
    const handleGetData = async()=>{
      setLoading(true)
      try {
        const data = await categoryApi.getList()
        setCategoryData(data)
        //set Option Category Parent
        // let newData: IOptions[] = data
        //   .filter((cat) => !cat.parentName) // Lọc các phần tử không có parentName
        //   .map((cat) => ({
        //     value: cat.id,
        //     label: cat.name
        //   }))
        // newData = [
        //   {
        //     value: 0,
        //     label: '---Select Category---'
        //   },
        //   ...newData
        // ]
        // setOptions(newData) // Cập nhật dữ liệu
        setLoading(false) // Tắt trạng thái loading
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  // Cấu hình Zod schema
  const categorySchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Category name is required' })
      .refine((name) => !categoryData.some((category) => category.name.toLowerCase() === name.toLowerCase()), {
        message: 'Category name must be unique'
      }), // Bắt buộc nhập tên
    referenceCategoryId: z.number(),
    status: z.number()
  })

  type categoryFormData = z.infer<typeof categorySchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<categoryFormData>({
    resolver: zodResolver(categorySchema)
  })

  const onSubmit = (data: categoryFormData) => {
    try {
      //call api in here...

      UToast(EToastOption.SUCCESS, 'Add Category Successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.SUCCESS, 'Add Category Failure!')
      reset()
    }
    console.log(data) // Dữ liệu khi submit
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-10'>
          <Breadcrumb pageName='Add Category' parentPageName='Category' parentTo='/tables/category' />

          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 '>
            {/* Category Name */}
            <div>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    error={errors.name?.message}
                    {...field} // Truyền tất cả props từ field vào Input
                    placeholder='Enter Category Name'
                    className='border border-gray-300 mb-4'
                  />
                )}
              />
              <div className='flex justify-end items-center'>
                <Controller
                  name='status'
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      options={statusData}
                      selectedValue={field.value.toString()}
                      layout='horizontal'
                      onChange={(value) => field.onChange(parseInt(value))}
                    />
                  )}
                />
              </div>
              <Controller
                name='referenceCategoryId'
                control={control}
                defaultValue={0} // Giá trị mặc định là 0
                render={({ field }) => (
                  <SelectGroup
                    value={field.value} // Đồng bộ hóa giá trị
                    onChange={(value) => field.onChange(parseInt(value))} // Chuyển giá trị từ string thành số
                    options={options} // Danh sách tùy chọn
                    label='Category'
                    error={errors.referenceCategoryId?.message} // Hiển thị lỗi (nếu có)
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-6'>
              <Button type='button' className='max-h-12 mr-4'>
                Add
              </Button>
              <Button type='link' to='/tables/category' color='secondary' className='max-h-12'>
                Back
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Add
