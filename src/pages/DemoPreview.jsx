import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiCopy, FiChevronRight, FiInfo, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getDemoResumeById, duplicateDemoResume } from "../services/firebaseService";
import TemplateRenderer from "../components/resumeCreate/templates/TemplateRenderer";

/**
 * Demo Preview Page (/demo/:resumeId)
 * Full-page preview of any of the 6 public demo resumes.
 * Users can view the exact template layout and 1-click duplicate it into their account.
 */
const DemoPreview = () => {
    const { resumeId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [demoResume, setDemoResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [duplicating, setDuplicating] = useState(false);

    useEffect(() => {
        const fetchDemo = async () => {
            setLoading(true);
            try {
                const data = await getDemoResumeById(resumeId);
                setDemoResume(data);
            } catch (err) {
                console.error("Error fetching demo resume:", err);
            } finally {
                setLoading(false);
            }
        };

        if (resumeId) {
            fetchDemo();
        }
    }, [resumeId]);

    const handleUseTemplate = async () => {
        if (!currentUser) {
            navigate("/login", { 
                state: { message: "Sign in to use this template." } 
            });
            return;
        }

        if (!demoResume) return;

        setDuplicating(true);
        try {
            const duplicated = await duplicateDemoResume(currentUser.uid, demoResume);
            navigate(`/resume-builder/${duplicated.id}`);
        } catch (err) {
            console.error("Error duplicating demo template:", err);
            alert("Could not copy template. Please check database permissions.");
        } finally {
            setDuplicating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Loading Demo Resume...</p>
                </div>
            </div>
        );
    }

    if (!demoResume) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Demo Resume Not Found</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">The requested demo resume does not exist or has been removed.</p>
                    <Link
                        to="/demo"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
                    >
                        <FiArrowLeft size={16} /> Return to Demo Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
            {/* Top Bar Navigation */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center flex-wrap gap-4">
                    
                    {/* Left: Back Button & Title */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/demo")}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
                            title="Back to Gallery"
                        >
                            <FiArrowLeft size={18} />
                            <span className="hidden sm:inline">Gallery</span>
                        </button>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-sm">
                                    {demoResume.title}
                                </h1>
                                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                                    <FiLock size={10} /> Read-Only
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Template: <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{demoResume.template}</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Primary Action Button */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleUseTemplate}
                            disabled={duplicating}
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                        >
                            {duplicating ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Copying to Account...
                                </>
                            ) : (
                                <>
                                    <FiCopy size={16} /> Use This Template
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Sub-header Breadcrumb & Info Banner */}
            <div className="bg-indigo-600/10 dark:bg-indigo-950/40 border-b border-indigo-200/60 dark:border-indigo-900/40 py-3 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
                    {/* Breadcrumbs */}
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
                        <FiChevronRight size={12} />
                        <Link to="/demo" className="hover:text-indigo-600 dark:hover:text-indigo-400">Demo Resumes</Link>
                        <FiChevronRight size={12} />
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[150px]">Resume Preview</span>
                    </div>

                    {/* Info Text */}
                    <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-medium">
                        <FiInfo size={14} /> You are viewing a public read-only demo. Click <strong>"Use This Template"</strong> to edit.
                    </div>
                </div>
            </div>

            {/* Resume Viewer Container */}
            <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-h-[850px]">
                    <TemplateRenderer templateId={demoResume.template} resumeData={demoResume} />
                </div>
            </main>
        </div>
    );
};

export default DemoPreview;
