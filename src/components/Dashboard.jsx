import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import CreateResumeModal from "./resumeCreate/CreateResumeModal";
import UploadResumeModal from "./resumeCreate/UploadResumeModal";
import { getUserResumes, deleteResume } from "../services/firebaseService";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser: user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    useEffect(() => {
        if (user) {
            fetchResumes(user.uid);
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    const fetchResumes = async (uid) => {
        setLoading(true);
        try {
            const userResumes = await getUserResumes(uid);
            setResumes(userResumes);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

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
        await signOut(auth);
        navigate("/login");
    };

    const handleDelete = async (e, resumeId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this resume? This cannot be undone.")) {
            try {
                await deleteResume(user.uid, resumeId);
                setResumes(prev => prev.filter(r => r.id !== resumeId));
            } catch (error) {
                console.error("Error deleting resume:", error);
                alert("Failed to delete resume.");
            }
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Navbar */}
            <div className="w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 px-6 md:px-20 lg:px-32 xl:px-40 py-4 md:py-5 flex justify-between items-center transition-colors duration-300">
                <Link to="/"
                    className="text-2xl md:text-3xl font-semibold tracking-tight flex gap-1 items-center text-gray-800 dark:text-white no-underline transition-colors"
                    style={{ fontFamily: "Outfit, sans-serif" }} >resume
                    <div className="w-2 h-2 rounded-full mt-2 md:mt-3 bg-green-500"></div>
                </Link>
                <div className="flex items-center gap-3 md:gap-6">
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    <p className="text-gray-600 dark:text-slate-300 text-sm md:text-md hidden sm:block transition-colors">
                        Hi, <span className="font-semibold">{user.email}</span>
                    </p>

                    <button onClick={handleLogout}
                        className="px-4 md:px-6 py-2 text-sm md:text-base border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 md:px-20 lg:px-32 xl:px-40 pt-8 md:pt-12 pb-16 md:pb-24">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 md:mb-8 transition-colors">My Resumes</h2>
                
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6 items-start">
                        {/* Create Resume */}
                        <div
                            onClick={() => setShowModal(true)}
                            className="w-full sm:w-48 h-64 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-purple-400 hover:shadow-md 
                            bg-white dark:bg-slate-800 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <FaPlus className="text-lg text-purple-600 dark:text-purple-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
                                Create Resume
                            </p>
                        </div>

                        {/* Existing Resumes */}
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                onClick={() => navigate(`/resume-builder/${resume.id}`)}
                                className="w-full sm:w-48 h-64 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm
                                flex flex-col cursor-pointer hover:border-blue-400 hover:shadow-md 
                                bg-white dark:bg-slate-800 overflow-hidden group transition-colors">
                                <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border-b border-gray-100 dark:border-slate-700 transition-colors">
                                    <FaFileAlt className="text-4xl text-gray-300 dark:text-slate-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 relative transition-colors">
                                    <h3 className="font-semibold text-gray-800 dark:text-slate-200 text-sm truncate pr-6">{resume.title || "Untitled Resume"}</h3>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                        Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                    <button 
                                        onClick={(e) => handleDelete(e, resume.id)}
                                        className="absolute bottom-4 right-4 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                        title="Delete Resume"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Upload Resume */}
                        <div onClick={() => setShowUploadModal(true)}
                            className="w-full sm:w-48 h-64 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-blue-400 hover:shadow-md 
                            bg-white dark:bg-slate-800 group transition-colors">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                <FaUpload className="text-lg text-blue-500 dark:text-blue-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
                                Upload Existing
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showModal && (
                <CreateResumeModal
                    onClose={() => setShowModal(false)}
                    user={user}
                />
            )}
            
            {showUploadModal && (
                <UploadResumeModal
                    onClose={() => setShowUploadModal(false)}
                    user={user}
                />
            )}
        </div>
    );
};

export default Dashboard;