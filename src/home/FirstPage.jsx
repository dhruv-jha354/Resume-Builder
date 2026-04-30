import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiFileText, FiCpu, FiDownload, FiStar, FiChevronDown, FiLayout, FiActivity } from 'react-icons/fi';

const FirstPage = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950 -z-10"></div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 border border-indigo-200 dark:border-indigo-500/20 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                            Resume Builder
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Generate a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">professional resume</span> in minutes 
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Stop struggling with formatting and writer's block. Our smart builder creates professional, high-converting resumes designed to pass automated screening and impress recruiters.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
                                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {isLoggedIn ? "Go to Dashboard" : "Build Resume"}
                            </button>
                            <button
                                onClick={() => navigate("/demo")}
                                className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-800 rounded-full hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                            >
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-1000 hidden sm:block">
                        {/* Abstract UI Mockup */}
                        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0">
                            <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                </div>
                            </div>
                            <div className="p-6 grid gap-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
                                        <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-1/4"></div>
                                        <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="space-y-3 mt-4">
                                    <div className="h-4 bg-indigo-50 dark:bg-indigo-900/20 rounded w-1/4"></div>
                                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-4/6"></div>
                                </div>
                                <div className="space-y-3 mt-4">
                                    <div className="h-4 bg-indigo-50 dark:bg-indigo-900/20 rounded w-1/4"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                        <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                        <div className="h-6 w-14 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-4">
                                <div className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <FiCheckCircle /> ATS Score: 95
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="border-y border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                        <div className="pt-4 md:pt-0">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">12,000+</p>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resumes Created</p>
                        </div>
                        <div className="pt-8 md:pt-0">
                            <div className="flex justify-center text-amber-400 mb-2">
                                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current w-6 h-6" />)}
                            </div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">4.8/5 User Rating</p>
                        </div>
                        <div className="pt-8 md:pt-0">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">3 Min</p>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Build Time</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to get hired</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Powerful features wrapped in a beautifully simple interface.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FiActivity, title: "ATS Score Checker", desc: "Instantly see how well your resume matches automated screening systems." },
                            { icon: FiCpu, title: "Smart Content Suggestions", desc: "Writer's block? Get professional bullet points tailored to your role." },
                            { icon: FiLayout, title: "Multiple Templates", desc: "Choose from a curated collection of clean, modern, and recruiter-approved designs." },
                            { icon: FiDownload, title: "One-click PDF Export", desc: "Download your pixel-perfect resume instantly, ready to attach to applications." },
                            { icon: FiFileText, title: "Job-specific Optimization", desc: "Tailor your resume for specific job descriptions to maximize your interview chances." },
                            { icon: FiCheckCircle, title: "Real-time Preview", desc: "See your changes instantly as you type with our side-by-side builder interface." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white dark:bg-slate-900 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Three simple steps to your next career move.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 dark:bg-slate-800 -z-10"></div>

                        {[
                            { step: "01", title: "Enter your details", desc: "Import your LinkedIn profile or start from scratch with our simple form." },
                            { step: "02", title: "Smart content improvements", desc: "We enhance your phrasing and optimize keywords for ATS systems." },
                            { step: "03", title: "Download resume", desc: "Export as a high-quality PDF and start applying with confidence." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 rounded-full shadow-sm flex items-center justify-center mb-6 relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Loved by job seekers</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { quote: "The smart suggestions completely transformed my bullet points. I landed interviews at top tech companies within two weeks of using this.", author: "Sarah Jenkins", role: "Software Engineer" },
                            { quote: "Clean, intuitive, and the ATS checker gave me peace of mind. The templates are genuinely beautiful compared to other builders.", author: "Michael Chang", role: "Product Manager" }
                        ].map((test, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
                                <FiStar className="text-indigo-100 dark:text-indigo-900/30 w-16 h-16 absolute top-4 right-4 -z-0" />
                                <div className="relative z-10">
                                    <p className="text-slate-700 dark:text-slate-300 text-lg mb-6 italic">"{test.quote}"</p>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{test.author}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{test.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="py-24 bg-white dark:bg-slate-900 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, transparent pricing</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-16">Start for free, upgrade when you need more power.</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
                        {/* Free Plan */}
                        <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Free</h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-emerald-500" /> 1 Resume</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-emerald-500" /> Basic Templates</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-emerald-500" /> PDF Export</li>
                            </ul>
                            <button onClick={() => navigate("/signup")} className="w-full py-3 rounded-full border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition">Get Started</button>
                        </div>
                        {/* Pro Plan */}
                        <div className="p-8 rounded-2xl border-2 border-indigo-500 bg-white dark:bg-slate-900 relative shadow-xl">
                            <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-6">$12<span className="text-lg text-slate-500 font-normal">/mo</span></p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-indigo-500" /> Unlimited Resumes</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-indigo-500" /> Premium Templates</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-indigo-500" /> Advanced Content Generation</li>
                                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><FiCheckCircle className="text-indigo-500" /> ATS Optimization</li>
                            </ul>
                            <button onClick={() => navigate("/signup")} className="w-full py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition shadow-md hover:shadow-lg">Upgrade to Pro</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is the ATS checker accurate?", a: "Yes, our ATS checker mimics the logic of popular screening software to ensure your resume gets past the bots." },
                            { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. You can cancel your subscription from your dashboard with just two clicks." },
                            { q: "Are my details secure?", a: "We take privacy seriously. Your data is encrypted and we never sell your personal information." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 cursor-pointer group">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">{faq.q}</h4>
                                    <FiChevronDown className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform" />
                                </div>
                                <p className="mt-4 text-slate-600 dark:text-slate-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Footer inside Landing Page */}
            <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FirstPage;