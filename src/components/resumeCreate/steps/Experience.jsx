import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Experience = ({ experience, handleExperienceChange, addExperience, removeExperience }) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Work Experience
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    Add your previous work experience
                </p>
            </div>

            <div className="space-y-6">
                {experience.map((exp, index) => (
                    <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button 
                            onClick={() => removeExperience(index)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"
                        >
                            <FaTrash size={12} />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={exp.company || ""}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                    placeholder="e.g. Google"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Role/Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={exp.role || ""}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                    placeholder="e.g. Software Engineer"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Start Date</label>
                                <input
                                    type="month"
                                    name="startDate"
                                    value={exp.startDate || ""}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">End Date</label>
                                <input
                                    type="text"
                                    name="endDate"
                                    value={exp.endDate || ""}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                    placeholder="e.g. Present or Month Year"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Description</label>
                            <textarea
                                name="description"
                                value={exp.description || ""}
                                onChange={(e) => handleExperienceChange(index, e)}
                                placeholder="Describe your responsibilities and achievements..."
                                className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none bg-white"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addExperience}
                className="mt-6 w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-500 transition-all text-sm font-semibold"
            >
                <FaPlus size={12} /> Add Experience
            </button>
        </div>
    );
};

export default Experience;
