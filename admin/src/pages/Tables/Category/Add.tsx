import categoryApi from '@/apis/modules/categoy.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import Loader from '@/components/common/Loader'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ICategory from '@/models/interfaces/category'
import IOptions from '@/models/interfaces/options'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import { statusData } from '@/models/data'
import Alert from '@/components/common/Alert'

type Props = {}

interface CategoryFormData {
  name: string
  parentId: number
  status: number
}

interface AlertOption {
  type: 'success' | 'warning' | 'danger'
  message: string
  title: string
  isOpen: boolean
}

function Add({}: Props) {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<IOptions[]>([])
  const [categoryData, setCategoryData] = useState<ICategory[]>([])
  const [alert, setAlert] = useState<AlertOption>({
    type: 'success',
    message: 'Add Category Successfully!',
    title: 'Add Category',
    isOpen: false
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = categoryApi.getAll()
        setCategoryData(data)
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
      .refine((name) => !categoryData.some((category) => category.name.toLowerCase() === name.toLowerCase()), {
        message: 'Category name must be unique'
      }), // Bắt buộc nhập tên
    parentId: z.number(),
    status: z.number()
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema)
  })

  const onSubmit = (data: CategoryFormData) => {
    try {
      setAlert((prev) => ({ ...prev, isOpen: true }))
      reset()
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }))
      }, 2000)
    } catch (error) {
      setAlert({
        type: 'danger',
        message: 'Add Category Failure!',
        title: 'Add Category',
        isOpen: true
      })
      reset()
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }))
      }, 2000)
    }
    console.log(data) // Dữ liệu khi submit

    setTimeout
    reset()
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
                name='parentId'
                control={control}
                defaultValue={0} // Giá trị mặc định là 0
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
              <Button type='button' className='max-h-12'>
                Add
              </Button>
            </div>
          </form>
          {alert.isOpen && <Alert type={alert.type} message={alert.message} title={alert.title} />}
        </div>
      )}
    </>
  )
}

export default Add
