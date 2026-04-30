import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaDownload, FaSave, FaCheckCircle, FaPalette } from "react-icons/fa";
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
    const [currentStep, setCurrentStep] = useState(0); // 0 to 6
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    
    const saveTimeoutRef = useRef(null);

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

    // 2. Debounced auto-save effect
    useEffect(() => {
        if (!user || loading) return;

        // Clear existing timeout
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        // Set a new timeout to save after 2 seconds of inactivity
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
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // 4. Input Handlers
    const handleObjChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [name]: value }
        }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, profileImage: null }
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, profileImage: reader.result }
                }));
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

    const handleDownload = () => {
        window.print();
    };

    if (!user) {
        navigate("/login");
        return null; // Ensure not to render if unauth during redirect
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading Resume...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12 print:bg-white print:p-0">
            {/* Top Navbar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center flex-wrap gap-4">
                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        <IoArrowBack size={18} /> Dashboard
                    </Link>

                    <div className="flex flex-wrap items-center gap-4">
                        <button 
                            onClick={() => setShowTemplateSelector(true)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 border border-gray-200"
                        >
                            <FaPalette className="text-purple-500" />
                            Change Template
                        </button>

                        <span className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                            {saving ? (
                                <span className="flex items-center gap-2 italic"><span className="animate-spin h-3 w-3 border-2 border-gray-500 rounded-full border-t-transparent"></span> Saving...</span>
                            ) : saveSuccess ? (
                                <span className="text-green-500 flex items-center gap-1"><FaCheckCircle /> Saved</span>
                            ) : (
                                "All changes saved"
                            )}
                        </span>
                        <button 
                            onClick={() => handleSave(true)}
                            disabled={saving}
                            className="px-5 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:shadow-md transition-all border border-blue-200 flex items-center gap-2"
                        >
                            <FaSave /> Save
                        </button>
                        <button onClick={handleDownload} className="px-5 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg text-sm font-medium hover:shadow-md transition-all border border-green-200 flex items-center gap-2">
                            <FaDownload size={12} /> Download PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
                {/* Desktop Layout - Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                    
                    {/* LEFT - Form Editor */}
                    <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[800px] print:hidden">
                        
                        {/* Stepper Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-lg">
                                Form Builder
                            </h3>
                            <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                Step {currentStep + 1} of {STEPS.length}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-1.5">
                            <div 
                                className="bg-blue-600 h-1.5 transition-all duration-300"
                                style={{ width: `${((currentStep) / (STEPS.length - 1)) * 100}%` }}
                            ></div>
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
                                    addEducation={() => addArrayItem('education', { degree: "", school: "", startDate: "", endDate: "" })}
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
                        <div className="bg-white border-t border-gray-100 p-4 flex justify-between items-center z-10">
                            <button 
                                onClick={handlePrev} 
                                disabled={currentStep === 0}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                                    currentStep === 0 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <IoArrowBack /> Back
                            </button>
                            <button 
                                onClick={currentStep === STEPS.length - 1 ? handleDownload : handleNext} 
                                className="px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                {currentStep === STEPS.length - 1 ? "Download" : "Next"} <IoArrowForward />
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