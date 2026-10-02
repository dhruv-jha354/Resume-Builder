import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    FiSearch, FiFilter, FiArrowRight, FiEye, FiCopy, 
    FiCheckCircle, FiChevronRight, FiBriefcase, FiUser, FiStar, FiRefreshCw 
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getDemoResumes, duplicateDemoResume } from "../services/firebaseService";
import Navbar from "../home/Navbar";

const CATEGORIES = ["All", "Engineering", "Design", "Data", "Marketing"];

const DemoGallery = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [duplicatingId, setDuplicatingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchDemos = async () => {
            setLoading(true);
            setErrorMsg("");
            try {
                const data = await getDemoResumes();
                setResumes(data || []);
            } catch (err) {
                console.error("Failed to load demo resumes:", err);
                setErrorMsg("Failed to load demo resumes. Please refresh or try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDemos();
    }, []);

    const handleUseTemplate = async (e, resume) => {
        e.stopPropagation();
        if (!currentUser) {
            navigate("/login", { 
                state: { message: "Sign in to use this template." } 
            });
            return;
        }

        setDuplicatingId(resume.id);
        try {
            const duplicated = await duplicateDemoResume(currentUser.uid, resume);
            navigate(`/resume-builder/${duplicated.id}`);
        } catch (err) {
            console.error("Error copying template:", err);
            alert("Could not copy template. Please check database permissions.");
        } finally {
            setDuplicatingId(null);
        }
    };

    // Filter & Sort Logic
    const filteredResumes = resumes.filter((r) => {
        const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
        const query = searchTerm.toLowerCase();
        const matchesSearch = 
            r.title.toLowerCase().includes(query) ||
            r.candidateName.toLowerCase().includes(query) ||
            r.jobRole.toLowerCase().includes(query) ||
            (r.skills && r.skills.some(s => s.toLowerCase().includes(query)));
        
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "alphabetical") {
            return a.title.localeCompare(b.title);
        }
        // Default newest
        return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 py-8 md:py-12">
                
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
                    <FiChevronRight size={14} />
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Demo Resumes</span>
                </nav>

                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                        <FiStar className="text-indigo-500 animate-pulse" /> Public Demo Gallery
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                        Explore Recruiter-Approved <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">
                            Demo Resumes
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Preview real industry-tested resumes. Click <span className="font-semibold text-slate-800 dark:text-slate-200">"Use This Template"</span> to instantly copy any design into your account and start editing!
                    </p>
                </div>

                {/* Controls Bar: Search + Category Filters + Sort */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
                    
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by job role, skill, candidate name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                        <FiFilter size={16} className="text-slate-400 hidden sm:block" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 font-medium px-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                        >
                            <option value="newest">Sort: Newest First</option>
                            <option value="alphabetical">Sort: Alphabetical</option>
                        </select>
                    </div>
                </div>

                {/* Resume Cards Grid */}
                {loading ? (
                    /* Skeleton Loaders */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md animate-pulse space-y-4">
                                <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-xl w-full"></div>
                                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2"></div>
                                <div className="flex gap-2 pt-4">
                                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl flex-1"></div>
                                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl flex-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : errorMsg ? (
                    /* Error / Failed to Load state */
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-red-200 dark:border-red-900/40 text-center max-w-lg mx-auto shadow-xl">
                        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                            <FiRefreshCw size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Notice</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{errorMsg}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-800 transition"
                        >
                            Reload Page
                        </button>
                    </div>
                ) : filteredResumes.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-slate-200 dark:border-slate-800 text-center max-w-lg mx-auto shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                            <FiSearch size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching demo resumes</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                            We couldn't find any demo resumes matching "{searchTerm}". Try tweaking your search query or reset your category filters.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md"
                        >
                            Reset Search Filters
                        </button>
                    </div>
                ) : (
                    /* Cards List */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-indigo-400/80 dark:hover:border-indigo-500/60 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
                            >
                                {/* Resume Thumbnail Box (Visual Styled Mock representation) */}
                                <div 
                                    onClick={() => navigate(`/demo/${resume.id}`)}
                                    className="relative h-56 bg-slate-100 dark:bg-slate-950 p-4 cursor-pointer overflow-hidden border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-center group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-950/20 transition-colors"
                                >
                                    {/* Glass Overlay Badges */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                                            {resume.templateBadge || "Modern Template"}
                                        </span>
                                    </div>
                                    
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="px-2.5 py-1 bg-slate-900/80 text-slate-100 text-[10px] font-medium rounded-full shadow-sm backdrop-blur-md">
                                            Read-Only
                                        </span>
                                    </div>

                                    {/* Miniature Visual Resume Replica */}
                                    <div className="w-full max-w-[220px] h-[190px] bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-3 overflow-hidden transform group-hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
                                        
                                        {/* Mock Header */}
                                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                                            {resume.personalInfo?.profileImage ? (
                                                <img 
                                                    src={resume.personalInfo.profileImage} 
                                                    alt={resume.candidateName}
                                                    className="w-7 h-7 rounded-full object-cover border border-indigo-400"
                                                />
                                            ) : (
                                                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                                                    {resume.candidateName?.charAt(0) || "U"}
                                                </div>
                                            )}
                                            <div className="flex-1 truncate">
                                                <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                                                    {resume.candidateName}
                                                </div>
                                                <div className="text-[9px] text-indigo-600 dark:text-indigo-400 truncate font-medium">
                                                    {resume.jobRole}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mock Body Lines */}
                                        <div className="space-y-1.5 my-2">
                                            <div className="h-1.5 bg-indigo-100 dark:bg-indigo-900/40 rounded w-3/4"></div>
                                            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                                            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                                            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded w-4/6"></div>
                                        </div>

                                        {/* Mock Skills Tags */}
                                        <div className="flex gap-1 overflow-hidden pt-1">
                                            {resume.skills?.slice(0, 3).map((skill, idx) => (
                                                <span key={idx} className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded truncate">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div>
                                        <h3 
                                            onClick={() => navigate(`/demo/${resume.id}`)}
                                            className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1 mb-1"
                                        >
                                            {resume.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            <span className="flex items-center gap-1"><FiUser className="text-slate-400" /> {resume.candidateName}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><FiBriefcase className="text-indigo-500" /> {resume.jobRole}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <button
                                            onClick={() => navigate(`/demo/${resume.id}`)}
                                            className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <FiEye size={14} /> Preview
                                        </button>

                                        <button
                                            onClick={(e) => handleUseTemplate(e, resume)}
                                            disabled={duplicatingId === resume.id}
                                            className="px-3 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5"
                                        >
                                            {duplicatingId === resume.id ? (
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    Copying...
                                                </span>
                                            ) : (
                                                <>
                                                    <FiCopy size={14} /> Use Template
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DemoGallery;
