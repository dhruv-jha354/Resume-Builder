/**
 * Centralized Single Source of Truth for all Resume Templates.
 * Every template defined here is synchronized across Demo Gallery, Create Resume Modal,
 * Resume Builder Template Selector, and Templates Page.
 */
export const TEMPLATES = [
    {
        id: "modern",
        name: "Modern Professional",
        badge: "Modern Template",
        category: "Engineering",
        demoId: "demo-software-engineer",
        desc: "Sleek two-column layout with dark sidebar and vibrant accent badges.",
        previewBg: "from-slate-900 to-slate-800",
        accentColor: "indigo"
    },
    {
        id: "ats",
        name: "ATS Classic",
        badge: "ATS Friendly",
        category: "Engineering",
        demoId: "demo-fullstack-developer",
        desc: "Single-column minimalist layout optimized to pass Applicant Tracking Systems effortlessly.",
        previewBg: "from-blue-900 to-slate-900",
        accentColor: "blue"
    },
    {
        id: "minimal",
        name: "Minimalist Clean",
        badge: "Minimal Template",
        category: "Engineering",
        demoId: "demo-frontend-developer",
        desc: "Clean typography with generous whitespace and elegant line dividers.",
        previewBg: "from-emerald-900 to-slate-900",
        accentColor: "emerald"
    },
    {
        id: "creative",
        name: "Creative Portfolio",
        badge: "Creative Template",
        category: "Design",
        demoId: "demo-ui-ux-designer",
        desc: "Bold gradient headers, skill chips, and vibrant contrast for design roles.",
        previewBg: "from-purple-900 to-indigo-900",
        accentColor: "purple"
    },
    {
        id: "executive",
        name: "Executive Leadership",
        badge: "Executive Template",
        category: "Data",
        demoId: "demo-data-analyst",
        desc: "Formal navy and gold accents with dedicated executive summary framing.",
        previewBg: "from-amber-950 to-slate-900",
        accentColor: "amber"
    },
    {
        id: "elegant",
        name: "Elegant Serif",
        badge: "Elegant Template",
        category: "Marketing",
        demoId: "demo-marketing-manager",
        desc: "Classic serif typography, centered banner header, and sophisticated timeline design.",
        previewBg: "from-rose-950 to-slate-900",
        accentColor: "rose"
    }
];

export const getTemplateById = (id) => {
    return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
