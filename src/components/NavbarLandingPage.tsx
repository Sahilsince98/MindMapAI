import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavbarLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate=useNavigate()
 const handleLoginNavigate = () => {
  navigate("/login")
 }
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MindMapAI - AI Powered Guidance</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button onClick={handleLoginNavigate} className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col py-4 space-y-4 px-4">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
              <button  className="w-full px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block text-gray-600 hover:text-purple-600 font-medium transition-colors"
  >
    {children}
  </a>
);

export default NavbarLandingPage;