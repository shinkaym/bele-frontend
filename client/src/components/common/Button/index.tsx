import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  type?: 'button' | 'link' | 'a' // Loại phần tử
  to?: string // Đường dẫn cho link/a
  variant?: 'primary' | 'outline' // Loại button
  color?: string // Màu tùy chỉnh
  textColor?: string
  children: React.ReactNode // Nội dung của button
  className?: string // Lớp CSS tùy chỉnh
  onClick?: (value?: string) => void // Hàm sự kiện click
  value?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'link',
  to,
  variant = 'primary',
  color = 'primary',
  children,
  className,
  value,
  textColor,
  onClick
}) => {
  // Lớp cơ bản
  const baseStyles =
    'inline-flex items-center justify-center text-center font-medium transition-all ease-linear duration-200'

  // Lớp variant
  const variantStyles = clsx({
    [`border border-transparent bg-${color} text-${textColor}`]: variant === 'primary',
    [`border border-solid border-${color} text-${textColor}`]: variant === 'outline'
  })

  // Kết hợp các lớp CSS
  const combinedStyles = clsx(baseStyles, variantStyles, className)

  // Render phần tử dựa trên `type`
  if (type === 'link') {
    // Sử dụng react-router-dom Link
    return (
      <Link to={to || '/'} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  if (type === 'a') {
    // Sử dụng thẻ <a> thông thường
    return (
      <Link to={to || '#'} className={combinedStyles} target='_blank' rel='noopener noreferrer'>
        {children}
      </Link>
    )
  }

  // Mặc định là nút button
  return (
    <button type='submit' className={combinedStyles} onClick={() => onClick?.(value)}>
      {children}
    </button>
  )
}

export default Button
