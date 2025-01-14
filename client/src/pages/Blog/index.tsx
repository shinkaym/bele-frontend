import { useEffect, useState, useContext } from 'react'
import SettingContext from '@/context/Setting/SettingContext'
import Loader from '@/components/common/Loader'
// import { Link } from 'react-router-dom'
import { IApiResponse, IBlog } from '@/models/interfaces'
import blogApi from '@/apis/modules/blog.api'

function Blog() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IBlog | null>(null)
  const setting = useContext(SettingContext)

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
    <div className='max-w h-350 mx-auto'>
      {loading && <Loader />}
      <div className='bg-gray-100 py-12 px-6 lg:px-20'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          <div className='flex flex-col items-center lg:items-start'>
            <h2 className='text-3xl font-bold mb-4 lg:w-100'>{data?.title || 'ABOUT BELE'}</h2>
            <div className='flex justify-center'>
              <img src={setting?.logo.mainLogo} alt={'Slogan Logo'} className='w-1/2 lg:w-60' />
            </div>
          </div>

          <div>
            <p className='text-gray-700 mb-4'>{data?.content}</p>
            <p className='text-gray-700 mb-6'>{data?.thumbnail}</p>

            <div className='space-y-2'>
              <p className='flex items-center text-gray-700'>
                <span className='mr-2'>🏢</span>
                <strong className='mr-1'>Company Name:</strong>
                <span>BELE</span>
              </p>
              <p className='flex items-center text-gray-700'>
                <span className='mr-2'>📍</span>
                <strong className='mr-1'>Address:</strong>
                <span>{setting?.address.branchAddress1}</span>
              </p>
              <p className='flex items-center text-gray-700'>
                <span className='mr-2'>🌐</span>
                <strong className='mr-1'>Website:</strong>
                <a
                  href={setting?.social.facebookLink}
                  className='text-blue-500 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {setting?.social.facebookLink}
                </a>
              </p>
              <p className='flex items-center text-gray-700'>
                <span className='mr-2'>📞</span>
                <strong className='mr-1'>Hotline:</strong> {setting?.info.hotline}
              </p>
              <p className='flex items-center text-gray-700'>
                <span className='mr-2'>✉️</span>
                <strong className='mr-1'>Email:</strong>
                <a href={`mailto:${setting?.info.email}`}>{setting?.info.email}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
