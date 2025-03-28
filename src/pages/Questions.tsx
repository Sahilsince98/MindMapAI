import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { marked } from "marked";
import axios from "axios";
import NavbarLandingPage from "../components/NavbarLandingPage";
import softSkillsQuestions from "../data/softSkills.json";
import {Report} from "../pages/Report"
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Section {
  section: string;
  questions: Question[];
}

const Questions = () => {
  const navigate = useNavigate();
  const questions: Section[] = softSkillsQuestions as Section[];
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
   const [result, setResult] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [performanceReport, setPerformanceReport] = useState<string>("");
  const [dynamicQuestions, setDynamicQuestions] = useState<Section[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  const API_URL = import.meta.env.VITE_APP_PORT;

  useEffect(() => {
    setDynamicQuestions(questions || []);
  }, [questions]);

  useEffect(() => {
    if (dynamicQuestions.length > 0) {
      setAnswers(
        new Array(dynamicQuestions[currentSection]?.questions.length).fill(-1)
      );
    }
  }, [dynamicQuestions, currentSection]);

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

  const handleNext = () => {
    if (
      currentQuestion <
      dynamicQuestions[currentSection].questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < dynamicQuestions.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const calculateResults = async () => {
    

    setTimerActive(false);
    const totalQuestions = Object.values(dynamicQuestions).reduce(
      (sum, section) => sum + section.questions.length,
      0
    );
    
    let questionIndex = 0; // To track the overall question index across sections
    
    const correctCount = Object.values(dynamicQuestions).reduce((count, section) => {
      return count + section.questions.reduce((sectionCount, question, index) => {
        const selectedAnswer = question.options[answers[questionIndex]];
        const correctAnswer = question.correct_answer;
        questionIndex++; // Move to the next answer in the array
    
        return selectedAnswer === correctAnswer ? sectionCount + 1 : sectionCount;
      }, 0);
    }, 0);
    
    let questionIndexForResults = 0;
    
    const resultsData = {
      query: Object.values(dynamicQuestions).flatMap(section =>
        section.questions.map((question) => {
          const answer = question.options[answers[questionIndexForResults]];
          const correctAnswer = question.correct_answer;
          const result = {
            question: question.question,
            answer,
            correctAnswer,
            timeTaken: timeSpent,
          };
          questionIndexForResults++;
          return result;
        })
      ),
      correctAnswers: correctCount,
      totalTime: timeSpent,
    };
    
    setResult(`You got ${correctCount} out of ${totalQuestions} correct.`);
    
    
    setShowResults(true);

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/createQuizReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultsData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setPerformanceReport(marked(data.report));
      } else {
        console.error("Error submitting results");
      }
    } catch (error) {
      console.error("Error sending results:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
  
      <div className=" min-h-[100vh]  flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100 px-4 py-6 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-8xl w-full mx-auto flex justify-center items-center  "
        >
          {!showResults ? (
            <div className="bg-white rounded-3xl  shadow-xl p-8 w-full max-w-4xl">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {dynamicQuestions[currentSection]?.section}
                </h2>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-full bg-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentQuestion + 1) /
                          dynamicQuestions[currentSection]?.questions.length) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-center mt-2 text-gray-600">
                  Question {currentQuestion + 1} of{" "}
                  {dynamicQuestions[currentSection]?.questions.length}
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
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        strokeColor="#0000FF"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold text-purple-600 mb-6">
                      {
                        dynamicQuestions[currentSection]?.questions[
                          currentQuestion
                        ]?.question
                      }
                    </h2>
                  )}

                  <div className="space-y-4">
                    {dynamicQuestions[currentSection]?.questions[
                      currentQuestion
                    ]?.options.map((option, index) => (
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

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === -1}
                  className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center"
                >
                  {currentQuestion ===
                  dynamicQuestions[currentSection]?.questions.length - 1
                    ? "Finish"
                    : "Next"}
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              {/* Quiz Complete Section */}
              {/* <motion.div
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
                  onClick={() => navigate("/questions")}
                  className="bg-purple-500 text-white px-8 py-3 rounded-full"
                >
                  Back to Tests
                </motion.button>
              </motion.div> */}

              {/* Performance Report Section */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500 m-3 via-pink-500 to-red-500 text-white rounded-3xl shadow-2xl p-7 mt-5 w-full sm:w-3/4  "
              >
                <h2 className="text-3xl font-bold mb-6">Performance Report</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-8"> */}
                  {/* {isLoading ? (
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
                   
                  )} */}
                <div className="mx-auto max-w-10xl">
                <Report data={performanceReport} />
                  </div>
                    
                {/* </div>
              </motion.div> */}
            </>
          )}
          
        </motion.div>
      </div>
    </>
  );
};

export default Questions;
