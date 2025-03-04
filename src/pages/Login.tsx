import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AnimatedBalloons } from '../components/AnimatedBalloons';
import { LogIn, Star, Rocket, Heart, Sun, Rainbow } from 'lucide-react';
export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signIn(credentials.email, credentials.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      <AnimatedBalloons />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-full mb-4"
          >
            <LogIn size={40} />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome Back!
          </motion.h1>
          <p className="text-gray-600 text-lg mt-2">Ready for a new adventure?</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="email"
              placeholder="Your Magic Email"
              className="w-full px-6 py-4 rounded-full border-3 border-blue-300 focus:border-purple-400 focus:outline-none text-lg shadow-inner bg-blue-50"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="password"
              placeholder="Secret Password"
              className="w-full px-6 py-4 rounded-full border-3 border-purple-300 focus:border-blue-400 focus:outline-none text-lg shadow-inner bg-purple-50"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 ${
              isLoading ? 'opacity-75' : 'hover:shadow-xl'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Start Your Adventure!'}
          </motion.button>
        </form>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate('/register')}
            className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80"
          >
            New Friend? Join the Fun! 🚀
          </button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};