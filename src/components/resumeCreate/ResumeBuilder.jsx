import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaDownload, FaSave, FaCheckCircle, FaPalette } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getResumeById, updateResume } from "../../services/firebaseService";

// Step Components
import PersonalInfo from "./steps/PersonalInfo";
import Summary from "./steps/Summary";
import Experience from "./steps/Experience";
import Education from "./steps/Education";
import Skills from "./steps/Skills";
import Projects from "./steps/Projects";
import FinalPreview from "./steps/FinalPreview";
import PreviewPanel from "./PreviewPanel";
import TemplateSelector from "./TemplateSelector";

const STEPS = [
    { title: "Personal Info" },
    { title: "Summary" },
    { title: "Experience" },
    { title: "Education" },
    { title: "Skills" },
    { title: "Projects" },
    { title: "Review" }
];

const ResumeBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { currentUser: user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const saveTimeoutRef = useRef(null);

    useEffect(() => {
        if (document.documentElement.classList.contains('dark') || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // Main Form Data State
    const [formData, setFormData] = useState({
        title: "Untitled Resume",
        template: "minimal",
        personalInfo: { fullName: "", email: "", phone: "", location: "", profession: "", linkedin: "", website: "", profileImage: null },
        summary: "",
        experience: [],
        education: [],
        skills: [],
        projects: []
    });

    // 1. Auth & Fetch Data
    useEffect(() => {
        if (!user) return;
        const fetchResumeData = async () => {
            try {
                const data = await getResumeById(user.uid, id);
                if (data) {
                    setFormData(prev => ({ ...prev, ...data }));
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchResumeData();
    }, [id, user, navigate]);

    // 2. Debounced auto-save
    useEffect(() => {
        if (!user || loading) return;
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            handleSave(false);
        }, 2000);
        return () => clearTimeout(saveTimeoutRef.current);
    }, [formData]);

    // 3. Save Function
    const handleSave = async (showNotification = true) => {
        if (!user) return;
        setSaving(true);
        try {
            await updateResume(user.uid, id, formData);
            if (showNotification) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2000);
            }
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    // 4. Input Handlers
    const handleObjChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, profileImage: null } }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, profileImage: reader.result } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleArrayChange = (section, index, e) => {
        const { name, value } = e.target;
        const newArray = [...formData[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    const addArrayItem = (section, emptyItem) => {
        setFormData(prev => ({ ...prev, [section]: [...prev[section], emptyItem] }));
    };

    const removeArrayItem = (section, index) => {
        const newArray = [...formData[section]];
        newArray.splice(index, 1);
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleDownload = () => { window.print(); };

    if (!user) { navigate("/login"); return null; }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                    <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">Loading your resume...</p>
                </div>
            </div>
        );
    }

    const progress = Math.round((currentStep / (STEPS.length - 1)) * 100);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-white pb-12 print:bg-white print:p-0 transition-colors duration-300">
            {/* Top Navbar */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 print:hidden shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center flex-wrap gap-3">
                    <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition-colors">
                        <IoArrowBack size={16} /> Dashboard
                    </Link>

                    <div className="hidden sm:flex items-center gap-1">
                        {STEPS.map((step, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentStep(idx)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                                    idx === currentStep 
                                        ? "bg-indigo-600 text-white shadow-sm" 
                                        : idx < currentStep
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                }`}
                            >
                                {step.title}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button 
                            onClick={toggleDarkMode} 
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        <button 
                            onClick={() => setShowTemplateSelector(true)}
                            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                        >
                            <FaPalette className="text-indigo-500" size={12} />
                            Template
                        </button>

                        <span className="text-xs font-semibold flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            {saving ? (
                                <span className="flex items-center gap-1.5 italic">
                                    <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : saveSuccess ? (
                                <span className="text-emerald-500 flex items-center gap-1">
                                    <FaCheckCircle size={12} /> Saved
                                </span>
                            ) : (
                                <span className="hidden md:inline">All changes saved</span>
                            )}
                        </span>

                        <button 
                            onClick={() => handleSave(true)}
                            disabled={saving}
                            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-all border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-1.5"
                        >
                            <FaSave size={11} /> Save
                        </button>
                        <button 
                            onClick={handleDownload} 
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                        >
                            <FaDownload size={11} /> Download PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                    
                    {/* LEFT - Form Editor */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[800px] print:hidden transition-colors">
                        
                        {/* Step Header */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors">
                            <div>
                                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{STEPS[currentStep].title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Step {currentStep + 1} of {STEPS.length}</p>
                            </div>
                            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/60">
                                {progress}% Complete
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
                            <div 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Dynamic Step Content */}
                        <div className="flex-1 overflow-y-auto step-content-scroll">
                            {currentStep === 0 && (
                                <PersonalInfo 
                                    formData={formData.personalInfo} 
                                    handleInputChange={handleObjChange}
                                    handleImageUpload={handleImageUpload}
                                    handleImageRemove={handleImageRemove}
                                    uploadedImage={formData.personalInfo.profileImage}
                                />
                            )}
                            {currentStep === 1 && (
                                <Summary 
                                    summary={formData.summary}
                                    handleSummaryChange={(val) => setFormData(prev => ({...prev, summary: val}))}
                                />
                            )}
                            {currentStep === 2 && (
                                <Experience 
                                    experience={formData.experience}
                                    handleExperienceChange={(idx, e) => handleArrayChange('experience', idx, e)}
                                    addExperience={() => addArrayItem('experience', { company: "", role: "", startDate: "", endDate: "", description: "" })}
                                    removeExperience={(idx) => removeArrayItem('experience', idx)}
                                />
                            )}
                            {currentStep === 3 && (
                                <Education 
                                    education={formData.education}
                                    handleEducationChange={(idx, e) => handleArrayChange('education', idx, e)}
                                    addEducation={() => addArrayItem('education', { degree: "", fieldOfStudy: "", school: "", startDate: "", endDate: "" })}
                                    removeEducation={(idx) => removeArrayItem('education', idx)}
                                />
                            )}
                            {currentStep === 4 && (
                                <Skills 
                                    skills={formData.skills}
                                    setSkills={(skills) => setFormData(prev => ({...prev, skills}))}
                                />
                            )}
                            {currentStep === 5 && (
                                <Projects 
                                    projects={formData.projects}
                                    handleProjectChange={(idx, e) => handleArrayChange('projects', idx, e)}
                                    addProject={() => addArrayItem('projects', { name: "", link: "", techStack: "", description: "" })}
                                    removeProject={(idx) => removeArrayItem('projects', idx)}
                                />
                            )}
                            {currentStep === 6 && (
                                <FinalPreview handleDownload={handleDownload} />
                            )}
                        </div>

                        {/* Footer Controls */}
                        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center transition-colors">
                            <button 
                                onClick={handlePrev} 
                                disabled={currentStep === 0}
                                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                                    currentStep === 0 
                                        ? "text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 cursor-not-allowed" 
                                        : "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                            >
                                <IoArrowBack size={14} /> Back
                            </button>
                            <button 
                                onClick={currentStep === STEPS.length - 1 ? handleDownload : handleNext} 
                                className="px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
                            >
                                {currentStep === STEPS.length - 1 ? "Download" : "Next"} <IoArrowForward size={14} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT - Preview Panel */}
                    <div className="lg:col-span-7 print:col-span-12 print:block">
                        <PreviewPanel resumeData={formData} />
                    </div>
                </div>
            </div>
            
            {showTemplateSelector && (
                <TemplateSelector 
                    currentTemplate={formData.template}
                    onSelect={(templateId) => setFormData(prev => ({ ...prev, template: templateId }))}
                    onClose={() => setShowTemplateSelector(false)}
                />
            )}
        </div>
    );
};

export default ResumeBuilder;