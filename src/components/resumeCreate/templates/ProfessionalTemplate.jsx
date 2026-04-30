import React from "react";

const ProfessionalTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData;

    return (
        <div className="p-5 sm:p-8 print:p-8 bg-white min-h-full" style={{ fontFamily: "Merriweather, serif" }}>
            
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b border-gray-900">
                <h1 className="text-2xl sm:text-3xl print:text-3xl font-extrabold text-gray-900 uppercase tracking-widest mb-2 break-words">
                    {personalInfo.fullName || "JANE DOE"}
                </h1>
                
                <div className="text-sm text-gray-800 flex justify-center items-center flex-wrap gap-x-3 gap-y-1 mt-3">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <><span className="text-gray-400">|</span> <span>{personalInfo.phone}</span></>}
                    {personalInfo.email && <><span className="text-gray-400">|</span> <span>{personalInfo.email}</span></>}
                    {personalInfo.linkedin && <><span className="text-gray-400">|</span> <span>{personalInfo.linkedin}</span></>}
                    {personalInfo.website && <><span className="text-gray-400">|</span> <span>{personalInfo.website}</span></>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
                    <p className="text-sm text-gray-800 leading-relaxed text-justify">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Professional Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index} className="text-sm">
                                <div className="flex flex-col sm:flex-row print:flex-row justify-between items-start sm:items-baseline print:items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.company}</h3>
                                    <span className="italic text-gray-700 text-xs sm:text-sm print:text-sm mt-0.5 sm:mt-0 print:mt-0">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="italic text-gray-700 mb-2">{exp.role}</div>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Selected Projects</h2>
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index} className="text-sm">
                                <div className="flex flex-col sm:flex-row print:flex-row justify-between items-start sm:items-baseline print:items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 leading-snug">{proj.name} {proj.link && <span className="font-normal italic text-xs ml-0 sm:ml-2 print:ml-2 block sm:inline print:inline break-all">({proj.link})</span>}</h3>
                                </div>
                                <div className="italic text-gray-700 mb-1 text-xs">Technologies: {proj.techStack}</div>
                                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                                    {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Education</h2>
                    <div className="space-y-2">
                        {education.map((edu, index) => (
                            <div key={index} className="text-sm flex flex-col sm:flex-row print:flex-row justify-between items-start sm:items-baseline print:items-baseline mb-2 sm:mb-0 print:mb-0">
                                <div className="mb-0.5 sm:mb-0 print:mb-0">
                                    <span className="font-bold text-gray-900">{edu.school}</span>, <span className="italic">{edu.degree}</span>
                                </div>
                                <span className="text-gray-700 text-xs sm:text-sm print:text-sm">{edu.startDate} - {edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Technical Skills</h2>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {skills.join(", ")}
                    </p>
                </div>
            )}

        </div>
    );
};

export default ProfessionalTemplate;
