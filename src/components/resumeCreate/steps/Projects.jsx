import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Projects = ({ projects, handleProjectChange, addProject, removeProject }) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Projects
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    Showcase your top projects
                </p>
            </div>

            <div className="space-y-6">
                {projects.map((proj, index) => (
                    <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button 
                            onClick={() => removeProject(index)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"
                        >
                            <FaTrash size={12} />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Project Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={proj.name || ""}
                                    onChange={(e) => handleProjectChange(index, e)}
                                    placeholder="e.g. E-Commerce App"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Link (Optional)</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={proj.link || ""}
                                    onChange={(e) => handleProjectChange(index, e)}
                                    placeholder="e.g. github.com/my-project"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Tech Stack</label>
                            <input
                                type="text"
                                name="techStack"
                                value={proj.techStack || ""}
                                onChange={(e) => handleProjectChange(index, e)}
                                placeholder="e.g. React, Node.js, MongoDB"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Description</label>
                            <textarea
                                name="description"
                                value={proj.description || ""}
                                onChange={(e) => handleProjectChange(index, e)}
                                placeholder="Describe the project logic, features, and your role..."
                                className="w-full h-20 p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none bg-white"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addProject}
                className="mt-6 w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-500 transition-all text-sm font-semibold"
            >
                <FaPlus size={12} /> Add Project
            </button>
        </div>
    );
};

export default Projects;
