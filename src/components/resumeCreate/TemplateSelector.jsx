import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { TEMPLATES } from "../../data/templatesConfig";

/**
 * Miniature Visual Resume Preview Component
 * Renders an exact scaled-down structural mockup of each template's real visual design.
 */
const TemplateMiniPreview = ({ templateId }) => {
    switch (templateId) {
        case "modern":
            // Corporate Two-Column (Navy #0F172A Left Sidebar + White Right Content)
            return (
                <div className="w-full h-full bg-white flex overflow-hidden rounded-lg border border-slate-200 shadow-2xs">
                    {/* Navy Sidebar */}
                    <div className="w-[34%] bg-[#0F172A] p-2 flex flex-col justify-between">
                        <div>
                            <div className="w-5 h-5 rounded-full bg-[#4F46E5] mx-auto mb-1.5 border border-indigo-300/40" />
                            <div className="h-1.5 w-10 bg-white/90 rounded-xs mx-auto mb-1" />
                            <div className="h-1 w-7 bg-[#818CF8] rounded-xs mx-auto mb-2" />
                            <div className="space-y-1 pt-1 border-t border-slate-800">
                                <div className="h-0.5 w-full bg-slate-700 rounded-xs" />
                                <div className="h-0.5 w-4/5 bg-slate-700 rounded-xs" />
                                <div className="h-0.5 w-3/4 bg-slate-700 rounded-xs" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-0.5 pt-1">
                            <div className="h-1 w-3 bg-slate-800 rounded-xs" />
                            <div className="h-1 w-4 bg-slate-800 rounded-xs" />
                        </div>
                    </div>
                    {/* White Content */}
                    <div className="flex-1 p-2 space-y-1.5">
                        <div className="h-1.5 w-12 bg-[#0F172A] rounded-xs mb-1" />
                        <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                        <div className="h-0.5 w-5/6 bg-slate-200 rounded-xs" />
                        <div className="pt-1 space-y-1">
                            <div className="flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-[#4F46E5]" />
                                <div className="h-1 w-10 bg-[#0F172A] rounded-xs" />
                            </div>
                            <div className="h-0.5 w-full bg-slate-100 rounded-xs pl-2" />
                            <div className="h-0.5 w-4/5 bg-slate-100 rounded-xs pl-2" />
                        </div>
                    </div>
                </div>
            );

        case "ats":
            // Clean Single-Column Monochrome ATS Format
            return (
                <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 shadow-2xs">
                    <div>
                        <div className="text-center pb-1 border-b-2 border-slate-900 mb-1.5">
                            <div className="h-2 w-16 bg-slate-900 mx-auto rounded-xs mb-0.5" />
                            <div className="h-1 w-10 bg-slate-600 mx-auto rounded-xs mb-1" />
                            <div className="h-0.5 w-20 bg-slate-400 mx-auto rounded-xs" />
                        </div>
                        <div className="space-y-1 mb-1.5">
                            <div className="h-1 w-12 bg-slate-900 rounded-xs border-b border-slate-300 pb-0.5" />
                            <div className="h-0.5 w-full bg-slate-300 rounded-xs" />
                            <div className="h-0.5 w-5/6 bg-slate-300 rounded-xs" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-1 w-14 bg-slate-900 rounded-xs border-b border-slate-300 pb-0.5" />
                            <div className="h-1 w-16 bg-slate-800 rounded-xs" />
                            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                            <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs" />
                        </div>
                    </div>
                </div>
            );

        case "minimal":
            // Minimal Clean Single Column (Emerald Accent + Left Header)
            return (
                <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 shadow-2xs">
                    <div>
                        <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-100 mb-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-200 flex-shrink-0" />
                            <div className="space-y-0.5">
                                <div className="h-1.5 w-14 bg-slate-900 rounded-xs" />
                                <div className="h-1 w-8 bg-emerald-600 rounded-xs" />
                            </div>
                        </div>
                        <div className="space-y-1 mb-1.5">
                            <div className="h-1 w-10 bg-slate-800 rounded-xs" />
                            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                            <div className="h-0.5 w-4/5 bg-slate-200 rounded-xs" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-1 w-12 bg-slate-800 rounded-xs" />
                            <div className="h-1 w-10 bg-emerald-600 rounded-xs" />
                            <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                        </div>
                    </div>
                </div>
            );

        case "creative":
            // Creative Portfolio (Purple-to-Cyan Gradient Banner + Asymmetrical Grid)
            return (
                <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-lg border border-slate-200 shadow-2xs">
                    {/* Top Gradient Banner */}
                    <div className="p-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-600 text-white flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-lg bg-white/20 border border-white/40 flex-shrink-0" />
                        <div>
                            <div className="h-1.5 w-12 bg-white rounded-xs mb-0.5" />
                            <div className="h-1 w-8 bg-cyan-200 rounded-xs" />
                        </div>
                    </div>
                    {/* Asymmetrical Grid Body */}
                    <div className="p-2 grid grid-cols-12 gap-1 flex-1 bg-slate-50/50">
                        <div className="col-span-7 space-y-1">
                            <div className="p-1 bg-white rounded border border-slate-200">
                                <div className="h-1 w-8 bg-purple-600 rounded-xs mb-0.5" />
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                            </div>
                            <div className="p-1 bg-white rounded border border-slate-200">
                                <div className="h-1 w-7 bg-cyan-600 rounded-xs mb-0.5" />
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                            </div>
                        </div>
                        <div className="col-span-5 space-y-1">
                            <div className="flex flex-wrap gap-0.5">
                                <div className="h-1.5 w-3 bg-purple-100 rounded-xs" />
                                <div className="h-1.5 w-4 bg-cyan-100 rounded-xs" />
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "executive":
            // Executive Leadership (Deep Navy Banner + Gold Border + Balanced Grid)
            return (
                <div className="w-full h-full bg-slate-50 p-2 flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 shadow-2xs">
                    <div>
                        {/* Navy Header Card with Gold Line */}
                        <div className="bg-[#0F172A] p-1.5 rounded-md border-b-2 border-[#CA8A04] mb-1.5">
                            <div className="h-1.5 w-14 bg-white rounded-xs mb-0.5" />
                            <div className="h-1 w-10 bg-[#FBBF24] rounded-xs" />
                        </div>
                        {/* Executive Summary Box */}
                        <div className="p-1 bg-white rounded border-l-2 border-[#CA8A04] border-slate-200 mb-1.5">
                            <div className="h-0.5 w-full bg-slate-300 rounded-xs mb-0.5" />
                            <div className="h-0.5 w-4/5 bg-slate-300 rounded-xs" />
                        </div>
                        <div className="grid grid-cols-12 gap-1">
                            <div className="col-span-8 space-y-1">
                                <div className="h-1 w-12 bg-[#0F172A] rounded-xs" />
                                <div className="h-0.5 w-full bg-slate-200 rounded-xs" />
                            </div>
                            <div className="col-span-4 space-y-0.5">
                                <div className="h-1.5 w-full bg-amber-50 rounded border border-amber-200" />
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "elegant":
            // Luxury Editorial Serif (Ivory #FAF8F5 + Centered Hairlines)
            return (
                <div className="w-full h-full bg-[#FAF8F5] p-2.5 flex flex-col justify-between overflow-hidden rounded-lg border border-[#E7E2D9] shadow-2xs">
                    <div>
                        {/* Centered Editorial Header */}
                        <div className="text-center pb-1 border-b border-[#E7E2D9] mb-1.5">
                            <div className="h-0.5 w-8 bg-[#78716C] mx-auto mb-0.5" />
                            <div className="h-1.5 w-16 bg-[#1C1917] mx-auto rounded-xs mb-0.5" />
                            <div className="h-0.5 w-10 bg-[#57534E] mx-auto mb-0.5" />
                        </div>
                        {/* Centered Profile Quote */}
                        <div className="text-center mb-1.5">
                            <div className="h-0.5 w-full bg-[#D6CEBF] mx-auto mb-0.5" />
                            <div className="h-0.5 w-4/5 bg-[#D6CEBF] mx-auto" />
                        </div>
                        {/* Timeline */}
                        <div className="pl-1.5 border-l border-[#D6CEBF] space-y-1">
                            <div className="h-1 w-12 bg-[#1C1917] rounded-xs" />
                            <div className="h-0.5 w-full bg-stone-300 rounded-xs" />
                            <div className="h-0.5 w-3/4 bg-stone-300 rounded-xs" />
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
};

const TemplateSelector = ({ currentTemplate, onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] print:hidden px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] z-10 transition-colors">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Choose a Template</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select any of our 6 recruiter-approved layouts. Switch anytime without losing data.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {TEMPLATES.map((tpl) => {
                        const isSelected = currentTemplate === tpl.id;
                        return (
                            <div 
                                key={tpl.id}
                                onClick={() => {
                                    onSelect(tpl.id);
                                    onClose();
                                }}
                                className={`group cursor-pointer border-2 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4.5 ${
                                    isSelected 
                                    ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-lg shadow-indigo-500/10 transform scale-[1.01]" 
                                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-0.5 bg-white dark:bg-slate-900"
                                }`}
                            >
                                {/* Miniature Template Replica Thumbnail Preview */}
                                <div className="w-20 h-28 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-200">
                                    <TemplateMiniPreview templateId={tpl.id} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h3 className={`text-base font-bold ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white"}`}>
                                            {tpl.name}
                                        </h3>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            {tpl.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                        {tpl.desc}
                                    </p>
                                    {isSelected ? (
                                        <span className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold rounded-full shadow-xs">
                                            <FaCheck size={9} /> Active Template
                                        </span>
                                    ) : (
                                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity mt-2 block">
                                            Click to Apply →
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TemplateSelector;
