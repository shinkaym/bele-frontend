import productApi from '@/apis/modules/product.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import CheckboxGroup from '@/components/common/Forms/CheckboxGroup'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import TinyMCEEditor from '@/components/common/TinyMCEEditor'
import { attributeTypeOptions } from '@/models/data/attributeTypeData'
import { categoryChildOption } from '@/models/data/categoryData'
import { discountOption } from '@/models/data/discountData'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
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
  const [productById, setProductById] = useState<IProduct>(Object)
  const params = useParams()
  const productId: number = Number(params.id)

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const data = await productApi.getList()
        setProductData(data)
        const product = productApi.getProductById(productId)
        console.log(product)
        if (product) {
          setProductById(product)
          console.log(product.status)
          reset({
            name: product.name,
            basePrice: product.basePrice,
            status: product.status,
            categoryId: product.category.id,
            discountId: product?.discount.id,
            description: product?.description,
            attributeType: product?.attributeType.map((attr) => attr.id.toString())
          })
          setLoading(false) // Tắt trạng thái loading
        }
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }
    handleGetData()
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
    thumbnail: z.union([z
      .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
      .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
        z.null().optional()
    ]),
    attributeType: z.array(z.string()),
    description: z.string()
  })

  type productFormData = z.infer<typeof productSchema>

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    reset
  } = useForm<productFormData>({
    resolver: zodResolver(productSchema)
  })

  const status = watch('status')

  useEffect(()=>{
    if(status){
      resetField('status',{ defaultValue: status })
    }
  },[status])

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
      ) : Object.keys(productById).length > 0 && (
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
                      initialImageUrl={productById.thumbnail}
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
                      options={categoryChildOption} // Danh sách tùy chọn
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
                  render={({ field }) => (
                    <CheckboxGroup
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
              <Button type='link' to='/tables/product' color='secondary' className='max-h-12'>
                Back
              </Button>
              <Button type='button' className='max-h-12 mr-4'>
                Edit
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Add
