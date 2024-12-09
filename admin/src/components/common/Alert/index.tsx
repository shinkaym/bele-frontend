import { DangerIcon, SuccessIcon, WarningIcon } from '@/components/icons'

interface AlertProps {
  type: 'warning' | 'success' | 'danger' // Loại alert
  title: string // Tiêu đề
  message: string // Nội dung
  className?: string // Custom class
}

const Alert = ({ type, title, message, className }: AlertProps) => {
  const typeStyles = {
    warning: {
      borderColor: 'border-warning',
      bgColor: 'bg-warning',
      titleColor: 'text-[#9D5425]',
      messageColor: 'text-[#D0915C]',
      icon: <WarningIcon />
    },
    success: {
      borderColor: 'border-[#34D399]',
      bgColor: 'bg-[#34D399]',
      titleColor: 'text-black dark:text-[#34D399]',
      messageColor: 'text-body',
      icon: <SuccessIcon />
    },
    danger: {
      borderColor: 'border-[#F87171]',
      bgColor: 'bg-[#F87171]',
      titleColor: 'text-[#B45454]',
      messageColor: 'text-[#CD5D5D]',
      icon: <DangerIcon />
    }
  }

  const styles = typeStyles[type]

  return (
    <div className='fixed top-3 right-3 z-99999'>
      <div
        className={`${className} backdrop-blur-md flex w-full border-l-6 ${styles.bgColor} ${styles.borderColor} bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9`}
      >
        <div className={`mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-opacity-30 ${styles.bgColor}`}>
          {styles.icon}
        </div>
        <div className='w-full'>
          <h5 className={`mb-3 text-lg font-semibold ${styles.titleColor}`}>{title}</h5>
          <p className={`leading-relaxed ${styles.messageColor}`}>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
