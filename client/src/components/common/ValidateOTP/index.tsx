import authApi from '@/apis/modules/auth.api'
import maskEmail from '@/utils/maskEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import CountDownTimer from '../CountDownTimer'
import OTPInput from '../Forms/OTPInput'

interface IValidateOTPProps {
  email: string
  onValidateOTPSuccess: (jwt: string) => void
}

const ValidateOTP: React.FunctionComponent<IValidateOTPProps> = ({ onValidateOTPSuccess, email }) => {
  const timeCountDownOTP = import.meta.env.VITE_TIME_COUNT_DOWN_OTP
  // Cấu hình Zod schema
  const validateOTPSchema = z.object({
    otp: z
      .string()
      .length(4, { message: 'OTP phải có đúng 4 ký tự' })
      .regex(/^\d+$/, { message: 'OTP chỉ được chứa số' }),
    email: z.string()
  })

  type validateOTPFormData = z.infer<typeof validateOTPSchema>

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    reset
  } = useForm<validateOTPFormData>({
    resolver: zodResolver(validateOTPSchema),
    defaultValues: {
      email: email,
      otp: ''
    }
  })
  const otp = watch('otp')
  console.log(otp)

  const handleResendOtp = async () => {
    try {
      console.log('Resend email:', email)
      // call api in here...
      const res = await authApi.getOTP(email)
      if (res.status === 200) {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: validateOTPFormData) => {
    try {
      console.log(data)
      // call api in here...
      const res = await authApi.validateOTP(data)
      if (res.status === 200) {
        onValidateOTPSuccess(res.data!.jwt)
      }
    } catch (error) {
      console.log(error)
      reset()
      setError('otp', { type: 'manual', message: 'Otp không chính xác' })
    }
  }

  return (
    <>
      <div className='space-y-4 overflow-y-auto'>
        <h1 className='text-2xl font-bold text-center '>Xác thực OTP</h1>
        <p className='text-center text-sm'>Vui lòng nhập mã OTP được gửi về Email</p>
        <p className='text-sm text-center'>
          <span className='text-blue-primary'>{maskEmail(email)}</span> để truy cập nhé
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 flex items-center justify-center'>
            <Controller
              name='otp'
              control={control}
              defaultValue=''
              render={({ field }) => <OTPInput {...field} length={4} error={errors.otp?.message} />}
            />
          </div>
          <div className='mb-2 flex justify-end'>
            <CountDownTimer timeCountDown={timeCountDownOTP} title='Gửi lại OTP sau' onClick={handleResendOtp} />
          </div>
          <button
            type={`${otp.length === 4 ? 'submit' : 'button'}`}
            className={`w-full rounded-md py-2 text-white bg-black ${otp.length === 4 ? 'hover:opacity-85' : 'cursor-not-allowed opacity-50'}`}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </>
  )
}

export default ValidateOTP
