import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
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
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            alert("Account Created Successfully!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-[375px] max-w-sm bg-white/90 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl p-9">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-2">
                    Sign up
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Please register to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                    />
                    <PasswordInput
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <button type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300">
                        Sign up
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/login")}
                        className="text-green-600 font-medium hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Signup;