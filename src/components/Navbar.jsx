import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Templates", path: "/templates" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-1">
                    resume<span className="text-green-500 text-3xl">.</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex flex-1 justify-center space-x-8">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.path}
                            className="text-sm font-medium text-gray-600 hover:text-green-500 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {!currentUser ? (
                        <>
                            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-green-500 transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup" className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-green-500 transition-colors shadow-sm">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="text-sm font-semibold text-gray-700 hover:text-green-500 transition-colors">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors">
                                Log out
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-gray-700 p-2 focus:outline-none"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 py-6 bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-medium text-gray-700 hover:text-green-500"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
                            {!currentUser ? (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full px-4 py-3 text-center border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                                        Log in
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full px-4 py-3 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full px-4 py-3 text-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="w-full px-4 py-3 text-center border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                                        Log out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
