import AuthContext from '@/context/Auth/AuthContext'
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Forms/Input'
import authApi from '@/apis/modules/auth.api'

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

  const authMethod = useContext(AuthContext)

  const onSubmit = async (data: loginFormData) => {
    try {
      console.log(data)
      //call api in here...
      const customer = await authApi.login(data)
      if (customer) {
        authMethod?.login(customer)
        onLoginSuccess()
      }
    } catch (error) {
      console.log(error)
      reset()
      setError('password', { type: 'manual', message: 'Email hoặc mật khẩu không đúng' })
    }
  }

  return (
    <>
      <div className='space-y-4 overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='text-5xl font-semibold'>Bele</h1>
          <h3 className='text-2xl font-medium'>Đăng nhập</h3>
        </div>
        <p className='text-gray-text text-sm'>Best Choice For Good Style</p>
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
          <Button type='button' color='black' textColor='white' className='w-full rounded-md py-3 hover:opacity-85'>
            Đăng nhập
          </Button>
        </form>
        <div className='flex items-center justify-between'>
          <button onClick={onRegister} type='button' className='font-medium text-blue-primary'>
            Đăng ký
          </button>
          <button onClick={onForgotPassoword} type='button' className='font-medium text-blue-primary'>
            Quên mật khẩu
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
