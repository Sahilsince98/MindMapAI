import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

interface Speech {
  id: number;
  title: string;
  speaker: string;
  content: string;
  image: string;
  duration: string;
}

const motivationalSpeeches: Speech[] = [
  {
    id: 1,
    title: "Dream Big, Achieve Bigger",
    speaker: "Dr. Maya Anderson",
    content: "Every great achievement started with a dream. Your potential is limitless, and your future is in your hands. Don't let anyone tell you what you can't do. Instead, show them what you can do.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    duration: "5:30"
  },
  {
    id: 2,
    title: "The Power of Persistence",
    speaker: "Prof. James Wilson",
    content: "Success isn't about never falling down; it's about getting back up every time you fall. Your persistence is what transforms dreams into reality. Keep pushing forward, even when the path seems difficult.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    duration: "4:45"
  },
  {
    id: 3,
    title: "Embrace Your Journey",
    speaker: "Sarah Chen",
    content: "Your path is unique to you. Don't compare your chapter 1 to someone else's chapter 20. Focus on your growth, celebrate your progress, and trust in your journey.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    duration: "6:15"
  },
  {
    id: 4,
    title: "Turn Challenges into Opportunities",
    speaker: "Dr. Michael Brown",
    content: "Every challenge you face is an opportunity to grow stronger. The obstacles in your path are not stopping points; they are stepping stones to greater heights.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    duration: "5:00"
  },
  {
    id: 5,
    title: "The Future is Yours",
    speaker: "Emma Thompson",
    content: "You have the power to shape your future. Every small step you take today is creating the tomorrow you dream of. Believe in yourself, work hard, and make it happen.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    duration: "4:30"
  }
];

export const Motivation = () => {
  const [currentSpeech, setCurrentSpeech] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const nextSpeech = () => {
    setCurrentSpeech((prev) => (prev + 1) % motivationalSpeeches.length);
  };

  const previousSpeech = () => {
    setCurrentSpeech((prev) => (prev - 1 + motivationalSpeeches.length) % motivationalSpeeches.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4 md:p-8 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Lightbulb size={48} className="text-yellow-600 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">Daily Motivation</h1>
          <p className="text-gray-600">Get inspired with powerful speeches from amazing leaders</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpeech}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative"
            >
              <img
                src={motivationalSpeeches[currentSpeech].image}
                alt={motivationalSpeeches[currentSpeech].title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{motivationalSpeeches[currentSpeech].title}</h2>
                <p className="text-lg">{motivationalSpeeches[currentSpeech].speaker}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="p-8">
            <motion.p
              key={currentSpeech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-700 text-lg mb-8"
            >
              {motivationalSpeeches[currentSpeech].content}
            </motion.p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-yellow-500 text-white p-4 rounded-full"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-gray-600 p-2"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </motion.button>
                <span className="text-gray-600">{motivationalSpeeches[currentSpeech].duration}</span>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={previousSpeech}
                  className="bg-gray-100 p-3 rounded-full"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSpeech}
                  className="bg-gray-100 p-3 rounded-full"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {motivationalSpeeches.map((speech, index) => (
            <motion.div
              key={speech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setCurrentSpeech(index)}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${
                currentSpeech === index ? 'ring-2 ring-yellow-500' : ''
              }`}
            >
              <img
                src={speech.image}
                alt={speech.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{speech.title}</h3>
                <p className="text-gray-600 text-sm">{speech.speaker}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};