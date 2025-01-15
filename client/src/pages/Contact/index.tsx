import { useState } from 'react'
import contactApi from '@/apis/modules/contact.api'
import Loader from '@/components/common/Loader'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const ContactPageClient: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  })
  const settings = useSelector((state: RootState) => state.settings.data)
  //   alert(JSON.stringify(useSelector((state: RootState) => state.settings.data)))
  const handleAddContact = async () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.email || !newContact.message) {
      alert('Please fill out all fields!')
      return
    }

    setLoading(true)
    try {
      const res = await contactApi.add({
        title: `${newContact.firstName} ${newContact.lastName}`,
        fullName: `${newContact.firstName} ${newContact.lastName}`,
        email: newContact.email,
        phoneNumber: newContact.phoneNumber,
        message: newContact.message,
        status: 1
      })
      if (res.status === 200) {
        alert('Message sent successfully!')
        setNewContact({ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' }) // Reset form
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-black text-white p-6 rounded-md mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Thông tin liên hệ</h2>
          <p className='mb-4'>"Bạn hãy nói gì đó với Bele 😉"</p>
          <br />
          <br />
          <ul className='space-y-4'>
            <li className='flex items-center'>
              <span className='mr-4'>&#9743;</span> {settings?.info.hotline}
            </li>
            <li className='flex items-center'>
              <span className='mr-4'>&#9993;</span> {settings?.info.email}
            </li>
            <li className='flex items-center'>
              <span className='mr-4'>&#127968;</span> {settings?.address.branchAddress1}
            </li>
            <li className='flex items-center'>
              <span className='mr-4'>&#127968;</span> {settings?.address.branchAddress2}
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-2xl font-bold mb-4'>Hãy để lại dấu ấn của bạn</h2>
          <form className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='First Name'
                value={newContact.firstName}
                onChange={(e) => setNewContact((prev) => ({ ...prev, firstName: e.target.value }))}
                className='border border-gray-300 px-4 py-2 rounded'
              />
              <input
                type='text'
                placeholder='Last Name'
                value={newContact.lastName}
                onChange={(e) => setNewContact((prev) => ({ ...prev, lastName: e.target.value }))}
                className='border border-gray-300 px-4 py-2 rounded'
              />
            </div>
            <input
              type='email'
              placeholder='Email'
              value={newContact.email}
              onChange={(e) => setNewContact((prev) => ({ ...prev, email: e.target.value }))}
              className='border border-gray-300 px-4 py-2 rounded w-full'
            />
            <input
              type='text'
              placeholder='Phone Number'
              value={newContact.phoneNumber}
              onChange={(e) => setNewContact((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              className='border border-gray-300 px-4 py-2 rounded w-full'
            />
            <textarea
              placeholder='Write your message...'
              value={newContact.message}
              onChange={(e) => setNewContact((prev) => ({ ...prev, message: e.target.value }))}
              className='border border-gray-300 px-4 py-2 rounded w-full h-32'
            ></textarea>
            <button
              type='button'
              onClick={handleAddContact}
              className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  )
}

export default ContactPageClient
