import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaAward, FaBuilding } from "react-icons/fa";

/**
 * Executive Leadership Template
 * CEO / CXO / Top-Tier Management Consulting Style (McKinsey / BCG / Board Level).
 * Palette: Deep Navy (#0F172A), Rich Gold (#CA8A04 / #D97706 / #FBBF24), Slate (#475569), Clean White.
 * Features: Serif leadership headings, executive overview card, strategic initiatives, and balanced two-column layout.
 * Proportions: A4 Standard
 */
const ExecutiveTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="p-6 sm:p-8 bg-[#F8FAFC] text-[#0F172A] h-full min-h-full font-serif leading-normal" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            
            {/* ── Executive Header Banner (Deep Navy + Gold Accent) ── */}
            <div className="bg-[#0F172A] text-white p-6 sm:p-7 rounded-2xl shadow-md border-b-4 border-[#CA8A04] mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#FBBF24] uppercase mb-1">
                            Executive Profile
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-white leading-tight">
                            {personalInfo.fullName || "EXECUTIVE NAME"}
                        </h1>
                        <p className="text-[#FBBF24] font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase mt-1">
                            {personalInfo.profession || "Chief Executive Officer / Managing Director"}
                        </p>
                    </div>

                    <div className="text-xs font-sans space-y-1.5 text-slate-300 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-[#FBBF24]" size={11} />
                                <span className="text-[11px]">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-[#FBBF24]" size={11} />
                                <span className="text-[11px]">{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-[#FBBF24]" size={11} />
                                <span className="text-[11px]">{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div className="flex items-center gap-2">
                                <FaLinkedin className="text-[#FBBF24]" size={11} />
                                <span className="text-[11px]">{personalInfo.linkedin}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Executive Overview Profile ── */}
            {summary && (
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#CA8A04] border-t border-r border-b border-slate-200/80 shadow-xs mb-6">
                    <h2 className="font-sans text-[11px] font-bold text-[#CA8A04] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                        <FaAward className="text-[#CA8A04]" size={12} />
                        Executive Summary & Board Profile
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic font-serif">
                        "{summary}"
                    </p>
                </div>
            )}

            {/* ── Balanced Two-Column Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left 8 Cols: Career History & Strategic Initiatives */}
                <div className="md:col-span-8 space-y-6">
                    {/* Career History */}
                    {experience.length > 0 && (
                        <div>
                            <h2 className="font-serif text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b-2 border-[#0F172A] pb-1.5 mb-4 flex items-center justify-between">
                                <span>Executive & Leadership History</span>
                                <span className="font-sans text-[10px] text-[#CA8A04] font-semibold tracking-normal uppercase">Career Milestones</span>
                            </h2>
                            <div className="space-y-4">
                                {experience.map((exp, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                                        <div className="flex justify-between items-baseline font-bold text-[#0F172A] text-xs sm:text-sm mb-0.5">
                                            <span>{exp.role}</span>
                                            <span className="font-sans text-[11px] text-[#B45309] font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="font-sans text-xs font-semibold text-slate-600 mb-2">{exp.company}</div>
                                        <ul className="text-xs text-slate-700 leading-relaxed font-sans space-y-1 list-disc pl-4">
                                            {(exp.description || "").split("\n").filter(l => l.trim()).map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Strategic Initiatives & Impact */}
                    {projects.length > 0 && (
                        <div>
                            <h2 className="font-serif text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b-2 border-[#0F172A] pb-1.5 mb-4">
                                Strategic Initiatives & Value Creation
                            </h2>
                            <div className="space-y-3">
                                {projects.map((proj, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs text-xs font-sans">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-[#0F172A] text-xs sm:text-sm">{proj.name}</h3>
                                            {proj.techStack && <span className="text-[10px] text-[#CA8A04] font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">{proj.techStack}</span>}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right 4 Cols: Competencies & Credentials */}
                <div className="md:col-span-4 space-y-6">
                    {/* Core Governance & Executive Competencies */}
                    {skills.length > 0 && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                            <h2 className="font-serif text-xs font-bold text-[#0F172A] uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">
                                Executive Competencies
                            </h2>
                            <div className="flex flex-wrap gap-1.5 font-sans">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="px-2.5 py-1 bg-amber-50/70 text-[#92400E] border border-amber-200/80 rounded-lg text-xs font-semibold"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic Credentials & Certifications */}
                    {education.length > 0 && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                            <h2 className="font-serif text-xs font-bold text-[#0F172A] uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">
                                Credentials & Education
                            </h2>
                            <div className="space-y-3 font-sans text-xs">
                                {education.map((edu, index) => (
                                    <div key={index} className="border-b border-slate-100 last:border-0 pb-2.5 last:pb-0">
                                        <div className="font-bold text-[#0F172A] text-xs leading-snug">
                                            {edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}
                                        </div>
                                        <div className="text-[#CA8A04] font-semibold text-[11px] mt-0.5">{edu.school || edu.institution}</div>
                                        <div className="text-slate-500 text-[10px] mt-0.5">{edu.startDate} – {edu.endDate}</div>
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

export default ExecutiveTemplate;
