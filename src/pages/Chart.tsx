import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import decodeToken from "../lib/decodeToken";
import {
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Heart,
  Smile,
  Sun,
  Moon,
  Cloud,
  X,
  Notebook as Robot,
} from "lucide-react";
import axios from "axios";
const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const tokenData = decodeToken(token);
const id = tokenData.id;
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chart = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi friend! I'm your magical learning buddy! How can I help you today? 🌟",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]); // User message

    setIsLoading(true); // Set loading state to true when sending the message

    try {
      setNewMessage(""); // Clear the input field after receiving AI response
      const response = await axios.post(`${API_URL}/userChart`, {
        query: newMessage,
        user_id: id,
      });
      const aiResponseText =
        response?.data?.answer?.text || "I'm not sure, can you rephrase that?";

      // Simulate AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]); // AI message

      setIsLoading(false); // Set loading state to false once the response is received
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] flex flex-col relative order-2 lg:order-1 "
              >
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex items-center justify-between ">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="text-white" size={24} />
                    </motion.div>
                    <h2 className="text-white font-bold text-lg">
                      Magic Learning Chat
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-purple-500 text-white rounded-br-none"
                            : "bg-blue-100 text-purple-900 rounded-bl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Show loading indicator when waiting for AI response */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start items-center space-x-2"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="bg-purple-100 p-2 rounded-full"
                      >
                        <Robot size={24} className="text-purple-500" />
                      </motion.div>
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                        <div className="flex space-x-1">
                          {[1, 2, 3].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-2 h-2 bg-purple-500 rounded-full"
                              animate={{
                                y: ["0%", "-50%", "0%"],
                                opacity: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: dot * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Message Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t bg-white"
                >
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600"
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </form>

                {/* Floating Decorations */}
                {[Star, Heart, Sun, Moon, Cloud].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-purple-200 pointer-events-none"
                    style={{
                      top: `${Math.random() * 70 + 15}%`,
                      left: `${Math.random() * 70 + 15}%`,
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Section */}
          <div className="order-1 lg:order-2">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Star size={64} className="text-purple-600" />
              </motion.div>
              <h1 className="text-4xl font-bold text-purple-600 mb-4">
                Your Progress
              </h1>
              <p className="text-gray-600">Keep up the great work! 🌟</p>
            </div>

            <div className="space-y-6">
              {/* Progress Cards */}
              {["Reading", "Math", "Science"].map((subject, index) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-xl"
                >
                  <h3 className="text-xl font-bold text-purple-600 mb-3">
                    {subject}
                  </h3>
                  <div className="relative h-4 bg-purple-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(index + 1) * 25}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </div>
                  <p className="text-right mt-2 text-sm text-gray-600">
                    {(index + 1) * 25}% Complete
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button (visible when chat is hidden) */}
      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default Chart;
