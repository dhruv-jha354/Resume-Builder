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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={!loading ? onClose : undefined}
            ></div>

            {/* Modal box */}
            <div className="relative bg-white w-96 p-6 rounded-2xl shadow-xl transform transition-all">
                <div className="flex justify-between mb-4 items-center">
                    <h2 className="font-bold text-xl text-gray-800">Create Resume</h2>
                    <button 
                        onClick={onClose} 
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Software Engineer Resume"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center ${
                            title.trim() && !loading
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating...
                        </div>
                    ) : (
                        "Create New Resume"
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateResumeModal;