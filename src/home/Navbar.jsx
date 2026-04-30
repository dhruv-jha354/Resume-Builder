import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const navItems = ["Home", "Features", "Testimonials", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    // Initialize dark mode based on class or preference
    if (document.documentElement.classList.contains('dark') || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <h1 onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white cursor-pointer"
        >
          Resume<span className="text-indigo-500">Builder</span>
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <a key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Buttons & Toggle */}
        <div className="hidden md:flex items-center space-x-3">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 text-gray-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-2"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/login")}
                className="px-5 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                Login
              </button>
              <button onClick={() => navigate("/signup")}
                className="px-5 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition shadow-sm"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/dashboard")}
                className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-sm"
              >
                  Create Resume
              </button>

              <button onClick={handleLogout}
                className="px-5 py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button & Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 text-gray-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700 dark:text-slate-300 p-2"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white dark:bg-slate-950 border-t dark:border-slate-800 space-y-4">
          {/* Nav Links */}
          <div className="pt-4 space-y-2">
            {navItems.map((item) => (
              <a key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col space-y-3 pt-4 border-t dark:border-slate-800">
            {!isLoggedIn ? (
              <>
                <button onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                  Login
                </button>
                <button onClick={() => {
                    navigate("/signup");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
                    Create Resume
                </button>
                <button onClick={handleLogout}
                  className="w-full px-4 py-2.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;