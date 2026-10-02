import React from "react";
import ModernTemplate from "./ModernTemplate";
import AtsTemplate from "./AtsTemplate";
import MinimalTemplate from "./MinimalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import ElegantTemplate from "./ElegantTemplate";

/**
 * Master Template Renderer Component.
 * Maps template ID to the corresponding template design.
 */
const TemplateRenderer = ({ templateId, resumeData }) => {
    if (!resumeData) return null;

    const selected = templateId || resumeData.template || "modern";

    switch (selected) {
        case "modern":
            return <ModernTemplate resumeData={resumeData} />;
        case "ats":
            return <AtsTemplate resumeData={resumeData} />;
        case "minimal":
            return <MinimalTemplate resumeData={resumeData} />;
        case "creative":
            return <CreativeTemplate resumeData={resumeData} />;
        case "executive":
            return <ExecutiveTemplate resumeData={resumeData} />;
        case "elegant":
            return <ElegantTemplate resumeData={resumeData} />;
        default:
            return <ModernTemplate resumeData={resumeData} />;
    }
};

export default TemplateRenderer;
