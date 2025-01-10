import { default as attributeApi, default as attributeValueApi } from '@/apis/modules/attribute.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import Loader from '@/components/common/Loader'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IAttributeType, IAttributeValue, IAttributeValueDetailResponse } from '@/models/interfaces/attribute'
import { IOptions } from '@/models/interfaces/options'
import { UToast } from '@/utils/swal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

type Props = {}

function Edit({}: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [attrValueById, setAttrValueById] = useState<IAttributeValue>(Object)
  const [attributeTypeOptions, setAttributeTypeOptions] = useState<IOptions[]>([])
  const params = useParams()
  const attributeValueId: number = Number(params.id)

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const res: IApiResponse<{ attributeTypes: IAttributeType[] }> = await attributeApi.listAttributeTypes()
        if (res.data && res.status === 200) {
          const data = res.data!.attributeTypes
          let newData: IOptions[] = data.map((cat) => ({
            value: cat.id,
            label: cat.name
          }))
          newData = [
            {
              value: 0,
              label: '---Select Attribute Types---'
            },
            ...newData
          ]
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
  const attributeValueSchema = z.object({
    name: z.string().min(1, { message: 'attributeValue name is required' }), // Bắt buộc nhập tên
    value: z.string().optional(),
    status: z.union([z.number(), z.string()]),
    attributeTypeId: z.union([z.number(), z.string()]).refine((value) => Number(value) !== 0, {
      message: 'Attribute Type is required'
    })
  })

  type attributeValueFormData = z.infer<typeof attributeValueSchema>

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    reset
  } = useForm<attributeValueFormData>({
    resolver: zodResolver(attributeValueSchema)
  })

  const colorValue = watch('value')
  const attributeTypeId = watch('attributeTypeId')
  const status = watch('status')

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true)
      try {
        const res = await attributeValueApi.detail({ id: attributeValueId })
        if (res.data && res.status === 200) {
          const attrValue = res.data.attributeValue
          setAttrValueById(attrValue)
          console.log(attributeTypeOptions.find((attr) => attr.label === attrValue.name)?.value)
          reset({
            name: attrValue.name,
            value: attrValue.value,
            status: attrValue.status,
            attributeTypeId: attrValue.attributeTypeId
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetData()
  }, [])

  useEffect(() => {
    if (attributeTypeId !== 1) resetField('value', { defaultValue: '' }) // Reset trường 'value' về giá trị mặc định
  }, [attributeTypeId])

  useEffect(() => {
    if (status) {
      resetField('status', { defaultValue: status })
    }
  }, [status])

  const onSubmit = async (data: attributeValueFormData) => {
    try {
      //call api in here...
      const res: IApiResponse<IAttributeValueDetailResponse> = await attributeApi.edit(attributeValueId, data)
      if (res.status === 200) {
        UToast(EToastOption.SUCCESS, 'Edit attributeValue Successfully!')
        reset()
      } else {
        UToast(EToastOption.ERROR, 'Edit attributeValue Failure!')
        reset()
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'Edit attributeValue Failure!')
      reset()
    }
    console.log(data) // Dữ liệu khi submit
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        Object.keys(attrValueById).length > 0 && (
          <div className='flex flex-col gap-10'>
            <Breadcrumb
              pageName='Edit Attribute Value'
              parentPageName='Attribute Value'
              parentTo='/tables/attribute-value'
            />
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 '>
              {/* attributeValue Name */}
              <div>
                <Controller
                  name='attributeTypeId'
                  control={control}
                  render={({ field }) => (
                    <SelectGroup
                      value={field.value} // Đồng bộ hóa giá trị
                      onChange={(value) => field.onChange(parseInt(value))} // Chuyển giá trị từ string thành số
                      options={attributeTypeOptions} // Danh sách tùy chọn
                      error={errors.attributeTypeId?.message} // Hiển thị lỗi (nếu có)
                      className='mb-6'
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
                        selectedValue={field.value.toString()}
                        layout='horizontal'
                        onChange={(value: string) => field.onChange(value)}
                      />
                    )}
                  />
                </div>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      label='Name'
                      error={errors.name?.message}
                      {...field} // Truyền tất cả props từ field vào Input
                      placeholder='Enter Category Name'
                      className='border border-gray-300 mb-6'
                    />
                  )}
                />
                <div>
                  <label className='mb-3 block text-black dark:text-white'>Value</label>
                  <div className='space-x-4 flex items-center'>
                    <Controller
                      name='value'
                      control={control}
                      render={({ field }) => (
                        <Input
                          isDisabled={attributeTypeId !== 1}
                          type='color'
                          {...field} // Truyền tất cả props từ field vào Input
                          className='max-w-20 rounded h-12 cursor-pointer'
                        />
                      )}
                    />
                    <Input name='showColorCode' value={colorValue} placeholder='#000000' isDisabled={true} />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-6'>
                <Button type='button' className='max-h-12 mr-4'>
                  Edit
                </Button>
                <Button type='link' to='/tables/attribute-value' color='secondary' className='max-h-12'>
                  Back
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
