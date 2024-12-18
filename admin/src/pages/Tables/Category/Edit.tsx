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
import { useParams } from 'react-router-dom'
import { z } from 'zod'

type Props = {}

function Edit({}: Props) {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<IOptions[]>([])
  const [categoryData, setCategoryData] = useState<ICategory[]>([])
  const params = useParams()
  const categoryId: number = Number(params.categoryId)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = categoryApi.getAll()
        setCategoryData(data)
        const category = categoryApi.getCat(categoryId)
        if (category) {
          reset({
            name: category.name,
            parentId: category.parentId,
            status: category.status
          })
        }
        let newData: IOptions[] = data
          .filter((cat) => !cat.parentName) // Lọc các phần tử không có parentName
          .map((cat) => ({
            value: cat.id,
            label: cat.name
          }))
        newData = [
          {
            value: 0,
            label: '---Select Category---'
          },
          ...newData
        ]
        setOptions(newData) // Cập nhật dữ liệu
        setLoading(false) // Tắt trạng thái loading
      }, 1000)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setLoading(false)
    }
    return () => {
      clearTimeout(timeoutId) // Dọn dẹp timeout khi unmount
    }
  }, [])
  // Cấu hình Zod schema
  const categorySchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Category name is required' })
      .refine(
        (name) =>
          !categoryData.some(
            (category) => category.name.toLowerCase() === name.toLowerCase() && category.id !== categoryId
          ),
        {
          message: 'Category name must be unique'
        }
      ), // Bắt buộc nhập tên
    parentId: z.number(),
    status: z.number()
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ICategoryFormData>({
    resolver: zodResolver(categorySchema)
  })

  const onSubmit = (data: ICategoryFormData) => {
    try {
      //call api in here...
      
      UToast(EToastOption.SUCCESS, 'Edit Category Successfully!')
      reset()
    } catch (error) {
      reset()
      UToast(EToastOption.Error, 'Edit Category Failure!')
    }
    console.log(data) // Dữ liệu khi submit
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-10'>
          <Breadcrumb pageName='Edit Category' parentPageName='Category' parentTo='/tables/category' />

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
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      options={statusData}
                      selectedValue={(field.value ?? 1).toString()}
                      layout='horizontal'
                      onChange={(value) => field.onChange(parseInt(value))}
                    />
                  )}
                />
              </div>
              <Controller
                name='parentId'
                control={control}
                render={({ field }) => (
                  <SelectGroup
                    value={field.value} // Đồng bộ hóa giá trị
                    onChange={(value) => field.onChange(parseInt(value))} // Chuyển giá trị từ string thành số
                    options={options} // Danh sách tùy chọn
                    label='Category'
                    error={errors.parentId?.message} // Hiển thị lỗi (nếu có)
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-6'>
              <Button type='button' className='max-h-12 mr-4'>
                Edit
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

export default Edit
