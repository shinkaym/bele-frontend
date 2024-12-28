import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Giới hạn số trang cần hiển thị
  const maxPagesToShow = 5
  const pages: number[] = []

  // Các trang để hiển thị
  if (totalPages <= maxPagesToShow) {
    // Nếu tổng số trang nhỏ hơn hoặc bằng số trang muốn hiển thị, hiển thị tất cả
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Nếu số trang lớn hơn số trang muốn hiển thị, chỉ hiển thị một phần
    const leftSide = Math.max(1, currentPage - 2)
    const rightSide = Math.min(totalPages, currentPage + 2)

    // Thêm trang đầu tiên và cuối cùng nếu không có trong dãy
    if (leftSide > 1) {
      pages.push(1)
      if (leftSide > 2) pages.push(-1) // dấu ba chấm
    }
    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i)
    }
    if (rightSide < totalPages) {
      if (rightSide < totalPages - 1) pages.push(-1) // dấu ba chấm
      pages.push(totalPages)
    }
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-4 py-2 rounded-lg text-sm">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg text-sm ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
