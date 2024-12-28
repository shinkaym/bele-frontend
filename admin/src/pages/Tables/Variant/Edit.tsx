import productApi from '@/apis/modules/product.api'
import variantApi from '@/apis/modules/variant.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import { attributeColorValueOptionsData, attributeSizeValueOptionsData } from '@/models/data/attributeTypeData'
import { productOptionsData } from '@/models/data/productData'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IOptions } from '@/models/interfaces/options'
import { IProduct } from '@/models/interfaces/product'
import { IVariant } from '@/models/interfaces/variant'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
type Props = {}

function Edit({}: Props) {
  const [loading, setLoading] = useState(false)
  const [productOptions, setProductOptions] = useState<IOptions[]>([])
  const [sizeOptions, setSizeOptions] = useState<IOptions[]>([])
  const [colorOptions, setColorOptions] = useState<IOptions[]>([])
  const [productById, setProductById] = useState<IProduct>(Object)
  const [variantById, setVariantById] = useState<IVariant>(Object)
  const params = useParams()
  const variantId: number = Number(params.id)

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        setProductOptions(productOptionsData)
        console.log(variantId)
        const variant = await variantApi.getVariantById(variantId)
        if (variant) {
          setVariantById(variant)
          reset({
            status: variant.status,
            price: variant.price,
            stock: variant.stock,
            productId: variant.product.id,
            variantAttributeValue: {
              color: variant?.variantAttributeValue?.color?.id,
              size: variant?.variantAttributeValue?.size?.id
            }
          })
        }
        setSizeOptions([
          {
            value: 0,
            label: '---Select Size---'
          },
          ...attributeSizeValueOptionsData
        ])
        setColorOptions([
          {
            value: 0,
            label: '---Select Color---'
          },
          ...attributeColorValueOptionsData
        ])
        setLoading(false) // Tắt trạng thái loading
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  // Cấu hình Zod schema
  const variantSchema = z.object({
    price: z.union([z.number(), z.string()]).refine((value) => Number(value) > 0, {
      message: 'Price must be greater than 0'
    }),
    stock: z.union([z.number(), z.string()]).refine((value) => Number(value) > 0, {
      message: 'Price must be greater than 0'
    }),
    productId: z.union([z.number(), z.string()]),
    status: z.union([z.number(), z.string()]),
    thumbnail: z.union([z
      .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
      .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
        z.null().optional()
    ]),
    variantAttributeValue: z
      .object({
        color: z.union([z.number(), z.string()]).optional(),
        size: z.union([z.number(), z.string()]).optional()
      })
      .optional()
  })

  type variantFormData = z.infer<typeof variantSchema>

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    reset
  } = useForm<variantFormData>({
    resolver: zodResolver(variantSchema)
  })

  const productId = watch('productId')

  useEffect(() => {
    const handleGetDataProduct = async () => {
      if (productId) {
        setLoading(true)
        const data = await productApi.getProductById(Number(productId))
        if (data) {
          if(!data.attributeType.some(attr => attr.id === 1)){
            resetField('variantAttributeValue.color',{defaultValue:0})
          }
          if(!data.attributeType.some(attr => attr.id === 2)){
            resetField('variantAttributeValue.size',{defaultValue:0})
          }
          setProductById(data)
        }
        setLoading(false)
      }
    }
    handleGetDataProduct()
  }, [productId])

  const onSubmit = (data: variantFormData) => {
    try {
      //call api in here...
      UToast(EToastOption.SUCCESS, 'Edit variant Successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.SUCCESS, 'Edit variant Failure!')
      reset()
    }
    console.log('Data',data) // Dữ liệu khi submit
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        Object.keys(variantById).length > 0 && (
          <div className='flex flex-col gap-10'>
            <Breadcrumb pageName='Edit Variant' parentPageName='Variant' parentTo='/tables/variant' />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  {/*Price */}
                  <Controller
                    name='stock'
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='number'
                        label='Stock'
                        error={errors.stock?.message}
                        {...field} // Truyền tất cả props từ field vào Input
                        placeholder='Enter Stock'
                        className='border border-gray-300 mb-6'
                      />
                    )}
                  />
                  {/*Price */}
                  <Controller
                    name='price'
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='number'
                        label='Price'
                        error={errors.price?.message}
                        {...field} // Truyền tất cả props từ field vào Input
                        placeholder='Enter Price'
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
                        initialImageUrl={variantById.thumbnail}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* Category */}
                  <Controller
                    name='productId'
                    control={control}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={productOptions} // Danh sách tùy chọn
                        label='Product'
                        className='mb-6'
                        error={errors.productId?.message} // Hiển thị lỗi (nếu có)
                      />
                    )}
                  />
                  {/* Color */}
                  <Controller
                    name='variantAttributeValue.color'
                    control={control}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value ?? 0} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={colorOptions} // Danh sách tùy chọn
                        label='Color'
                        className='mb-6'
                        isDisabled={productById?.attributeType?.some((attr) => attr.id === 1) ? false : true}
                      />
                    )}
                  />
                  {/* Color */}
                  <Controller
                    name='variantAttributeValue.size'
                    control={control}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value ?? 0} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={sizeOptions} // Danh sách tùy chọn
                        label='Size'
                        className='mb-6'
                        isDisabled={productById?.attributeType?.some((attr) => attr.id === 2) ? false : true}
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
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <Button type='link' to='/tables/variant' color='secondary' className='max-h-12'>
                  Back
                </Button>
                <Button type='button' className='max-h-12 mr-4'>
                  Edit
                </Button>
              </div>
            </form>
          </div>
        )
      )}
    </>
  )
}

export default Edit
