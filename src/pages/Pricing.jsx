import React from 'react';
import Layout from "../components/Layout";

const Pricing = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Simple Pricing</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Start for free and upgrade when you need more power.
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-2xl text-gray-900 mb-2">Free</h3>
                        <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></p>
                        <ul className="space-y-4 mb-8 text-gray-600">
                            <li>✓ 1 Resume</li>
                            <li>✓ Basic Templates</li>
                            <li>✓ PDF Export</li>
                            <li className="text-gray-300">✗ Smart Content Suggestions</li>
                        </ul>
                        <button className="w-full py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors">Current Plan</button>
                    </div>
                    <div className="p-8 bg-gray-900 rounded-3xl shadow-xl border border-gray-800 text-white relative">
                        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-green-500 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                        <h3 className="font-bold text-2xl mb-2">Pro</h3>
                        <p className="text-4xl font-bold mb-6">$9<span className="text-lg text-gray-400 font-normal">/month</span></p>
                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li>✓ Unlimited Resumes</li>
                            <li>✓ All Premium Templates</li>
                            <li>✓ Smart Content Suggestions</li>
                            <li>✓ Priority Support</li>
                        </ul>
                        <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors">Upgrade to Pro</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pricing;
