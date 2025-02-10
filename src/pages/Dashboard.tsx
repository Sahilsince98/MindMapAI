import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Star, Heart, Rainbow } from 'lucide-react';
import { ChatBox } from '../components/ChatBox';

const IconCard = ({ icon: Icon, title, color, onClick }: { icon: any, title: string, color: string, onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} p-6 rounded-2xl shadow-lg text-center cursor-pointer`}
    onClick={onClick}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-block"
    >
      <Icon size={48} className="text-white mb-3" />
    </motion.div>
    <h3 className="text-white font-bold">{title}</h3>
  </motion.div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Friend');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.name) {
      setUserName(currentUser.name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8 pt-24">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Rainbow size={64} className="text-purple-600 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome {userName}!</h1>
          <p className="text-gray-600">Let's explore the wonderful world of fun and learning!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IconCard 
            icon={Star} 
            title="Adventures" 
            color="bg-yellow-500" 
            onClick={() => navigate('/adventures')}
          />
          <IconCard 
            icon={Heart} 
            title="Friends" 
            color="bg-pink-500" 
            onClick={() => navigate('/friends')}
          />
          <IconCard 
            icon={Rocket} 
            title="Games" 
            color="bg-blue-500" 
            onClick={() => navigate('/games')}
          />
        </div>

        {/* Floating stars animation */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-yellow-400 pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Star size={16} />
          </motion.div>
        ))}
      </motion.div>

      {/* Chat Box */}
      <ChatBox userName={userName} />
    </div>
  );
};