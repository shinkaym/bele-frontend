import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Forms/Input'
import authApi from '@/apis/modules/auth.api'
import { useState } from 'react'
import Loader from '../Loader'

interface IForgotPasswordProps {
  onGetOTPSuccess: (email: string) => void
}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = ({ onGetOTPSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false)
  // Cấu hình Zod schema
  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ' })
  })

  type forgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: forgotPasswordFormData) => {
    setLoading(true)
    try {
      console.log(data)
      // call api in here...
      const res = await authApi.getOTP(data.email)
      if (res.status === 200) {
        onGetOTPSuccess(data.email)
      }
    } catch (error) {
      console.log(error)
      reset()
      setError('email', { type: 'manual', message: 'Email không tồn tại' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='lg:space-y-4 space-y-3 overflow-y-auto'>
        <h1 className='lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-center '>Cấp lại mật khẩu</h1>
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
                  icon={<FontAwesomeIcon icon={faEnvelope} className='md:text-xl text-lg opacity-50' />}
                />
              )}
            />
          </div>
          <Button type='button' color='black' textColor='white' className='w-full rounded-md py-2 hover:opacity-85 md:text-base text-sm'>
            Kiểm tra
          </Button>
        </form>
      </div>
      {loading && <Loader type='inside'/>}
    </>
  )
}

export default ForgotPassword
