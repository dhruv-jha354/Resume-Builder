import React, { useState } from "react";
import { FaMagic } from "react-icons/fa";

const Summary = ({ summary, handleSummaryChange }) => {
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        // Mock Generation delay
        setTimeout(() => {
            const generatedText = "Results-driven professional with a proven track record of delivering high-quality solutions. Adaptable and innovative with strong communication skills and a passion for continuous learning.";
            handleSummaryChange(generatedText);
            setGenerating(false);
        }, 1500);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Professional Summary
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Write a brief summary highlighting your experience and goals.
                    </p>
                </div>
                
                <button 
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                >
                    {generating ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <FaMagic />
                    )}
                    Auto Generate
                </button>
            </div>

            <div className="mt-4 group relative">
                <textarea
                    value={summary}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    placeholder="E.g. A passionate software engineer with 5+ years of experience..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-50 hover:bg-white focus:bg-white text-sm"
                />
            </div>
        </div>
    );
};

export default Summary;
