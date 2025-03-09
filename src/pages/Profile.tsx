import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
interface Question {
  id: string;
  question: string;
  type: "text" | "select" | "multiselect" | "radio";
  options?: string[];
  required?: boolean;
}

interface Section {
  title: string;
  questions: Question[];
}

const sections: Section[] = [
  {
    title: "Personal Information & Background",
    questions: [
      {
        id: "fullName",
        question: "What is your full name?",
        type: "text",
        required: true,
      },
      {
        id: "age",
        question: "What is your age?",
        type: "text",
        required: true,
      },
      {
        id: "grade",
        question: "What grade/class are you currently in?",
        type: "text",
        required: true,
      },
      {
        id: "location",
        question: "Which city and country do you live in?",
        type: "text",
        required: true,
      },
      {
        id: "languages",
        question: "What language(s) do you speak fluently?",
        type: "text",
        required: true,
      },
      {
        id: "livingStatus",
        question: "Do you live with your parents/guardians?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "siblings",
        question: "Do you have any siblings? If yes, how many?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Academic Interests & Strengths",
    questions: [
      {
        id: "favoriteSubjects",
        question: "Which subjects do you enjoy the most?",
        type: "multiselect",
        options: [
          "Math",
          "Science",
          "History",
          "English/Literature",
          "Arts/Music",
          "Computer Science",
          "Physical Education",
        ],
        required: true,
      },
      {
        id: "challengingSubjects",
        question: "Which subjects do you find the most challenging?",
        type: "text",
        required: true,
      },
      {
        id: "studyPreference",
        question: "How do you prefer to study?",
        type: "select",
        options: [
          "Reading books",
          "Watching videos",
          "Doing practical exercises",
          "Discussing with friends/teachers",
          "Using online learning platforms",
        ],
        required: true,
      },
    ],
  },
  {
    title: "Social & Emotional Well-being",
    questions: [
      {
        id: "confidenceLevel",
        question: "How would you describe your confidence level?",
        type: "select",
        options: [
          "Very confident",
          "Somewhat confident",
          "Neutral",
          "Not very confident",
          "Not confident at all",
        ],
        required: true,
      },
      {
        id: "stressHandling",
        question: "How do you handle stress during exams or assignments?",
        type: "text",
        required: true,
      },
      {
        id: "socialComfort",
        question: "How do you feel in social situations?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Career Aspirations & Role Models",
    questions: [
      {
        id: "careerPath",
        question: "What career path interests you the most?",
        type: "select",
        options: [
          "Science & Technology",
          "Medicine & Healthcare",
          "Business & Entrepreneurship",
          "Arts & Entertainment",
          "Law & Government",
          "Education & Teaching",
          "Others",
        ],
        required: true,
      },
      {
        id: "roleModel",
        question: "Who is your biggest role model, and why?",
        type: "text",
        required: true,
      },
      {
        id: "admiredQualities",
        question: "What qualities do you admire in successful people?",
        type: "text",
        required: true,
      },
      {
        id: "lifeGoal",
        question:
          "If you could achieve one big goal in life, what would it be?",
        type: "text",
        required: true,
      },
      {
        id: "careerSkills",
        question:
          "Have you ever thought about what skills you need to achieve your dream career?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Hobbies & Extracurricular Activities",
    questions: [
      {
        id: "hobbies",
        question: "What hobbies do you enjoy in your free time?",
        type: "text",
        required: true,
      },
      {
        id: "schoolClubs",
        question: "Do you participate in any school clubs or activities?",
        type: "text",
        required: true,
      },
      {
        id: "sports",
        question: "Do you like playing sports? If yes, which ones?",
        type: "text",
        required: true,
      },
      {
        id: "reading",
        question: "Do you enjoy reading books? If yes, what genre?",
        type: "text",
        required: true,
      },
      {
        id: "creativeActivities",
        question:
          "How often do you engage in creative activities like drawing, writing, or music?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Learning Style & Cognitive Skills",
    questions: [
      {
        id: "problemSolving",
        question: "How do you usually solve problems?",
        type: "select",
        options: [
          "Logical thinking",
          "Creative thinking",
          "Asking for help",
          "Trial and error",
        ],
        required: true,
      },
      {
        id: "memorySkill",
        question: "How good are you at remembering information?",
        type: "select",
        options: ["Excellent", "Good", "Average", "Below Average"],
        required: true,
      },
      {
        id: "selfLearning",
        question:
          "Do you like to learn new things on your own (self-learning)?",
        type: "text",
        required: true,
      },
      {
        id: "techComfort",
        question: "How comfortable are you with using technology for learning?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Daily Routine & Lifestyle",
    questions: [
      {
        id: "sleepHours",
        question: "How many hours do you usually sleep per night?",
        type: "text",
        required: true,
      },
      {
        id: "exercise",
        question:
          "How often do you exercise or participate in physical activities?",
        type: "text",
        required: true,
      },
      {
        id: "schoolDay",
        question: "What does your typical school day look like?",
        type: "text",
        required: true,
      },
      {
        id: "routine",
        question: "Do you follow a daily routine or schedule?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Personal Development & Growth Mindset",
    questions: [
      {
        id: "handleFailure",
        question: "How do you handle failure or setbacks?",
        type: "text",
        required: true,
      },
      {
        id: "learningMistakes",
        question: "Do you enjoy learning from your mistakes?",
        type: "text",
        required: true,
      },
      {
        id: "personalGoals",
        question: "How often do you set personal goals for yourself?",
        type: "text",
        required: true,
      },
      {
        id: "seekFeedback",
        question:
          "Do you seek feedback from teachers or peers to improve yourself?",
        type: "text",
        required: true,
      },
      {
        id: "motivation",
        question: "What motivates you the most to work hard?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Decision Making & Problem-Solving",
    questions: [
      {
        id: "decisionStyle",
        question: "When making a decision, do you rely on logic or emotions?",
        type: "select",
        options: [
          "Mostly logic",
          "Mostly emotions",
          "Both equally",
          "Depends on the situation",
        ],
        required: true,
      },
      {
        id: "difficultSituations",
        question:
          "How do you handle difficult situations with friends or classmates?",
        type: "text",
        required: true,
      },
      {
        id: "riskTaking",
        question: "Do you like taking risks, or do you prefer playing it safe?",
        type: "select",
        options: [
          "Like taking risks",
          "Prefer playing it safe",
          "Balanced approach",
          "Depends on the situation",
        ],
        required: true,
      },
    ],
  },
  {
    title: "Future Readiness & Adaptability",
    questions: [
      {
        id: "adaptToChange",
        question: "How well do you adapt to changes in your routine?",
        type: "select",
        options: [
          "Very easily",
          "Somewhat easily",
          "With some difficulty",
          "With great difficulty",
        ],
        required: true,
      },
      {
        id: "newExperiences",
        question:
          "Do you like trying new experiences outside of your comfort zone?",
        type: "text",
        required: true,
      },
      {
        id: "constructiveCriticism",
        question: "How do you react to constructive criticism?",
        type: "text",
        required: true,
      },
      {
        id: "lifelongLearning",
        question: "Do you believe in lifelong learning and self-improvement?",
        type: "select",
        options: [
          "Strongly believe",
          "Somewhat believe",
          "Neutral",
          "Not really",
        ],
        required: true,
      },
    ],
  },
];

export const Profile = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    const currentQuestions = sections[currentSection].questions;
    const allAnswered = currentQuestions.every((question) => {
      const answer = answers[question.id];
      if (question.required) {
        if (Array.isArray(answer)) {
          return answer.length > 0;
        }
        return answer && answer.trim() !== "";
      }
      return true;
    });

    if (allAnswered) {
      setShowError(false);
      if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      }
    } else {
      setShowError(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      setShowError(false);
    }
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setShowError(false);
  };

  const renderQuestion = (question: Question) => {
    const isError =
      showError &&
      question.required &&
      (!answers[question.id] ||
        (Array.isArray(answers[question.id]) &&
          answers[question.id].length === 0));

    const inputClassName = `w-full p-2 rounded-md border ${
      isError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
    } focus:ring-1`;

    switch (question.type) {
      case "text":
        return (
          <input
            type="text"
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className={inputClassName}
            placeholder={question.required ? "Required" : "Optional"}
          />
        );
      case "select":
        return (
          <select
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className={inputClassName}
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "multiselect":
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={((answers[question.id] as string[]) || []).includes(
                    option
                  )}
                  onChange={(e) => {
                    const currentAnswers =
                      (answers[question.id] as string[]) || [];
                    if (e.target.checked) {
                      handleAnswer(question.id, [...currentAnswers, option]);
                    } else {
                      handleAnswer(
                        question.id,
                        currentAnswers.filter((a) => a !== option)
                      );
                    }
                  }}
                  className={`rounded ${
                    isError
                      ? "text-red-500 focus:ring-red-500"
                      : "text-purple-500 focus:ring-purple-500"
                  }`}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={(answers[question.id] as string) === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className={
                    isError
                      ? "text-red-500 focus:ring-red-500"
                      : "text-purple-500 focus:ring-purple-500"
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 "
        >
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl font-bold text-purple-600">
              {sections[currentSection].title}
            </h2>
            <div className="text-sm text-gray-500">
              Section {currentSection + 1} of {sections.length}
            </div>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentSection + 1) / sections.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
            >
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-red-700">
                Please fill in all required fields before proceeding.
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6  "
            >
              {sections[currentSection].questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {question.question}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentSection === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200"
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentSection === sections.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentSection === sections.length - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
