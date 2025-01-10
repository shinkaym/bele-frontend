import React from 'react'

interface OverlayProps {
  onClose: () => void
  className?: string
  position?: string
}

const Overlay: React.FC<OverlayProps> = ({ onClose, className, position = 'fixed' }) => {
  return (
    <div
      className={`${position} bg-black/50 inset-0 flex items-center justify-center ${className}`}
      onClick={onClose}
    ></div>
  )
}

export default Overlay
