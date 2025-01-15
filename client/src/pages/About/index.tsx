import Loader from '@/components/common/Loader'
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import blogApi from '@/apis/modules/blog.api'
import { IApiResponse, IBlog } from '@/models/interfaces'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import Services from '@/components/common/Services'

function About() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IBlog | null>(null)
  const settings = useSelector((state: RootState) => state.settings.data)

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      try {
        const res: IApiResponse<IBlog[]> = await blogApi.getBlogs()
        if (res.data && res.status === 200) {
          setData(res.data[0])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchApi()
  }, [])

  return (
    <div>
      <div className='mx-auto px-8'>
        {loading && <Loader />}
        <div className='bg-gray-100 py-16 px-10 lg:px-24'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='flex flex-col items-center lg:items-start'>
              <h2 className='text-3xl font-bold ml-8'>VỀ CHÚNG TÔI - BELE</h2>
              <div className='flex justify-center'>
                <img
                  src='./src/assets/images/logo/logo_slogan.png'
                  alt={'Slogan Logo'}
                  className='w-full max-w-lg mx-auto mb-6 rounded-lg shadow-lg bg-black'
                />
              </div>
            </div>

            <div>
              {data?.thumbnail && (
                <img
                  src={data?.thumbnail}
                  alt='Thumbnail'
                  className='w-full max-w-3xl mx-auto mb-8 rounded-lg shadow-md'
                />
              )}
              <p className='text-gray-700 mb-6 text-lg lg:text-xl leading-relaxed break-words'>{data?.content}</p>

              <div className='space-y-6 text-lg'>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>🏢</span>
                  <strong className='mr-1'>Tên công ty:</strong>
                  <span>BELE</span>
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>📍</span>
                  <strong className='mr-1'>Địa chỉ cơ sở 1:</strong>
                  <span>{settings?.address.branchAddress1}</span>
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>📍</span>
                  <strong className='mr-1'>Địa chỉ cơ sở 2:</strong>
                  <span>{settings?.address.branchAddress2}</span>
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>🌐</span>
                  <strong className='mr-1'>Website:</strong>
                  <a
                    href={settings?.social.facebookLink}
                    className='text-gray-500 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {settings?.social.facebookLink}
                  </a>
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>📞</span>
                  <strong className='mr-1'>Hotline:</strong> {settings?.info.hotline}
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>✉️</span>
                  <strong className='mr-1'>Email:</strong>
                  <a href={`mailto:${settings?.info.email}`}>{settings?.info.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services
        service={settings!.service}
        className='bg-gray-primary lg:py-8 md:py-6 sm:py-4 py-2 lg:px-14 md:px-12 sm:px-10 px-6 mb-10'
      />
    </div>
  )
}

export default About
