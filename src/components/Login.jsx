import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            alert("Login Success");
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-[360px] max-w-sm bg-white/90 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-3">
                    Login
                </h2>
                <p className="text-gray-500 text-center mb-8">
                   Please Login to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                    />

                    <PasswordInput
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition duration-300 shadow-sm"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-green-600 font-medium hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Login;