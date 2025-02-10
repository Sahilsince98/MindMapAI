import React from 'react';
import { motion } from 'framer-motion';
import { Star, Compass, Map, Mountain, Ship, Rocket } from 'lucide-react';

const adventures = [
  { title: 'Space Explorer', icon: Rocket, description: 'Journey through the stars and discover new planets!' },
  { title: 'Ocean Discovery', icon: Ship, description: 'Dive deep into the ocean and meet sea creatures!' },
  { title: 'Forest Mystery', icon: Mountain, description: 'Explore magical forests and find hidden treasures!' },
  { title: 'Desert Quest', icon: Compass, description: 'Cross the desert and uncover ancient secrets!' },
];

export const Adventures = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8 ml-[240px]">
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8">

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Map size={48} className="text-yellow-600 mb-4" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 md:mb-4">Magical Adventures</h1>
          <p className="text-gray-600 text-sm md:text-base">Choose your next exciting journey!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {adventures.map((adventure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-xl"
            >
              <motion.div
                className="bg-yellow-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <adventure.icon size={24} className="text-yellow-600" />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-yellow-600 text-center mb-2 md:mb-4">{adventure.title}</h2>
              <p className="text-gray-600 text-center text-sm md:text-base mb-4 md:mb-6">{adventure.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 text-white py-2 md:py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors text-sm md:text-base"
              >
                Start Adventure
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Floating stars */}
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
    </div>
  );
};