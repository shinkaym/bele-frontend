import categoryApi from '@/apis/modules/categoy.api'
import productApi from '@/apis/modules/product.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import ForwardedCheckboxGroup from '@/components/common/Forms/CheckboxGroup'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import TinyMCEEditor from '@/components/common/TinyMCEEditor'
import { attributeTypeOptions } from '@/models/data/attributeTypeData'
import { discountOption } from '@/models/data/discountData'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IOptions } from '@/models/interfaces/options'
import { IProduct } from '@/models/interfaces/product'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

type Props = {}

function Add({}: Props) {
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState<IProduct[]>([])
  const [categoryOption, setCategoryOption] = useState<IOptions[]>([])
  const [productById,setProductById] = useState<IProduct>()
  const params = useParams()
    const productId: number = Number(params.productId)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = productApi.getAll()
        setProductData(data)
        const product = productApi.getProduct(productId)
        if (product) {
          setProductById(product)
          reset({
            name: product.name,
            description:product.description,
            basePrice:product.basePrice,
            categoryId:product.categoryId,
            discountId:product.discountId,
            attributeType:product.attributeType,
            status: Number(product.status)
          })
        }

        const categoryData = categoryApi.getAll()
        let categoryOption: IOptions[] = categoryData
          .filter((cat) => cat.parentId !== 0) // Lọc các phần tử không có parentName
          .map((cat) => ({
            value: cat.id,
            label: cat.name
          }))
        categoryOption = [
          {
            value: 0,
            label: '---Select Category---'
          },
          ...categoryOption
        ]
        setCategoryOption(categoryOption)
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
  const productSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'Product name is required' })
      .refine((name) => !productData.some((pro) => pro.name.toLowerCase() === name.toLowerCase()), {
        message: 'Image name must be unique'
      }),
    basePrice: z.union([z.number(), z.string()]).refine((value) => Number(value) > 0, {
      message: 'Base price must be greater than 0'
    }),
    categoryId: z.union([z.number(), z.string()]).refine((value) => Number(value) !== 0, {
      message: 'Category is required'
    }),
    discountId: z.union([z.number(), z.string()]), // Giá trị mặc định là 0
    status: z.union([z.number(), z.string()]),
    thumbnail: z
      .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
      .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
    attributeType: z.array(z.string()),
    description: z.string()
  })

  type productFormData = z.infer<typeof productSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<productFormData>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = (data: productFormData) => {
    try {
      //call api in here...

      UToast(EToastOption.SUCCESS, 'Add Product Successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.SUCCESS, 'Add Product Failure!')
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
          <Breadcrumb pageName='Add Product' parentPageName='Product' parentTo='/tables/product' />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                {/* Name */}
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      label='Name'
                      error={errors.name?.message}
                      {...field} // Truyền tất cả props từ field vào Input
                      placeholder='Enter Product Name'
                      className='border border-gray-300 mb-6'
                    />
                  )}
                />
                {/* base Price */}
                <Controller
                  name='basePrice'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='number'
                      label='Base Price'
                      error={errors.basePrice?.message}
                      {...field} // Truyền tất cả props từ field vào Input
                      placeholder='Enter Base Price Name'
                      className='border border-gray-300 mb-6'
                    />
                  )}
                />
                {/* Image Upload */}
                <Controller
                  name='thumbnail'
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      {...field} // Truyền các props của field vào ImageUpload
                      label='Upload Image'
                      error={errors.thumbnail?.message} // Hiển thị lỗi nếu có
                      onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                      initialImageUrl={productById?.thumbnail}
                    />
                  )}
                />
              </div>
              <div>
                {/* Category */}
                <Controller
                  name='categoryId'
                  control={control}
                  render={({ field }) => (
                    <SelectGroup
                      value={field.value} // Đồng bộ hóa giá trị
                      onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                      options={categoryOption} // Danh sách tùy chọn
                      label='Category'
                      className='mb-6'
                      error={errors.categoryId?.message} // Hiển thị lỗi (nếu có)
                    />
                  )}
                />
                {/* Discount */}
                <Controller
                  name='discountId'
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <SelectGroup
                      value={field.value} // Đồng bộ hóa giá trị
                      onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                      options={discountOption} // Danh sách tùy chọn
                      label='Discount'
                      className='mb-6'
                      error={errors.discountId?.message} // Hiển thị lỗi (nếu có)
                    />
                  )}
                />
                {/* Status */}
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
                      onChange={(value) => field.onChange(value)}
                      className='mb-6'
                    />
                  )}
                />
                {/* Attribute Type */}
                <Controller
                  name='attributeType'
                  control={control}
                  defaultValue={productById?.attributeType}
                  render={({ field }) => (
                    <ForwardedCheckboxGroup
                      {...field}
                      label='Attribute Type'
                      options={attributeTypeOptions}
                      selectedValues={field.value}
                      layout='horizontal'
                      onChange={(value) => field.onChange(value)}
                      className='mb-6'
                    />
                  )}
                />
              </div>
            </div>
            {/* Description */}
            <Controller
              defaultValue=''
              name='description'
              control={control}
              render={({ field }) => <TinyMCEEditor value={field.value} onChange={field.onChange} className='mb-6' />}
            />
            <div className='grid grid-cols-2 gap-4'>
              <Button type='link' to='/tables/image' color='secondary' className='max-h-12'>
                Back
              </Button>
              <Button type='button' className='max-h-12 mr-4'>
                Add
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Add
