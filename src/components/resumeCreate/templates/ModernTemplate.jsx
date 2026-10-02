import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

/**
 * Modern Professional Template
 * Layout: Corporate Two-Column (Navy #0F172A Sidebar + Clean Slate #F8FAFC Body)
 * Color Palette: Navy (#0F172A), Indigo (#4F46E5), Slate (#64748B), Light Background (#F8FAFC)
 * Proportions: A4 Standard
 */
const ModernTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="flex h-full min-h-full bg-[#F8FAFC] font-sans text-[#0F172A]" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
            
            {/* ── Left Sidebar (Navy: #0F172A) ── */}
            <div className="w-[34%] bg-[#0F172A] text-slate-100 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                    {/* Avatar / Monogram */}
                    <div className="flex flex-col items-center mb-6">
                        {personalInfo.profileImage ? (
                            <img 
                                src={personalInfo.profileImage} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full object-cover border-2 border-[#4F46E5] shadow-md mb-3" 
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full border-2 border-[#4F46E5] mb-3 bg-slate-800 flex items-center justify-center shadow-md">
                                <span className="text-2xl font-bold tracking-tight text-slate-200">
                                    {personalInfo.fullName ? personalInfo.fullName.charAt(0) : "U"}
                                </span>
                            </div>
                        )}
                        
                        <h1 className="text-lg sm:text-xl font-bold text-white text-center leading-tight tracking-tight break-words">
                            {personalInfo.fullName || "Your Full Name"}
                        </h1>
                        <p className="text-[#818CF8] font-medium text-center text-xs tracking-wider uppercase mt-1 break-words">
                            {personalInfo.profession || "Professional Title"}
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-2.5 text-xs text-slate-300 mb-6 border-t border-slate-800 pt-4">
                        <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-2">
                            Contact
                        </h2>
                        {personalInfo.email && (
                            <div className="flex items-center gap-2.5">
                                <FaEnvelope className="text-[#818CF8] flex-shrink-0" size={12} />
                                <span className="break-all text-[11px]">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2.5">
                                <FaPhone className="text-[#818CF8] flex-shrink-0" size={12} />
                                <span className="text-[11px]">{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2.5">
                                <FaMapMarkerAlt className="text-[#818CF8] flex-shrink-0" size={12} />
                                <span className="text-[11px]">{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div className="flex items-center gap-2.5">
                                <FaLinkedin className="text-[#818CF8] flex-shrink-0" size={12} />
                                <span className="break-all text-[11px]">{personalInfo.linkedin}</span>
                            </div>
                        )}
                        {personalInfo.website && (
                            <div className="flex items-center gap-2.5">
                                <FaGlobe className="text-[#818CF8] flex-shrink-0" size={12} />
                                <span className="break-all text-[11px]">{personalInfo.website}</span>
                            </div>
                        )}
                    </div>

                    {/* Core Skills Chips */}
                    {skills.length > 0 && (
                        <div className="mb-6 border-t border-slate-800 pt-4">
                            <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-2.5">
                                Core Competencies
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="px-2.5 py-1 bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded text-[11px] font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Education in Sidebar */}
                {education.length > 0 && (
                    <div className="border-t border-slate-800 pt-4">
                        <h2 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-2.5">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {education.map((edu, index) => (
                                <div key={index} className="text-xs">
                                    <p className="font-bold text-white leading-tight">
                                        {edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}
                                    </p>
                                    <p className="text-slate-400 text-[11px]">{edu.school || edu.institution}</p>
                                    <p className="text-[#64748B] text-[10px]">{edu.startDate} – {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Right Content Area (Light Background: #F8FAFC) ── */}
            <div className="flex-1 p-6 sm:p-8 bg-white flex flex-col justify-start space-y-6">
                
                {/* Executive Profile Summary */}
                {summary && (
                    <div>
                        <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-2 border-b-2 border-[#0F172A] pb-1 inline-block">
                            Executive Profile
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </div>
                )}

                {/* Experience Timeline */}
                {experience.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-4 border-b-2 border-[#0F172A] pb-1 inline-block">
                            Professional Experience
                        </h2>
                        <div className="space-y-5 relative">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                                    {/* Timeline Node */}
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#4F46E5] ring-4 ring-white" />
                                    
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="font-bold text-[#0F172A] text-sm">{exp.role}</h3>
                                        <span className="text-xs font-medium text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-full">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-[#4F46E5] mb-1.5">{exp.company}</p>
                                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 leading-relaxed">
                                        {(exp.description || "").split("\n").filter(l => l.trim()).map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strategic Projects */}
                {projects.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3 border-b-2 border-[#0F172A] pb-1 inline-block">
                            Key Projects & Initiatives
                        </h2>
                        <div className="space-y-3">
                            {projects.map((proj, index) => (
                                <div key={index} className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/80">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-[#0F172A] text-xs sm:text-sm">
                                            {proj.name}
                                            {proj.link && <span className="font-normal text-xs text-[#4F46E5] ml-2">({proj.link})</span>}
                                        </h3>
                                        {proj.techStack && (
                                            <span className="text-[11px] font-semibold text-[#64748B] bg-white border border-slate-200 px-2 py-0.5 rounded">
                                                {proj.techStack}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
