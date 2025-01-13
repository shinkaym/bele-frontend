import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Forms/Input'
import authApi from '@/apis/modules/auth.api'
import { IError } from '@/models/interfaces'
import Loader from '../Loader'

interface IRegisterProps {
  onLogin: () => void
  onRegisterSuccess: () => void
}

interface ModifyPassword {
  type: 'password' | 'text'
  icon: typeof faEye | typeof faEyeSlash
}

const Register: React.FunctionComponent<IRegisterProps> = ({ onLogin, onRegisterSuccess }) => {
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
  const RegisterSchema = z
    .object({
      email: z.string().email({ message: 'Email không hợp lệ' }),
      password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
      }),
      confirmPassword: z.string(),
      fullName: z.string().min(1, { message: 'Họ tên không được để trống' }),
      phoneNumber: z.string().regex(/^(0[3-9])[0-9]{8}$/, {
        message: 'Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10 chữ số'
      })
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'], // Gắn lỗi vào trường confirmPassword
      message: 'Mật khẩu nhập lại không khớp'
    })

  type RegisterFormData = z.infer<typeof RegisterSchema>

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      // call api in here...
      const res = await authApi.register(data)
      if (res.data) {
        onRegisterSuccess()
      }
    } catch (error) {
      const apiError = error as IError
      reset()
      console.log(apiError)
      if (apiError.status === 400) {
        if (apiError.message === 'Email is exist. !') {
          setError('email', { type: 'manual', message: 'Email đã tồn tại' })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='space-y-4 overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='text-5xl font-semibold'>Bele</h1>
          <h3 className='text-2xl font-medium'>Đăng ký</h3>
        </div>
        <p className='text-gray-text text-sm'>Best Choice For Good Style</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 flex  justify-between gap-4'>
            <Controller
              name='fullName'
              control={control}
              defaultValue=''
              render={({ field }) => <Input placeholder='Họ và tên...' error={errors.fullName?.message} {...field} />}
            />
            <Controller
              name='phoneNumber'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input placeholder='Số điện thoại...' error={errors.phoneNumber?.message} {...field} />
              )}
            />
          </div>
          <div className='mb-4'>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input
                  placeholder='Email...'
                  type='email'
                  error={errors.email?.message}
                  {...field}
                  icon={<FontAwesomeIcon icon={faEnvelope} className='opacity-50 text-xl' />}
                />
              )}
            />
          </div>

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
          <Button type='button' color='black' textColor='white' className='w-full rounded-md py-3 hover:opacity-85'>
            Đăng ký
          </Button>
        </form>
        <div className='flex items-center justify-between'>
          <button onClick={onLogin} type='button' className='font-medium text-blue-primary'>
            Đăng nhập
          </button>
        </div>
      </div>
      {loading && <Loader type='inside' />}
    </>
  )
}

export default Register
