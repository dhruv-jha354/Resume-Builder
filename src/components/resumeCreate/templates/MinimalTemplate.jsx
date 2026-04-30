import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

const MinimalTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData;

    return (
        <div className="p-8 font-sans bg-white h-full">
            {/* Header */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-gray-200">
                {personalInfo.profileImage && (
                    <img 
                        src={personalInfo.profileImage} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover shadow-sm" 
                    />
                )}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {personalInfo.fullName || "Your Full Name"}
                    </h1>
                    <p className="text-green-600 font-medium text-lg mt-1">
                        {personalInfo.profession || "Profession / Title"}
                    </p>
                </div>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
                {personalInfo.email && <span className="flex items-center gap-1"><FaEnvelope className="text-green-500" />{personalInfo.email}</span>}
                {personalInfo.phone && <span className="flex items-center gap-1"><FaPhone className="text-green-500" />{personalInfo.phone}</span>}
                {personalInfo.location && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-green-500" />{personalInfo.location}</span>}
                {personalInfo.linkedin && <span className="flex items-center gap-1"><FaLinkedin className="text-green-500" />{personalInfo.linkedin}</span>}
                {personalInfo.website && <span className="flex items-center gap-1"><FaGlobe className="text-green-500" />{personalInfo.website}</span>}
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed text-justify">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                    <span className="text-xs font-semibold text-gray-500">
                                        {exp.startDate} - {exp.endDate}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-green-600 mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                    <span className="text-xs font-semibold text-gray-500">
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{edu.school}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                    {proj.link && (
                                        <a href={'http://' + proj.link.replace(/^https?:\/\//, '')} target="_blank" rel="noreferrer" className="text-xs text-green-500 hover:underline">Link</a>
                                    )}
                                </div>
                                <p className="text-xs font-semibold text-gray-500 mb-2 border-b border-gray-100 pb-2 inline-block">Stack: {proj.techStack}</p>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mt-1">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
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
