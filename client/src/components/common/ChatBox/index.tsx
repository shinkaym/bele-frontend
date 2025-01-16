import React, { useState } from "react";

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "bot" }[]>([
    { id: 1, text: "Chào mừng đến với Bele! ", sender: "bot" },
    { id: 2, text: "Chúng tôi có thể giúp gì cho bạn?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    // if (!input.trim()) return;

    // const userMessage = { id: Date.now(), sender: "user", text: input.trim() };
    // // setMessages((prev) => [...prev, userMessage]);

    // setTimeout(() => {
    //   const botMessage = { id: Date.now() + 1, sender: "bot", text: `Bot: You said "${input.trim()}"` };
    // //   setMessages((prev) => [...prev, botMessage]);
    // }, 500);

    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Trò chuyện</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✖
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        //   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox