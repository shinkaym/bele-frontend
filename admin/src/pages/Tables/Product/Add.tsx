import attributeApi from '@/apis/modules/attribute.api'
import categoryApi from '@/apis/modules/categoy.api'
import discountApi from '@/apis/modules/discount.api'
import productApi from '@/apis/modules/product.api'
import tagApi from '@/apis/modules/tag.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import CheckboxGroup from '@/components/common/Forms/CheckboxGroup'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import ImageUpload from '@/components/common/ImageUpload'
import Loader from '@/components/common/Loader'
import TinyMCEEditor from '@/components/common/TinyMCEEditor'
import { discountOption } from '@/models/data/discountData'
import { statusData } from '@/models/data/statusData'
import { EFieldByValue, EToastOption } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IAttributeType } from '@/models/interfaces/attribute'
import { IOptions } from '@/models/interfaces/options'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

function Add({}: Props) {
  const [loading, setLoading] = useState(false)
  const [initialImageUrl, setInitialImageUrl] = useState<string>('')
  const [categoryOptions, setCategoryOptions] = useState<IOptions[]>([])
  const [discountOptions, setDisCountOptions] = useState<IOptions[]>([])
  const [tagOptions, setTagOptions] = useState<IOptions[]>([])
  const [attributeTypeOptions, setAttributeTypeOptions] = useState<IOptions[]>([])

  //Get categories
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await categoryApi.list({ field: EFieldByValue.REFERENCE_CATEGORY_ID, query: '1' })
        if (res.data && res.status === 200) {
          const data = res.data!.categories
          let newData: IOptions[] = data.map((cat) => ({
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
          console.log(newData)
          setCategoryOptions(newData) // Cập nhật dữ liệu
        }
        setLoading(false) // Tắt trạng thái loading
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }
    fetchApi()
  }, [])

  //Get discount
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await discountApi.list({})
        if (res.data && res.status === 200) {
          const data = res.data!.discounts
          let newData: IOptions[] = data.map((cat) => ({
            value: cat.id,
            label: cat.name
          }))
          newData = [
            {
              value: 0,
              label: '---Select Discount---'
            },
            ...newData
          ]
          console.log(newData)
          setDisCountOptions(newData) // Cập nhật dữ liệu
        }
        setLoading(false) // Tắt trạng thái loading
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }
    fetchApi()
  }, [])

  //Get tag
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res = await tagApi.list()
        if (res.data && res.status === 200) {
          const data = res.data!.tags
          let newData: IOptions[] = data.map((cat) => ({
            value: cat.id,
            label: cat.name
          }))
          console.log(newData)
          setTagOptions(newData) // Cập nhật dữ liệu
        }
        setLoading(false) // Tắt trạng thái loading
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }
    fetchApi()
  }, [])

    //Get attrtypes
    useEffect(() => {
      const fetchApi = async () => {
        setLoading(true) // Bật trạng thái loading
        try {
          const res:IApiResponse<{ attributeTypes: IAttributeType[] }> = await attributeApi.listAttributeTypes()
          if (res.data && res.status === 200) {
            const data = res.data!.attributeTypes
            let newData: IOptions[] = data.map((cat) => ({
              value: cat.id,
              label: cat.name
            }))
            console.log(newData)
            setAttributeTypeOptions(newData) // Cập nhật dữ liệu
          }
          setLoading(false) // Tắt trạng thái loading
        } catch (error) {
          console.error('Error fetching images:', error)
          setLoading(false)
        }
      }
      fetchApi()
    }, [])

  // Cấu hình Zod schema
  const productSchema = z.object({
    name: z.string().min(1, { message: 'Product name is required' }),
    basePrice: z.union([z.number(), z.string()]).refine((value) => Number(value) > 0, {
      message: 'Base price must be greater than 0'
    }),
    categoryId: z.union([z.number(), z.string()]).refine((value) => Number(value) !== 0, {
      message: 'Category is required'
    }),
    discountId: z.union([z.number(), z.string()]).refine((value) => Number(value) !== 0, {
      message: 'Discount is required'
    }), // Giá trị mặc định là 0
    status: z.union([z.number(), z.string()]),
    productFile: z
      .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
      .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
      .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
    attributeTypes: z.array(z.string()),
    tags: z.array(z.string()),
    description: z.string()
  })

  type productFormData = z.infer<typeof productSchema>

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<productFormData>({
    resolver: zodResolver(productSchema)
  })

  const imgUrl = watch('productFile')

  useEffect(() => {
    if (!imgUrl) {
      setInitialImageUrl('')
    }
  }, [imgUrl])
  const onSubmit = async (data: productFormData) => {
    try {
      setLoading(true) // Bật trạng thái loading
      const formData = new FormData()

      // Thêm dữ liệu vào formData
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Nếu là mảng, thêm từng phần tử với cùng tên trường
          value.forEach((item) => formData.append(key, item.toString()))
        } else if (key === 'productFile' && value instanceof File) {
          // Kiểm tra và thêm file nếu tồn tại
          formData.append(key, value)
        } else {
          formData.append(key, value as string | Blob)
        }
      })

      // Gọi API để thêm sản phẩm
      const response = await productApi.add(formData)

      if (response && response.status === 200) {
        UToast(EToastOption.SUCCESS, 'Add Product Successfully!')
        reset() // Reset form
      } else {
        UToast(EToastOption.ERROR, 'Add Product Failure!')
      }
    } catch (error) {
      console.error('Error submitting product:', error)
      UToast(EToastOption.ERROR, 'An error occurred while adding the product!')
    } finally {
      setLoading(false) // Tắt trạng thái loading
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        categoryOptions.length > 0 &&
        discountOption.length > 0 &&
        tagOptions.length > 0 && (
          <div className='flex flex-col gap-10'>
            <Breadcrumb pageName='Add Product' parentPageName='Product' parentTo='/tables/product' />

            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
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
                    name='productFile'
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        {...field} // Truyền các props của field vào ImageUpload
                        label='Upload Image'
                        error={errors.productFile?.message} // Hiển thị lỗi nếu có
                        onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                        initialImageUrl={initialImageUrl}
                        setInitialImageUrl={setInitialImageUrl}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* Category */}
                  <Controller
                    name='categoryId'
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <SelectGroup
                        value={field.value} // Đồng bộ hóa giá trị
                        onChange={(value) => field.onChange(value)} // Chuyển giá trị từ string thành số
                        options={categoryOptions} // Danh sách tùy chọn
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
                        options={discountOptions} // Danh sách tùy chọn
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
                    name='attributeTypes'
                    control={control}
                    defaultValue={[]}
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
                  {/* Tags */}
                  <Controller
                    name='tags'
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <CheckboxGroup
                        {...field}
                        label='Tag'
                        options={tagOptions}
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
                  Add
                </Button>
              </div>
            </form>
          </div>
        )
      )}
    </>
  )
}

export default Add
