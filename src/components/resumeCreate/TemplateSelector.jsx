import React from "react";
import { FaTimes } from "react-icons/fa";

const TemplateSelector = ({ currentTemplate, onSelect, onClose }) => {
    const templates = [
        { id: "minimal", name: "Minimal", desc: "Clean, precise, and readable." },
        { id: "modern", name: "Modern", desc: "Two-column layout with color accents." },
        { id: "professional", name: "Professional", desc: "Classic styling for ATS parsers." },
        { id: "creative", name: "Creative", desc: "Stand out with bold typography." },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] print:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white w-full max-w-4xl p-8 rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                        <p className="text-sm text-gray-500 mt-1">Select a layout for your resume. You can change this at any time.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map((tpl) => (
                        <div 
                            key={tpl.id}
                            onClick={() => {
                                onSelect(tpl.id);
                                onClose();
                            }}
                            className={`group cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 flex items-center gap-6 ${
                                currentTemplate === tpl.id 
                                ? "border-green-500 bg-green-50/30 shadow-md transform scale-[1.02]" 
                                : "border-gray-200 hover:border-green-300 hover:shadow-md hover:-translate-y-1 bg-white"
                            }`}
                        >
                            <div className={`w-16 h-24 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-inner ${
                                currentTemplate === tpl.id ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500"
                            }`}>
                                Preview
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold mb-1 ${currentTemplate === tpl.id ? "text-green-700" : "text-gray-900"}`}>
                                    {tpl.name}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {tpl.desc}
                                </p>
                                {currentTemplate === tpl.id && (
                                    <span className="inline-block mt-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                        Current Selection
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSelector;
