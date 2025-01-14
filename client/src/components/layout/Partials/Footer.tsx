import { RootState } from '@/redux/store'
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Footer() {
  const settings = useSelector((state: RootState) => state.settings.data)
  return (
    <footer className='bg-black text-white hidden lg:block'>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mx-auto flex flex-col items-center justify-between'>
        <div className='py-5 grid grid-cols-5 w-full border-b-2'>
          <img className='object-cover w-full' src={settings?.logo.sloganLogo} alt={'Slogan Logo'} />
          <div></div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-start justify-center gap-3'>
              <div className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faPhone} className='text-3xl' />
                <div className='flex flex-col justify-between'>
                  <span>Hotline</span>
                  <span className='font-semibold'>{settings?.info.hotline}</span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faEnvelope} className='text-3xl' />
                <div className='flex flex-col justify-between'>
                  <span>Email</span>
                  <span className='font-semibold'>{settings?.info.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div className='flex items-center justify-center gap-10'>
            <a target='_blank' href={settings?.social.facebookLink}>
              <FontAwesomeIcon icon={faFacebook} className='text-5xl' />
            </a>
            <a target='_blank' href={settings?.social.youtubeLink}>
              <FontAwesomeIcon icon={faYoutube} className='text-5xl' />
            </a>
            <a target='_blank' href={settings?.social.instagramLink}>
              <FontAwesomeIcon icon={faInstagram} className='text-5xl' />
            </a>
          </div>
        </div>

        <div className='py-10 flex justify-between xl:gap-10 lg:gap-5 w-full'>
          <div className='xl:max-w-80 max-w-64 '>
            <h3 className='mb-3 xl:text-lg text-base'>BELE</h3>
            <div>
              <p className='xl:text-sm lg:text-xs'>{settings?.info.description}</p>
            </div>
          </div>
          <div>
            <h3 className='mb-3 xl:text-lg text-base'>Chính sách</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Hoàn trả trong 60 ngày
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Khuyến mãi
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Bảo mật
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Giao hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='mb-3 xl:text-lg text-base'>Liên kết nhanh</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className='xl:text-sm lg:text-xs'>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='mb-3 xl:text-lg text-base'>Chăm sóc khách hàng</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <p className='xl:text-sm lg:text-xs'>Trải nghiệm mua sắm hài lòng 100%</p>
                </li>
                <li>
                  <p className='xl:text-sm lg:text-xs'>Hỏi đáp</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='xl:max-w-80 max-w-64'>
            <h3 className='mb-3 xl:text-lg text-base'>Địa chỉ</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <p className='xl:text-sm lg:text-xs'>
                    <span>{settings?.address.branchName1}</span>: {settings?.address.branchAddress1}
                  </p>
                </li>
                <li>
                  <p className='xl:text-sm lg:text-xs'>
                    <span>{settings?.address.branchName2}</span>: {settings?.address.branchAddress2}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
