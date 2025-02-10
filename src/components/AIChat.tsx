import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          content: msg.message,
          isAI: msg.is_ai,
          timestamp: msg.created_at,
        })));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Save user message
      const { data: userMsg, error: userError } = await supabase
        .from('chat_history')
        .insert([
          {
            user_id: user.id,
            message: newMessage,
            is_ai: false,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      setMessages(prev => [...prev, {
        id: userMsg.id,
        content: newMessage,
        isAI: false,
        timestamp: userMsg.created_at,
      }]);

      setNewMessage('');

      // Simulate AI response (replace with actual AI integration)
      const aiResponse = "I understand how you feel. Let's work together to find a solution.";
      
      const { data: aiMsg, error: aiError } = await supabase
        .from('chat_history')
        .insert([
          {
            user_id: user.id,
            message: aiResponse,
            is_ai: true,
          },
        ])
        .select()
        .single();

      if (aiError) throw aiError;

      setMessages(prev => [...prev, {
        id: aiMsg.id,
        content: aiResponse,
        isAI: true,
        timestamp: aiMsg.created_at,
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.isAI
                  ? 'bg-purple-100 text-purple-900'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? <Loader className="animate-spin" /> : <Send />}
          </button>
        </div>
      </form>
    </div>
  );
};