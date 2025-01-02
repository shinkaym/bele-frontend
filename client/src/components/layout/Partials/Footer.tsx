import { IconFacebook, IconMail, IconPhone, IconYoutube, IconInstagram } from '@/components/icons'

function Footer() {
  return (
    <footer className='bg-black text-white hidden lg:block'>
      <div className='2xl:px-16 mx-auto flex flex-col items-center justify-between'>
        <div className='py-5 grid grid-cols-3 w-full border-b-2'>
          <div className='w-full flex items-start justify-center'>
            <img className='w-[300px]' src='/images/logo/logo2.jpg' alt='' />
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-start justify-center gap-3'>
              <div className='flex items-center gap-4'>
                <IconPhone className='size-10' />
                <div className='flex flex-col justify-between'>
                  <span>Hotline</span>
                  <span className='font-bold'>0909691405</span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <IconMail className='size-10' />
                <div className='flex flex-col justify-between'>
                  <span>Email</span>
                  <span className='font-bold'>bele@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-10'>
            <a href='/'>
              <IconFacebook className='size-10 text-white' />
            </a>
            <a href='/'>
              <IconYoutube className='size-10 text-white' />
            </a>
            <a href='/'>
              <IconInstagram className='size-10 text-white' />
            </a>
            <a href='/'>
              <IconFacebook className='size-10 text-white' />
            </a>
          </div>
        </div>

        <div className='py-10 grid grid-cols-5 gap-3 w-full'>
          <div>
            <h3 className='mb-3 text-xl'>BELE</h3>
            <div>
              <p className='text-sm'>
                Bele is a pioneer fashion brand that offers high-quality, modern, and stylish men fashion products.
                Founded five [year of establishment], Bele quickly became the top choice for fashions who love
                simplicity, convenience, and sophistication.
              </p>
            </div>
          </div>
          <div>
            <h3 className='mb-3 text-xl'>Policy</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <a href='/' className='text-sm'>
                    60 day return
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Promotion
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Delivery
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='mb-3 text-xl'>Quick Links</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <a href='/' className='text-sm'>
                    About
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Products
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='/' className='text-sm'>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='mb-3 text-xl'>Customer Care</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <p className='text-sm'>100% satisfied shopping experience</p>
                </li>
                <li>
                  <p className='text-sm'>Q&A</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='mb-3 text-xl'>Address</h3>
            <div>
              <ul className='flex flex-col gap-1'>
                <li>
                  <p className='text-sm'>
                    Hanoi Office: 3rd Floor, BMM Building, KM2,Phung Hung Street, Phuc La Ward, Ha Dong District, Hanoi
                    City
                  </p>
                </li>
                <li>
                  <p className='text-sm'>
                    Hanoi Operation Center: Lot C8, Lai Yen Industrial Park, Lai Yen Commune, Hoai Duc District, Hanoi
                    City
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
