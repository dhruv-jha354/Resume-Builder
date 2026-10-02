import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { FiArrowRight, FiFileText, FiCheckCircle } from "react-icons/fi";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const infoMessage = location.state?.message;

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
            {/* Left Panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight cursor-pointer" onClick={() => navigate("/")}>
                        ResumeBuilder
                    </h1>
                    <p className="text-indigo-200 text-sm mt-1">Craft resumes that get you hired.</p>
                </div>
                
                <div className="relative z-10 space-y-5">
                    <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
                        Your dream job starts with a great resume.
                    </h2>
                    <p className="text-indigo-200 leading-relaxed">
                        Join 12,000+ professionals who have used ResumeBuilder to land interviews at top companies.
                    </p>
                    <div className="space-y-3 pt-2">
                        {[
                            "6 professionally designed templates",
                            "ATS-optimized for every industry",
                            "Download as PDF in one click"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/90 text-sm">
                                <FiCheckCircle className="text-indigo-300 flex-shrink-0" size={16} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <p className="text-white/90 italic text-sm mb-3">
                        "The smart suggestions completely transformed my bullet points. I landed interviews at top companies within two weeks."
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">R</div>
                        <div>
                            <p className="text-white text-xs font-bold">Rahul Sharma</p>
                            <p className="text-indigo-200 text-[10px]">Software Engineer @ Google</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate("/")}>
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resume</span>
                            <span className="text-slate-900 dark:text-white">Builder</span>
                        </h1>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Welcome back
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                            Sign in to continue building your resume.
                        </p>
                    </div>

                    {infoMessage && (
                        <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-400 text-sm font-semibold rounded-2xl">
                            {infoMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-slate-400 text-sm transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                                Password
                            </label>
                            <PasswordInput
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-2.5">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>Sign In <FiArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-8">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                            Sign up free
                        </button>
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full mt-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-center"
                    >
                        ← Back to home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;