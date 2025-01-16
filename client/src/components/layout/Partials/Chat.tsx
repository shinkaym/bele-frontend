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
        className='fixed bottom-4 right-4 bg-blue-primary  text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-primary-light transition focus:outline-none'
      >
        💬 Chat
      </button>

      {/* Chat Box */}
      {isChatOpen && <ChatBox onClose={handleCloseChat} />}
    </>
  )
}

export default Chat
