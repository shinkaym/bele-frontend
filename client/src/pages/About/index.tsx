import Loader from '@/components/common/Loader'
import { useEffect, useState } from 'react'
import blogApi from '@/apis/modules/blog.api'
import { IBlog } from '@/models/interfaces'

function About() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IBlog | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogData = async () => {
    setLoading(true)
    setError(null)
    try {
      const blog: IBlog = await blogApi.getById(1)
      console.log('Blog:', blog)
      setData(blog)
    } catch (err) {
      setError('An error occurred while fetching the blog data.')
      console.error('Error fetching blog data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data) fetchBlogData()
  }, [data])

  return (
    <div>
      <div className='mx-40 px-8'>
        {loading && <Loader />}
        {error && <p className='text-red-500 text-center my-4'>{error}</p>}
        {!loading && !error && (
          <div className='bg-gray-100 py-16 px-10 lg:px-24'>
            {/* About Title */}
            <div className='max-w-4xl mx-auto grid grid-cols-1 gap-12 items-center'>
              <div className='flex flex-col items-center justify-center text-center'>
                <h2 className='text-5xl font-extrabold text-gray-900 leading-tight tracking-tight'>
                  {data?.title || 'VỀ CHÚNG TÔI - BELE'}
                </h2>
                <div className='w-1/2 h-1 mt-3 bg-black rounded'></div>
              </div>
            </div>

            <div className='mt-12 mx-32 space-y-6'>
              {/* Content 1: Logo */}
              {data?.contents?.find((content) => content.id === 1) && (
                <div className='flex justify-center'>
                  <img
                    src={data.contents.find((content) => content.id === 1)?.imageUrl || ''}
                    alt='About Us Logo'
                    className='w-120 h-auto max-w-lg rounded-lg shadow-md'
                  />
                </div>
              )}

              {/* Content 2: Description */}
              {data?.contents?.find((content) => content.id === 2) && (
                <div className='text-lèt text-gray-700 text-lg leading-relaxed'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.contents.find((content) => content.id === 2)?.contentText || ''
                    }}
                  />
                </div>
              )}

              {/* Content 3: Policies */}
              {data?.contents?.find((content) => content.id === 3) && (
                <div className='text-center'>
                  <h3 className='text-3xl font-bold text-gray-900'>
                    {data.contents.find((content) => content.id === 3)?.title || 'Chính sách'}
                  </h3>
                </div>
              )}
            </div>

            {/* Policies Section */}
            <div className='mx-32 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
              {data?.contents?.length ? (
                [4, 6, 8, 10].map((textId, index) => {
                  const textContent = data.contents.find((content) => content.id === textId)
                  const imageContent = data.contents.find((content) => content.id === textId + 1)

                  return (
                    <div
                      key={index}
                      className='flex flex-col items-center text-left bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300'
                    >
                      <h3 className='text-2xl font-bold mb-2'>{textContent?.title || 'No Title'}</h3>

                      {imageContent && (
                        <img
                          src={imageContent.imageUrl}
                          alt={textContent?.title || 'Content Image'}
                          className='w-auto h-auto mb-4 object-contain'
                        />
                      )}
                      <p className='text-gray-600 text-sm'>
                        {textContent?.contentText ? (
                          <span dangerouslySetInnerHTML={{ __html: textContent.contentText }} />
                        ) : (
                          'No description available.'
                        )}
                      </p>
                    </div>
                  )
                })
              ) : (
                <p className='text-gray-500 text-center col-span-full'>No content available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default About
