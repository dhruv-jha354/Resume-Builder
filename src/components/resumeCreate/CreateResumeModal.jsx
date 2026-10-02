import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../../services/firebaseService";

const CreateResumeModal = ({ onClose, user }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!title.trim() || !user) return;
        setLoading(true);

        try {
            // Create in Firebase
            const newResume = await createResume(user.uid, title.trim());
            
            // Close modal and navigate to builder with ID
            onClose();
            navigate(`/resume-builder/${newResume.id}`);
        } catch (error) {
            console.error("Error creating resume:", error);
            // Handle error appropriately (maybe show a toast notification)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            {/* Background blur */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                onClick={!loading ? onClose : undefined}
            ></div>

            {/* Modal box */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 transition-colors">
                <div className="flex justify-between mb-5 items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">Create New Resume</h2>
                    <button 
                        onClick={onClose} 
                        disabled={loading}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Resume Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Software Engineer Resume"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                        autoFocus
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && title.trim()) {
                                handleCreate();
                            }
                        }}
                    />
                </div>

                <button
                    onClick={handleCreate}
                    disabled={!title.trim() || loading}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                            title.trim() && !loading
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 cursor-pointer transform hover:-translate-y-0.5"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                        }`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating Resume...
                        </div>
                    ) : (
                        "Create Resume"
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateResumeModal;