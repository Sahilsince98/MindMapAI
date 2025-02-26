import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const About = () => {
  const benefits1 = [
    "Personalized learning experience",
    "AI-driven progress tracking",
    "24/7 support system",
    "Interactive learning materials",
    "Real-time performance analytics",
    "Expert-curated content",
  ];
  const benefits2 = [
    "Helps students reduce stress & gain confidence",
    "Guides them on study techniques & learning improvement",
    "Motivates them to follow successful role models",
    "Makes learning interactive, personalized & fun!",
    "Real-time performance analytics",
    " Gives parents & teachers valuable insights into student progress",
  ];
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Students learning"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transform Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI-powered platform revolutionizes the way students learn,
              making education more accessible, engaging, and effective than
              ever before.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits1.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <br />
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why This AI is a Game-Changer for Students?
            </h2>
            {/* <p className="text-xl text-gray-600 mb-8">
              Our AI-powered platform revolutionizes the way students learn,
              making education more accessible, engaging, and effective than
              ever before.
            </p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits2.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <video
              src="/videos/ai.mp4"
              controls
              autoPlay
              muted
              loop
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
