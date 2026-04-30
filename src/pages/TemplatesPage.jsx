import React from 'react';
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const TemplatesPage = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Resume Templates</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Choose from our collection of professional resumes. You can always change your template later.
                </p>
                <div className="grid md:grid-cols-4 gap-6 text-left">
                    {/* Dummy template previews */}
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[1/1.4] bg-gray-200 rounded-xl mb-4 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-colors"></div>
                        <h3 className="font-bold text-gray-900">Minimal</h3>
                        <p className="text-sm text-gray-500">Clean, precise, and highly readable.</p>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[1/1.4] bg-gray-200 rounded-xl mb-4 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-colors"></div>
                        <h3 className="font-bold text-gray-900">Modern</h3>
                        <p className="text-sm text-gray-500">Two-column layout with color accents.</p>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[1/1.4] bg-gray-200 rounded-xl mb-4 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-colors"></div>
                        <h3 className="font-bold text-gray-900">Professional</h3>
                        <p className="text-sm text-gray-500">Classic styling for corporate roles.</p>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="w-full aspect-[1/1.4] bg-gray-200 rounded-xl mb-4 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-colors"></div>
                        <h3 className="font-bold text-gray-900">Creative</h3>
                        <p className="text-sm text-gray-500">Stand out with bold typography.</p>
                    </div>
                </div>
                <div className="mt-16">
                    <Link to="/signup" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-colors shadow-lg">
                        Select a Template and Start
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default TemplatesPage;
