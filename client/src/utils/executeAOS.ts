import AOS from 'aos'
import 'aos/dist/aos.css' // Đảm bảo bạn đã import file CSS của AOS

interface AOSOptions {
  duration?: number // Thời gian chạy hiệu ứng (ms)
  offset?: number // Khoảng cách trước khi kích hoạt hiệu ứng
  once?: boolean // Có chạy lại hiệu ứng khi scroll lại không
}

const executeAOS = ({ duration = 300, offset = 0, once = false }: AOSOptions): void => {
  AOS.init({
    duration, // Thời gian chạy hiệu ứng (ms)
    offset, // Khoảng cách trước khi kích hoạt hiệu ứng
    once, // Chạy hiệu ứng chỉ một lần
    disable: () => false, // Cho phép hiệu ứng hoạt động
    useClassNames: false, // Sử dụng class mặc định của AOS
    startEvent: 'DOMContentLoaded', // Bắt đầu khi DOM đã load
    initClassName: 'aos-init', // Lớp mặc định cho phần tử
    animatedClassName: 'aos-animate', // Lớp khi hoạt động
    mirror: false // Không chạy lại khi cuộn ngược lên
  })
}

export default executeAOS
