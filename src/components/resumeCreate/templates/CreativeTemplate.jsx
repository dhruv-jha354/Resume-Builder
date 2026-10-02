import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaArrowUp, FaExternalLinkAlt, FaLayerGroup, FaBriefcase, FaGraduationCap } from "react-icons/fa";

/**
 * Creative Portfolio Template
 * Behance / Dribbble inspired design for UI/UX & Product Designers.
 * Palette: Purple (#7C3AED), Cyan (#06B6D4), Deep Slate (#0F172A), Soft White/Zinc.
 * Features: Gradient name banner, beautiful case study project cards, modern skill chips, and elegant timeline.
 * Proportions: A4 Standard
 */
const CreativeTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="bg-white h-full min-h-full font-sans text-slate-900 flex flex-col" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
            
            {/* ── Large Designer Header Banner ── */}
            <div className="p-7 sm:p-8 bg-gradient-to-b from-purple-50/60 via-cyan-50/30 to-white border-b border-slate-100 relative overflow-hidden">
                {/* Decorative subtle ambient gradient orbs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        {/* Profile Image with Gradient Ring */}
                        <div className="p-[2px] rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 shadow-lg flex-shrink-0">
                            {personalInfo.profileImage ? (
                                <img 
                                    src={personalInfo.profileImage} 
                                    alt="Profile" 
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover bg-white" 
                                />
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 flex items-center justify-center font-black text-3xl text-white">
                                    {personalInfo.fullName ? personalInfo.fullName.charAt(0) : "C"}
                                </div>
                            )}
                        </div>

                        {/* Name & Title */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100/80 text-purple-800 border border-purple-200/60 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1.5 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                {personalInfo.profession || "Senior UI/UX & Product Designer"}
                            </div>
                            
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none uppercase">
                                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                                    {personalInfo.fullName || "YOUR NAME"}
                                </span>
                            </h1>

                            <p className="text-xs text-slate-600 max-w-lg mt-2 leading-relaxed font-normal">
                                {summary || "Digital product designer focusing on design systems, human-centered interaction design, and scalable UI architectures."}
                            </p>
                        </div>
                    </div>

                    {/* Contact Badges */}
                    <div className="flex flex-wrap sm:flex-col items-start gap-2 text-xs text-slate-600 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-purple-600 flex-shrink-0" size={11} />
                                <span className="text-[11px] font-medium text-slate-700">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-cyan-600 flex-shrink-0" size={11} />
                                <span className="text-[11px] font-medium text-slate-700">{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-purple-600 flex-shrink-0" size={11} />
                                <span className="text-[11px] font-medium text-slate-700">{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.website && (
                            <div className="flex items-center gap-2">
                                <FaGlobe className="text-cyan-600 flex-shrink-0" size={11} />
                                <span className="text-[11px] text-purple-700 font-semibold">{personalInfo.website}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Layout Body ── */}
            <div className="p-7 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-7 flex-1">
                
                {/* Left 7 Columns: Projects & Experience */}
                <div className="md:col-span-7 space-y-6">
                    {/* Featured Projects / Case Studies */}
                    {projects.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3.5">
                                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-md bg-gradient-to-r from-purple-600 to-cyan-500" />
                                    Featured Case Studies & Projects
                                </h2>
                                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">Portfolio</span>
                            </div>
                            <div className="space-y-3.5">
                                {projects.map((proj, index) => (
                                    <div 
                                        key={index} 
                                        className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 transition-all shadow-xs hover:shadow-md group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="flex justify-between items-start mb-1.5">
                                            <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                                                {proj.name}
                                                {proj.link && (
                                                    <span className="text-[10px] text-purple-600 font-semibold inline-flex items-center gap-1">
                                                        <FaExternalLinkAlt size={8} />
                                                    </span>
                                                )}
                                            </h3>
                                            {proj.techStack && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200/60 rounded-full">
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

                    {/* Experience Timeline */}
                    {experience.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3.5 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-md bg-gradient-to-r from-purple-600 to-cyan-500" />
                                Experience & Career History
                            </h2>
                            <div className="space-y-4 relative">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative pl-5 border-l-2 border-gradient-to-b from-purple-500 to-cyan-400 border-purple-200">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600 ring-4 ring-purple-100" />
                                        
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{exp.role}</h4>
                                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <p className="text-xs font-semibold text-purple-700 mb-1">{exp.company}</p>
                                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right 5 Columns: Design Toolkit & Education */}
                <div className="md:col-span-5 space-y-6">
                    {/* Skills & Design Toolkit */}
                    {skills.length > 0 && (
                        <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-1.5">
                                <FaLayerGroup className="text-purple-600" size={12} />
                                Design & Tech Toolkit
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="px-2.5 py-1 bg-white text-slate-800 border border-slate-200/90 rounded-xl text-xs font-semibold shadow-2xs hover:border-purple-400 hover:text-purple-700 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education & Background */}
                    {education.length > 0 && (
                        <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-1.5">
                                <FaGraduationCap className="text-cyan-600" size={13} />
                                Education & Credentials
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index} className="text-xs">
                                        <p className="font-bold text-slate-900 leading-tight">
                                            {edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}
                                        </p>
                                        <p className="text-xs text-purple-700 font-medium mt-0.5">{edu.school || edu.institution}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">{edu.startDate} – {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
