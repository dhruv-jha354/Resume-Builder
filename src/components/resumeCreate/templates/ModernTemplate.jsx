import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

const ModernTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData;

    return (
        <div className="flex h-full bg-white font-sans">
            {/* Sidebar (Left Column) */}
            <div className="w-1/3 bg-gray-900 text-gray-100 p-8 h-full">
                {personalInfo.profileImage ? (
                    <img 
                        src={personalInfo.profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-500 mb-6 mx-auto" 
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-green-500 mb-6 mx-auto bg-gray-800 flex items-center justify-center">
                        <span className="text-4xl text-gray-400">{personalInfo.fullName?.charAt(0) || "Y"}</span>
                    </div>
                )}
                
                <h1 className="text-2xl font-bold text-white text-center leading-tight mb-2">
                    {personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-green-400 font-medium text-center text-sm mb-8">
                    {personalInfo.profession || "Profession Title"}
                </p>

                <div className="space-y-4 text-xs">
                    {personalInfo.email && <div className="flex items-center gap-3"><FaEnvelope className="text-green-400 flex-shrink-0" /><span className="truncate">{personalInfo.email}</span></div>}
                    {personalInfo.phone && <div className="flex items-center gap-3"><FaPhone className="text-green-400 flex-shrink-0" /><span className="truncate">{personalInfo.phone}</span></div>}
                    {personalInfo.location && <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-green-400 flex-shrink-0" /><span className="truncate">{personalInfo.location}</span></div>}
                    {personalInfo.linkedin && <div className="flex items-center gap-3"><FaLinkedin className="text-green-400 flex-shrink-0" /><span className="truncate">{personalInfo.linkedin}</span></div>}
                    {personalInfo.website && <div className="flex items-center gap-3"><FaGlobe className="text-green-400 flex-shrink-0" /><span className="truncate">{personalInfo.website}</span></div>}
                </div>

                {skills.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                {education.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Education</h2>
                        <div className="space-y-4 text-xs">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-gray-200">{edu.degree}</h3>
                                    <p className="text-green-400 mt-1">{edu.school}</p>
                                    <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content (Right Column) */}
            <div className="w-2/3 p-10 bg-white h-full overflow-y-auto hidden-scrollbar">
                
                {summary && (
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-3">
                            <span className="w-8 h-1 bg-green-500 block"></span> Summary
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-green-500 block"></span> Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-gray-200 before:absolute before:w-3 before:h-3 before:bg-green-500 before:rounded-full before:-left-[7px] before:top-1 text-sm">
                                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-green-600">{exp.company}</span>
                                        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mt-2">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-green-500 block"></span> Projects
                        </h2>
                        <div className="space-y-6">
                            {projects.map((proj, index) => (
                                <div key={index} className="text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{proj.name}</h3>
                                        {proj.link && <a href={'http://' + proj.link.replace(/^https?:\/\//, '')} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full transition-colors">Link</a>}
                                    </div>
                                    <p className="text-xs text-green-600 font-semibold mb-2">{proj.techStack}</p>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
            </div>
            <style jsx>{`
                .hidden-scrollbar::-webkit-scrollbar { display: none; }
                .hidden-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default ModernTemplate;
