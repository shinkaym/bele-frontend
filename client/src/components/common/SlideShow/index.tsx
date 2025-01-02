import React, { PropsWithChildren } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// Định nghĩa kiểu SlideShowProps
interface SlideShowProps {
  duration?: number // Thời gian hiển thị mỗi slide (ms)
  transitionDuration?: number // Thời gian chuyển đổi giữa các slide (ms)
  showArrows?: boolean // Hiển thị mũi tên (arrows)
  properties?: object // Thuộc tính tùy chỉnh cho Slide
  indicators?: boolean
  slidesToScroll?: number
  slidesToShow?: number
}

const SlideShow: React.FC<PropsWithChildren<SlideShowProps>> = ({
  children,
  duration = 1000,
  transitionDuration = 500,
  showArrows = true,
  properties = {}, // Nếu không truyền, dùng mặc định là {}
  indicators = false,
  slidesToScroll = 1,
  slidesToShow = 1
}) => {
  return (
    <Slide
      slidesToScroll={slidesToScroll}
      slidesToShow={slidesToShow}
      duration={duration}
      transitionDuration={transitionDuration}
      indicators={indicators}
      arrows={showArrows} // Điều chỉnh hiển thị arrows
      {...properties} // Thêm thuộc tính mặc định và ghi đè
    >
      {children}
    </Slide>
  )
}

export default SlideShow
