import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Education = ({ education, handleEducationChange, addEducation, removeEducation }) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Education
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    Add your educational background
                </p>
            </div>

            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button 
                            onClick={() => removeEducation(index)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"
                        >
                            <FaTrash size={12} />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={edu.degree || ""}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    placeholder="e.g. B.S. Computer Science"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">School / University</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={edu.school || ""}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    placeholder="e.g. MIT"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Start Date</label>
                                <input
                                    type="text"
                                    name="startDate"
                                    value={edu.startDate || ""}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    placeholder="e.g. 2018"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">End Date</label>
                                <input
                                    type="text"
                                    name="endDate"
                                    value={edu.endDate || ""}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    placeholder="e.g. 2022"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addEducation}
                className="mt-6 w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-500 transition-all text-sm font-semibold"
            >
                <FaPlus size={12} /> Add Education
            </button>
        </div>
    );
};

export default Education;
