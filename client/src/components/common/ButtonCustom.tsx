import React from 'react'

interface ButtonCustomProps {
  type?: 'submit' | 'reset' | 'button'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  inverted?: boolean
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ children, onClick, className, inverted = false, type }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center text-sm lg:text-lg tracking-tighter ${inverted ? '' : 'bg-white text-black'}  border border-black rounded-full  font-bold h-[50px] px-8 py-2 transition-all duration-200 hover:bg-black hover:text-white ${
        inverted ? 'bg-black text-white hover:bg-white hover:text-black' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonCustom
