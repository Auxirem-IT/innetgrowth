"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Send, Search } from "lucide-react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/utils/mockAuth";

export default function MessagesPage() {
  const { isAuthenticated, isHydrated } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    console.log("[MessagesPage] Mounted - isAuthenticated:", isAuthenticated, "isHydrated:", isHydrated);
  }, [isAuthenticated, isHydrated]);

  if (!mounted || !isHydrated) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!isAuthenticated) {
    const target = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirect=${target}`} replace />;
  }

  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Thanks for connecting!",
      time: "2h ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Dr. Rachel Kim",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "Looking forward to our session",
      time: "5h ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Great idea! Let's collaborate",
      time: "1d ago",
      unread: 1,
    },
    {
      id: 4,
      name: "AI Innovators",
      avatar: "https://i.pravatar.cc/150?img=30",
      lastMessage: "New post in the community",
      time: "2d ago",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      text: "Hi! I saw your profile and thought we should connect. Your work in AI is impressive!",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      text: "Thank you! I'd love to learn more about your design work as well.",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Sarah Chen",
      text: "Thanks for connecting! Would you be interested in collaborating on a project?",
      time: "11:00 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      text: "Absolutely! What did you have in mind?",
      time: "11:05 AM",
      isMe: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <div className="h-screen flex">
          {/* Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedChat === conv.id ? "bg-purple-50" : ""
                  }`}
                >
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="Sarah Chen"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                <p className="text-sm text-gray-500">Product Designer</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md ${msg.isMe ? "order-2" : "order-1"}`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.isMe
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 ${msg.isMe ? "text-right" : "text-left"}`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setMessage("");
                    }
                  }}
                />
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2">
                  <Send size={18} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
