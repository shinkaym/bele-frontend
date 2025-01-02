import { useState } from 'react'
import { IconBars, IconCart, IconChevronLeft, IconProfile, IconSearch } from '@/components/icons'

function Header() {
  const [isProductsHover, setIsProductsHover] = useState(false)
  const [isSearchClick, setIsSearchClick] = useState(false)

  return (
    <header className='sticky top-0 bg-black text-white z-50'>
      <div className='xl:px-16 md mx-auto flex items-center justify-between h-[5rem]'>
        <div className='flex items-center justify-between lg:hidden'>
          <IconBars className='mx-2 size-7 text-white' />
          <IconSearch className='mx-2 size-7 text-white' onClick={() => setIsSearchClick(true)} />
        </div>
        <div className='h-full'>
          <img className='h-full' src='/images/logo/logo.jpg' alt='' />
        </div>
        <ul className='items-center justify-between h-full hidden lg:flex'>
          <li className='flex items-center justify-center hover:bg-gray px-4 h-full'>
            <a href='/' className='cursor-pointer'>
              Home
            </a>
          </li>
          <li
            className='flex items-center justify-center hover:bg-gray px-4 h-full'
            onMouseEnter={() => setIsProductsHover(true)}
            onMouseLeave={() => setIsProductsHover(false)}
          >
            <a href='/' className='cursor-pointer'>
              Products
            </a>
          </li>
          <li className='flex items-center justify-center hover:bg-gray px-4 h-full'>
            <a href='/' className='cursor-pointer'>
              About
            </a>
          </li>
          <li className='flex items-center justify-center hover:bg-gray px-4 h-full'>
            <a href='/' className='cursor-pointer'>
              Contact
            </a>
          </li>
          <li className='flex items-center justify-center hover:bg-gray px-4 h-full'>
            <a href='/' className='cursor-pointer'>
              Blog
            </a>
          </li>
        </ul>
        <div className='flex items-center justify-between'>
          <div className='hidden lg:flex py-3 rounded-full bg-white overflow-hidden max-w-md mx-auto'>
            <IconSearch className='mx-2 size-7 text-black' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full outline-none bg-transparent text-black text-sm'
              onClick={() => setIsSearchClick(true)}
            />
          </div>
          <div className='p-3'>
            <IconProfile className='size-7' />
          </div>
          <div className='p-3'>
            <IconCart className='size-7' />
          </div>
        </div>
      </div>
      {isProductsHover && (
        <>
          <div
            className='absolute top-full left-0 right-0 bg-black bg-opacity-30'
            style={{
              height: 'calc(100vh - 5rem)'
            }}
            onMouseEnter={() => setIsProductsHover(false)}
          ></div>
          <ul className='absolute left-1/2 transform -translate-x-1/2 top-full bg-white text-black p-4 shadow-lg flex items-start'>
            <li className='min-w-40'>
              <a href='/' className='w-fit text-nowrap font-bold pt-3 block'>
                ÁO NAM
              </a>
              <div className='w-1/2 h-1 bg-black my-3'></div>
              <ul className='flex flex-col items-start justify-center w-full'>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
              </ul>
            </li>
            <li className='min-w-40'>
              <a href='/' className='w-fit text-nowrap font-bold pt-3 block'>
                ÁO NAM
              </a>
              <div className='w-1/2 h-1 bg-black my-3'></div>
              <ul className='flex flex-col items-start justify-center w-full'>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
              </ul>
            </li>
            <li className='min-w-40'>
              <a href='/' className='w-fit text-nowrap font-bold pt-3 block'>
                ÁO NAM
              </a>
              <div className='w-1/2 h-1 bg-black my-3'></div>
              <ul className='flex flex-col items-start justify-center w-full'>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
              </ul>
            </li>
            <li className='min-w-40'>
              <a href='/' className='w-fit text-nowrap font-bold pt-3 block'>
                ÁO NAM
              </a>
              <div className='w-1/2 h-1 bg-black my-3'></div>
              <ul className='flex flex-col items-start justify-center w-full'>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
                <li className='py-2'>
                  <a href='/' className='text-slate-500 hover:text-blue-600'>
                    Áo thun
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </>
      )}
      {isSearchClick && (
        <div className='absolute top-0 left-0 right-0'>
          <div className='relative w-full h-[107px] bg-white flex items-center'>
            <IconChevronLeft className='block sm:hidden text-zinc-500 size-7' onClick={() => setIsSearchClick(false)}/>
            <form className='flex py-3 px-5 md:mx-auto rounded-full bg-zinc-200 overflow-hidden min-w-[340px] md:w-[500px]'>
              <input
                type='text'
                placeholder='Search...'
                className='w-full outline-none bg-transparent text-zinc-500 text-sm'
              />
              <IconSearch className='mx-2 size-7 text-zinc-500' />
            </form>
            <IconCart className='absolute hidden sm:block right-10 top-1/2 transform -translate-y-1/2 text-zinc-500 size-9' />
          </div>
          <div
            className='relative w-full bg-black bg-opacity-30'
            style={{
              height: 'calc(100vh - 107px)'
            }}
          >
            <div className='absolute mt-3 w-full lg:w-[1000px] xl:w-[1250px] bg-white px-5 py-10 lg:px-20 lg:py-20 left-1/2 transform -translate-x-1/2 text-black rounded-lg'>
              <div>
                <span className='text-sm font-medium'>Từ khoá nổi bật ngày hôm nay</span>
                <div className='flex flex-wrap items-start gap-2 mt-2'>
                  <div className='px-3 py-2 border border-slate-500 rounded-full text-xs inline-block font-medium'>
                    Tập Gym
                  </div>
                  <div className='px-3 py-2 border border-slate-500 rounded-full text-xs inline-block font-medium'>
                    Tập Gym
                  </div>
                  <div className='px-3 py-2 border border-slate-500 rounded-full text-xs inline-block font-medium'>
                    Tập Gym
                  </div>
                  <div className='px-3 py-2 border border-slate-500 rounded-full text-xs inline-block font-medium'>
                    Tập Gym
                  </div>
                  <div className='px-3 py-2 border border-slate-500 rounded-full text-xs inline-block font-medium'>
                    Tập Gym
                  </div>
                </div>
              </div>
              <div className='mt-10'>
                <span className='text-sm font-medium'>Sản phẩm đã xem gần đây</span>
                <div className='flex items-start gap-5 mt-2'>
                  <div className='hidden md:block md:w-[196.5px]'>
                    <img className='w-full h-64 object-cover rounded-md' src='/images/products/1.webp' alt='title' />
                    <p className='break-words line-clamp-2 text-sm font-medium mt-1'>
                      Áo phao dày Ultrawarm Puffer có mũ
                    </p>
                  </div>
                  <div className='hidden md:block md:w-[196.5px]'>
                    <img className='w-full h-64 object-cover rounded-md' src='/images/products/1.webp' alt='title' />
                    <p className='break-words line-clamp-2 text-sm font-medium mt-1'>
                      Áo phao dày Ultrawarm Puffer có mũ
                    </p>
                  </div>
                  <div className='hidden md:block md:w-[196.5px]'>
                    <img className='w-full h-64 object-cover rounded-md' src='/images/products/1.webp' alt='title' />
                    <p className='break-words line-clamp-2 text-sm font-medium mt-1'>
                      Áo phao dày Ultrawarm Puffer có mũ
                    </p>
                  </div>
                  <div className='hidden md:block md:w-[196.5px]'>
                    <img className='w-full h-64 object-cover rounded-md' src='/images/products/1.webp' alt='title' />
                    <p className='break-words line-clamp-2 text-sm font-medium mt-1'>
                      Áo phao dày Ultrawarm Puffer có mũ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
