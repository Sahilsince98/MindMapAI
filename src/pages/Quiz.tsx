import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Brain, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What comes next in the sequence? 2, 6, 12, 20, 30, ?",

    options: [" 38", "40", "42", "44"],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: "Which shape completes the pattern?🟦 ➝ 🔷 ➝ 🟨 ➝ 🔶 ➝ ?",
    options: ["🟦", " 🟥", " 🔺", " 🟥"],
    correctAnswer:2,
  },
  {
    id: 3,
    question: "Find the odd one out:",
    options: [
      "Cunning",
      "Clever",
      "Intelligent",
      "Foolish",
    ],
    correctAnswer: 4,
  },
  {
    id: 4,
    question: "If a car travels 60 km in 90 minutes, what is its speed in km/h?",
    options: [
      "30 km/h",
      "40 km/h",
      "45 km/h",
      " 60 km/h",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "Which number replaces the question mark? 1, 1, 2, 3, 5, 8, ?",
    options: [
      "10",
      "11",
      "13",
      "15",
    ],
    correctAnswer: 3,
  },
  {
    id: 6,
    question: "Which word is most similar to Benevolent?",
    options: [
      "Generous",
      "Harmful",
      "Thoughtful",
      "Dangerous",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Which shape is the mirror image of: 🔻📐 ?",
    options: [
      "🔼📐",
      " 📐🔻",
      " 🔺📐",
      "📐🔺",
    ],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "If John is taller than Alice, and Alice is taller than Sam, who is the shortest?",
    options: [
      "John",
      "Alice",
      "Alice",
      "Cannot be determined",
    ],
    correctAnswer: 3,
  },
  {
    id: 9,
    question: "If all Bloops are Razzles and all Razzles are Lumps, then all Bloops are definitely:",
    options: [
      "Razzles",
      "Lumps",
      "Both A & B",
      "None of the above",
    ],
    correctAnswer: 3,
  },
  {
    id: 10,
    question: "You see a list: Apple, Banana, Carrot, Dragonfruit, Eggplant. What was the third item?",
    options: [
      "Apple",
      "Carrot",
      "Dragonfruit",
      "Eggplant",
    ],
    correctAnswer: 2,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (answers.every((answer) => answer !== -1)) {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    // This is a placeholder for the actual analysis
    // In reality, you would send this data to your OpenAI integration
    const learningStyles = [
      "Visual Learner",
      "Auditory Learner",
      "Kinesthetic Learner",
      "Mixed Learning Style",
    ];
    setResult(
      learningStyles[Math.floor(Math.random() * learningStyles.length)]
    );
    setShowResults(true);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-8 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl w-full mx-auto flex justify-center items-center z-50"
      >
        {!showResults ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-4xl">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-center mt-2 text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-purple-600 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        answers[currentQuestion] === index
                          ? "bg-purple-500 text-white"
                          : "bg-purple-50 text-purple-900 hover:bg-purple-100"
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-full flex items-center ${
                  currentQuestion === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-500 text-white"
                }`}
              >
                <ArrowLeft className="mr-2" size={20} />
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextQuestion}
                className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
              >
                {currentQuestion === questions.length - 1 &&
                answers[currentQuestion] !== -1
                  ? "Finish"
                  : "Next"}
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2 }}
              className="inline-block mb-6"
            >
              <Award size={64} className="text-purple-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Quiz Complete!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Based on your answers, you are a:
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-purple-500 mb-8"
            >
              {result}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/test")}
              className="bg-purple-500 text-white px-8 py-3 rounded-full"
            >
              Back to Tests
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
