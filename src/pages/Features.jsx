import React from 'react';
import Layout from "../components/Layout";

const Features = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Features</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Everything you need to create a professional, stunning resume in minutes.
                </p>
                <div className="grid md:grid-cols-2 gap-12 text-left">
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">Smart Writer</h3>
                        <p className="text-gray-600">Instantly generate professional summaries and role descriptions tailored to your exact industry and experience level.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">Live Preview</h3>
                        <p className="text-gray-600">See changes applied instantly. What you see on the screen is exactly what you get when you download your PDF.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">ATS-Friendly</h3>
                        <p className="text-gray-600">Our templates are strictly designed to pass through Applicant Tracking Systems (ATS) so human recruiters actually see your application.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">Cloud Sync</h3>
                        <p className="text-gray-600">Your data is seamlessly saved to the cloud. You can log in from any device and pick up exactly where you left off.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Features;
