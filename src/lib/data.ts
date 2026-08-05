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
  highlightedSkills: string[];
  systemPromptRole: string;
}

export const personas: Record<string, PersonaConfig> = {
  ai: {
    id: "ai",
    roleTitle: "AI Engineer",
    tagline: "Building agentic AI systems, autonomous workflows, and LLM-powered applications.",
    heroHighlight: "AI Engineer and systems thinker focused on orchestrating intelligent agents and automated workflows to build practical, AI-driven solutions.",
    aboutText: "I am an AI engineer focused on building agentic systems that amplify human capability. My non-traditional path from teaching yoga taught me how to communicate, collaborate, and design experiences, bringing a unique systems-thinking approach to my code. Recently, I interned at an AI startup where I engineered RAG pipelines and autonomous document processing systems.",
    coverLetterSummary: "Focus on agentic AI engineering, autonomous workflows, LLM integration, and practical intelligent solutions.",
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
    highlightedSkills: ["Technical Instruction", "Curriculum Design", "AI Fluency Training", "Python", "TypeScript", "React"],
    systemPromptRole: "Candidate for Teaching + AI roles. Emphasize teaching leadership, curriculum design, student mentorship, and clear technical communication."
  },
  swe: {
    id: "swe",
    roleTitle: "Software Engineer",
    tagline: "Crafting High-Performance Web Applications, Robust APIs, and Scalable Microservices.",
    heroHighlight: "Passionate about clean architecture, test-driven development, and fluid user experiences.",
    aboutText: "I am a software engineer with a track record of delivering clean, maintainable enterprise software and robust APIs. My non-traditional path from teaching yoga into tech has given me a deep appreciation for user experience, communication, and systems thinking. I'm excited to bring my builder mindset to an entry-level or apprenticeship role.",
    coverLetterSummary: "Tailored for Software Engineer internships/apprenticeships/fellowships: Highlights strong fundamentals in TypeScript, React, Next.js, and system architecture.",
    highlightedSkills: ["TypeScript", "React", "Next.js", "Java", "Spring Boot", "PostgreSQL", "RESTful APIs"],
    systemPromptRole: "Candidate for Software Engineer roles (Entry-level/Apprenticeship/Fellowship). Emphasize software engineering fundamentals, learning velocity, and robust web development."
  }
};

export const experiencesData = [
  {
    title: "AI Engineering Intern",
    location: "Yoonee AI / Remote",
    description: "Engineered scalable RAG pipelines, developed autonomous document processing workflows, and built interactive dashboards for data-driven analytics.",
    icon: React.createElement(FaReact),
    date: "Jan 2026 - Apr 2026",
  },
  {
    title: "LLM Evaluation Engineer (Freelance)",
    location: "Outlier AI / Remote",
    description: "Evaluated AI-generated code in Python and Java, assessing reasoning quality, tool use, and safety.",
    icon: React.createElement(CgWorkAlt),
    date: "Nov 2023 - Oct 2025",
  },
  {
    title: "BS in Computer Science",
    location: "University of the People",
    description: "Pursuing core algorithms, data structures, and system design. President's List.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2023 - Expected Sep 2026",
  },
  {
    title: "Technical Instructor / Program Lead",
    location: "Revature / Reston, VA",
    description: "Employed in a high-velocity agile environment; built enterprise web apps and trained dozens of junior developers in modern full-stack development.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2021 - Aug 2023",
  },
  {
    title: "Full Stack Java Developer Trainee",
    location: "Revature / Reston, VA",
    description: "Completed intensive bootcamp. Hired directly as developer and instructor due to top performance.",
    icon: React.createElement(LuGraduationCap),
    date: "2021",
  },
] as const;

export const projectsData = [
  {
    title: "Agentic Prediction Copilot",
    description: "AI-Powered Forecasting System with agentic decision loops, structured querying, and generative UI based on pipeline context.",
    tags: ["Next.js", "TypeScript", "Python", "LangGraph", "FastAPI", "Generative UI", "SQLite"],
    imageUrl: "/project_sage.jpg",
  },
  {
    title: "Adaptive Fitness & Rehab Agent",
    description: "An autonomous agent built on OpenClaw that dynamically adapts workout and rehabilitation protocols. It features a fully automated pipeline where users simply provide input, and the agent orchestrates task reasoning and MySQL state management to deliver a customized plan.",
    tags: ["OpenClaw", "Python", "MySQL", "State Management", "Prompt Engineering"],
    imageUrl: "/project_ai_assistant.jpg",
  },
  {
    title: "Autonomous Task Agent",
    description: "Agentic Workflow Orchestrator running as a Windows service. Highly modular for a variety of different tasks and workflows, featuring robust error handling and monitoring.",
    tags: ["Python", "LangGraph", "Google ADK", "Docker", "RESTful APIs"],
    imageUrl: "/project_trms.jpg",
  },
  {
    title: "Autonomous Web Experience & Generative UI",
    description: "Engineered a dynamic, highly-interactive web platform featuring real-time Generative UI and in-context AI orchestration. The system utilizes autonomous agents to control ambient WebGL aesthetics, manage state, and guide users through personalized architectural walkthroughs.",
    tags: ["Next.js", "TypeScript", "Agent Architecture", "Prompt Optimization"],
    imageUrl: "/project_sage.jpg",
  },
  {
    title: "Tuition Reimbursement System",
    description: "A full-stack enterprise web app allowing automated multi-tier approval routing for corporate tuition reimbursement.",
    tags: ["Java", "Spring Boot", "Hibernate", "Javalin", "PostgreSQL"],
    imageUrl: "/project_trms.jpg",
  },
] as const;

export const skillsData = [
  "Python",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "LangGraph",
  "Google ADK",
  "LLM Evaluation",
  "Prompt Engineering",
  "FastAPI",
  "RESTful APIs",
  "Java",
  "Spring Boot",
  "Hibernate",
  "Javalin",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Git",
  "Tailwind CSS",
] as const;