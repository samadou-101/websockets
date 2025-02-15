import React, { useState } from "react";
import { Send, Menu, MoreVertical } from "lucide-react";

const ChatContainer = () => {
  const [message, setMessage] = useState("");

  const demoMessages = [
    {
      id: 1,
      text: "Hello! How are you?",
      sender: "other",
      timestamp: "09:41 AM",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      text: "I'm doing great! Just finished working on a new project. How about you?",
      sender: "me",
      timestamp: "09:42 AM",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 3,
      text: "That sounds interesting! What kind of project were you working on?",
      sender: "other",
      timestamp: "09:43 AM",
      avatar: "/api/placeholder/32/32",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              {/* <img
                src=""
                alt="Chat Avatar"
                className="w-10 h-10 rounded-full object-cover"
              /> */}
              <div>
                <h1 className="font-semibold text-gray-800">Team Chat</h1>
                <p className="text-sm text-gray-500">3 members • Active now</p>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {demoMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender !== "me" && (
              <img
                src={msg.avatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full self-end"
              />
            )}
            <div
              className={`flex flex-col ${
                msg.sender === "me" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-md ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm border"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {msg.timestamp}
              </span>
            </div>
            {msg.sender === "me" && (
              <img
                src={msg.avatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full self-end"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-gray-50 placeholder-gray-500"
          />
          <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
