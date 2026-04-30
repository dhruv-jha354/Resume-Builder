import React from "react";
import { FaMagic, FaTimes } from "react-icons/fa";

const Skills = ({ skills, setSkills }) => {
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const value = e.target.value.trim();
            if (value && !skills.includes(value)) {
                setSkills([...skills, value]);
                e.target.value = '';
            }
        }
    };

    const removeSkill = (indexToRemove) => {
        setSkills(skills.filter((_, index) => index !== indexToRemove));
    };

    const handleAutoGenerate = () => {
        const mockSkills = ["React.js", "Node.js", "Tailwind CSS", "Firebase", "JavaScript", "TypeScript", "Git"];
        const missing = mockSkills.filter(s => !skills.includes(s));
        if (missing.length > 0) {
            setSkills([...skills, ...Math.random() > 0.5 ? missing.slice(0, 3) : missing.slice(2, 5)]);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Skills
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Add your top skills (press Enter to add)
                    </p>
                </div>
                
                <button 
                    onClick={handleAutoGenerate}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all hover:scale-105"
                >
                    <FaMagic />
                    Suggest Skills
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    onKeyDown={handleKeyPress}
                    placeholder="E.g. JavaScript, React, Problem Solving (Press Enter)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 hover:bg-white focus:bg-white"
                />
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
                {skills.map((skill, index) => (
                    <div 
                        key={index} 
                        className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-200"
                    >
                        {skill}
                        <button 
                            onClick={() => removeSkill(index)}
                            className="bg-blue-200 text-blue-800 rounded-full p-0.5 hover:bg-blue-300 hover:text-blue-900 transition-colors"
                        >
                            <FaTimes size={10} />
                        </button>
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="text-gray-400 text-sm italic w-full text-center mt-4">
                        No skills added yet. Type above and press Enter.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Skills;
