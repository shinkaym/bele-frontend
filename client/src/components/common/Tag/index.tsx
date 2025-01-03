import clsx from 'clsx'
import * as React from 'react'

interface ITagProps {
  title: string
}

const Tag: React.FunctionComponent<ITagProps> = ({ title }) => {
  return (
    <div
      className={clsx(
        'rounded-xl px-2 py-0.5 lg:text-xs md:text-2xs sm:text-3xs text-4xs uppercase font-semibold',
        title === 'New' ? 'bg-blue-primary text-white' : 'bg-black text-white'
      )}
    >
      {title}
    </div>
  )
}

export default Tag
