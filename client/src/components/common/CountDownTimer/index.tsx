import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'

interface ICountDownTimerProps {
  title: string
  timeCountDown: number // Thời gian đếm ngược ban đầu (tính bằng giây)
  onClick: () => void // Hàm callback khi nhấn nút Start
}

const CountDownTimer: React.FC<ICountDownTimerProps> = ({ title, timeCountDown, onClick }) => {
  const [time, setTime] = useState<number>(timeCountDown) // Thời gian còn lại tính bằng giây
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleClick = () => {
    if (isActive) {
      setTime(timeCountDown)
      setIsActive(false)
      onClick()
    }
  }
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(true)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <button
      type='button'
      className={`text-blue-primary text-xs space-x-1 md:text-sm ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faRotateLeft} />
      <span>{title}</span>
      <span>
        {minutes}:{seconds < 10 ? '0' : ''}
        {seconds}
      </span>
    </button>
  )
}

export default CountDownTimer
