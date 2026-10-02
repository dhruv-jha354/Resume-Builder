import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiBookOpen, FiAward, FiCalendar, FiMapPin } from "react-icons/fi";
import SearchableSelect from "../../common/SearchableSelect";
import { 
    DEGREE_CATEGORIES, 
    FIELD_CATEGORIES, 
    getSuggestedFieldCategory, 
    YEARS_LIST 
} from "../../../data/educationConfig";

const Education = ({ education = [], handleEducationChange, addEducation, removeEducation }) => {
    
    const onFieldChange = (index, fieldName, fieldValue) => {
        handleEducationChange(index, {
            target: {
                name: fieldName,
                value: fieldValue
            }
        });
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Education
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select your degree, academic specialization, and educational background
                </p>
            </div>

            <div className="space-y-6">
                {education.map((edu, index) => {
                    const suggestedCategory = getSuggestedFieldCategory(edu.degree);

                    return (
                        <div key={index} className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 relative group transition-colors">
                            {/* Delete Button */}
                            <button 
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white shadow-sm cursor-pointer"
                                title="Remove education"
                            >
                                <FaTrash size={11} />
                            </button>
                            
                            <div className="space-y-4">
                                
                                {/* Row 1: Degree & Field of Study */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* 1. Degree Searchable Select */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-0.5">
                                            Degree
                                        </label>
                                        <SearchableSelect
                                            value={edu.degree || ""}
                                            onChange={(val) => onFieldChange(index, "degree", val)}
                                            placeholder="Select Degree ▼"
                                            groupedOptions={DEGREE_CATEGORIES}
                                            allowCustom={true}
                                        />
                                    </div>

                                    {/* 2. Field of Study / Branch Searchable Select (Smart Context-Aware) */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5 ml-0.5">
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                Field of Study / Branch
                                            </label>
                                            {suggestedCategory && (
                                                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                                                    Matched to {suggestedCategory}
                                                </span>
                                            )}
                                        </div>
                                        <SearchableSelect
                                            value={edu.fieldOfStudy || ""}
                                            onChange={(val) => onFieldChange(index, "fieldOfStudy", val)}
                                            placeholder="Select Branch / Specialization ▼"
                                            groupedOptions={FIELD_CATEGORIES}
                                            highlightCategory={suggestedCategory}
                                            allowCustom={true}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: School / University (Free text) */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-0.5">
                                        School / University
                                    </label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={edu.school || edu.institution || ""}
                                        onChange={(e) => handleEducationChange(index, e)}
                                        placeholder="Enter institution name (e.g. Guru Jambheshwar University)"
                                        className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                    />
                                </div>

                                {/* Row 3: Start Date & End Date (Year Selectors) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-0.5">
                                            Start Date
                                        </label>
                                        <SearchableSelect
                                            value={edu.startDate || ""}
                                            onChange={(val) => onFieldChange(index, "startDate", val)}
                                            placeholder="Start Year ▼"
                                            flatOptions={YEARS_LIST}
                                            allowCustom={true}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-0.5">
                                            End Date (or Expected)
                                        </label>
                                        <SearchableSelect
                                            value={edu.endDate || ""}
                                            onChange={(val) => onFieldChange(index, "endDate", val)}
                                            placeholder="End Year ▼"
                                            flatOptions={YEARS_LIST}
                                            allowCustom={true}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={addEducation}
                className="mt-6 w-full py-3 border-2 border-dashed border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all text-sm font-semibold cursor-pointer shadow-2xs"
            >
                <FaPlus size={12} /> Add Education
            </button>
        </div>
    );
};

export default Education;
