import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";
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
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <div className="w-full bg-white border-b border-gray-200 px-16 py-5 flex justify-between items-center">
                <Link to="/"
                    className="text-3xl font-semibold tracking-tight flex gap-1 items-center text-gray-800 no-underline"
                    style={{ fontFamily: "Outfit, sans-serif" }} >resume
                    <div className="w-2 h-2 rounded-full mt-3 bg-green-500"></div>
                </Link>
                <div className="flex items-center gap-6">
                    <p className="text-gray-600 text-md">
                        Hi, <span className="font-semibold">{user.email}</span>
                    </p>

                    <button onClick={handleLogout}
                        className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-16 pt-12 pb-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">My Resumes</h2>
                
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6 items-start">
                        {/* Create Resume */}
                        <div
                            onClick={() => setShowModal(true)}
                            className="w-48 h-64 border-2 border-dashed border-gray-300 rounded-xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-purple-400 hover:shadow-md hover:-translate-y-1
                            transition-all duration-300 bg-white">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                <FaPlus className="text-lg text-purple-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                Create Resume
                            </p>
                        </div>

                        {/* Existing Resumes */}
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                onClick={() => navigate(`/resume-builder/${resume.id}`)}
                                className="w-48 h-64 border border-gray-200 rounded-xl shadow-sm
                                flex flex-col cursor-pointer hover:border-blue-400 hover:shadow-md hover:-translate-y-1
                                transition-all duration-300 bg-white overflow-hidden group">
                                <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100">
                                    <FaFileAlt className="text-4xl text-gray-300 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="p-4 bg-white relative">
                                    <h3 className="font-semibold text-gray-800 text-sm truncate pr-6">{resume.title || "Untitled Resume"}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                    <button 
                                        onClick={(e) => handleDelete(e, resume.id)}
                                        className="absolute bottom-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Delete Resume"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Upload Resume */}
                        <div onClick={() => setShowUploadModal(true)}
                            className="w-48 h-64 border-2 border-dashed border-gray-300 rounded-xl 
                            flex flex-col items-center justify-center 
                            cursor-pointer hover:border-blue-400 hover:shadow-md hover:-translate-y-1
                            transition-all duration-300 bg-white group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                                <FaUpload className="text-lg text-blue-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">
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