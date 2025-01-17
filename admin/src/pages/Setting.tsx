import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import Button from '@/components/common/Button'
import settingApi from '@/apis/modules/setting.api'
import { ISetting } from '@/models/interfaces/setting'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IApiResponse } from '@/models/interfaces/api'
import Input from '@/components/common/Forms/Input'
import Textarea from '@/components/common/Textarea'
import ImageUpload from '@/components/common/ImageUpload'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'

type FormData = {
  hotline: string
  email: string
  slogan: string
  description?: string
  branchName1: string
  branchAddress1: string
  branchName2: string
  branchAddress2: string
  facebookLink: string
  instagramLink: string
  youtubeLink: string
}

const Setting = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [existingSettings, setExistingSettings] = useState<ISetting>(Object)

  const settingSchema = z.object({
    mainLogo: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    sloganLogo: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    slogan: z.string(),
    hotline: z.string(),
    email: z.string().email(),
    branchName1: z.string(),
    branchAddress1: z.string(),
    branchName2: z.string(),
    branchAddress2: z.string(),
    facebookLink: z.string().url(),
    instagramLink: z.string().url(),
    youtubeLink: z.string().url(),
    mainBanner: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    subBanner1: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    subBanner2: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    slideshowBanner1: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    slideshowBanner2: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    slideshowBanner3: z.union([
      z
        .instanceof(File) // Kiểm tra xem trường này có phải là một instance của File hay không
        .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image' }) // Kiểm tra định dạng file ảnh
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB' }), // Kiểm tra kích thước file
      z.null().optional()
    ]),
    description: z.string(),
    serviceTitle1: z.string(),
    serviceInfo1: z.string(),
    serviceTitle2: z.string(),
    serviceInfo2: z.string(),
    serviceTitle3: z.string(),
    serviceInfo3: z.string(),
    serviceTitle4: z.string(),
    serviceInfo4: z.string()
  })
  type settingFormData = z.infer<typeof settingSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<settingFormData>({
    resolver: zodResolver(settingSchema)
  })

  const onSubmit = async (data:settingFormData) => {
    setLoading(true)
    try {
      const {
        mainLogo,
        sloganLogo,
        mainBanner,
        subBanner1,
        subBanner2,
        slideshowBanner1,
        slideshowBanner2,
        slideshowBanner3,
        ...rest // Chứa các trường còn lại không phải file
      } = data;
  
      // Tạo FormData và thêm các file
      const formData = new FormData();
      const fileFields = {
        mainLogo,
        sloganLogo,
        mainBanner,
        subBanner1,
        subBanner2,
        slideshowBanner1,
        slideshowBanner2,
        slideshowBanner3,
      };
  
      Object.entries(fileFields).forEach(([key, file]) => {
        if (file instanceof File) {
          formData.append(key, file);
        }
      });
  
      // Gửi params qua query hoặc body JSON
      const params = { ...rest };
      const res = await settingApi.updateSettings(params,formData)
      
      if(res.data && res.status === 200){
        setExistingSettings(res.data.setting)
        reset({
          ...rest
        }) // Reset form với dữ liệu từ API
        UToast(EToastOption.SUCCESS, 'Chỉnh sửa thông tin hệ thống thành công!')
      }
    } catch (error) {
      console.error('Failed to update settings:', error)
      UToast(EToastOption.SUCCESS, 'Chỉnh sửa thông tin hệ thống thất bại!')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const response: IApiResponse<{ setting: ISetting }> = await settingApi.fetchSettings()
        if (response.data && response.status === 200) {
          setExistingSettings(response.data.setting)
          const {
            mainLogo,
            sloganLogo,
            mainBanner,
            subBanner1,
            subBanner2,
            slideshowBanner1,
            slideshowBanner2,
            slideshowBanner3,
            ...rest
          } = response.data.setting
          reset({
            ...rest
          }) // Reset form với dữ liệu từ API
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error)
        alert('Failed to fetch settings.')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  if (loading) return <Loader />

  return (
    <div className='mx-auto max-w-270'>
      <Breadcrumb pageName='Settings' />
      {loading ? (
        <Loader />
      ) : (
        Object.keys(existingSettings).length > 0 && (
          <div className='col-span-5 xl:col-span-3'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='rounded-sm border bg-white p-6 shadow-default dark:bg-boxdark'
            >
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>General Information</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Email'
                          error={errors.email?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Email...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='slogan'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Slogan'
                          error={errors.slogan?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Slogan...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='hotline'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Hotline'
                          error={errors.hotline?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Hotline...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label='Description'
                      error={errors.description?.message}
                      {...field} // Truyền tất cả props từ field vào Input
                      placeholder='Description...'
                      className='border border-gray-300'
                    />
                  )}
                />
              </div>
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>Services</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Controller
                      name='serviceTitle1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Service Title 1'
                          error={errors.serviceTitle1?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Title 1...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='serviceInfo1'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Service Information 1'
                          error={errors.serviceInfo1?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Information 1...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                    <Controller
                      name='serviceTitle2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Service Title 2'
                          error={errors.serviceTitle2?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Title 2...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='serviceInfo2'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Service Information 2'
                          error={errors.serviceInfo2?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Information 2...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='serviceTitle3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Service Title 3'
                          error={errors.serviceTitle3?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Title 3...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='serviceInfo3'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Service Information 3'
                          error={errors.serviceInfo3?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Information 3...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                    <Controller
                      name='serviceTitle4'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Service Title 4'
                          error={errors.serviceTitle4?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Title 4...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='serviceInfo4'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Service Information 4'
                          error={errors.serviceInfo4?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Service Information 4...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>Address</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Controller
                      name='branchName1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Branch Name 1'
                          error={errors.branchName1?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Branch Name 1...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='branchAddress1'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Branch Address 1'
                          error={errors.branchAddress1?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Branch Address 1...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='branchName2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Branch Name 2'
                          error={errors.branchName2?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Branch Name 2...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='branchAddress2'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Branch Name 2'
                          error={errors.branchAddress2?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Branch Name 2...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>Social</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Controller
                      name='facebookLink'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Facebook Link'
                          error={errors.facebookLink?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Facebook Link...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                    <Controller
                      name='instagramLink'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          label='Instagram Link'
                          error={errors.instagramLink?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Instagram Link...'
                          className='border border-gray-300'
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='youtubeLink'
                      control={control}
                      render={({ field }) => (
                        <Input
                          label='Youtube Link'
                          error={errors.youtubeLink?.message}
                          {...field} // Truyền tất cả props từ field vào Input
                          placeholder='Youtube Link...'
                          className='border border-gray-300 mb-4'
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>Logo</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <Controller
                    name='mainLogo'
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        {...field} // Truyền các props của field vào ImageUpload
                        label='Main Logo'
                        error={errors.mainLogo?.message} // Hiển thị lỗi nếu có
                        onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                        initialImageUrl={existingSettings.mainLogo}
                      />
                    )}
                  />
                  <Controller
                    name='sloganLogo'
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        {...field} // Truyền các props của field vào ImageUpload
                        label='Slogan Logo'
                        error={errors.sloganLogo?.message} // Hiển thị lỗi nếu có
                        onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                        initialImageUrl={existingSettings.sloganLogo}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-xl font-bold mb-4'>Banner</h2>
                <div className='grid md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <Controller
                      name='slideshowBanner1'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Slideshow Banner 1'
                          error={errors.slideshowBanner1?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.slideshowBanner1}
                        />
                      )}
                    />
                    <Controller
                      name='slideshowBanner2'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Slideshow Banner 2'
                          error={errors.slideshowBanner2?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.slideshowBanner2}
                        />
                      )}
                    />
                    <Controller
                      name='slideshowBanner3'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Slideshow Banner 3'
                          error={errors.slideshowBanner3?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.slideshowBanner3}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name='mainBanner'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Main Banner'
                          error={errors.mainBanner?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.mainBanner}
                        />
                      )}
                    />
                    <Controller
                      name='subBanner1'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Sub Banner 1'
                          error={errors.subBanner1?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.subBanner1}
                        />
                      )}
                    />
                    <Controller
                      name='subBanner2'
                      control={control}
                      render={({ field }) => (
                        <ImageUpload
                          {...field} // Truyền các props của field vào ImageUpload
                          label='Sub Banner 2'
                          error={errors.subBanner2?.message} // Hiển thị lỗi nếu có
                          onChange={(file) => field.onChange(file)} // Cập nhật giá trị khi file thay đổi
                          initialImageUrl={existingSettings.subBanner2}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-6'>
                <Button type='button' className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded'>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  )
}

export default Setting
