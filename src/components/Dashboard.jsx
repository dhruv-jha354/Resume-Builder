import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import CreateResumeModal from "./resumeCreate/CreateResumeModal";
import UploadResumeModal from "./resumeCreate/UploadResumeModal";
import { getUserResumes, deleteResume } from "../services/firebaseService";
import { useAuth } from "../context/AuthContext";
import Navbar from "../home/Navbar";

/**
 * Dashboard Page (/dashboard)
 * Shows ONLY the currently logged-in user's private resumes.
 * Resumes are strictly queried from `users/{currentUser.uid}/resumes`.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser: user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchResumes(user.uid);
        } else {
            // User is not logged in or logged out -> clear state and redirect
            setResumes([]);
            setLoading(false);
            navigate("/login");
        }
    }, [user, navigate]);

    const fetchResumes = async (uid) => {
        setLoading(true);
        try {
            const userResumes = await getUserResumes(uid);
            setResumes(userResumes || []);
        } catch (error) {
            console.error("Error fetching resumes:", error);
            setResumes([]);
        } finally {
            setLoading(false);
        }
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-16 md:pb-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            My Resumes
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Create, manage, and edit your personal resumes.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/create")}
                            className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-950 transition flex items-center gap-2"
                        >
                            Browse 6 Templates
                        </button>
                        <button
                            onClick={() => navigate("/demo")}
                            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition flex items-center gap-2 shadow-sm"
                        >
                            <FiEye size={15} /> Demo Gallery
                        </button>
                    </div>
                </div>
                
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="h-64 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse flex flex-col justify-between">
                                <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6 items-start">
                        {/* Create Resume Card */}
                        <div
                            onClick={() => setShowModal(true)}
                            className="w-full sm:w-56 h-64 border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 rounded-2xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 
                            bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FaPlus className="text-xl" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                Create New Resume
                            </p>
                        </div>

                        {/* Existing User Resumes */}
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                onClick={() => navigate(`/resume-builder/${resume.id}`)}
                                className="w-full sm:w-56 h-64 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm
                                flex flex-col cursor-pointer hover:border-indigo-500/80 dark:hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1
                                bg-white dark:bg-slate-900 overflow-hidden group transition-all duration-300"
                            >
                                <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 transition-colors">
                                    <FaFileAlt className="text-5xl text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors transform group-hover:scale-105" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-900 relative transition-colors">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate pr-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {resume.title || "Untitled Resume"}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Updated: {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "Recently"}
                                    </p>
                                    <button 
                                        onClick={(e) => handleDelete(e, resume.id)}
                                        className="absolute bottom-4 right-4 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
                                        title="Delete Resume"
                                    >
                                        <FaTrash size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Upload Resume Card */}
                        <div 
                            onClick={() => setShowUploadModal(true)}
                            className="w-full sm:w-56 h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-purple-500 hover:shadow-xl hover:-translate-y-1 
                            bg-white/80 dark:bg-slate-900/80 group transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FaUpload className="text-xl" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
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