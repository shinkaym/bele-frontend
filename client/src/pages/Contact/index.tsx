import React from 'react'

const ContactPage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {/* Contact Information Section */}
      <div className='bg-black text-white p-8 rounded-lg'>
        <h2 className='text-3xl font-bold mb-4'>Contact Information</h2>
        <p className='text-gray-400 mb-6'>Say something with Bele</p>

        <div className='space-y-6'>
          {/* Phone */}
          <div className='flex items-center space-x-4'>
            <span className='text-xl'>📞</span>
            <p className='text-lg'>+1 012 3456 789</p>
          </div>

          {/* Email */}
          <div className='flex items-center space-x-4'>
            <span className='text-xl'>✉️</span>
            <p className='text-lg'>demo@gmail.com</p>
          </div>

          {/* Address */}
          <div className='flex items-center space-x-4'>
            <span className='text-xl'>📍</span>
            <p className='text-lg'>
              Lot C8, Lai Yen Industrial Park, <br />
              Lai Yen Commune, Hoai Duc District, Hanoi City
            </p>
          </div>

          {/* Social Media */}
          <div className='flex items-center space-x-4 mt-4'>
            <a href='#' className='text-white hover:text-gray-400'>
              <span>🌐 Facebook</span>
            </a>
            <a href='#' className='text-white hover:text-gray-400'>
              <span>📸 Instagram</span>
            </a>
            <a href='#' className='text-white hover:text-gray-400'>
              <span>🎥 YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold mb-4'>Send Us a Message</h2>
        <form className='space-y-4'>
          {/* Name Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input
                type='text'
                placeholder='First Name'
                className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input
                type='text'
                placeholder='Last Name'
                className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>Email</label>
              <input
                type='email'
                placeholder='Email'
                className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-gray-700'>Phone Number</label>
              <input
                type='tel'
                placeholder='Phone Number'
                className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className='block text-gray-700'>Message</label>
            <textarea
              placeholder='Write your message...'
              rows={5}
              className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
