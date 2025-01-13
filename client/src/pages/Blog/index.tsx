import { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import { Link } from 'react-router-dom'

// Define the interface for blog data
interface IBlog {
  id: number
  title: string
  description: string
  image: string
}

const Blog: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [blogs, setBlogs] = useState<IBlog[]>([])

  // Fetch blogs from API or mock data
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/blogs') // Replace '/api/blogs' with a real API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const data = await response.json()
        setBlogs(data.blogs || []) // Assuming the API returns { blogs: [...] }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div className='max-w-6xl mx-auto py-10 px-4'>
      {/* Loader */}
      {loading && <Loader />}

      {/* Blog Header */}
      {!loading && (
        <>
          <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800'>BELE BLOG</h1>
            <input
              type='text'
              placeholder='Search blog posts...'
              className='mt-4 md:mt-0 p-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring focus:ring-gray-200'
            />
          </div>

          {/* Blog List */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className='border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300'
              >
                <img
                  src={blog.image || 'https://via.placeholder.com/400x200'}
                  alt={blog.title}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>{blog.title}</h2>
                  <p className='text-gray-600 text-sm mb-4'>{blog.description}</p>
                  <Link to={`/blog/${blog.id}`} className='text-blue-500 text-sm font-semibold hover:underline'>
                    Đọc thêm →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-8'>
            <nav className='flex space-x-2'>
              <button className='px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200'>1</button>
              <button className='px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200'>2</button>
              <button className='px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200'>3</button>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}

export default Blog
