import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaFilePdf, FaTimes, FaFileWord } from "react-icons/fa";
import { createResume } from "../../services/firebaseService";

const UploadResumeModal = ({ onClose, user }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.doc'))) {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF or DOCX file.");
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file || !user) return;
        
        setUploading(true);
        
        // Mock extraction progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 15;
            });
        }, 300);

        try {
            // Wait for simulated parsing
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Create in Firebase (Title can be the original filename without extension)
            const title = file.name.replace(/\.[^/.]+$/, "");
            const newResume = await createResume(user.uid, title);
            
            // NOTE: In a complete implementation, context/store would be populated with parsed data here.
            
            onClose();
            navigate(`/resume-builder/${newResume.id}`);
        } catch (error) {
            console.error("Error creating resume:", error);
            alert("Failed to process resume.");
        } finally {
            clearInterval(interval);
            setUploading(false);
        }
    };

    const getFileIcon = () => {
        if (!file) return null;
        if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
            return <FaFilePdf className="text-3xl text-red-500" />;
        }
        return <FaFileWord className="text-3xl text-blue-600" />;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pb-20">
            {/* Background blur overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity opacity-100"
                onClick={!uploading ? onClose : undefined}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform transition-all opacity-100 scale-100">
                <button 
                    onClick={onClose} 
                    disabled={uploading}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-all"
                >
                    <FaTimes size={18} />
                </button>
                
                <div className="text-center mb-8 mt-2">
                    <h2 className="font-bold text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                        Upload Resume
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
                        Upload your existing resume and we'll extract your information to kickstart the editing process.
                    </p>
                </div>

                {!file ? (
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`w-full h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all bg-gray-50/50 cursor-pointer ${
                            isDragging ? 'border-blue-500 bg-blue-50/50 shadow-inner' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/20'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className={`p-5 rounded-full mb-4 transition-colors ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}`}>
                            <FaCloudUploadAlt className="text-4xl" />
                        </div>
                        <p className="font-semibold text-gray-700 mb-1">
                            Click to browse <span className="font-normal text-gray-500">or drag & drop</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide uppercase">PDF or DOCX (Max 5MB)</p>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept=".pdf,.doc,.docx" 
                            className="hidden" 
                        />
                    </div>
                ) : (
                    <div className="w-full border border-gray-100 rounded-3xl p-6 bg-gray-50 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-5 mb-2 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                {getFileIcon()}
                            </div>
                            <div className="flex-1 min-w-0 py-1">
                                <p className="font-semibold text-gray-800 truncate text-lg pr-4">{file.name}</p>
                                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            {!uploading && (
                                <button 
                                    onClick={() => setFile(null)}
                                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <FaTimes size={16} />
                                </button>
                            )}
                        </div>
                        
                        <div className={`transition-all duration-500 ease-in-out ${uploading ? 'h-16 opacity-100 mt-6' : 'h-0 opacity-0 mt-0 overflow-hidden'}`}>
                            <div className="flex justify-between text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                <span>Extracting Data</span>
                                <span className={progress === 100 ? 'text-green-500' : 'text-blue-600'}>{progress}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-300 relative"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1.5s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                        
                        {!uploading && (
                            <button
                                onClick={handleUpload}
                                className="w-full mt-6 py-4 rounded-2xl font-bold bg-gray-900 text-white hover:bg-black shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform hover:-translate-y-0.5 transition-all outline-none"
                            >
                                Process & Edit Resume
                            </button>
                        )}

                        {/* Subtle decorative background blob during upload */}
                        {uploading && (
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
                        )}
                    </div>
                )}

                {!file && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your files are securely processed and never shared.
                    </div>
                )}
            </div>
            
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default UploadResumeModal;
