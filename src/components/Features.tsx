import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Target, Users, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Personalized learning paths created by advanced AI algorithms to match your unique style.",
    },
    {
      icon: Target,
      title: "Smart Goals",
      description:
        "Set and track academic goals with AI-driven insights and progress monitoring.",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description:
        "Connect with peers and mentors in a supportive learning environment.",
    },
    {
      icon: Sparkles,
      title: "Instant Feedback",
      description:
        "Get real-time feedback on your work and suggestions for improvement.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover how our AI-powered platform can transform your learning
            experience
          </motion.p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
    >
      <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-6">
        <feature.icon className="w-10 h-10 text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {feature.title}
      </h3>
      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>


        <br/><br/><br/>
        <div
          id="ppt-embed"
          className="w-full h-screen border-2 border-gray-200 rounded-lg"
          style={{ position: "relative" }}
        >
       

   
      <iframe
        id="presentation-frame"
        allow="clipboard-write autoplay fullscreen"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: "none" }}
        src="https://app.presentations.ai/view/kvcyVE"
        scrolling="no"
      ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Features;
