import { motion } from "framer-motion";
import { ClipboardCheck, Brain, Star, Trophy, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export const Test = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-8  ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <ClipboardCheck size={64} className="text-yellow-600 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">
            Magic Tests
          </h1>
          <p className="text-gray-600">Challenge yourself with fun quizzes!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* //Quick IQ test */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <motion.div
              className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Brain size={32} className="text-yellow-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-yellow-600 text-center mb-4">
              Quick IQ test
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Test your knowledge with fun questions!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/quiz")}
              className="w-full bg-yellow-500 text-white py-3 rounded-full font-bold hover:bg-yellow-600"
            >
              Start Quiz
            </motion.button>
          </motion.div>
          {/* Quick personality test */}
          {/* Personality Test */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <motion.div
              className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={32} className="text-pink-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-pink-600 text-center mb-4">Personality Test</h3>
            <p className="text-gray-600 text-center mb-6">Discover your unique personality traits!</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-bold hover:bg-pink-600"
            >
              Start Test
            </motion.button>
          </motion.div>
              {/* Memory Test */}
              <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <motion.div
              className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain size={32} className="text-blue-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">Memory Test</h3>
            <p className="text-gray-600 text-center mb-6">Challenge your memory skills!</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600"
            >
              Start Test
            </motion.button>
          </motion.div>
                {/* Creativity Test */}
                <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <motion.div
              className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star size={32} className="text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-600 text-center mb-4">Creativity Test</h3>
            <p className="text-gray-600 text-center mb-6">Explore your creative potential!</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600"
            >
              Start Test
            </motion.button>
          </motion.div>
      {/* Challenge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <motion.div
              className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy size={32} className="text-orange-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-orange-600 text-center mb-4">
              Challenge Mode
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Take on special challenges!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-bold hover:bg-orange-600"
            >
              Start Challenge
            </motion.button>
          </motion.div>
        </div>

        {/* Floating stars animation */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-yellow-400"
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
