import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

/**
 * Elegant Serif Template
 * Luxury Editorial / Magazine Aesthetic (Vogue / Monocle / High-Fashion Editorial Style).
 * Palette: Warm Ivory/Beige Background (#FAF8F5), Deep Charcoal (#1C1917 / #292524), Warm Stone (#78716C), Muted Tan (#A8A29E).
 * Features: Pure serif typography throughout, centered header, delicate hairline dividers, and editorial timeline.
 * Proportions: A4 Standard
 */
const ElegantTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData || {};

    return (
        <div className="p-8 sm:p-10 bg-[#FAF8F5] text-[#292524] h-full min-h-full font-serif leading-relaxed" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            
            {/* ── Editorial Centered Header ── */}
            <div className="text-center pb-6 mb-8 border-b border-[#E7E2D9]">
                <p className="text-[10px] tracking-[0.35em] text-[#78716C] uppercase font-sans font-semibold mb-2">
                    Curriculum Vitae
                </p>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-[0.18em] uppercase text-[#1C1917] mb-1.5 leading-none">
                    {personalInfo.fullName || "FULL NAME"}
                </h1>
                <p className="text-sm italic text-[#57534E] tracking-widest uppercase mb-4">
                    {personalInfo.profession || "Creative & Brand Director"}
                </p>

                {/* Contact List */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-[#57534E] font-sans font-normal tracking-wide">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                </div>
            </div>

            {/* ── Professional Overview ── */}
            {summary && (
                <div className="mb-8 max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-2.5">
                        <div className="h-px bg-[#E7E2D9] w-12" />
                        <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#78716C]">
                            Profile & Overview
                        </h2>
                        <div className="h-px bg-[#E7E2D9] w-12" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic">
                        "{summary}"
                    </p>
                </div>
            )}

            {/* ── Experience & Selected Works ── */}
            {experience.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4 border-b border-[#E7E2D9] pb-1.5">
                        <h2 className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#1C1917]">
                            Experience & Career Narrative
                        </h2>
                    </div>
                    <div className="space-y-5">
                        {experience.map((exp, index) => (
                            <div key={index} className="relative pl-4 border-l border-[#D6CEBF]">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-[#1C1917] text-sm tracking-wide">{exp.role}</h3>
                                    <span className="font-sans text-[11px] text-[#78716C] tracking-wide">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-xs italic text-[#57534E] mb-1.5">{exp.company}</div>
                                <p className="text-xs text-[#44403C] leading-relaxed whitespace-pre-line font-serif">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Selected Projects & Key Campaigns ── */}
            {projects.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4 border-b border-[#E7E2D9] pb-1.5">
                        <h2 className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#1C1917]">
                            Selected Works & Campaigns
                        </h2>
                    </div>
                    <div className="space-y-3.5">
                        {projects.map((proj, index) => (
                            <div key={index} className="text-xs">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-[#1C1917] text-xs sm:text-sm">
                                        {proj.name}
                                        {proj.link && <span className="font-normal italic text-[11px] text-[#78716C] ml-2">({proj.link})</span>}
                                    </h3>
                                    {proj.techStack && <span className="font-sans text-[11px] text-[#78716C] font-medium">{proj.techStack}</span>}
                                </div>
                                <p className="text-[#44403C] leading-relaxed font-serif">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Two-Column Footer: Education & Areas of Expertise ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-[#E7E2D9]">
                {education.length > 0 && (
                    <div>
                        <h2 className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#1C1917] mb-3">
                            Academic Background
                        </h2>
                        <div className="space-y-2.5 text-xs">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <p className="font-bold text-[#1C1917] text-xs">
                                        {edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}
                                    </p>
                                    <p className="italic text-[#57534E] text-[11px]">{(edu.school || edu.institution)} · {edu.startDate} – {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {skills.length > 0 && (
                    <div>
                        <h2 className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-[#1C1917] mb-3">
                            Areas of Expertise
                        </h2>
                        <div className="flex flex-wrap gap-1.5 font-sans">
                            {skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="px-2.5 py-1 bg-white text-[#44403C] border border-[#E7E2D9] rounded-md text-[11px] font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ElegantTemplate;
