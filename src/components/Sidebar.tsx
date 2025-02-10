import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  ClipboardCheck, 
  Compass, 
  Users, 
  Gamepad2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: BarChart, label: 'Chart', path: '/chart' },
  { icon: ClipboardCheck, label: 'Test', path: '/test' },
  { icon: Compass, label: 'Adventures', path: '/adventures' },
  { icon: Users, label: 'Friends', path: '/friends' },
  { icon: Gamepad2, label: 'Games', path: '/games' },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={{ width: 240 }}
      animate={{ 
        width: isExpanded ? 240 : 80,
        marginLeft: 0 
      }}
      className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 text-white fixed left-0 top-16 z-40 overflow-visible shadow-xl"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-4 bg-white text-purple-600 rounded-full p-2 shadow-lg hover:shadow-xl z-50"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </motion.button>

      <div className="flex flex-col h-full py-8">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.path} className="relative">
              <motion.div
                whileHover={{ x: 10 }}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center cursor-pointer p-4 ${
                  isActive ? 'bg-white/20' : 'hover:bg-white/10'
                } transition-all duration-200`}
              >
                <item.icon size={24} className="min-w-[24px]" />
                <AnimatePresence>
                  {(isExpanded || hoveredItem === item.path) && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4 font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Tooltip for collapsed state */}
              {!isExpanded && hoveredItem === item.path && (
                <motion.div
                  initial={{ opacity: 0, x: 70 }}
                  animate={{ opacity: 1, x: 80 }}
                  exit={{ opacity: 0, x: 70 }}
                  className="absolute left-0 top-0 bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-50"
                >
                  {item.label}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};