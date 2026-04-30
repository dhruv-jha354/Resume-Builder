import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-1 mb-4">
                        resume<span className="text-green-500 text-3xl">.</span>
                    </Link>
                    <p className="text-gray-500 text-sm">
                        Build your professional resume in minutes. Get hired faster with modern templates.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/features" className="hover:text-green-500 transition-colors">Features</Link></li>
                        <li><Link to="/templates" className="hover:text-green-500 transition-colors">Templates</Link></li>
                        <li><Link to="/pricing" className="hover:text-green-500 transition-colors">Pricing</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-green-500 transition-colors">Career Blog</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Resume Examples</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Cover Letters</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact Us</Link></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
                <div className="flex gap-4">
                    <span className="hover:text-gray-600 cursor-pointer">Twitter</span>
                    <span className="hover:text-gray-600 cursor-pointer">LinkedIn</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
