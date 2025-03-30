import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { marked } from "marked";
import axios from "axios";
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
const Quiz = () => {
  const location = useLocation();
  const allQuizzes: Record<string, Question[]> = {
    iqTest: [
      {
        id: 1,
        question: "What comes next in the sequence? 2, 6, 12, 20, 30, ?",
        options: ["38", "40", "42", "44"],
        correctAnswer: 3,
      },
      {
        id: 2,
        question: "Which shape completes the pattern?🟦 ➝ 🔷 ➝ 🟨 ➝ 🔶 ➝ ?",
        options: ["🟦", "🟥", "🔺", "🟥"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Find the odd one out:",
        options: ["Cunning", "Clever", "Intelligent", "Foolish"],
        correctAnswer: 4,
      },
      {
        id: 4,
        question:
          "If a car travels 60 km in 90 minutes, what is its speed in km/h?",
        options: ["30 km/h", "40 km/h", "45 km/h", "60 km/h"],
        correctAnswer: 3,
      },
      {
        id: 5,
        question:
          "Which number replaces the question mark? 1, 1, 2, 3, 5, 8, ?",
        options: ["10", "11", "13", "15"],
        correctAnswer: 3,
      },
      {
        id: 6,
        question: "Which word is most similar to Benevolent?",
        options: ["Generous", "Harmful", "Thoughtful", "Dangerous"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "Which shape is the mirror image of: 🔻📐 ?",
        options: ["🔼📐", "📐🔻", "🔺📐", "📐🔺"],
        correctAnswer: 2,
      },
      {
        id: 8,
        question:
          "If John is taller than Alice, and Alice is taller than Sam, who is the shortest?",
        options: ["John", "Alice", "Sam", "Cannot be determined"],
        correctAnswer: 3,
      },
      {
        id: 9,
        question:
          "If all Bloops are Razzles and all Razzles are Lumps, then all Bloops are definitely:",
        options: ["Razzles", "Lumps", "Both A & B", "None of the above"],
        correctAnswer: 3,
      },
      {
        id: 10,
        question:
          "You see a list: Apple, Banana, Carrot, Dragonfruit, Eggplant. What was the third item?",
        options: ["Apple", "Carrot", "Dragonfruit", "Eggplant"],
        correctAnswer: 2,
      },
    ],
    personalityTest: [
      {
        id: 1,
        question:
          "When you experience strong emotions, you can easily identify what you're feeling.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 2,
        question: "You remain calm and collected even in stressful situations.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 3,
        question:
          "You can easily understand how others are feeling, even without them saying it.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 4,
        question:
          "You find it easy to express your emotions in a healthy and constructive way.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 5,
        question:
          "When someone gives you negative feedback, you handle it without becoming defensive.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 6,
        question:
          "You are good at resolving conflicts and maintaining positive relationships.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 7,
        question:
          "You have effective strategies to manage stress and avoid emotional burnout.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 8,
        question:
          "You think before reacting emotionally in difficult situations.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 9,
        question:
          "You find it easy to start conversations and connect with people.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
      {
        id: 10,
        question:
          "You focus more on solutions rather than dwelling on problems.",
        options: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
        correctAnswer: 2, // "Agree"
      },
    ],
    memoryTest: [
      {
        id: 1,
        question:
          "If a doctor gives you three pills and tells you to take one every 30 minutes, how long will they last?",
        options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
        correctAnswer: 2, // 60 minutes
      },
      {
        id: 2,
        question: "A rooster lays an egg on a rooftop. Which way does it roll?",
        options: ["Left", "Right", "Down", "Roosters don’t lay eggs"],
        correctAnswer: 4, // Roosters don’t lay eggs
      },
      {
        id: 3,
        question:
          "You are in a race and you pass the person in 2nd place. What place are you in now?",
        options: ["1st", "2nd", "3rd", "4th"],
        correctAnswer: 2, // 2nd
      },
      {
        id: 4,
        question:
          "A store sells a shirt for $20. You buy it with a $50 bill. How much change should you get?",
        options: ["$20", "$30", "$40", "$50"],
        correctAnswer: 2, // $30
      },
      {
        id: 5,
        question: "Which is heavier: a ton of bricks or a ton of feathers?",
        options: [
          "Bricks",
          "Feathers",
          "They weigh the same",
          "Depends on the materials",
        ],
        correctAnswer: 3, // They weigh the same
      },
      {
        id: 6,
        question:
          "If a train is moving 100 mph north and the wind is blowing 100 mph south, which way does the smoke go?",
        options: ["North", "South", "Up", "Trains don’t have smoke anymore"],
        correctAnswer: 4, // Trains don’t have smoke anymore
      },
      {
        id: 7,
        question: "How many months have 28 days?",
        options: ["1", "6", "12", "9"],
        correctAnswer: 3, // 12
      },
      {
        id: 8,
        question: "If you divide 30 by half and add 10, what do you get?",
        options: ["15", "25", "70", "50"],
        correctAnswer: 3, // 70
      },
      {
        id: 9,
        question:
          "A farmer has 5 sheep, and all but 3 run away. How many are left?",
        options: ["0", "3", "5", "2"],
        correctAnswer: 2, // 3
      },
      {
        id: 10,
        question:
          "You’re in a dark room with a match, a candle, and a lamp. What do you light first?",
        options: ["The candle", "The lamp", "The match", "None"],
        correctAnswer: 3, // The match
      },
    ],
  };
  // Extract quiz type from location.state
  const quizType = location.state?.quizType;
  const questionType = location.state?.details;
  // Get the selected quiz questions
  const questions: Question[] = allQuizzes[quizType] || [];
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(true); // Track if timer is active
  const [isLoading, setIsLoading] = useState(false);
  const [performanceReport, setPerformanceReport] = useState<string>("");
  const [dynamicQuestions, setDynamicQuestions] = useState<Question[]>([]);
  console.log(dynamicQuestions, "dynamicQuestions-");
  const [answers, setAnswers] = useState<number[]>([]);
  const API_URL = import.meta.env.VITE_APP_PORT;
  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
    const timer = setInterval(() => {
      if (startTime !== null && timerActive) {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, timerActive]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < dynamicQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (answers.every((answer) => answer !== -1)) {
      calculateResults();
    }
  };
  // create Performace report
  const calculateResults = async () => {
    // Stop the timer when the quiz is completed
    setTimerActive(false);
    // Correct answers count
    const correctAnswers = answers.filter(
      (answer, index) => answer === dynamicQuestions[index]?.correctAnswer - 1
    ).length;

    const totalTime = timeSpent; // Time taken in seconds
    // Prepare data to send
    const resultsData = {
      query: answers.map((answer, index) => ({
        question: dynamicQuestions[index]?.question,
        answer: dynamicQuestions[index]?.options[answer],
        correctAnswer:
          dynamicQuestions[index]?.options[
            dynamicQuestions[index]?.correctAnswer - 1
          ],
        timeTaken: timeSpent, // Adjust as needed
      })),
      correctAnswers: correctAnswers,
      totalTime: totalTime,
    };
    setResult(
      `You got ${correctAnswers} out of ${dynamicQuestions.length} correct.`
    );
    setShowResults(true);
    try {
      setIsLoading(true);
      // Send the data to the backend
      const response = await fetch(`${API_URL}/quizResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultsData),
      });
      if (response.ok) {
        const data = await response.json();

        const performanceReport = marked(data.report);
        setPerformanceReport(performanceReport as string);
        setIsLoading(false);
      } else {
        console.error("Error submitting results");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending results:", error);
    }
  };
  //create Questions
  const createQuestion = async () => {
    setIsLoading(true);
    try {
      const query = questionType;
      const data = {
        subject: query.subject,
        topic: query.topic,
        referenceBook: query.referenceBook,
      };
      const response = await axios.post(`${API_URL}/createQuestion`, data);
      setDynamicQuestions(response?.data?.report?.questions || []);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location.state?.details) {
      createQuestion();
    } else {
      console.log("Details are missing in location.state");
    }
  }, []);
  useEffect(() => {
    if (dynamicQuestions.length > 0) {
      // Initialize answers array when dynamicQuestions are set
      setAnswers(new Array(dynamicQuestions?.length).fill(-1));
    }
  }, [dynamicQuestions]);
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
            {isLoading ? (
              ""
            ) : (
              <div className="mb-8">
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-full bg-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentQuestion + 1) / dynamicQuestions.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-center mt-2 text-gray-600">
                  Question {currentQuestion + 1} of {dynamicQuestions.length}
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="mb-8"
              >
                {isLoading ? (
                  ""
                ) : (
                  <h2 className="text-2xl font-bold text-purple-600 mb-6">
                    {dynamicQuestions[currentQuestion]?.question}
                  </h2>
                )}

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center ">
                      <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        strokeColor="#0000FF" // Pure blue
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{
                          color: "#0000FF", // Ensure color is explicitly applied
                        }}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    dynamicQuestions[currentQuestion]?.options?.map(
                      (option, index) => (
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
                      )
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {isLoading ? (
              ""
            ) : (
              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === -1}
                  className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
                >
                  {currentQuestion === dynamicQuestions.length - 1 &&
                  answers[currentQuestion] !== -1
                    ? "Finish"
                    : "Next"}
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Quiz Complete Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-7 text-center w-full sm:w-3/4 mx-auto m-2"
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
                Based on your answers:
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-purple-500 mb-8"
              >
                {result}
              </motion.div>
              <p className="text-xl text-gray-600 mb-6">
                Time taken: {timeSpent} seconds
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/test")}
                className="bg-purple-500 text-white px-8 py-3 rounded-full"
              >
                Back to Tests
              </motion.button>
            </motion.div>

            {/* Performance Report Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500 m-3 via-pink-500 to-red-500 text-white rounded-3xl shadow-2xl p-7 mt-5 w-full sm:w-3/4  "
            >
              <h2 className="text-3xl font-bold mb-6">Performance Report</h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
                {isLoading ? (
                  <div className="flex justify-center items-center ">
                    <RotatingLines
                      visible={true}
                      height="96"
                      width="96"
                      strokeColor="#FFFFFF"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{
                        color: "#FFFFFF", // Ensure color is explicitly applied
                      }}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <div
                    className="bg-white text-gray-800 rounded-2xl shadow-md p-6 overflow-y-auto max-h-96 max-w-10xl"
                    dangerouslySetInnerHTML={{
                      __html: performanceReport,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
