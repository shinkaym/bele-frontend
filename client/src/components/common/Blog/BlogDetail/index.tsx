import { useParams } from 'react-router-dom' // Hoặc `useRouter` với Next.js
import { useEffect, useState } from 'react'
import blogApi from '@/apis/modules/blog.api'
import { IBlog } from '@/models/interfaces'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>() // Lấy ID từ URL
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBlog = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await blogApi.getById(Number(id))
      setBlog(data)
    } catch (err) {
      setError('Error fetching blog data.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [id])

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && blog && (
        <div>
          <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
          <p className='text-gray-500 text-sm'>{blog.createdAt}</p>
          <div className='mt-6'>
            {blog.contents.map((content, index) =>
              content.contentType === 'Image' ? (
                <img
                  key={index}
                  src={content.imageUrl}
                  alt={content.title}
                  className='w-full mb-4 rounded-lg shadow-md'
                />
              ) : (
                <div
                  key={index}
                  className='text-gray-700 text-lg leading-relaxed mb-4'
                  dangerouslySetInnerHTML={{ __html: content.contentText }}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail
