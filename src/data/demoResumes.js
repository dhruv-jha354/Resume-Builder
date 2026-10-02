export const DEMO_RESUMES = [
    {
        id: "demo-software-engineer",
        title: "Senior Software Engineer Resume",
        candidateName: "Alex Rivera",
        jobRole: "Software Engineer",
        category: "Engineering",
        template: "modern",
        templateBadge: "Modern Template",
        updatedAt: "2026-07-15T10:00:00.000Z",
        createdAt: "2026-07-01T10:00:00.000Z",
        personalInfo: {
            fullName: "Alex Rivera",
            email: "alex.rivera@devmail.io",
            phone: "+1 (555) 382-9102",
            location: "San Francisco, CA",
            profession: "Senior Software Engineer",
            linkedin: "linkedin.com/in/alexrivera-dev",
            website: "alexrivera.dev",
            profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Results-driven Senior Software Engineer with 6+ years of experience designing scalable microservices, cloud-native architectures, and high-performance web applications. Demonstrated track record of reducing infrastructure costs by 35% and mentoring junior developers.",
        skills: ["React.js", "TypeScript", "Node.js", "Python", "GraphQL", "Docker", "AWS", "PostgreSQL", "Tailwind CSS", "Jest / Cypress"],
        experience: [
            {
                role: "Senior Full Stack Engineer",
                company: "CloudScale Technologies",
                startDate: "2023",
                endDate: "Present",
                description: "Architected a real-time event streaming pipeline processing 2M+ daily requests with 99.99% uptime.\nLed a cross-functional team of 6 engineers to migrate legacy monolith into Node.js microservices."
            },
            {
                role: "Software Engineer",
                company: "NextGen Media Labs",
                startDate: "2020",
                endDate: "2023",
                description: "Developed interactive dashboards using React and Redux Toolkit, decreasing initial load time by 40%.\nImplemented CI/CD pipelines via GitHub Actions, reducing deployment cycles from 2 days to 15 minutes."
            }
        ],
        education: [
            {
                degree: "B.S. in Computer Science",
                school: "University of California, Berkeley",
                startDate: "2016",
                endDate: "2020"
            }
        ],
        projects: [
            {
                name: "DevSync - Collaborative Workspace",
                techStack: "React, WebSockets, Redis, Node.js",
                link: "github.com/alexrivera/devsync",
                description: "Built a collaborative markdown editor featuring real-time cursor tracking and operational transformation."
            }
        ]
    },
    {
        id: "demo-frontend-developer",
        title: "Lead Frontend Developer Resume",
        candidateName: "Sarah Chen",
        jobRole: "Frontend Developer",
        category: "Engineering",
        template: "minimal",
        templateBadge: "Minimal Template",
        updatedAt: "2026-07-20T14:30:00.000Z",
        createdAt: "2026-07-05T14:30:00.000Z",
        personalInfo: {
            fullName: "Sarah Chen",
            email: "sarah.chen@frontend.design",
            phone: "+1 (555) 948-2041",
            location: "Seattle, WA",
            profession: "Lead Frontend Developer",
            linkedin: "linkedin.com/in/sarahchen-ui",
            website: "sarahchen.io",
            profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Passionate Frontend Architect specializing in building pixel-perfect, accessible (WCAG AAA compliant), and blazing-fast user interfaces with React, Next.js, and modern CSS architecture.",
        skills: ["React 19", "Next.js", "Vue.js", "Tailwind CSS", "Design Systems", "Web Vitals Optimization", "Accessibility (a11y)", "Framer Motion"],
        experience: [
            {
                role: "Lead UI Developer",
                company: "PixelCraft Systems",
                startDate: "2022",
                endDate: "Present",
                description: "Created an enterprise design system adopted by 12 internal product teams, improving dev velocity by 50%.\nOptimized Core Web Vitals to achieve a 98/100 Lighthouse Performance score across all public landing pages."
            },
            {
                role: "Frontend Engineer",
                company: "Vibrant UI Studios",
                startDate: "2019",
                endDate: "2022",
                description: "Engineered responsive web applications supporting 500k+ active monthly users.\nCollaborated closely with UX designers to convert Figma specs into accessible React components."
            }
        ],
        education: [
            {
                degree: "B.S. in Software Engineering",
                school: "University of Washington",
                startDate: "2015",
                endDate: "2019"
            }
        ],
        projects: [
            {
                name: "Aura Component Library",
                techStack: "React, Tailwind CSS, Storybook",
                link: "auraui.dev",
                description: "An open-source accessible React component kit downloaded over 100k times."
            }
        ]
    },
    {
        id: "demo-fullstack-developer",
        title: "Full Stack Engineer Resume",
        candidateName: "Michael Vance",
        jobRole: "Full Stack Developer",
        category: "Engineering",
        template: "ats",
        templateBadge: "ATS Friendly",
        updatedAt: "2026-07-22T09:15:00.000Z",
        createdAt: "2026-07-10T09:15:00.000Z",
        personalInfo: {
            fullName: "Michael Vance",
            email: "m.vance@stackstack.com",
            phone: "+1 (555) 749-1102",
            location: "Austin, TX",
            profession: "Full Stack Software Engineer",
            linkedin: "linkedin.com/in/michaelvance-dev",
            website: "mvance.code",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Versatile Full Stack Engineer with expertise in end-to-end web product development. Proficient in Node.js, Next.js, FastAPI, and Cloud infrastructure with a passion for building developer tools.",
        skills: ["JavaScript/TypeScript", "Python / FastAPI", "Node.js", "React / Next.js", "MongoDB", "PostgreSQL", "Docker", "AWS Lambda"],
        experience: [
            {
                role: "Senior Full Stack Engineer",
                company: "SaaSify Technologies",
                startDate: "2022",
                endDate: "Present",
                description: "Built multi-tenant SaaS authentication and billing platform using Stripe API and Firebase.\nReduced API latencies by 60% through Redis caching and query indexing."
            },
            {
                role: "Full Stack Developer",
                company: "Apex Digital Solutions",
                startDate: "2019",
                endDate: "2022",
                description: "Shipped e-commerce platform backend APIs handling $5M in annual transactions."
            }
        ],
        education: [
            {
                degree: "B.S. in Information Technology",
                school: "UT Austin",
                startDate: "2015",
                endDate: "2019"
            }
        ],
        projects: [
            {
                name: "QuickMetrics Analytics Engine",
                techStack: "Next.js, Tailwind, ClickHouse, FastAPI",
                link: "quickmetrics.io",
                description: "Privacy-friendly real-time analytics script with sub-10ms response times."
            }
        ]
    },
    {
        id: "demo-ui-ux-designer",
        title: "Senior Product & UI/UX Designer",
        candidateName: "Emma Watson",
        jobRole: "UI/UX Designer",
        category: "Design",
        template: "creative",
        templateBadge: "Creative Template",
        updatedAt: "2026-07-25T16:20:00.000Z",
        createdAt: "2026-07-12T16:20:00.000Z",
        personalInfo: {
            fullName: "Emma Watson",
            email: "emma.watson@uxstudio.design",
            phone: "+1 (555) 203-8891",
            location: "New York, NY",
            profession: "Lead Product & UI/UX Designer",
            linkedin: "linkedin.com/in/emmawatson-ux",
            website: "emmawatson.design",
            profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Product Designer with 5+ years creating intuitive user journeys, wireframes, and design systems for web and mobile apps. Skilled in user research, interactive prototyping, and cross-functional team leadership.",
        skills: ["Figma / Penpot", "Design Systems", "User Research", "Wireframing & Prototyping", "Information Architecture", "HTML/CSS", "Usability Testing"],
        experience: [
            {
                role: "Lead UI/UX Designer",
                company: "Hyperion Digital Products",
                startDate: "2023",
                endDate: "Present",
                description: "Redesigned mobile app checkout flow, increasing conversion rate by 24%.\nConducted 40+ user interviews to identify key drop-off points in product onboarding."
            },
            {
                role: "Product Designer",
                company: "Creative Mind Agency",
                startDate: "2020",
                endDate: "2023",
                description: "Designed responsive SaaS web apps for fintech and healthtech clients."
            }
        ],
        education: [
            {
                degree: "B.F.A. in Graphic & Interactive Design",
                school: "Rhode Island School of Design (RISD)",
                startDate: "2016",
                endDate: "2020"
            }
        ],
        projects: [
            {
                name: "FinPulse Mobile Wallet Redesign",
                techStack: "Figma, Principle, UserTesting.com",
                link: "behance.net/emmawatson-finpulse",
                description: "End-to-end design case study for a next-gen digital banking application."
            }
        ]
    },
    {
        id: "demo-data-analyst",
        title: "Senior Data Analyst & BI Specialist",
        candidateName: "David Kumar",
        jobRole: "Data Analyst",
        category: "Data",
        template: "executive",
        templateBadge: "Executive Template",
        updatedAt: "2026-07-26T11:45:00.000Z",
        createdAt: "2026-07-14T11:45:00.000Z",
        personalInfo: {
            fullName: "David Kumar",
            email: "david.kumar@data-insights.org",
            phone: "+1 (555) 492-0193",
            location: "Chicago, IL",
            profession: "Senior Data Analyst",
            linkedin: "linkedin.com/in/davidkumar-analytics",
            website: "davidkumar.data",
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Detail-oriented Data Analyst with 5+ years of experience turning complex business datasets into actionable intelligence. Proficient in SQL, Python, Tableau, and automated reporting pipelines.",
        skills: ["SQL (PostgreSQL, BigQuery)", "Python (Pandas, NumPy)", "Tableau / Power BI", "A/B Testing", "Statistical Modeling", "ETL Pipelines", "Excel / Google Sheets"],
        experience: [
            {
                role: "Senior Data Analyst",
                company: "FinTech Capital Analytics",
                startDate: "2022",
                endDate: "Present",
                description: "Constructed automated Tableau dashboards tracking $20M+ monthly transaction volume.\nFormulated customer retention models that reduced churn rate by 18% over two quarters."
            },
            {
                role: "Business Intelligence Analyst",
                company: "DataCorp Logistics",
                startDate: "2019",
                endDate: "2022",
                description: "Optimized delivery route logistics data, saving $140,000 annually in fuel expenditures."
            }
        ],
        education: [
            {
                degree: "B.S. in Statistics & Applied Mathematics",
                school: "University of Illinois Urbana-Champaign",
                startDate: "2015",
                endDate: "2019"
            }
        ],
        projects: [
            {
                name: "Customer Lifetime Value Predictor",
                techStack: "Python, Scikit-learn, BigQuery",
                link: "github.com/davidkumar/clv-predictor",
                description: "Machine learning model predicting customer LTV with 92% accuracy."
            }
        ]
    },
    {
        id: "demo-marketing-manager",
        title: "Growth Marketing Manager",
        candidateName: "Jessica Taylor",
        jobRole: "Marketing Manager",
        category: "Marketing",
        template: "elegant",
        templateBadge: "Elegant Template",
        updatedAt: "2026-07-28T08:10:00.000Z",
        createdAt: "2026-07-18T08:10:00.000Z",
        personalInfo: {
            fullName: "Jessica Taylor",
            email: "jessica.taylor@growthmark.com",
            phone: "+1 (555) 602-9481",
            location: "Boston, MA",
            profession: "Growth Marketing Manager",
            linkedin: "linkedin.com/in/jessicataylor-growth",
            website: "jessicataylor.marketing",
            profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
        },
        summary: "Strategic Growth Marketing Manager with 6+ years driving customer acquisition, email campaigns, and multi-channel performance marketing for high-growth tech startups.",
        skills: ["Performance Marketing", "SEO / SEM", "Google Analytics 4", "Email Campaign Strategy", "HubSpot & Salesforce", "Content Strategy", "Conversion Rate Optimization (CRO)"],
        experience: [
            {
                role: "Head of Growth Marketing",
                company: "PulseTech Solutions",
                startDate: "2022",
                endDate: "Present",
                description: "Scaled ARR from $1M to $5M in 18 months through data-driven Google Ads and LinkedIn paid campaigns.\nIncreased organic search traffic by 180% year-over-year by implementing pillar content strategy."
            },
            {
                role: "Digital Marketing Specialist",
                company: "Innovate Brand Agency",
                startDate: "2019",
                endDate: "2022",
                description: "Managed $50k monthly ad budget across Meta, Google, and TikTok platforms achieving 3.5x ROAS."
            }
        ],
        education: [
            {
                degree: "B.A. in Marketing & Communications",
                school: "Boston University",
                startDate: "2015",
                endDate: "2019"
            }
        ],
        projects: [
            {
                name: "SaaS Launch Multi-Channel Campaign",
                techStack: "HubSpot, GA4, Meta Ads Manager",
                link: "jessicataylor.marketing/case-study",
                description: "Generated 15,000 beta signups in 30 days with a CAC under $3.50."
            }
        ]
    }
];
