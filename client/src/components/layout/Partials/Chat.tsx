import ChatBox from "@/components/common/ChatBox"
import { useState } from "react"

const Chat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleOpenChat = () => setIsChatOpen(true)
  const handleCloseChat = () => {
    setIsChatOpen(false)
    console.log('Chat closed!') // Call the `onClose` logic here
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpenChat}
        className='fixed md:bottom-4 md:right-4 sm:bottom-3 sm:right-3 bottom-2 right-2 bg-blue-primary  text-white md:px-4 md:py-3 px-2 py-1  rounded-full shadow-lg hover:bg-blue-primary-light transition focus:outline-none'
      >
        💬 <span className="md:inline-block hidden">Chat</span>
      </button>

      {/* Chat Box */}
      {isChatOpen && <ChatBox onClose={handleCloseChat} />}
    </>
  )
}

export default Chat
