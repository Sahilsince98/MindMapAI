import { motion } from "framer-motion";
import { ClipboardCheck, Brain, Star, Trophy, Heart, Sparkles } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Test = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    referenceBook: "",
  });

  const subjects = ["Mathematics", "History", "Physics", "Chemistry", "Biology"]; // Add more subjects as needed

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { subject, topic, referenceBook } = formData;

    // Check if all fields are filled
    if (!subject || !topic || !referenceBook) {
      alert("All fields are required.");
      return;
    }

    // Navigate with state
    navigate("/quiz", {
      state: { quizType: "iqTest", details: formData },
    });
  };
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
              onClick={() => setShowPopup(true)}
              // onClick={() => navigate("/quiz", { state: { quizType: "iqTest" } })}
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
              onClick={() => navigate("/quiz",{ state: { quizType: "personalityTest" } })}
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
                          onClick={() => navigate("/quiz",{ state: { quizType: "memoryTest" } })}

              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600"
            >
              Start Test
            </motion.button>
          </motion.div>
                {/* Creativity Test */}
                {/* <motion.div
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
          </motion.div> */}
      {/* Challenge */}
          {/* <motion.div
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
          </motion.div> */}
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
            {/* Popup */}
            {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h4 className="text-xl font-bold text-center mb-4">Quiz Details</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic/Lesson
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="Enter topic/lesson"
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reference Book
                </label>
                <input
                  type="text"
                  name="referenceBook"
                  value={formData.referenceBook}
                  onChange={handleInputChange}
                  placeholder="Enter reference book"
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600"
                >
                  Start Quiz
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}
  

    </div>
  );
};
