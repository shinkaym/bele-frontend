import authApi from '@/apis/modules/auth.api'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Forms/Input'
import Loader from '../Loader'

interface INewPasswordProps {
  onCreateNewPasswordSuccess: () => void
  jwt: string
}
interface ModifyPassword {
  type: 'password' | 'text'
  icon: typeof faEye | typeof faEyeSlash
}

const NewPassword: React.FunctionComponent<INewPasswordProps> = ({ jwt, onCreateNewPasswordSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [modifyPassword, setModifyPassword] = useState<ModifyPassword>({
    type: 'password',
    icon: faEyeSlash
  })
  const [modifyConfirmPassword, setModifyConfirmPassword] = useState<ModifyPassword>({
    type: 'password',
    icon: faEyeSlash
  })

  const togglePasswordVisibility = (
    option: ModifyPassword,
    setOption: React.Dispatch<React.SetStateAction<ModifyPassword>>
  ) => {
    const newType = option.type === 'password' ? 'text' : 'password'
    const newIcon = newType === 'password' ? faEyeSlash : faEye

    setOption({
      type: newType,
      icon: newIcon
    })
  }

  const handleModifyPassword = () => {
    togglePasswordVisibility(modifyPassword, setModifyPassword)
  }

  const handleModifyConfirmPassword = () => {
    togglePasswordVisibility(modifyConfirmPassword, setModifyConfirmPassword)
  }
  // Cấu hình Zod schema
  const newPasswordSchema = z
    .object({
      password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
      }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'], // Gắn lỗi vào trường confirmPassword
      message: 'Mật khẩu nhập lại không khớp'
    })

  type newPasswordFormData = z.infer<typeof newPasswordSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<newPasswordFormData>({
    resolver: zodResolver(newPasswordSchema)
  })

  const onSubmit = async (data: newPasswordFormData) => {
    setLoading(true)
    try {
      console.log(data)
      // call api in here...
      const res = await authApi.createNewPassword(data, jwt)
      if (res.status === 200) {
        onCreateNewPasswordSuccess()
      }
    } catch (error) {
      console.log(error)
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='space-y-4 overflow-y-auto'>
        <h1 className='text-3xl font-bold text-center '>Nhập mật khẩu mới</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Controller
              defaultValue=''
              name='password'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='Mật khẩu...'
                  type={modifyPassword.type}
                  error={errors.password?.message}
                  {...field}
                  icon={<FontAwesomeIcon icon={modifyPassword.icon} className='opacity-50 text-xl' />}
                  onIconClick={handleModifyPassword}
                />
              )}
            />
          </div>
          <div className='mb-4'>
            <Controller
              defaultValue=''
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='Nhập lại mật khẩu...'
                  type={modifyConfirmPassword.type}
                  error={errors.confirmPassword?.message}
                  {...field}
                  icon={<FontAwesomeIcon icon={modifyConfirmPassword.icon} className='opacity-50 text-xl' />}
                  onIconClick={handleModifyConfirmPassword}
                />
              )}
            />
          </div>
          <Button type='button' color='black' textColor='white' className='w-full rounded-md py-2 hover:opacity-85'>
            Xác nhận
          </Button>
        </form>
      </div>
      {loading && <Loader type='inside' />}
    </>
  )
}

export default NewPassword
