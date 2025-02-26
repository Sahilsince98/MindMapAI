import React from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                AI-Powered Student Success
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              AI-Powered Guidance for Every Student's Success
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Unlock the full potential of personalized learning with our
              cutting-edge AI-powered platform, designed to guide every student
              toward success. By analyzing individual strengths, identifying
              areas for improvement, and delivering tailored recommendations, we
              ensure each learner receives the support they need to excel. From
              academic planning to skill enhancement, our technology adapts to
              every student's unique journey, fostering growth, boosting
              confidence, and preparing them for a brighter future. With AI as
              your mentor, success is no longer a goal—it's a guarantee.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginNavigate}
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold flex items-center justify-center hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                Try AI Counseling for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold flex items-center justify-center border-2 border-purple-600 hover:bg-purple-50 transition-colors w-full sm:w-auto"
              >
                Learn More
                <Brain className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Students using AI platform"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      AI-Powered
                    </p>
                    <p className="text-xs text-gray-500">
                      Personalized Guidance
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
