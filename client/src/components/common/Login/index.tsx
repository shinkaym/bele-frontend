import authApi from '@/apis/modules/auth.api'
import { IError } from '@/models/interfaces'
import { login } from '@/redux/slices/auh.slice'
import { AppDispatch } from '@/redux/store'
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Forms/Input'
import Loader from '../Loader'
import { fetchCart } from '@/redux/slices/cart.slice'

interface ILoginProps {
  onRegister: () => void
  onForgotPassoword: () => void
  onLoginSuccess: () => void
}

interface ModifyPassword {
  type: 'password' | 'text'
  icon: typeof faEye | typeof faEyeSlash
}

const Login: React.FunctionComponent<ILoginProps> = ({ onRegister, onForgotPassoword, onLoginSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const [modifyPassword, setModifyPassword] = useState<ModifyPassword>({
    type: 'password',
    icon: faEyeSlash
  })

  const handleModifyPassword = () => {
    if (modifyPassword.type === 'password') {
      setModifyPassword({
        type: 'text',
        icon: faEye
      })
    } else {
      setModifyPassword({
        type: 'password',
        icon: faEyeSlash
      })
    }
  }
  // Cấu hình Zod schema
  const loginSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
    })
  })

  type loginFormData = z.infer<typeof loginSchema>

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: loginFormData) => {
    setLoading(true)
    try {
      //call api in here...
      const customer = await authApi.login(data)
      if (customer) {
        dispatch(login(customer))
        dispatch(fetchCart())
        onLoginSuccess()
      }
    } catch (error) {
      const apiError = error as IError
      reset()
      if (apiError.message === "Can't find Account !!") {
        setError('email', { type: 'manual', message: 'Email không tồn tại' })
      } else if (apiError.message === 'Invalid Password !!') {
        setError('password', { type: 'manual', message: 'Mật khẩu không chính xác' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='lg:space-y-4 space-y-3 overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold'>Bele</h1>
          <h3 className='lg:text-2xl md:text-xl sm:text-lg text-base font-medium'>Đăng nhập</h3>
        </div>
        <p className='text-gray-text md:text-base text-sm'>Best Choice For Good Style</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  icon={<FontAwesomeIcon icon={faEnvelope} className='opacity-50 md:text-xl text-lg' />}
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
                  icon={<FontAwesomeIcon icon={modifyPassword.icon} className='opacity-50 md:text-xl text-lg' />}
                  onIconClick={handleModifyPassword}
                />
              )}
            />
          </div>
          <Button type='button' color='black' textColor='white' className='w-full rounded-md md:py-3 py-2.5 hover:opacity-85 md:text-base text-sm'>
            Đăng nhập
          </Button>
        </form>
        <div className='flex items-center justify-between'>
          <button onClick={onRegister} type='button' className='font-medium text-blue-primary  md:text-base text-sm'>
            Đăng ký
          </button>
          <button onClick={onForgotPassoword} type='button' className='font-medium text-blue-primary  md:text-base text-sm'>
            Quên mật khẩu
          </button>
        </div>
      </div>
      {loading && <Loader type='inside' />}
    </>
  )
}

export default Login
