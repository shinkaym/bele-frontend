import React from 'react'
import clsx from 'clsx'
import { IPagination } from '@/models/interfaces/pagination'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/Arrow'

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPage,
  onPageChange,
  siblingCount = 1,
  className,
  activeColor = 'primary'
}) => {
  // Tạo mảng các số trang hiển thị
  const getPaginationRange = (): (number | string)[] => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPage <= totalPageNumbers) {
      return Array.from({ length: totalPage }, (_, index) => index + 1)
    }

    const startPage = Math.max(currentPage - siblingCount, 1)
    const endPage = Math.min(currentPage + siblingCount, totalPage)

    const hasLeftEllipsis = startPage > 2
    const hasRightEllipsis = endPage < totalPage - 1

    let pages: (number | string)[] = []

    if (hasLeftEllipsis) pages.push(1, '...')
    pages = pages.concat(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index))
    if (hasRightEllipsis) pages.push('...', totalPage)

    return pages
  }

  const paginationRange = getPaginationRange()

  return (
    <ul className={clsx('flex space-x-2', className)}>
      {/* Nút Previous */}
      <li>
        <button
          className={clsx('px-3 py-1 flex items-center', {
            'cursor-not-allowed text-gray-400': currentPage === 1
          })}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon width={16} height={16}/>
          <span className='ml-2'>Previous</span>
        </button>
      </li>

      {/* Các nút số trang */}
      {paginationRange.map((page, index) => (
        <li key={index}>
          {page === '...' ? (
            <span className='px-3 py-1'>...</span>
          ) : (
            <button
              className={clsx(
                'px-3 py-1 border rounded-lg',
                page === currentPage ? `bg-${activeColor} text-white` : 'hover:bg-gray-200'
              )}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          )}
        </li>
      ))}

      {/* Nút Next */}
      <li>
        <button
          className={clsx('px-3 py-1 flex items-center', {
            'cursor-not-allowed text-gray-400': currentPage === totalPage
          })}
          onClick={() => currentPage < totalPage && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <span className='mr-2'>Next</span>
          <ArrowRightIcon width={16} height={16}/>
        </button>
      </li>
    </ul>
  )
}

export default Pagination
