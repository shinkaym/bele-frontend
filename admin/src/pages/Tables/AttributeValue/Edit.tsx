import attributeValueApi from '@/apis/modules/attributeValue.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Forms/Input'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import Loader from '@/components/common/Loader'
import { attributeTypeOptions } from '@/models/data/attributeTypeData'
import { statusData } from '@/models/data/statusData'
import { EToastOption } from '@/models/enums/option'
import { IAttributeValue } from '@/models/interfaces/attribute'
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
  const [attributeValueData, setAttributeValueData] = useState<IAttributeValue[]>([])
  const params = useParams()
  const attributeValueId: number = Number(params.attributeValueId)

  // Cấu hình Zod schema
  const attributeValueSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'attributeValue name is required' })
      .refine(
        (name) =>
          !attributeValueData.some((attributeValue) => attributeValue.name.toLowerCase() === name.toLowerCase()),
        {
          message: 'attributeValue name must be unique'
        }
      ), // Bắt buộc nhập tên
    value: z.string().optional(),
    status: z.union([z.number(),z.string()]),
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

  useEffect(() => {
    resetField('value', { defaultValue: '' }) // Reset trường 'value' về giá trị mặc định
  }, [attributeTypeId])

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true)
      try {
        const data = await attributeValueApi.getList()
        setAttributeValueData(data)
        const attrValue = attributeValueApi.getAttrValue(attributeValueId)
        console.log(attrValue);
        if (attrValue) {
          reset({
            name: attrValue.name,
            value:attrValue.value,
            status: attrValue.status,
            attributeTypeId:attrValue.attributeType.id
          })
        }
        //set Option attributeValue Parent
        // let newData: IOptions[] = data
        //   .filter((cat) => !cat.parentName) // Lọc các phần tử không có parentName
        //   .map((cat) => ({
        //     value: cat.id,
        //     label: cat.name
        //   }))
        // newData = [
        //   {
        //     value: 0,
        //     label: '---Select attributeValue---'
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

  const onSubmit = (data: attributeValueFormData) => {
    try {
      //call api in here...

      UToast(EToastOption.SUCCESS, 'Edit attributeValue Successfully!')
      reset()
    } catch (error) {
      UToast(EToastOption.SUCCESS, 'Edit attributeValue Failure!')
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
                      selectedValue={(field.value ?? 0).toString()}
                      layout='horizontal'
                      onChange={(value) => field.onChange(parseInt(value))}
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
                        isDisabled={attributeTypeId !== 1 ? true : false}
                        type='color'
                        {...field} // Truyền tất cả props từ field vào Input
                        placeholder='Enter attributeValue Name'
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
      )}
    </>
  )
}

export default Edit
