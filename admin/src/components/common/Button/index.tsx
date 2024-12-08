import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'link' | 'a'; // Loại phần tử
  to?: string; // Đường dẫn cho link/a
  variant?: 'primary' | 'outline'; // Loại button
  size?: 'sm' | 'md' | 'lg'; // Kích thước
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'; // Độ bo góc
  color?: string; // Màu tùy chỉnh
  children: React.ReactNode; // Nội dung của button
  className?: string; // Lớp CSS tùy chỉnh
  onClick?: () => void; // Hàm sự kiện click
}

const Button: React.FC<ButtonProps> = ({
  type = 'link',
  to,
  variant = 'primary',
  size = 'md',
  radius = 'md',
  color = 'primary',
  children,
  className,
  onClick,
}) => {
  // Lớp cơ bản
  const baseStyles = 'inline-flex items-center justify-center text-center font-medium';

  // Lớp variant
  const variantStyles = clsx({
    [`bg-${color} text-white hover:bg-opacity-90`]: variant === 'primary',
    [`border border-${color} text-${color} hover:bg-opacity-10`]: variant === 'outline',
  });

  // Lớp kích thước
  const sizeStyles = clsx({
    'py-2 px-4 text-sm lg:px-3 xl:px-4': size === 'sm',
    'py-3 px-6 text-base lg:px-5 xl:px-6': size === 'md',
    'py-4 px-8 text-lg lg:px-7 xl:px-8': size === 'lg',
  });

  // Lớp bo góc
  const radiusStyles = clsx({
    'rounded-none': radius === 'none',
    'rounded-sm': radius === 'sm',
    'rounded-md': radius === 'md',
    'rounded-lg': radius === 'lg',
    'rounded-full': radius === 'full',
  });

  // Kết hợp các lớp CSS
  const combinedStyles = clsx(baseStyles, variantStyles, sizeStyles, radiusStyles, className);

  // Render phần tử dựa trên `type`
  if (type === 'link') {
    // Sử dụng react-router-dom Link
    return (
      <Link to={to || '/'} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  if (type === 'a') {
    // Sử dụng thẻ <a> thông thường
    return (
      <a href={to || '#'} className={combinedStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Mặc định là nút button
  return (
    <button type="submit" className={combinedStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
