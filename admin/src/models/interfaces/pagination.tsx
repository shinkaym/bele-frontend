export interface IPagination {
  currentPage: number // Trang hiện tại
  totalPages: number // Tổng số trang
  onPageChange: (page: number) => void // Hàm gọi khi chuyển trang
  siblingCount?: number // Số lượng trang liền kề hiển thị (mặc định 1)
  className?: string // Lớp CSS tùy chỉnh
  activeColor?:string
}
