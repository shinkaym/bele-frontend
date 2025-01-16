import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-blue-100'
          }`}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(
          <span key='start-ellipsis' className='px-3 py-1 mx-1'>
            ...
          </span>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? 'bg-black text-white' : 'bg-white text-black hover:bg-blue-100'
          }`}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pages.push(
          <span key='end-ellipsis' className='px-3 py-1 mx-1'>
            ...
          </span>
        )
      }
      pages.push(
        <button
          key={totalPage}
          onClick={() => handlePageClick(totalPage)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPage ? 'bg-black text-white' : 'bg-white text-black hover:bg-blue-100'
          }`}
        >
          {totalPage}
        </button>
      )
    }

    return pages
  }

  return (
    <div className='flex items-center justify-center my-4 text-gray-300 font-medium'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 flex items-center gap-2 ${
          currentPage === 1 ? 'cursor-not-allowed' : 'hover:text-black dark:hover:text-white'
        }`}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        className={`px-3 py-1 mx-1 flex items-center gap-2 ${
          currentPage === totalPage ? 'cursor-not-allowed' : 'hover:text-black dark:hover:text-white'
        }`}
      >
        <FontAwesomeIcon icon={faArrowRightLong} />
      </button>
    </div>
  )
}

export default Pagination
