import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Gift, PartyPopper as Party, Share2 } from 'lucide-react';

const activities = [
  { title: 'Create Party', icon: Party, description: 'Plan a fun party with your friends!' },
  { title: 'Find Friends', icon: Users, description: 'Connect with new friends who share your interests!' },
  { title: 'Share Stories', icon: MessageCircle, description: 'Tell your amazing stories to friends!' },
  { title: 'Send Gifts', icon: Gift, description: 'Share virtual gifts with your friends!' },
  { title: 'Group Chat', icon: MessageCircle, description: 'Chat with multiple friends at once!' },
  { title: 'Share Adventures', icon: Share2, description: 'Share your adventures with friends!' },
];

export const Friends = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4 md:p-8 pt-24">
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8 ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Users size={48} className="text-pink-600 mb-4" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2 md:mb-4">Friendly Fun</h1>
          <p className="text-gray-600 text-sm md:text-base">Connect with friends and share amazing moments!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <motion.div
                className="bg-pink-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <activity.icon size={24} className="text-pink-600" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-pink-600 text-center mb-2">{activity.title}</h3>
              <p className="text-gray-600 text-center text-sm md:text-base mb-4">{activity.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-pink-500 text-white py-2 md:py-3 rounded-full font-bold hover:bg-pink-600 transition-colors text-sm md:text-base"
              >
                Let's Go!
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Floating hearts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-pink-400 pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart size={16} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};