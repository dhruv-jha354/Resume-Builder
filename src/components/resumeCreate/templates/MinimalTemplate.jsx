import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

/**
 * Minimalist Clean Template
 * Layout: Modern clean single column with green/emerald accents, generous whitespace, and skill chips.
 */
const MinimalTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="p-6 sm:p-8 font-sans bg-white h-full min-h-full text-slate-800">
            {/* Header */}
            <div className="flex items-center gap-5 mb-5 pb-5 border-b border-slate-200">
                {personalInfo.profileImage && (
                    <img 
                        src={personalInfo.profileImage} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-200" 
                    />
                )}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        {personalInfo.fullName || "Your Full Name"}
                    </h1>
                    <p className="text-emerald-600 font-semibold text-sm sm:text-base mt-0.5">
                        {personalInfo.profession || "Profession / Title"}
                    </p>
                </div>
            </div>

            {/* Contact Row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6 text-xs text-slate-600">
                {personalInfo.email && <span className="flex items-center gap-1.5"><FaEnvelope className="text-emerald-500" size={11} />{personalInfo.email}</span>}
                {personalInfo.phone && <span className="flex items-center gap-1.5"><FaPhone className="text-emerald-500" size={11} />{personalInfo.phone}</span>}
                {personalInfo.location && <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-emerald-500" size={11} />{personalInfo.location}</span>}
                {personalInfo.linkedin && <span className="flex items-center gap-1.5"><FaLinkedin className="text-emerald-500" size={11} />{personalInfo.linkedin}</span>}
                {personalInfo.website && <span className="flex items-center gap-1.5"><FaGlobe className="text-emerald-500" size={11} />{personalInfo.website}</span>}
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                        Professional Summary
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1">
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{exp.role}</h3>
                                    <span className="text-xs font-medium text-slate-500">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-emerald-600 mb-1">{exp.company}</p>
                                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index} className="text-xs">
                                <div className="flex items-baseline justify-between mb-0.5">
                                    <h3 className="font-bold text-slate-900">
                                        {proj.name}
                                        {proj.link && (
                                            <span className="text-xs text-emerald-600 font-normal ml-2">({proj.link})</span>
                                        )}
                                    </h3>
                                    {proj.techStack && <span className="text-slate-500 text-[11px] font-medium">{proj.techStack}</span>}
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1">
                        Education
                    </h2>
                    <div className="space-y-2">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline text-xs sm:text-sm">
                                <div>
                                    <span className="font-bold text-slate-900">{edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}</span>
                                    {(edu.school || edu.institution) && <span className="text-slate-600"> — {edu.school || edu.institution}</span>}
                                </div>
                                <span className="text-xs text-slate-500">
                                    {edu.startDate} – {edu.endDate}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MinimalTemplate;
