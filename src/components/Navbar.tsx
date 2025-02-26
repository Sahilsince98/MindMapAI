import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LogOut,User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };
  const handleEditProfile = () => {
    navigate('/profile');
  };
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 fixed w-full top-0 z-50"
    >
      <div className="flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield size={32} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Guardian
          </h1>
        </motion.div>
        <div className="flex space-x-4">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEditProfile}
            className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            <User size={20} />
            <span>Edit Profile</span>
          </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}



