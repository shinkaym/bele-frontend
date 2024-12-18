import { IIcon } from "@/models/interfaces/icon"

const ArrowLeftIcon: React.FC<IIcon> = ({ size = 16, color = 'currentColor' , className}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke={color}
      width={size}
      height={size}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
    </svg>
  )
}

export default ArrowLeftIcon
