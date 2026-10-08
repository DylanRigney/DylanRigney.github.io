import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
] as const;

export interface PersonaConfig {
  id: string;
  roleTitle: string;
  tagline: string;
  heroHighlight: string;
  aboutText: string;
  coverLetterSummary: string;
  focusHeading?: string;
  highlightedSkills: string[];
  systemPromptRole: string;
  hideDegree?: boolean;
}

const softwareDeveloperConfig: PersonaConfig = {
  id: "software-developer",
  roleTitle: "Software Developer",
  tagline: "Building scalable backend services, robust REST APIs, and full-stack software with Python.",
  heroHighlight: "Software developer specializing in Python, FastAPI, and full-stack engineering. Focused on clean architecture, robust data validation with Pydantic & SQLAlchemy, and high-performance API design—leveraging AI as a force multiplier for development velocity.",
  aboutText: "I am a software developer focused on building clean, maintainable backend services, RESTful APIs, and full-stack web applications with Python. My core stack centers on FastAPI, Pydantic, and SQLAlchemy, backed by experience in relational databases and modern TypeScript/React frontends. With a background instructing software engineering and mentoring developers, I bring strong technical communication, disciplined debugging instincts, and a builder mindset to every codebase. I treat modern AI tools as pragmatic accelerators for testing, code quality, and development velocity.",
  coverLetterSummary: "Python backend services, FastAPI, schema validation with Pydantic & SQLAlchemy, RESTful API design, and scalable full-stack web applications.",
  focusHeading: "Software Development with Python",
  highlightedSkills: ["Python", "FastAPI", "Pydantic", "SQLAlchemy"],
  systemPromptRole: "Candidate for Software Developer roles specializing in Python backend engineering and full-stack web development. Emphasize software craftsmanship, Python (FastAPI, Pydantic, SQLAlchemy), RESTful API design, clean code, learning velocity, and agile collaboration.",
  hideDegree: true,
};

export const personas: Record<string, PersonaConfig> = {
  "software-developer": softwareDeveloperConfig,
  "software-development": { ...softwareDeveloperConfig, id: "software-development" },
  swe: { ...softwareDeveloperConfig, id: "swe" },
  ai: {
    id: "ai",
    roleTitle: "AI Engineer",
    tagline: "Building agentic AI systems, autonomous workflows, and LLM-powered applications.",
    heroHighlight: "AI Engineer and systems thinker focused on orchestrating intelligent agents and automated workflows to build practical, AI-driven solutions.",
    aboutText: "I am an AI engineer driven by the intersection of agentic systems and human capability. Before diving deep into software, I spent years teaching yoga and instructing developers in software engineering fundamentals. Those experiences fundamentally shaped how I approach systems thinking, patience, and clear technical communication. In engineering, I focus on architecting autonomous pipelines, RAG systems, and agentic workflows that reduce friction and solve real-world problems. When I step away from the keyboard, I stay active and grounded by practicing yoga, exploring the outdoors, learning Spanish, and constantly seeking out new ideas to refine my craft.",
    coverLetterSummary: "Focus on agentic AI engineering, autonomous workflows, LLM integration, and practical intelligent solutions.",
    focusHeading: "Agentic AI Engineering Focus",
    highlightedSkills: ["Python", "TypeScript", "LangGraph", "RAG Pipelines", "FastAPI", "Prompt Engineering"],
    systemPromptRole: "Candidate for AI Engineer roles. Emphasize agentic systems, autonomous workflows, LangGraph, and real-world shipped features."
  },
  pm: {
    id: "pm",
    roleTitle: "Product Manager",
    tagline: "Builder and AI-native product thinker using AI as a creative partner.",
    heroHighlight: "Passionate about guiding the vision of a project from an abstract idea into a concrete solution that users love.",
    aboutText: "My greatest strength is not writing the code itself, but the strategic and creative process of deciding what to build and why it matters. I pivot my technical engineering background and non-traditional teaching experience into building products that amplify human creativity. I treat programs like products: analyze data, identify friction, iterate, and measure improvement.",
    coverLetterSummary: "Tailored for Product Management: Emphasize product iteration, friction analysis, program design, and human-AI collaboration.",
    focusHeading: "Product Management Focus",
    highlightedSkills: ["AI-as-copilot workflows", "Product iteration", "A/B testing mindset", "Stakeholder collaboration", "Python", "TypeScript"],
    systemPromptRole: "Candidate for Product Manager roles. Highlight the pivot from engineer to PM, focus on user experience, program design, and using AI as a partner to human creativity."
  },
  claude: {
    id: "claude",
    roleTitle: "Applied AI Developer",
    tagline: "Putting AI to work on problems that matter through automation and system building.",
    heroHighlight: "Combines systems thinking with a track record of teaching, scoping, and shipping applied AI solutions.",
    aboutText: "I am a builder passionate about embedding inside a mission-driven organization to build solutions that last. With hands-on experience engineering agentic systems and teaching technical skills to diverse audiences, my goal is to automate workflows and make complex things usable.",
    coverLetterSummary: "Tailored for entry-level, apprenticeship, and fellowship roles: Emphasize mission alignment, applied AI tooling, and communication/enablement.",
    focusHeading: "Applied AI Development Focus",
    highlightedSkills: ["Python", "TypeScript", "LangGraph", "Prompt Engineering", "Technical Instruction"],
    systemPromptRole: "Candidate for Applied AI roles (Entry-level/Apprenticeship/Fellowship). Lead with potential, mission alignment, learning velocity, and teaching background."
  },
  teaching: {
    id: "teaching",
    roleTitle: "Technical Field Trainer, AI",
    tagline: "Empowering teams through technical instruction and AI fluency.",
    heroHighlight: "Bridging the gap between complex AI systems and user capability through expert instruction and curriculum design.",
    aboutText: "I leverage my background in full-stack development, agentic AI, and yoga instruction to design systems and curriculum that amplify human capability. Having taught full-stack engineering to diverse cohorts and designed pilot training programs, I know how to identify friction points and iterate content to boost engagement.",
    coverLetterSummary: "Tailored for Teaching-first roles: Emphasize curriculum design, technical instruction, AI fluency training, and student mentorship.",
    focusHeading: "Technical Training Focus",
    highlightedSkills: ["Technical Instruction", "Curriculum Design", "AI Fluency Training", "Python", "TypeScript", "React"],
    systemPromptRole: "Candidate for Teaching + AI roles. Emphasize teaching leadership, curriculum design, student mentorship, and clear technical communication."
  }
};

export const experiencesData = [
  {
    title: "AI Engineering Intern",
    location: "Yoonee AI / Remote",
    description: "Engineered scalable Python RAG pipelines, developed automated document processing workflows with natural language querying, and built interactive analytics dashboards.",
    icon: React.createElement(FaReact),
    date: "Jan 2026 - Apr 2026",
  },
  {
    title: "LLM Evaluation Engineer (Freelance)",
    location: "Outlier AI / Remote",
    description: "Evaluated production code generation in Python and Java, assessing algorithmic correctness, edge-case resilience, tool execution, and code safety.",
    icon: React.createElement(CgWorkAlt),
    date: "Nov 2023 - Oct 2025",
  },
  {
    title: "BS in Computer Science",
    location: "University of the People",
    description: "Pursuing core algorithms, data structures, and system design. President's List.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2023 - Expected Dec 2026",
  },
  {
    title: "Technical Instructor / Program Lead",
    location: "Revature / Reston, VA",
    description: "Engineered enterprise web applications and led technical training programs for junior developers across full-stack systems, relational databases, and clean code standards.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2021 - Aug 2023",
  },
  {
    title: "Full Stack Java Developer Trainee",
    location: "Revature / Reston, VA",
    description: "Completed intensive software engineering bootcamp. Hired directly as developer and instructor due to top academic and technical performance.",
    icon: React.createElement(LuGraduationCap),
    date: "2021",
  },
] as const;

export const projectsData = [
  {
    title: "Agentic Prediction Copilot",
    description: "Full-stack forecasting platform featuring autonomous decision loops, Pydantic schema validation, FastAPI backend services, and SQLAlchemy ORM persistence.",
    tags: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "LangGraph", "TypeScript", "Next.js", "SQLite"],
    imageUrl: "/project_sage.jpg",
  },
  {
    title: "Autonomous Task Agent",
    description: "Resilient workflow orchestrator running as a background service, featuring automated error handling, Docker containerization, and RESTful API integrations.",
    tags: ["Python", "FastAPI", "Docker", "RESTful APIs", "LangGraph"],
    imageUrl: "/project_trms.jpg",
  },
  {
    title: "Tuition Reimbursement System",
    description: "Enterprise full-stack web application automating multi-tier approval routing for corporate reimbursements, featuring relational schema design, role-based access control, and PostgreSQL persistence.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "RESTful APIs"],
    imageUrl: "/project_trms.jpg",
  },
  {
    title: "Adaptive Fitness & Rehab Agent",
    description: "Autonomous planning service in Python that dynamically adapts rehabilitation and workout protocols using task reasoning and MySQL state persistence.",
    tags: ["Python", "MySQL", "RESTful APIs", "OpenClaw", "State Management"],
    imageUrl: "/project_ai_assistant.jpg",
  },
] as const;

export const skillsData = [
  "Python",
  "FastAPI",
  "Pydantic",
  "SQLAlchemy",
  "PostgreSQL",
  "MySQL",
  "RESTful APIs",
  "Linux/Bash",
  "Git",
  "Docker",
  "Agile/Scrum",
  "Jira",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Java",
  "Spring Boot",
  "Hibernate",
  "LangGraph",
  "LLM Evaluation",
  "Tailwind CSS",
] as const;