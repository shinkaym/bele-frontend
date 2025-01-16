import { useEffect, useState } from 'react'
import blogApi from '@/apis/modules/blog.api'
import { IBlog, IPagination } from '@/models/interfaces'
import Loader from '@/components/common/Loader'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPage: 1
  })
  const navigate = useNavigate()

  const fetchBlogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await blogApi.getAll()
      //   alert('Blog list:' + JSON.stringify(res.blogs))
      if (res.blogs) {
        setBlogs(res.blogs) // Lấy danh sách blogs
        setPagination(res.pagination) // Lấy thông tin phân trang
      } else {
        setError('No data received.')
      }
    } catch (err) {
      setError('Error fetching blog list.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  const handleNavigateToDetail = (id: number) => {
    navigate(`/blog/${id}`) // Navigate to BlogDetail page with blog ID
  }

  return (
    <div className='max-w-6xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>BELE BLOG</h1>
      {loading && <Loader />}
      {error && <p className='text-red-500 text-center'>{error}</p>}
      {!loading && !error && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleNavigateToDetail(blog.id)}
                className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                <div className='h-40 overflow-hidden'>
                  <img
                    src={
                      blog.contents.find((content) => content.contentType === 'Image')?.imageUrl ||
                      'https://via.placeholder.com/400'
                    }
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-bold'>{blog.title}</h3>
                  <p className='text-sm text-gray-500'>{blog.createdAt}</p>
                  <p className='text-gray-700 text-sm mt-2 line-clamp-3'>
                    {blog.contents.find((content) => content.contentType === 'Text')?.contentText ||
                      'No description available.'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {pagination && (
            <div className='flex justify-center mt-8'>
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 disabled:opacity-50'
              >
                Previous
              </button>
              {Array.from({ length: pagination.totalPage }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    pagination.currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  } hover:bg-gray-300`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={pagination.currentPage === pagination.totalPage}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BlogList
