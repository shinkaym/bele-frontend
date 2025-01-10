import attributeApi from '@/apis/modules/attribute.api'
import productApi from '@/apis/modules/product.api'
import variantApi from '@/apis/modules/variant.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IOptions } from '@/models/interfaces/options'
import { IProduct } from '@/models/interfaces/product'
import { IVariant, IVariantDetailResponse } from '@/models/interfaces/variant'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
type Props = {}

function Edit({}: Props) {
  const [loading, setLoading] = useState(false)
  const [sizeOptions, setSizeOptions] = useState<IOptions[]>([])
  const [colorOptions, setColorOptions] = useState<IOptions[]>([])
  const [productById, setProductById] = useState<IProduct>(Object)

  const [variantById, setVariantById] = useState<IVariant>(Object)
  const [searchParams] = useSearchParams()
  const params = useParams()

  const productId: number = Number(searchParams.get('productId'))
  const variantId: number = Number(params.id)

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await attributeApi.listAttributeValues({ query: '1', field: 'AttributeTypeId' })
        if (res.data && res.status === 200) {
          const data = res.data!.attributeValues
          let newData: IOptions[] = data.map((attr) => ({
            value: attr.id,
            label: attr.name
          }))
          newData = [
            {
              value: 0,
              label: '---Select Color---'
            },
            ...newData
          ]
          setColorOptions(newData) // Cập nhật dữ liệu
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await attributeApi.listAttributeValues({ query: '2', field: 'AttributeTypeId' })
        if (res.data && res.status === 200) {
          const data = res.data!.attributeValues
          let newData: IOptions[] = data.map((attr) => ({
            value: attr.id,
            label: attr.name
          }))
          newData = [
            {
              value: 0,
              label: '---Select Size---'
            },
            ...newData
          ]
          console.log(newData)
          setSizeOptions(newData) // Cập nhật dữ liệu
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await productApi.detail({ id: productId })
        if (res.data && res.status === 200) {
          const data = res.data!.product
          setProductById(data) // Cập nhật dữ liệu
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res:IApiResponse<IVariantDetailResponse> = await variantApi.detail({id:variantId})
        if (res.data && res.status === 200) {
          const variant = res.data.variant
          setVariantById(variant)
          reset({
            status: variant.status,
            price: variant.price,
            stock: variant.stock,
            colorId:variant.attributeValues.find(val => val.attributeTypeId === 1)?.id,
            sizeId:variant.attributeValues.find(val => val.attributeTypeId === 2)?.id
          })
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      }finally{
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
    status: z.union([z.number(), z.string()]),
    variantFile: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    colorId: z.union([z.number(), z.string()]),
    sizeId: z.union([z.number(), z.string()])
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

  const onSubmit = async(data: variantFormData) => {
    try {
      const formData = new FormData();

      // Tạo mảng AttributeValueId từ sizeId và colorId
      const attributeValueId = [Number(data.sizeId), Number(data.colorId)];
  
      // Xóa sizeId và colorId khỏi dữ liệu ban đầu
      const { sizeId, colorId, ...restData } = data;
  
      // Thêm dữ liệu còn lại vào formData
      Object.entries(restData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Nếu là mảng, thêm từng phần tử với cùng tên trường
          value.forEach((item) => formData.append(key, item.toString()));
        } else if (key === 'variantFile' && value instanceof File) {
          // Kiểm tra và thêm file nếu tồn tại
          formData.append(key, value);
        } else {
          formData.append(key, value as string | Blob);
        }
      });
  
      // Thêm từng phần tử trong mảng AttributeValueId vào formData
      attributeValueId.forEach((id) => {
        formData.append('AttributeValueId', id.toString());
      });
  
      console.log('FormData to submit:', Array.from(formData.entries())); // Debug log

      const response = await variantApi.edit(variantId,formData);

      if (response && response.status === 200) {
        UToast(EToastOption.SUCCESS, 'Edit Variant Successfully!')
        reset() // Reset form
      } else {
        UToast(EToastOption.ERROR, 'Edit Variant Failure!')
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'Edit variant Failure!')
      reset()
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        Object.keys(variantById).length > 0 && Object.keys(productById).length > 0 && (
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
                    name='variantFile'
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        {...field} // Truyền các props của field vào ImageUpload
                        label='Upload Image'
                        error={errors.variantFile?.message} // Hiển thị lỗi nếu có
                        onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                        initialImageUrl={variantById.thumbnail}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* Color */}
                  <Controller
                    name='colorId'
                    control={control}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value ?? 0} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={colorOptions} // Danh sách tùy chọn
                        label='Color'
                        className='mb-6'
                        isDisabled={productById?.attributeTypes?.some((attr) => attr.id === 1) ? false : true}
                      />
                    )}
                  />
                  {/* Color */}
                  <Controller
                    name='sizeId'
                    control={control}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value ?? 0} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={sizeOptions} // Danh sách tùy chọn
                        label='Size'
                        className='mb-6'
                        isDisabled={productById?.attributeTypes?.some((attr) => attr.id === 2) ? false : true}
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
