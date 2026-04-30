import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaLinkedin, FaGlobe, FaCamera } from "react-icons/fa";

const PersonalInfo = ({ formData, handleInputChange, handleImageUpload, handleImageRemove, uploadedImage }) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Personal Information
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    Get started with your personal information
                </p>
            </div>

            {/* Upload Section */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="relative group">
                    <label className="relative cursor-pointer block">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="w-16 h-16 rounded-full bg-white border-2 border-dashed border-blue-300 flex items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300 shadow-sm overflow-hidden">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <FaCamera size={20} className="text-blue-400" />
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            +
                        </div>
                    </label>
                    {uploadedImage && (
                        <button
                            type="button"
                            onClick={handleImageRemove}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-lg leading-none transition-opacity hover:bg-red-600 shadow-sm z-10"
                            title="Remove Photo"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700">Profile Picture</p>
                    <p className="text-xs text-gray-500">Click to upload your photo</p>
                </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
                <InputIcon
                    icon={<FaUser className="text-gray-400" />}
                    label="Full Name *"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaEnvelope className="text-gray-400" />}
                    label="Email Address *"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaPhone className="text-gray-400" />}
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaMapMarkerAlt className="text-gray-400" />}
                    label="Location"
                    name="location"
                    placeholder="Enter your location (e.g. New York, NY)"
                    value={formData.location}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaBriefcase className="text-gray-400" />}
                    label="Profession"
                    name="profession"
                    placeholder="Enter your top profession (e.g. Software Engineer)"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaLinkedin className="text-gray-400" />}
                    label="LinkedIn Profile"
                    name="linkedin"
                    placeholder="Enter your linkedin profile URL"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
                <InputIcon
                    icon={<FaGlobe className="text-gray-400" />}
                    label="Personal Website"
                    name="website"
                    placeholder="Enter your personal website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('personalInfo', e)}
                />
            </div>
        </div>
    );
};

// Input Component with Icon (Internal usage)
const InputIcon = ({ icon, label, placeholder, ...props }) => (
    <div className="group">
        <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="group-focus-within:text-blue-500 transition-colors duration-200">
                    {icon}
                </div>
            </div>
            <input
                {...props}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white"
            />
        </div>
    </div>
);

export default PersonalInfo;
