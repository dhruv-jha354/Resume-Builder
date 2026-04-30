import React from "react";
import { FaDownload, FaCheckCircle } from "react-icons/fa";

const FinalPreview = ({ handleDownload }) => {
    return (
        <div className="p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex flex-col items-center justify-center text-green-500 mb-6">
                <FaCheckCircle size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                You're All Set!
            </h2>
            <p className="text-gray-500 max-w-sm mb-8">
                Review your resume on the right side. If everything looks good, you can download it as a PDF or save it to your account.
            </p>

            <button 
                onClick={handleDownload}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
                <FaDownload />
                Download PDF
            </button>
        </div>
    );
};

export default FinalPreview;
