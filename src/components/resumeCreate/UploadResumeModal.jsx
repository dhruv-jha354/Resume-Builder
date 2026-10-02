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
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            {/* Background blur overlay */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                onClick={!uploading ? onClose : undefined}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 transition-colors">
                <button 
                    onClick={onClose} 
                    disabled={uploading}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-all"
                >
                    <FaTimes size={18} />
                </button>
                
                <div className="text-center mb-6 mt-2">
                    <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                        Upload Resume
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs max-w-sm mx-auto">
                        Upload your existing resume file (PDF/DOCX) to start editing.
                    </p>
                </div>

                {!file ? (
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`w-full h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer ${
                            isDragging ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/20'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className={`p-4 rounded-full mb-3 transition-colors ${isDragging ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'}`}>
                            <FaCloudUploadAlt className="text-3xl text-indigo-500" />
                        </div>
                        <p className="font-semibold text-xs text-slate-700 dark:text-slate-200 mb-1">
                            Click to browse <span className="font-normal text-slate-500">or drag & drop</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">PDF or DOCX (Max 5MB)</p>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept=".pdf,.doc,.docx" 
                            className="hidden" 
                        />
                    </div>
                ) : (
                    <div className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-slate-50 dark:bg-slate-800/60 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-2 relative z-10">
                            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                                {getFileIcon()}
                            </div>
                            <div className="flex-1 min-w-0 py-1">
                                <p className="font-bold text-slate-800 dark:text-slate-200 truncate text-sm">{file.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            {!uploading && (
                                <button 
                                    onClick={() => setFile(null)}
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                >
                                    <FaTimes size={14} />
                                </button>
                            )}
                        </div>
                        
                        <div className={`transition-all duration-500 ease-in-out ${uploading ? 'h-14 opacity-100 mt-4' : 'h-0 opacity-0 mt-0 overflow-hidden'}`}>
                            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 uppercase tracking-wider">
                                <span>Extracting Data</span>
                                <span className={progress === 100 ? 'text-emerald-500' : 'text-indigo-600'}>{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 relative"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        {!uploading && (
                            <button
                                onClick={handleUpload}
                                className="w-full mt-4 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all outline-none"
                            >
                                Process & Edit Resume
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadResumeModal;
