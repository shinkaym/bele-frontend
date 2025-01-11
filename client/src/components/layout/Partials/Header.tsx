import categoryApi from '@/apis/modules/category.api'
import Login from '@/components/common/Login'
import ModalSearch from '@/components/common/ModalSearch'
import Overlay from '@/components/common/Overlay'
import Popup from '@/components/common/Popup'
import { logoList } from '@/constants'
import SettingContext from '@/context/Setting/SettingContext'
import { IApiResponse, ICategory } from '@/models/interfaces'
import { faArrowRight, faBagShopping, faBars, faChevronDown, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = memo(() => {
  const [isShowSearchModal, setIsShowSearchModal] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [popupOptions, setPopupOptions] = useState<'login' | 'register' | 'forgotPassword'>('login')
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const setting = useContext(SettingContext)

  const handleSearchModalClose = () => {
    setIsShowSearchModal(false)
  }

  const handleSearchModalOpen = () => {
    setIsShowSearchModal(true)
  }

  const handleMenuClose = () => {
    setIsShowMenu(false)
  }

  const handleMenuOpen = () => {
    setIsShowMenu(true)
  }

  const handlePopupOpen = () => {
    setIsShowPopup(true)
  }

  const handlePopupClose = () => {
    setIsShowPopup(false)
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{ categories: ICategory[] }> = await categoryApi.list()
        if (res.data && res.status === 200) {
          setCategories(res.data.categories)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [])

  return (
    <>
      <header className='sticky top-0 bg-black text-white z-20'>
        <div className='text-center lg:py-3 md:py-2.5 sm:py-2 py-1.5 xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs bg-gray-bg'>
          <span>Fall Winter Collection: Đông Ấm Chất Chill</span>
          <Link to={'/'} className='ml-1 underline'>
            <span>Khám phá</span> <FontAwesomeIcon icon={faArrowRight} />
          </Link>{' '}
        </div>
        <div className='lg:px-14 md:px-12 sm:px-10 px-6 md mx-auto flex items-center justify-between lg:h-20 md:h-18 sm:h-16 h-14'>
          <Link to={'/'} className='h-full'>
            <img className='h-full w-full object-cover' src={setting?.logo.mainLogo} alt={'Main Logo'} />
          </Link>
          <div className='items-center justify-between h-full hidden lg:flex relative'>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs uppercase lg:px-4 h-full flex items-center justify-center hover:bg-hover text-white ease-linear transition-all duration-200 font-medium ${
                  isActive ? 'bg-hover' : ''
                }`
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to={'/product'}
              className={({ isActive }) =>
                `xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs lg:px-5 h-full flex items-center justify-center hover:bg-hover text-white ease-linear transition-all duration-200 font-medium group ${
                  isActive ? 'bg-hover' : ''
                }`
              }
            >
              SẢN PHẨM
              {/* Menu con */}
              <ul className='absolute z-40 inset-x-0 top-full bg-white p-6 ease-linear transition-all duration-200 hidden group-hover:flex  justify-between shadow-md rounded-b-md'>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <li className='text-sm'>
                      <h3 className='lg:text-base md:text-sm sm:text-xs text-2xs font-semibold text-black uppercase'>
                        {cat.name}
                      </h3>
                      <div className='mt-2 mb-5 h-0.5 w-1/2 bg-black'></div>
                      {cat.referenceCategory?.length > 0 && (
                        <ul className='text-gray-500 xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs space-y-2'>
                          <li className='hover:text-blue-primary'>
                            <Link to={'/' + cat.slug}>Tất cả {cat.name}</Link>
                          </li>
                          {cat.referenceCategory.map((catChild) => (
                            <li className='hover:text-blue-primary'>
                              <Link to={'/' + catChild.slug}>{catChild.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            </NavLink>

            <NavLink
              to={'/about'}
              className={({ isActive }) =>
                `xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs uppercase lg:px-5 h-full flex items-center justify-center hover:bg-hover text-white ease-linear transition-all duration-200 font-medium ${
                  isActive ? 'bg-hover' : ''
                }`
              }
            >
              Giới thiệu
            </NavLink>

            <NavLink
              to={'/contact'}
              className={({ isActive }) =>
                `xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs uppercase lg:px-5 h-full flex items-center justify-center hover:bg-hover text-white ease-linear transition-all duration-200 font-medium ${
                  isActive ? 'bg-hover' : ''
                }`
              }
            >
              Liên hệ
            </NavLink>

            <NavLink
              to={'/blog'}
              className={({ isActive }) =>
                `xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs uppercase lg:px-5 h-full flex items-center justify-center hover:bg-hover text-white ease-linear transition-all duration-200 font-medium ${
                  isActive ? 'bg-hover' : ''
                }`
              }
            >
              Blog
            </NavLink>
          </div>

          <div className='flex items-center justify-between gap-5'>
            <FontAwesomeIcon
              icon={faSearch}
              className='md:text-2xl sm:text-xl text-lg text-white lg:hidden'
              onClick={() => setIsShowSearchModal(true)}
            />
            <div className='hidden lg:flex h-12 xl:px-4 lg:px-3 rounded-full bg-zinc-200 overflow-hidden max-w-md mx-auto items-center xl:gap-2 lg:gap-1'>
              <FontAwesomeIcon icon={faSearch} className='xl:text-xl lg:text-lg text-zinc-500 ' />
              <input
                value=''
                type='search'
                readOnly={true}
                placeholder='Tìm kiếm sản phẩm...'
                className='w-full outline-none bg-transparent text-black text-sm'
                onClick={handleSearchModalOpen}
              />
            </div>
            <FontAwesomeIcon
              icon={faUser}
              className='lg:text-3xl md:text-2xl sm:text-xl text-lg text-white cursor-pointer'
              onClick={handlePopupOpen}
            />
            <Link to={'/cart'} className='relative'>
              <FontAwesomeIcon
                icon={faBagShopping}
                className={`lg:text-3xl md:text-2xl sm:text-xl text-lg text-white cursor-pointer`}
              />
              <div className='absolute lg:-bottom-2 lg:-right-2 sm:-bottom-1.5 sm:-right-1.5 -bottom-1 -right-1 bg-yellow-200 lg:w-5 lg:h-5 sm:w-4 sm:h-4 w-3 h-3 rounded-full flex justify-center items-center lg:text-2xs sm:text-3xs text-4xs font-bold text-black'>
                0
              </div>
            </Link>
            <FontAwesomeIcon
              icon={faBars}
              className='md:text-2xl sm:text-xl text-lg text-white lg:hidden'
              onClick={handleMenuOpen}
            />
          </div>
        </div>
      </header>
      {isShowPopup && (
        <Popup onPopupClose={handlePopupClose}>
          {popupOptions === 'login' ? (
            <Login
              onRegister={() => setPopupOptions('register')}
              onForgotPassoword={() => setPopupOptions('forgotPassword')}
            />
          ) : (
            'Hello'
          )}
        </Popup>
      )}
      {isShowSearchModal && <ModalSearch onSearchClose={handleSearchModalClose} />}
      {isShowMenu && (
        <>
          <Overlay onClose={handleMenuClose} className='z-50' />
          <div className='absolute left-0 top-0 lg:w-[300px] md:w-[260px] sm:w-[220px] w-[180px] bg-black h-screen z-50 shadow-md border-r border-zinc-700'>
            <img src={logoList.mainLogo.url} alt={logoList.mainLogo.name} className='w-full object-cover ' />
            <div className='text-white'>
              <Link
                className='md:px-10 sm:px-8 px-6 w-full inline-block py-3 hover:bg-zinc-500 transition-all duration-200 ease-linear md:text-base sm:text-sm text-xs'
                to={'/'}
              >
                Trang chủ
              </Link>
              <div className='transition-all duration-200 ease-linear md:text-base sm:text-sm text-xs'>
                <input type='checkbox' id='product' className='peer hidden' />

                {/* Label đầu tiên */}
                <label
                  htmlFor='product'
                  className='md:px-10 sm:px-8 px-6 w-full flex items-center justify-between py-3 cursor-pointer hover:bg-zinc-500 peer-checked:bg-zinc-500'
                >
                  <span>Sản phẩm</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </label>

                {/* Dropdown menu đầu tiên */}
                <div className='text-white transition-all duration-300 ease-in-out overflow-hidden max-h-0 peer-checked:max-h-[600px] peer-checked:opacity-100 opacity-0'>
                  {/* Áo Nam */}
                  <div>
                    <input type='checkbox' id='shirt' className='peer hidden' />
                    <label
                      htmlFor='shirt'
                      className='flex items-center justify-between cursor-pointer md:pl-12 md:pr-10 sm:pl-10 sm:pr-8 pl-8 pr-6 w-full py-3'
                    >
                      <span>Áo Nam</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </label>
                    <div className='md:pl-14 sm:pl-12 pl-10  text-white transition-all duration-300 ease-in-out overflow-hidden max-h-0 peer-checked:max-h-[600px] peer-checked:opacity-100 opacity-0'>
                      <div className='py-3'>
                        <Link to='/all-shirts'>Tất cả Áo Nam</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/t-shirts'>Áo thun</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/shirts'>Áo sơ mi</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/polos'>Áo polo</Link>
                      </div>
                    </div>
                  </div>

                  {/* Quần Nam */}
                  <div>
                    <input type='checkbox' id='pants' className='peer hidden' />
                    <label
                      htmlFor='pants'
                      className='flex items-center justify-between cursor-pointer md:pl-12 md:pr-10 sm:pl-10 sm:pr-8 pl-8 pr-6 w-full py-3'
                    >
                      <span>Quần Nam</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </label>
                    <div className='md:pl-14 sm:pl-12 pl-10  text-white transition-all duration-300 ease-in-out overflow-hidden max-h-0 peer-checked:max-h-[600px] peer-checked:opacity-100 opacity-0'>
                      <div className='py-3'>
                        <Link to='/all-pants'>Tất cả Quần Nam</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/shorts'>Quần short</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/long-pants'>Quần dài</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/jeans'>Quần Jean</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/khakis'>Quần kaki</Link>
                      </div>
                    </div>
                  </div>

                  {/* Phụ Kiện Nam */}
                  <div>
                    <input type='checkbox' id='accessories' className='peer hidden' />
                    <label
                      htmlFor='accessories'
                      className='flex items-center justify-between cursor-pointer md:pl-12 md:pr-10 sm:pl-10 sm:pr-8 pl-8 pr-6 w-full py-3'
                    >
                      <span>Phụ Kiện Nam</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </label>
                    <div className='md:pl-14 sm:pl-12 pl-10  text-white transition-all duration-300 ease-in-out overflow-hidden max-h-0 peer-checked:max-h-[600px] peer-checked:opacity-100 opacity-0'>
                      <div className='py-3'>
                        <Link to='/all-accessories'>Tất cả Phụ Kiện</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/socks'>Tất/vớ</Link>
                      </div>
                      <div className='py-3'>
                        <Link to='/wallets'>Ví</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                className='md:px-10 sm:px-8 px-6 w-full inline-block py-3 hover:bg-zinc-500 transition-all duration-200 ease-linear md:text-base sm:text-sm text-xs'
                to={'/about'}
              >
                Giới thiệu
              </Link>
              <Link
                className='md:px-10 sm:px-8 px-6 w-full inline-block py-3 hover:bg-zinc-500 transition-all duration-200 ease-linear md:text-base sm:text-sm text-xs'
                to={'/contact'}
              >
                Liên hệ
              </Link>
              <Link
                className='md:px-10 sm:px-8 px-6 w-full inline-block py-3 hover:bg-zinc-500 transition-all duration-200 ease-linear md:text-base sm:text-sm text-xs'
                to={'/blog'}
              >
                Blog
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
})

export default Header
