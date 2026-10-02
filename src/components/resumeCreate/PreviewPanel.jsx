import React from "react";
import TemplateRenderer from "./templates/TemplateRenderer";

const PreviewPanel = ({ resumeData }) => {
    if (!resumeData) return null;

    return (
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 preview-card h-[800px] w-full">
            <div className="h-full overflow-y-auto bg-slate-50/50">
               <TemplateRenderer templateId={resumeData.template} resumeData={resumeData} />
            </div>
        </div>
    );
};

export default PreviewPanel;
