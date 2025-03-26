// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Menu, X, Brain } from "lucide-react";
// import { useLocation, useNavigate, Link } from "react-router-dom";

// const NavbarLandingPage = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation(); // Get current route
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   const navigate = useNavigate();
//   const handleLoginNavigate = () => {
//     navigate("/login");
//   };
//   const handleLandingPageNavigate = () => {
//     navigate("/");
//   };
//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           <div className="flex items-center">
//             <Brain className="w-8 h-8 text-purple-600" />
//             <span
//               onClick={handleLandingPageNavigate}
//               className="ml-2 text-xl font-bold text-gray-900  cursor-pointer"
//             >
//               MindMapAI
//             </span>
//           </div>
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {location.pathname == "/landing-page-test" ? (
//               ""
//             ) : (
//               <>
//                 <NavLink href="#features">Features</NavLink>
//                 <NavLink href="#about">About</NavLink>
//                 {/* <NavLink href="#pricing">Pricing</NavLink>
//             <NavLink href="#contact">Contact</NavLink> */}
//                 <Link to="/landing-page-test">Test</Link>
//               </>
//             )}
//             <button
//               onClick={handleLoginNavigate}
//               className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
//             >
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6 text-gray-600" />
//               ) : (
//                 <Menu className="w-6 h-6 text-gray-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden bg-white border-t"
//           >
//             <div className="flex flex-col py-4 space-y-4 px-4">
//               {location.pathname == "/landing-page-test" ? (
//                 ""
//               ) : (
//                 <>
//                   <MobileNavLink href="#features">Features</MobileNavLink>
//                   <MobileNavLink href="#about">About</MobileNavLink>
//                   {/* <MobileNavLink href="#pricing">Pricing</MobileNavLink>
//               <MobileNavLink href="#contact">Contact</MobileNavLink> */}
//                   <Link to="/landing-page-test">Test</Link>
//                 </>
//               )}
//               <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
//                 Get Started
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.nav>
//   );
// };
// const NavLink = ({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) => (
//   <a
//     href={href}
//     className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
//   >
//     {children}
//   </a>
// );

// const MobileNavLink = ({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) => (
//   <a
//     href={href}
//     className="block text-gray-600 hover:text-purple-600 font-medium transition-colors"
//   >
//     {children}
//   </a>
// );

// export default NavbarLandingPage;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Brain, ChevronDown } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const NavbarLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-600" />
            <span
              onClick={() => navigate("/")}
              className="ml-2 text-xl font-bold text-gray-900 cursor-pointer"
            >
              MindMapAI
            </span>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {location.pathname !== "/landing-page-test"&& location.pathname !== "/questions" && (
              <>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#about">About</NavLink>

                {/* Dropdown for Test */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <span className="text-gray-600 hover:text-purple-600 font-medium flex items-center">
                    Test <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                  
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-[200px] p-1 bg-white shadow-lg rounded-lg"
                    >
                      <Link
                        to="/soft-skills-test"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:rounded-lg"
                      >
                        Soft Skills Test
                      </Link>
                      <Link
                        to="/soft-skills-test"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-100  hover:rounded-lg"
                      >
                        Career Strengths Test
                      </Link>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Get Started Button */}
          <div className="hidden md:flex">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
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
              {location.pathname !== "/landing-page-test"&& location.pathname !== "/questions" && (
                <>
                  <MobileNavLink href="#features">Features</MobileNavLink>
                  <MobileNavLink href="#about">About</MobileNavLink>

                  {/* Dropdown in Mobile Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex justify-between w-full text-gray-600 hover:text-purple-600 font-medium transition-colors"
                    >
                      Test <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {isDropdownOpen && (
                      <div className="mt-2 w-full bg-white shadow-md rounded-lg">
                        <Link
                          to="/soft-skills-test"
                          className="block px-4 py-2 text-gray-700 hover:bg-purple-100"
                        >
                          Soft Skills Test
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}

              <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="block text-gray-600 hover:text-purple-600 font-medium transition-colors"
  >
    {children}
  </a>
);

export default NavbarLandingPage;
