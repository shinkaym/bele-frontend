import * as React from 'react'
import { Link } from 'react-router-dom'

interface ILink {
  to: string
  title: string
}

interface ICollectionProps {
  title: string
  className: string
  link?: ILink
}

export default function Collection({ children, title, className, link }: React.PropsWithChildren<ICollectionProps>) {
  return (
    <div className={className}>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='font-bold uppercase text-2xl'>{title}</h1>
        {link && (
          <Link to={link.to} className='text-underline underline-offset-1'>
            {link.title}
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}
