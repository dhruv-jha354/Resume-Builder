import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Templates", path: "/templates" },
  { name: "Demo Gallery", path: "/demo" },
  { name: "Features", path: "/#features" },
  { name: "Pricing", path: "/#pricing" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <h1 
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-black text-slate-900 dark:text-white cursor-pointer tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
          <span>Builder</span>
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons & Toggle */}
        <div className="hidden md:flex items-center space-x-3">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors mr-1"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {!currentUser ? (
            <>
              <button 
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate("/signup")}
                className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md shadow-indigo-500/20"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-sm font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-950 transition"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition"
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
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-slate-700 dark:text-slate-300 p-2"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white dark:bg-slate-950 border-t dark:border-slate-800 space-y-4">
          <div className="pt-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-3 pt-4 border-t dark:border-slate-800">
            {!currentUser ? (
              <>
                <button 
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition"
                >
                  Log in
                </button>
                <button 
                  onClick={() => {
                    navigate("/signup");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-bold shadow-md transition"
                >
                  Sign Up Free
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold transition"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition"
                >
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