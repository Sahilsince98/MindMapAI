import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Brain, Music, Palette, Puzzle, Book } from 'lucide-react';

const games = [
  { title: 'Memory Match', icon: Brain, description: 'Test your memory with fun card matching!' },
  { title: 'Color Quest', icon: Palette, description: 'Learn colors through exciting challenges!' },
  { title: 'Math Adventure', icon: Puzzle, description: 'Make math fun with interactive games!' },
  { title: 'Word Wizard', icon: Book, description: 'Enhance vocabulary with magical word games!' },
  { title: 'Pattern Play', icon: Gamepad2, description: 'Create and match beautiful patterns!' },
  { title: 'Music Maker', icon: Music, description: 'Create your own magical melodies!' },
];

export const Games = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-4 md:p-8 pt-24">
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8 ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Gamepad2 size={48} className="text-blue-600 mb-4" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 md:mb-4">Fun Games</h1>
          <p className="text-gray-600 text-sm md:text-base">Play, learn, and have fun with these magical games!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <motion.div
                className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <game.icon size={24} className="text-blue-600" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-600 text-center mb-2">{game.title}</h3>
              <p className="text-gray-600 text-center text-sm md:text-base mb-4">{game.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-full font-bold hover:bg-blue-600 transition-colors text-sm md:text-base"
              >
                Play Now!
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Floating game controllers */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-blue-400 pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Gamepad2 size={16} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};