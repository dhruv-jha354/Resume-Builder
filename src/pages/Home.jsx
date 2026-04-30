import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
    FiCheckCircle, FiFileText, FiCpu, FiDownload, FiStar, 
    FiLayout, FiActivity, FiSun, FiMoon, FiMenu, FiX 
} from 'react-icons/fi';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    // Dark mode state
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Check initial theme
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            
            {/* Simple Navbar */}
            <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <h1 onClick={() => navigate("/")} className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
                        Resume<span className="text-green-600">Builder</span>
                    </h1>
                    
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        {["Features", "How it works", "Testimonials", "Pricing", "FAQ"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md" aria-label="Toggle Dark Mode">
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                        
                        {!currentUser ? (
                            <>
                                <button onClick={() => navigate("/login")} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600">
                                    Log in
                                </button>
                                <button onClick={() => navigate("/signup")} className="px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100">
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <button onClick={() => navigate("/dashboard")} className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700">
                                Dashboard
                            </button>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-300">
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <>
                        <div 
                            className="fixed inset-0 top-16 z-40 bg-black/20 dark:bg-black/40 md:hidden" 
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>
                        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6 absolute w-full shadow-xl z-50 flex flex-col space-y-4">
                            {["Features", "How it works", "Testimonials", "Pricing", "FAQ"].map((item) => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 block py-2"
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mt-2 flex flex-col gap-3">
                                {!currentUser ? (
                                    <>
                                        <button onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }} className="w-full px-4 py-3 text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors">
                                            Log in
                                        </button>
                                        <button onClick={() => { setIsMobileMenuOpen(false); navigate("/signup"); }} className="w-full px-4 py-3 text-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 font-medium transition-colors">
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => { setIsMobileMenuOpen(false); navigate("/dashboard"); }} className="w-full px-4 py-3 text-center bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition-colors">
                                        Dashboard
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </nav>

            {/* Hero Section */}
            <section className="py-20 md:py-32 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-6 border border-green-200 dark:border-green-800 rounded-md">
                        Resume Builder
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                        Generate a <span className="text-green-600">professional resume</span> in minutes.
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Stop struggling with formatting and writer's block. Our simple builder creates professional resumes designed to pass automated screening.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => navigate(currentUser ? "/dashboard" : "/signup")}
                            className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                            Build Resume
                        </button>
                        <button
                            onClick={() => navigate("/demo")}
                            className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            View Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                        <div className="pt-4 md:pt-0">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">12,000+</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Resumes Created</p>
                        </div>
                        <div className="pt-8 md:pt-0 flex flex-col items-center">
                            <div className="flex justify-center text-yellow-500 mb-1 gap-1">
                                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-5 h-5" />)}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">4.8/5 User Rating</p>
                        </div>
                        <div className="pt-8 md:pt-0">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3 Min</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Average Build Time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900 px-6 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Everything you need to get hired</h2>
                        <p className="text-gray-600 dark:text-gray-400">Simple tools to help you build the perfect resume.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FiActivity, title: "ATS Score Checker", desc: "See how well your resume matches automated screening systems." },
                            { icon: FiCpu, title: "Smart Content Suggestions", desc: "Get professional bullet points tailored to your role." },
                            { icon: FiLayout, title: "Multiple Templates", desc: "Choose from clean, modern, and recruiter-approved designs." },
                            { icon: FiDownload, title: "One-click PDF Export", desc: "Download your resume instantly, ready to attach to applications." },
                            { icon: FiFileText, title: "Job-specific Optimization", desc: "Tailor your resume for specific job descriptions easily." },
                            { icon: FiCheckCircle, title: "Real-time Preview", desc: "See your changes instantly as you type with our interface." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
                                <div className="w-10 h-10 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center mb-4">
                                    <feature.icon size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-16 bg-white dark:bg-gray-800 px-6 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">How it works</h2>
                        <p className="text-gray-600 dark:text-gray-400">Three simple steps to your next career move.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Enter your details", desc: "Start from scratch or upload your existing resume." },
                            { step: "2", title: "Smart content suggestions", desc: "We enhance your phrasing and optimize keywords." },
                            { step: "3", title: "Download resume", desc: "Export as a high-quality PDF and start applying." }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
                                <div className="w-12 h-12 mx-auto bg-green-600 text-white rounded-md flex items-center justify-center text-xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resume Preview Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900 px-6 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Clean templates</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Our templates are carefully crafted. They look great to human eyes and parse perfectly in applicant tracking systems.
                        </p>
                        <ul className="space-y-3 mb-6">
                            {["Clean, professional layouts", "Optimized line heights & spacing", "Proper semantic structure for parsers"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FiCheckCircle className="text-green-600" /> {item}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => navigate("/templates")} className="text-green-600 dark:text-green-400 font-medium hover:underline">
                            Explore all templates &rarr;
                        </button>
                    </div>
                    <div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-md border border-gray-200 dark:border-gray-700 max-w-md mx-auto shadow-sm text-left">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">Rahul Sharma</h3>
                                <p className="text-green-600 font-medium">Frontend Developer</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">rahul.sharma@email.com | +91 9876543210 | Mumbai, India</p>
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-700 pb-1 mb-2">Skills</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <span className="font-semibold text-gray-900 dark:text-white">Core:</span> JavaScript (ES6+), React.js, Redux, HTML5, CSS3, Tailwind CSS<br/>
                                    <span className="font-semibold text-gray-900 dark:text-white">Tools:</span> Git, Webpack, VS Code, Figma
                                </p>
                            </div>

                            <div className="mb-2">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-700 pb-1 mb-2">Experience</h4>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white">Software Engineer</h5>
                                        <span className="text-xs text-gray-500">2022 - Present</span>
                                    </div>
                                    <p className="text-xs text-green-600 font-medium mb-1">Tech Solutions Inc.</p>
                                    <ul className="text-xs text-gray-700 dark:text-gray-300 list-disc list-outside ml-4 space-y-1">
                                        <li>Developed responsive web applications using React.js, improving load times by 30%.</li>
                                        <li>Collaborated with UI/UX designers to implement modern, accessible interfaces.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 bg-white dark:bg-gray-800 px-6 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Loved by job seekers</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            { quote: "The smart suggestions completely transformed my bullet points. I landed interviews at top companies quickly.", author: "Rahul Sharma", role: "Software Engineer" },
                            { quote: "Clean, intuitive, and the ATS checker gave me peace of mind. The templates are genuinely professional.", author: "Priya Verma", role: "Product Manager" },
                            { quote: "I was struggling with formatting for days. This tool built a perfect resume in just a few minutes.", author: "Aman Gupta", role: "Data Analyst" },
                            { quote: "The PDF export is flawless and it matches the preview exactly. Highly recommended for freshers.", author: "Sneha Kapoor", role: "Marketing Specialist" }
                        ].map((test, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-md border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 mb-4 italic text-sm">"{test.quote}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{test.author}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{test.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900 px-6 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Simple pricing</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-12">Start for free, upgrade when you need more power.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                        {/* Free Plan */}
                        <div className="p-6 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Free</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">$0<span className="text-base text-gray-500 font-normal">/mo</span></p>
                            <ul className="space-y-2 mb-6">
                                {["1 Resume", "Basic Templates", "PDF Export"].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <FiCheckCircle className="text-gray-400" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="w-full py-2 rounded-md border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Get Started</button>
                        </div>
                        {/* Pro Plan */}
                        <div className="p-6 rounded-md border-2 border-green-600 bg-white dark:bg-gray-800 relative">
                            <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">PRO</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Pro</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">$12<span className="text-base text-gray-500 font-normal">/mo</span></p>
                            <ul className="space-y-2 mb-6">
                                {["Unlimited Resumes", "Premium Templates", "Smart Content Suggestions", "ATS Optimization"].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <FiCheckCircle className="text-green-600" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate("/signup")} className="w-full py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700">Upgrade to Pro</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-16 bg-white dark:bg-gray-800 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is the ATS checker accurate?", a: "Yes, our ATS checker mimics the logic of popular screening software to ensure your resume gets past the bots." },
                            { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. You can cancel your subscription from your dashboard with just two clicks." },
                            { q: "Are my details secure?", a: "We take privacy seriously. Your data is encrypted and we never sell your personal information." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-md p-5 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold text-gray-900 dark:text-white">{faq.q}</h4>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Resume<span className="text-green-600">Builder</span>
                    </div>
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
