import React from "react";

const CreativeTemplate = ({ resumeData }) => {
    const { personalInfo = {}, summary, experience = [], education = [], skills = [], projects = [] } = resumeData;

    return (
        <div className="p-8 bg-white h-full font-sans text-gray-800">
            {/* Header Block */}
            <div className="bg-green-50 border-l-8 border-green-500 p-8 mb-8 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10">
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="100" fill="#22c55e" />
                    </svg>
                </div>
                
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2 uppercase tracking-tighter">
                        {personalInfo.fullName || "YOUR NAME"}
                    </h1>
                    <h2 className="text-xl text-green-600 font-bold tracking-widest uppercase">
                        {personalInfo.profession || "Creative Professional"}
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium">
                        {personalInfo.email && <span className="bg-white/60 px-3 py-1 rounded shadow-sm">{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="bg-white/60 px-3 py-1 rounded shadow-sm">{personalInfo.phone}</span>}
                        {personalInfo.location && <span className="bg-white/60 px-3 py-1 rounded shadow-sm">{personalInfo.location}</span>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Content Column */}
                <div className="md:col-span-8">
                    {/* Summary */}
                    {summary && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-4 inline-block border-b-4 border-green-400">About Me</h3>
                            <p className="text-sm leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-6 inline-block border-b-4 border-green-400">Experience</h3>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="group">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold text-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                                                {exp.company.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg leading-tight">{exp.role}</h4>
                                                <div className="text-sm font-semibold text-gray-500">{exp.company} • {exp.startDate} - {exp.endDate}</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 pl-16 pt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-6 inline-block border-b-4 border-green-400">Portfolio</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {projects.map((proj, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-300 transition-colors">
                                        <h4 className="font-bold text-gray-900 mb-1">{proj.name}</h4>
                                        <div className="text-xs text-green-600 font-bold mb-2">{proj.techStack}</div>
                                        <p className="text-xs text-gray-600 line-clamp-3">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Side Content Column */}
                <div className="md:col-span-4 space-y-8">
                    {/* Extra Links */}
                    {(personalInfo.linkedin || personalInfo.website) && (
                        <div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 inline-block border-b-4 border-green-400">Links</h3>
                            <ul className="space-y-2 text-sm font-medium">
                                {personalInfo.website && <li><a className="text-green-600 hover:underline">Website</a></li>}
                                {personalInfo.linkedin && <li><a className="text-green-600 hover:underline">LinkedIn</a></li>}
                            </ul>
                        </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 inline-block border-b-4 border-green-400">Expertise</h3>
                            <div className="flex flex-col gap-2">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-full bg-gray-100 rounded-full h-6 flex items-center px-3 relative overflow-hidden">
                                            <span className="relative z-10 text-xs font-bold text-gray-800">{skill}</span>
                                            {/* Fake skill bar width purely for aesthetic */}
                                            <div className="absolute left-0 top-0 h-full bg-green-200 opacity-50" style={{ width: `${60 + (Math.random() * 40)}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 inline-block border-b-4 border-green-400">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-2 border-green-500">
                                        <h4 className="font-bold text-gray-900 text-sm">{edu.degree}</h4>
                                        <p className="text-xs text-gray-600 font-medium">{edu.school}</p>
                                        <span className="text-xs text-gray-400">{edu.startDate}-{edu.endDate}</span>
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
