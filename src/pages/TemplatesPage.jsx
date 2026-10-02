import React from 'react';
import Navbar from "../home/Navbar";
import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../data/templatesConfig";
import { FiArrowRight, FiCheckCircle, FiStar } from "react-icons/fi";

/**
 * Templates Page (/templates and /create)
 * Displays all 6 shared resume templates synchronized with Demo Gallery.
 */
const TemplatesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                        <FiStar className="text-indigo-500" /> Recruiter-Approved Resume Templates
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                        Choose Your Resume Template
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Select from our 6 recruiter-tested, ATS-compliant designs. You can switch templates anytime in the editor without losing your data.
                    </p>
                </div>

                {/* 6 Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEMPLATES.map((tpl) => (
                        <div 
                            key={tpl.id}
                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-2xl hover:border-indigo-400/80 dark:hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                        >
                            <div>
                                {/* Template Preview Header Block */}
                                <div 
                                    onClick={() => navigate(tpl.demoId ? `/demo/${tpl.demoId}` : "/demo")}
                                    className={`w-full aspect-[1/1.1] bg-gradient-to-br ${tpl.previewBg} rounded-xl mb-5 overflow-hidden flex flex-col items-center justify-center p-6 text-white text-center shadow-inner group-hover:scale-[1.02] transition-transform cursor-pointer relative`}
                                >
                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 mb-3 shadow-sm">
                                        {tpl.badge}
                                    </span>
                                    <h4 className="text-xl font-bold tracking-tight text-white mb-1">{tpl.name}</h4>
                                    <span className="text-xs text-slate-300 font-medium">{tpl.category}</span>
                                    
                                    <div className="mt-4 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-[11px] font-semibold text-white border border-white/30 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                        Click to Preview
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mb-1.5">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{tpl.name}</h3>
                                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                        {tpl.category}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tpl.desc}</p>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex items-center justify-between gap-3">
                                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <FiCheckCircle size={14} /> ATS Friendly
                                </span>
                                <button
                                    onClick={() => navigate(tpl.demoId ? `/demo/${tpl.demoId}` : "/demo")}
                                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                                >
                                    Preview & Use <FiArrowRight size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => navigate("/demo")} 
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 text-sm"
                    >
                        Explore All 6 Demo Resumes in Gallery <FiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;
