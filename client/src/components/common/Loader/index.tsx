interface Props {
  type?: 'full' | 'inside'
}

const Loader = ({ type = 'full' }: Props) => {
  return (
    <div
      className={`${
        type === 'full'
          ? 'fixed inset-0' // Chiếm toàn bộ màn hình
          : 'absolute top-0 bottom-0 left-0 right-0' // Đè trong một container
      } flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50`}
    >
      <div className='h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent'></div>
    </div>
  )
}

export default Loader
