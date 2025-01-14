import { useEffect, useState } from 'react'
// import SettingContext from '@/context/Setting/SettingContext'
import Loader from '@/components/common/Loader'
import { RootState } from '@/redux/store'
// import { Link } from 'react-router-dom'
import { IApiResponse, IBlog } from '@/models/interfaces'
import blogApi from '@/apis/modules/blog.api'
import { useSelector } from 'react-redux'
import Services from '@/components/common/Services'

function Blog() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IBlog | null>(null)
  const settings = useSelector((state: RootState) => state.settings.data)
  const [currentPage, setCurrentPage] = useState<number>(1);

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
              <h2 className='text-4xl font-bold ml-8'>ABOUT BELE</h2>
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
                  <strong className='mr-1'>Company Name:</strong>
                  <span>BELE</span>
                </p>
                <p className='flex items-center text-gray-700'>
                  <span className='mr-2'>📍</span>
                  <strong className='mr-1'>Address:</strong>
                  <span>{settings?.address.branchAddress1}</span>
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
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Tiêu đề */}
        <h1 className='text-4xl font-bold text-center mb-8'>BELE BLOG</h1>

        {/* Thanh tìm kiếm */}
        <div className='mb-8 text-center'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
          <p className='text-gray-500 mt-2'>Found {totalResults} results</p>
        </div>

        {/* Danh sách bài viết */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogs.map((blog, index) => (
            <div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
              <img src={blog.thumbnail} alt={blog.title} className='w-full h-40 object-cover' />
              <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{blog.title}</h3>
                <p className='text-gray-600 text-sm mb-4'>{blog.date}</p>
                <p className='text-gray-700 line-clamp-3'>{blog.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className='mt-12 flex justify-center items-center space-x-2'>
          <button className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>Previous</button>
          <div className='flex space-x-1'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>1</button>
            <button className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>2</button>
            <button className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>3</button>
          </div>
          <button className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
