import { ComponentProps } from 'react'

const IconFacebook = (props: ComponentProps<'svg'>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path d='M22.675 0H1.325C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24h11.495v-9.294h-3.125v-3.622h3.125V9.52c0-3.097 1.82-4.823 4.644-4.823 1.35 0 2.746.248 2.746.248v3.02h-1.545c-1.515 0-1.985.943-1.985 1.897v2.372h3.375l-.539 3.622h-2.836V24h5.615c.733 0 1.325-.592 1.325-1.325V1.325C24 .592 23.408 0 22.675 0z' />
    </svg>
  )
}

export default IconFacebook
