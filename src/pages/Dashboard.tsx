import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Rocket, Star, Heart, Rainbow } from "lucide-react";
import {
  FaBrain,
  FaComments,
  FaBook,
  FaClipboardList,
  FaSun,
  FaLightbulb,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { decodeToken } from "../utils/decodeToken";
const IconCard = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: any;
  title: string;
  color: string;
  description?: string;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} p-6 rounded-2xl shadow-lg text-center cursor-pointer`}
    onClick={onClick}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-block"
    >
      <Icon size={48} className="text-white mb-3" />
    </motion.div>
    <h3 className="text-white font-bold">{title}</h3>
    {description && <p className="text-sm text-gray-200 mt-2">{description}</p>}
  </motion.div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>("Friend");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenData = decodeToken(token);
        if (tokenData && tokenData.name) {
          setUserName(tokenData.name);
        }
      } catch (error) {
        console.error("Failed to decode token:");
      }
    } else {
      console.warn("No token found in localStorage.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8 pt-24">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Rainbow size={64} className="text-purple-600 mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Welcome {userName}!
          </h1>
          <p className="text-gray-600">
            Let's explore the wonderful world of fun and learning!
          </p>
        </div>

{/* 
        <Route path="/chart" element={<Chart />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/adventures" element={<Adventures />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/quiz" element={<Quiz/>} />
                  <Route path="/motivation" element={<Motivation />} />
                  <Route path="/profile" element={<Profile />} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IconCard
            icon={FaBrain}
            title="Self-Evaluation"
            description="AI-driven, Mental, Social, Emotional, and Physical tests"
            color="bg-yellow-500"
            onClick={() => navigate("/test")}
          />
          <IconCard
            icon={FaComments}
            title="Chat With Counselor"
            description="AI Chat Module for emotional & academic support"
            color="bg-pink-500"
            onClick={() => navigate("/chart")}
          />
          <IconCard
            icon={FaBook}
            title="Learning Support"
            description="AI-driven subject Learning assessments"
            color="bg-blue-500"
            onClick={() => navigate("/test")}
          />
          <IconCard
            icon={FaSun}
            title="Motivational Quotes"
            description="Get inspired with a collection of uplifting and motivational quotes to fuel your journey."
            color="bg-green-500"
            onClick={() => navigate("/motivation")}
          />
          <IconCard
            icon={FaClipboardList}
            title="Copy Ninja"
            description="Personalized To-Do & Schedular Planner"
            color="bg-orange-500"
            onClick={() => navigate("/games")}
          />
            <IconCard
            icon={FaLightbulb}
            title="Learning Something New"
            description="Daily educational insights & Skills building content"
            color="bg-indigo-500"
            onClick={() => navigate("/games")}
          />
        </div>
        {/* Floating stars animation */}
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

      {/* Chat Box */}
      {/* <ChatBox userName={userName} /> */}
    </div>
  );
};
