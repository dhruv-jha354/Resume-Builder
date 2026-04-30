import React from "react";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

const PreviewPanel = ({ resumeData }) => {
    if (!resumeData) return null;

    const templateName = resumeData.template || "minimal";

    const renderTemplate = () => {
        switch (templateName) {
            case "modern":
                return <ModernTemplate resumeData={resumeData} />;
            case "professional":
                return <ProfessionalTemplate resumeData={resumeData} />;
            case "creative":
                return <CreativeTemplate resumeData={resumeData} />;
            case "minimal":
            default:
                return <MinimalTemplate resumeData={resumeData} />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 preview-card h-[800px] w-full">
            <div className="h-full overflow-y-auto bg-gray-50/50">
               {renderTemplate()}
            </div>
        </div>
    );
};

export default PreviewPanel;
