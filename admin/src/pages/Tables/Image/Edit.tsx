import imageApi from '@/apis/modules/image.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import { imageOption } from '@/models/data/imageData'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IImage } from '@/models/interfaces/image'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

type Props = {}

function Edit({}: Props) {
  const [loading, setLoading] = useState(false)
  const [imageData, setimageData] = useState<IImage[]>([])
  const [imageById, setImageById] = useState<IImage>()
  const params = useParams()
  const imageId: number = Number(params.imageId)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = imageApi.getAll()
        const image = imageApi.getImg(imageId)
        if (image) {
          setImageById(image)
          reset({
            name: image.name,
            imageType: image.imageType,
            status: Number(image.status)
          })
        }
        setimageData(data)
        setLoading(false) // Tắt trạng thái loading
      }, 1000)
    } catch (error) {
      console.error('Error fetching images:', error)
      setLoading(false)
    }
    return () => {
      clearTimeout(timeoutId) // Dọn dẹp timeout khi unmount
    }
  }, [])

  // Cấu hình Zod schema
  const imageSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Image name is required' })
      .refine((name) => !imageData.some((img) => img.name.toLowerCase() === name.toLowerCase()), {
        message: 'Image name must be unique'
      }), // Bắt buộc nhập tên
    imageType: z.string().min(1, { message: 'Image Type is required' }),
    status: z.number(),
    image: z
      .union([
        z
          .instanceof(File)
          .refine((file) => file.type.startsWith('image/'), {
            message: 'File must be an image'
          })
          .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Image size must be less than 5MB'
          }),
        z.null() // Cho phép giá trị null
      ])
      .optional() // Hoặc undefined nếu không được cung cấp
  })

  type imageFormData = z.infer<typeof imageSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<imageFormData>({
    resolver: zodResolver(imageSchema)
  })

  const onSubmit = (data: imageFormData) => {
    try {
      //call api in here...

      UToast(EToastOption.SUCCESS, 'Edit Image Successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.SUCCESS, 'Edit Image Failure!')
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
          <Breadcrumb pageName='Edit Image' parentPageName='Image' parentTo='/tables/image' />

          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 '>
            <div>
              {/* Image Upload */}
              <Controller
                name='image'
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    {...field} // Truyền các props của field vào ImageUpload
                    label='Upload Image'
                    error={errors.image?.message} // Hiển thị lỗi nếu có
                    onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                    initialImageUrl={imageById?.url}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    label='Name'
                    error={errors.name?.message}
                    {...field} // Truyền tất cả props từ field vào Input
                    placeholder='Enter Image Name'
                    className='border border-gray-300 mb-4'
                  />
                )}
              />
              <Controller
                name='imageType'
                control={control}
                render={({ field }) => (
                  <SelectGroup
                    value={field.value} // Đồng bộ hóa giá trị
                    onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                    options={imageOption} // Danh sách tùy chọn
                    label='Image Type'
                    className='mb-6'
                    error={errors.imageType?.message} // Hiển thị lỗi (nếu có)
                  />
                )}
              />
              <Controller
                name='status'
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    label='Status'
                    options={statusData}
                    selectedValue={field.value.toString()}
                    layout='horizontal'
                    onChange={(value) => field.onChange(parseInt(value))}
                    className='mb-6'
                  />
                )}
              />
              <div className=''>
                <Button type='button' className='max-h-12 mr-4'>
                  Edit
                </Button>
                <Button type='link' to='/tables/image' color='secondary' className='max-h-12'>
                  Back
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Edit
