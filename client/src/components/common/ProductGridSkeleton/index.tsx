
const ProductGridSkeleton = () => {
  return (
    <>
      <div className={`space-y-1 animate-pulse`}>
        <div className='relative group transition-all duration-500 ease-linear overflow-hidden min-h-80 w-full bg-slate-200'></div>
        <div className='flex items-center gap-2'>
          <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
          <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
          <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
        </div>
        <p className='max-w-full truncate lg:text-sm md:text-xs sm:text-2xs text-3xs font-normal bg-slate-200 h-3'></p>
        <div className='bg-slate-200 w-full h-5'></div>
      </div>
    </>
  )
}

export default ProductGridSkeleton
