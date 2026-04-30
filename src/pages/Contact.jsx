import React from 'react';
import Layout from "../components/Layout";

const Contact = () => {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
                <p className="text-xl text-gray-600 mb-12">
                    Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
                </p>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea className="w-full h-32 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50 resize-none"></textarea>
                        </div>
                        <button type="button" className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
