import React from "react";

/**
 * ATS Classic Template
 * Single-column layout optimized for Applicant Tracking Systems (ATS).
 * Clean typographic hierarchy, linear flow, and high readability.
 */
const AtsTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="p-6 sm:p-8 bg-white font-sans text-slate-900 h-full min-h-full leading-normal">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-slate-900">
                    {personalInfo.fullName || "FIRST LAST NAME"}
                </h1>
                <p className="text-sm font-semibold text-slate-700 mt-1 uppercase tracking-wider">
                    {personalInfo.profession || "Professional Title"}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                </div>
            </div>

            {/* Professional Summary */}
            {summary && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                        Professional Summary
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-800 text-justify leading-relaxed">{summary}</p>
                </div>
            )}

            {/* Core Competencies & Skills */}
            {skills.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                        Technical & Core Skills
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {skills.join(" • ")}
                    </p>
                </div>
            )}

            {/* Work Experience */}
            {experience.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">
                        Professional Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index} className="text-xs sm:text-sm">
                                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                                    <span>{exp.company} <span className="font-semibold text-slate-600">— {exp.role}</span></span>
                                    <span className="text-xs font-medium text-slate-600">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <ul className="list-disc pl-5 mt-1.5 text-slate-700 space-y-1 text-xs leading-relaxed">
                                    {(exp.description || "").split("\n").filter(l => l.trim()).map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Key Projects */}
            {projects.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">
                        Key Projects
                    </h2>
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index} className="text-xs">
                                <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                                    <span>
                                        {proj.name}
                                        {proj.link && <span className="font-normal text-xs text-slate-500 ml-1.5">({proj.link})</span>}
                                    </span>
                                    {proj.techStack && <span className="text-xs font-medium text-slate-500">Tech: {proj.techStack}</span>}
                                </div>
                                <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                        Education
                    </h2>
                    <div className="space-y-2">
                        {education.map((edu, index) => (
                            <div key={index} className="text-xs sm:text-sm flex justify-between items-baseline text-slate-800">
                                <div>
                                    <span className="font-bold text-slate-900">{edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}</span>
                                    {(edu.school || edu.institution) && <span className="text-slate-700">, {edu.school || edu.institution}</span>}
                                </div>
                                <span className="text-xs text-slate-600">{edu.startDate} – {edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AtsTemplate;
