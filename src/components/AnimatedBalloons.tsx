import { motion } from 'framer-motion';
import { Moon as Balloon } from 'lucide-react';

const balloonColors = ['text-red-500', 'text-blue-500', 'text-yellow-500', 'text-green-500', 'text-purple-500'];

export const AnimatedBalloons = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${balloonColors[i]} opacity-50`}
          initial={{ y: '100vh', x: `${i * 20}vw` }}
          animate={{
            y: '-20vh',
            x: [`${i * 20}vw`, `${(i * 20 + 10)}vw`, `${i * 20}vw`],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <Balloon size={48} />
        </motion.div>
      ))}
    </div>
  );
};