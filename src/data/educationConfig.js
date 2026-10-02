/**
 * Education Configuration
 * Predefined categorized degrees, specializations / branches, smart context mapping, and year ranges.
 */

export const DEGREE_CATEGORIES = [
    {
        category: "Undergraduate",
        options: [
            "B.Tech",
            "B.E.",
            "BCA",
            "B.Sc",
            "BBA",
            "B.Com",
            "BA",
            "B.Des",
            "B.Arch",
            "MBBS",
            "LLB",
            "B.Pharm",
            "B.Ed",
            "Bachelor of Arts",
            "Bachelor of Science",
            "Bachelor of Commerce",
            "Bachelor of Business Administration",
            "Bachelor of Computer Applications"
        ]
    },
    {
        category: "Postgraduate",
        options: [
            "M.Tech",
            "M.E.",
            "MCA",
            "M.Sc",
            "MBA",
            "M.Com",
            "MA",
            "M.Des",
            "M.Arch",
            "M.Pharm",
            "M.Ed",
            "LLM"
        ]
    },
    {
        category: "Doctoral",
        options: [
            "Ph.D.",
            "Doctorate"
        ]
    },
    {
        category: "Diploma & Certification",
        options: [
            "Diploma",
            "Polytechnic Diploma",
            "PG Diploma"
        ]
    },
    {
        category: "Other",
        options: [
            "Other"
        ]
    }
];

export const ALL_DEGREES = DEGREE_CATEGORIES.flatMap(c => c.options);

export const FIELD_CATEGORIES = [
    {
        category: "Engineering",
        options: [
            "Computer Science Engineering",
            "Information Technology",
            "Electronics & Communication Engineering",
            "Electrical Engineering",
            "Electronics Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Chemical Engineering",
            "Automobile Engineering",
            "Aerospace Engineering",
            "Biomedical Engineering",
            "Biotechnology",
            "Instrumentation Engineering",
            "Artificial Intelligence & Machine Learning",
            "Data Science",
            "Cyber Security",
            "Software Engineering"
        ]
    },
    {
        category: "Computer / IT",
        options: [
            "Computer Applications",
            "Computer Science",
            "Information Technology",
            "Data Science",
            "Artificial Intelligence",
            "Cyber Security",
            "Software Development"
        ]
    },
    {
        category: "Commerce / Management",
        options: [
            "Finance",
            "Marketing",
            "Human Resources",
            "Business Analytics",
            "International Business",
            "Accounting",
            "Economics"
        ]
    },
    {
        category: "Science",
        options: [
            "Physics",
            "Chemistry",
            "Mathematics",
            "Biology",
            "Computer Science"
        ]
    },
    {
        category: "Arts / Humanities",
        options: [
            "English",
            "Psychology",
            "Economics",
            "History",
            "Political Science",
            "Sociology",
            "Fine Arts",
            "Journalism",
            "Mass Communication"
        ]
    },
    {
        category: "Other",
        options: [
            "Other"
        ]
    }
];

export const ALL_FIELDS = Array.from(new Set(FIELD_CATEGORIES.flatMap(c => c.options)));

/**
 * Maps a degree to suggested field category for smart context-aware ordering
 */
export const getSuggestedFieldCategory = (degree) => {
    if (!degree) return null;
    const d = degree.toLowerCase().trim();
    
    if (d.includes("b.tech") || d.includes("b.e.") || d.includes("m.tech") || d.includes("m.e.") || d.includes("polytechnic") || d.includes("engineering")) {
        return "Engineering";
    }
    if (d.includes("bca") || d.includes("mca") || d.includes("computer applications")) {
        return "Computer / IT";
    }
    if (d.includes("bba") || d.includes("mba") || d.includes("business administration") || d.includes("management")) {
        return "Commerce / Management";
    }
    if (d.includes("b.com") || d.includes("m.com") || d.includes("commerce") || d.includes("accounting")) {
        return "Commerce / Management";
    }
    if (d.includes("b.sc") || d.includes("m.sc") || d.includes("science")) {
        return "Science";
    }
    if (d.includes("ba") || d.includes("ma") || d.includes("bachelor of arts") || d.includes("master of arts") || d.includes("humanities")) {
        return "Arts / Humanities";
    }
    if (d.includes("diploma")) {
        return "Engineering";
    }
    return null;
};

// Generate list of years for Start Date & End Date dropdowns
const currentYear = new Date().getFullYear();
export const YEARS_LIST = [
    "Present",
    ...Array.from({ length: 55 }, (_, i) => String(currentYear + 6 - i))
];
