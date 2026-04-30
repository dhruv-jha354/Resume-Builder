import { useState } from "react";

function PasswordInput({ value, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative w-full">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition pr-12"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? "🙈" : "👁"}
            </button>
        </div>
    );
}
export default PasswordInput;