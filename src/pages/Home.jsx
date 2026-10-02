import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
    FiCheckCircle, FiFileText, FiCpu, FiDownload, FiStar, 
    FiLayout, FiActivity, FiSun, FiMoon, FiMenu, FiX,
    FiArrowRight, FiZap, FiShield, FiTrendingUp
} from 'react-icons/fi';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (document.documentElement.classList.contains('dark') || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/20 transition-colors duration-300">
            
            {/* Navbar */}
            <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-xs border-b border-slate-200/70 dark:border-slate-800/70' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <h1 
                        onClick={() => navigate("/")} 
                        className="text-xl font-bold cursor-pointer tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Resume</span>
                        <span className="text-slate-900 dark:text-white">Builder</span>
                    </h1>
                    
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        {["Features", "How it works", "Testimonials", "Pricing", "FAQ"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                               className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <button onClick={toggleDarkMode} 
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" 
                            aria-label="Toggle Dark Mode">
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                        
                        {!currentUser ? (
                            <>
                                <button onClick={() => navigate("/login")} 
                                    className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2">
                                    Log in
                                </button>
                                <button onClick={() => navigate("/signup")} 
                                    className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5">
                                    Sign Up Free
                                </button>
                            </>
                        ) : (
                            <button onClick={() => navigate("/dashboard")} 
                                className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5">
                                Dashboard
                            </button>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <>
                        <div className="fixed inset-0 top-16 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden" 
                             onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-6 absolute w-full shadow-2xl z-50 flex flex-col space-y-4">
                            {["Features", "How it works", "Testimonials", "Pricing", "FAQ"].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                   onClick={() => setIsMobileMenuOpen(false)}
                                   className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 block py-1">
                                    {item}
                                </a>
                            ))}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-2 flex flex-col gap-3">
                                {!currentUser ? (
                                    <>
                                        <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} 
                                            className="w-full px-4 py-3 text-center border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors">
                                            Log in
                                        </button>
                                        <button onClick={() => { setIsMobileMenuOpen(false); navigate("/signup"); }} 
                                            className="w-full px-4 py-3 text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-semibold transition-colors shadow-md shadow-indigo-500/20">
                                            Sign Up Free
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => { setIsMobileMenuOpen(false); navigate("/dashboard"); }} 
                                        className="w-full px-4 py-3 text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-semibold transition-colors">
                                        Dashboard
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 px-6 overflow-hidden">
                {/* Subtle soft radial glow behind hero */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 -right-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-800/60 rounded-full shadow-2xs backdrop-blur-xs">
                        <FiZap size={13} className="fill-current text-indigo-600 dark:text-indigo-400" />
                        AI-Powered Resume Builder
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.12] mb-6 tracking-tight">
                        Build a resume that{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            gets you hired
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
                        Stop struggling with formatting. Our AI-powered builder creates professional, ATS-optimized resumes in minutes — designed to pass automated screening and impress recruiters.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                        <button
                            onClick={() => navigate(currentUser ? "/dashboard" : "/signup")}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 text-sm"
                        >
                            Build My Resume <FiArrowRight size={15} />
                        </button>
                        <button
                            onClick={() => navigate("/demo")}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all text-sm"
                        >
                            View Demo Resumes
                        </button>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-2 mt-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex -space-x-1.5">
                            {["I", "R", "A", "S"].map((l, i) => (
                                <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white dark:border-slate-950 ${
                                    ["bg-indigo-500","bg-violet-500","bg-purple-500","bg-indigo-600"][i]
                                }`}>{l}</div>
                            ))}
                        </div>
                        <span><strong className="text-slate-700 dark:text-slate-300 font-semibold">12,000+</strong> professionals trust us</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-semibold ml-1">
                            <FiStar className="fill-current" size={12} /> 4.8
                        </span>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 py-10">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80 dark:divide-slate-800">
                        <div className="py-2 md:py-0">
                            <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">12,000+</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">Resumes Created</p>
                        </div>
                        <div className="py-4 md:py-0 flex flex-col items-center">
                            <div className="flex justify-center text-amber-400 mb-1.5 gap-0.5">
                                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-4 h-4" />)}
                            </div>
                            <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">4.8/5</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">User Rating</p>
                        </div>
                        <div className="py-4 md:py-0">
                            <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">3 Min</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">Average Build Time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-28 px-6 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-100 dark:border-indigo-800/60 rounded-full">
                            Features
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Everything you need to get hired</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">Professional tools designed to give you the edge in today's competitive job market.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FiActivity, title: "ATS Score Checker", desc: "See how well your resume matches automated screening systems before submitting.", color: "from-indigo-600 to-indigo-700" },
                            { icon: FiCpu, title: "Smart Content Suggestions", desc: "Get AI-powered bullet points tailored to your specific role and industry.", color: "from-violet-600 to-purple-600" },
                            { icon: FiLayout, title: "6 Premium Templates", desc: "Choose from professionally designed templates — from ATS-friendly to creative.", color: "from-indigo-600 to-violet-600" },
                            { icon: FiDownload, title: "One-Click PDF Export", desc: "Download your resume instantly, pixel-perfect and ready to attach to applications.", color: "from-purple-600 to-indigo-600" },
                            { icon: FiTrendingUp, title: "Job-Specific Optimization", desc: "Tailor your resume for specific job descriptions with keyword analysis.", color: "from-indigo-600 to-blue-600" },
                            { icon: FiCheckCircle, title: "Real-Time Preview", desc: "See your changes instantly as you type with our live side-by-side interface.", color: "from-violet-600 to-indigo-600" }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-200 group">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                                    <feature.icon size={20} />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{feature.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 px-6 border-t border-slate-200/80 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-3 border border-violet-100 dark:border-violet-800/60 rounded-full">
                            Process
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">How it works</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">Three simple steps to your next career move.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 relative">
                        {[
                            { step: "01", title: "Enter your details", desc: "Start from scratch or upload your existing resume. Fill in your experience, skills, and achievements." },
                            { step: "02", title: "Pick your template", desc: "Choose from 6 professionally designed templates. Switch anytime without losing your data." },
                            { step: "03", title: "Download & Apply", desc: "Export as a high-quality, ATS-optimized PDF and start submitting applications." }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative hover:shadow-md transition-all">
                                <div className="w-13 h-13 mx-auto bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-4 shadow-md shadow-indigo-500/20 relative z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resume Preview Section */}
            <section className="py-20 md:py-28 bg-white dark:bg-slate-950 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-4 border border-indigo-100 dark:border-indigo-800/60 rounded-full">
                            Templates
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                            Templates that get you{" "}
                            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">noticed</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-base leading-relaxed">
                            Our templates are crafted to look stunning to human eyes while parsing perfectly in applicant tracking systems.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {["Clean, professional layouts optimized for readability", "ATS-safe structure with semantic formatting", "6 unique designs for every industry and career level"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FiCheckCircle size={11} className="text-white" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => navigate("/templates")} 
                            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all">
                            Explore all templates <FiArrowRight size={14} />
                        </button>
                    </div>
                    {/* Resume card preview */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl blur-2xl transform scale-105" />
                        <div className="relative bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl text-left">
                            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">Rahul Sharma</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs mt-0.5">Senior Frontend Developer</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">rahul.sharma@email.com · +91 9876543210 · Mumbai, India</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {["JavaScript", "React.js", "Redux", "TypeScript", "Tailwind CSS", "Node.js"].map((s, i) => (
                                        <span key={i} className="text-[11px] px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-medium border border-slate-200/60 dark:border-slate-700">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">Experience</h4>
                                <div>
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">Lead Frontend Engineer</h5>
                                        <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">2022 – Present</span>
                                    </div>
                                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mb-1.5">CloudScale Systems</p>
                                    <ul className="text-[11px] text-slate-600 dark:text-slate-300 list-disc list-outside ml-4 space-y-0.5">
                                        <li>Architected responsive web applications with React, decreasing load time by 35%.</li>
                                        <li>Collaborated with design team to maintain accessible, enterprise design systems.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 px-6 border-t border-slate-200/80 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-100 dark:border-indigo-800/60 rounded-full">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Loved by job seekers</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base">Join thousands of professionals who landed their dream job.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            { quote: "The smart suggestions completely transformed my bullet points. I landed interviews at top companies within two weeks.", author: "Rahul Sharma", role: "Software Engineer @ Google" },
                            { quote: "Clean, intuitive, and the ATS checker gave me peace of mind. The templates are genuinely premium-quality.", author: "Priya Verma", role: "Product Manager @ Flipkart" },
                            { quote: "I was struggling with formatting for days. This tool built a perfect resume in under 5 minutes.", author: "Aman Gupta", role: "Data Analyst @ Microsoft" },
                            { quote: "The PDF export is flawless and it matches the preview exactly. Highly recommended for freshers!", author: "Sneha Kapoor", role: "Marketing Specialist @ HubSpot" }
                        ].map((test, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current text-amber-400 w-3.5 h-3.5" />)}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4 italic text-xs sm:text-sm leading-relaxed">"{test.quote}"</p>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                                        {test.author[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{test.author}</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{test.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 md:py-28 bg-white dark:bg-slate-950 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-3 border border-violet-100 dark:border-violet-800/60 rounded-full">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Simple, transparent pricing</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-12 text-base">Start for free, upgrade when you need more power.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                        {/* Free Plan */}
                        <div className="p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Free</h3>
                                <p className="text-4xl font-extrabold text-slate-900 dark:text-white my-3">$0<span className="text-sm text-slate-500 font-normal">/mo</span></p>
                                <ul className="space-y-2.5 mb-8">
                                    {["1 Resume", "Basic Templates", "PDF Export"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                            <FiCheckCircle className="text-slate-400" size={14} /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => navigate("/signup")} 
                                className="w-full py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-sm">
                                Get Started Free
                            </button>
                        </div>
                        {/* Pro Plan */}
                        <div className="p-7 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 text-white relative shadow-xl shadow-indigo-500/20 flex flex-col justify-between">
                            <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-400 text-amber-950 px-3 py-0.5 rounded-full text-[10px] font-extrabold">MOST POPULAR</div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Pro</h3>
                                <p className="text-4xl font-extrabold my-3">$12<span className="text-sm font-normal opacity-80">/mo</span></p>
                                <ul className="space-y-2.5 mb-8">
                                    {["Unlimited Resumes", "6 Premium Templates", "Smart AI Suggestions", "ATS Optimization"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/95">
                                            <FiCheckCircle className="text-white" size={14} /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => navigate("/signup")} 
                                className="w-full py-2.5 rounded-2xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-colors shadow-sm text-sm">
                                Upgrade to Pro
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 px-6 border-t border-slate-200/80 dark:border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-100 dark:border-indigo-800/60 rounded-full">
                            FAQ
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Frequently asked questions</h2>
                    </div>
                    <div className="space-y-3.5">
                        {[
                            { q: "Is the ATS checker accurate?", a: "Yes, our ATS checker mimics the logic of popular screening software to ensure your resume gets past the bots and into human hands." },
                            { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. You can cancel your subscription from your dashboard with just two clicks — no questions asked." },
                            { q: "Are my details secure?", a: "We take privacy seriously. Your data is encrypted, stored securely on Firebase, and we never sell your personal information to third parties." },
                            { q: "Can I switch templates without losing data?", a: "Yes! Your content is stored separately from the template. Switch between any of the 6 templates at any time with zero data loss." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-colors">
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">{faq.q}</h4>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 rounded-3xl p-10 sm:p-14 text-center text-white overflow-hidden shadow-2xl shadow-indigo-500/20">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">Ready to land your dream job?</h2>
                            <p className="text-indigo-100 mb-8 text-base max-w-xl mx-auto">Join over 12,000 professionals who have already built their winning resumes.</p>
                            <button 
                                onClick={() => navigate(currentUser ? "/dashboard" : "/signup")}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 shadow-lg transition-all hover:-translate-y-0.5 text-sm">
                                Start Building Free <FiArrowRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-center">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-lg font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Resume</span>
                        <span className="text-slate-900 dark:text-white">Builder</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {["Features", "Templates", "Pricing", "FAQ"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} 
                                className="text-xs sm:text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm">© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
