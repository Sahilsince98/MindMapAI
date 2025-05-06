import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";
import testOne from "../data/testOne.json";
import testTwo from "../data/testTwo.json";
import { Report } from "../pages/Report";
import { useLocation } from "react-router-dom";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  ideal_answer: string;
}
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [performanceReport, setPerformanceReport] = useState("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const query = useQuery();
  const formPath = query.get("formPath");
  useEffect(() => {
    if (formPath === "testOne"){
      setQuestions(testOne.questions)
      setSelectedAnswers(new Array(testOne.questions.length).fill(""))
    }else {
      setQuestions(testTwo.questions)
      setSelectedAnswers(new Array(testTwo.questions.length).fill(""))
    }

    // Timer logic
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1); // Increment time every second
    }, 1000);

    return () => clearInterval(timer); // Clear the timer on unmount
  }, []);

  const handleOptionClick = (option: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = option;
    setSelectedAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        calculateResults(updatedAnswers);
        setIsLoading(false);
        setShowResults(true);
      }, 1000);
    }
  };

  const calculateResults = (answers: string[]) => {
    let score = 0;
    questions.forEach((q, idx) => {
      const correctOption = q.ideal_answer;
      const selectedIndex = ["A", "B", "C", "D"].indexOf(answers[idx]);
      const correctIndex = ["A", "B", "C", "D"].indexOf(correctOption);

      if (selectedIndex !== -1 && q.options[selectedIndex] === q.options[correctIndex]) {
        score++;
      }
    });

    const percentage = Math.round((score / questions.length) * 100);
    setPerformanceReport(
      `You answered ${score} out of ${questions.length} questions correctly. Your score: ${percentage}%.`
    );
  };

  const getOptionLetter = (index: number) => ["A", "B", "C", "D"][index];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-10xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <RotatingLines width="50" strokeColor="#4f46e5" />
          </div>
        ) : showResults ? (
          <div className="mx-auto max-w-10xl">
            <Report data={performanceReport} timeSpent={timeSpent} />
          </div>
        ) : questions.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {questions[currentQuestion].category}
              </h2>

              <div className="h-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
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
                  {currentQuestion + 1}. {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(getOptionLetter(index))}
                      className={`w-full p-4 rounded-xl text-left transition-all ${selectedAnswers[currentQuestion] === getOptionLetter(index)
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
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Questions;







