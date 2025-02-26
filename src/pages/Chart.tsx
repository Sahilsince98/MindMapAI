import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import decodeToken from "../lib/decodeToken";
import axios from "axios";
import {
  MessageSquare,
  Send,
  Sparkles,
  X,
  Notebook as Robot,
} from "lucide-react";
interface TokenData {
  id: string; 
}
import { marked } from "marked"; 
const API_URL =import.meta.env.VITE_APP_PORT;
const token = localStorage.getItem("token");
const tokenData = decodeToken(token as string) as TokenData; // Cast the return type
const id = tokenData?.id
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
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>(""); // Store AI response to simulate typing
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const simulateTyping = (responseText: string) => {
    if (!responseText) {
      responseText = "";
    }

    const tempElement = document.createElement("div");
    tempElement.innerHTML = responseText;

    const elements = Array.from(tempElement.childNodes);
    let currentElementIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentElementIndex < elements.length) {
        const currentElement = elements[currentElementIndex] as HTMLElement;
        setAiResponse((prev) => prev + currentElement.outerHTML);
        currentElementIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 350);
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setAiResponse("");
    try {
      setNewMessage("");
      const response = await axios.post(`${API_URL}/userChart`, {
        query: newMessage,
        user_id: id,
      });
      const aiResponseText =
        response?.data?.answer?.text || "I'm not sure, can you rephrase that?";
      const formattedAIResponse = marked(aiResponseText as string);
      simulateTyping(formattedAIResponse as string);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formattedAIResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesContainerRef?.current) {
      // Scroll to the bottom of the messages container
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 ">
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  zIndex: 9999, // Ensure chat box is on top of other elements
                }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] flex flex-col relative order-2 lg:order-1 z-1 "
              >
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
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: message.content,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}

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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Toggle Button */}
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
