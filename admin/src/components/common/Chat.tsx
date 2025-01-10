import SendIcon from '../icons/SendIcon'
import Search from './Forms/Search'

interface ChatMessage {
  id: number
  sender: string
  message: string
  timestamp: string
}

const messages: ChatMessage[] = [
  {
    id: 1,
    sender: 'Khoa Pham',
    message: 'Tôi muốn chỉnh sửa lại thông tin đ...',
    timestamp: '10:30:23 14/05/2012'
  },
  {
    id: 2,
    sender: 'Khoa Pham',
    message: 'Tôi muốn chỉnh sửa lại thông tin đ...',
    timestamp: '10:30:23 14/05/2012'
  },
  {
    id: 3,
    sender: 'Khoa Pham',
    message: 'Tôi muốn chỉnh sửa lại thông tin đ...',
    timestamp: '10:30:23 14/05/2012'
  },
  {
    id: 4,
    sender: 'Khoa Pham',
    message: 'Tôi muốn chỉnh sửa lại thông tin đ...',
    timestamp: '10:30:23 14/05/2012'
  }
]

const ChatInterface = () => {
  return (
    <div className='flex h-screen bg-white'>
      {/* Left sidebar */}
      <div className='w-[400px] border-r flex flex-col'>
        <div className='p-4 border-b'>
          <Search onSearch={() => {}} />
        </div>

        {/* Message list */}
        <div className='flex-1 overflow-y-auto'>
          {messages.map((msg) => (
            <div key={msg.id} className='p-4 border-b hover:bg-gray-50 cursor-pointer'>
              <div className='text-lg font-medium text-black'>{msg.sender}</div>
              <div className='text-base text-muted-foreground truncate'>{msg.message}</div>
              <div className='text-sm text-muted-foreground mt-1'>{msg.timestamp}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}

        {/* Chat messages */}
        <div className='h-[calc(100%-100px)] overflow-y-auto '>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='p-4 flex justify-end'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>Ai rảnh má ơi</button>
          </div>
          <div className='p-4 flex justify-end'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>Ai rảnh má ơi</button>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>
          <div className='flex p-4'>
            <div className='inline-block bg-gray-100 rounded-lg px-6 py-3 max-w-[80%]'>
              Tôi muốn chỉnh sửa lại thông tin đơn hàng
            </div>
          </div>

          <div className='p-4 flex justify-end'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>Ai rảnh má ơi</button>
          </div>
          <div className='p-4 flex justify-end'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>Ai rảnh má ơi</button>
          </div>
          <div className='p-4 flex justify-end'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md'>Ai rảnh má ơi</button>
          </div>
        </div>

        {/* Message input */}
        <div className='w-full p-4 border-t h-[100px] flex justify-center items-center'>
          <div className='w-full flex gap-2]'>
            <input placeholder='Write a message' className='flex-1 py-2 px-4 border rounded-lg' />
            <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center ml-2'>
              <SendIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
