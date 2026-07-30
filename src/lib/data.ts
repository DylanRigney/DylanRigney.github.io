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
  claude: {
    id: "claude",
    roleTitle: "AI Research & LLM Systems Engineer",
    tagline: "Specializing in AI Alignment, LLM Orchestration, RAG Systems, and Scalable Full-Stack Engineering.",
    heroHighlight: "Building aligned, intelligent agentic systems at the frontier of AI research and engineering.",
    aboutText: "Driven by a deep interest in AI reasoning, model alignment, and state-machine orchestration. Experienced in deploying custom RAG pipelines, fine-tuning workflows, and high-performance full-stack architectures.",
    coverLetterSummary: "Tailored for Claude Corp (Anthropic): Emphasizes safety-focused AI development, robust system design, agentic orchestration, and passion for frontier AI models.",
    highlightedSkills: ["Python", "TypeScript", "Next.js", "OpenAI / Anthropic APIs", "Vercel AI SDK", "RAG & Vector DBs", "PyTorch / Fine-tuning Basics"],
    systemPromptRole: "Candidate for AI Research & LLM Systems Engineering at Anthropic (Claude Corp). Emphasize expertise in agentic routing, RAG, safety, and modern full-stack LLM apps."
  },
  ai: {
    id: "ai",
    roleTitle: "AI / ML Engineer",
    tagline: "Architecting Agentic Pipelines, Vector Search, and Autonomous AI Tools.",
    heroHighlight: "Bridging the gap between cutting-edge LLMs and real-world production software.",
    aboutText: "Focused on agentic workflows, contextual retrieval, and building low-latency, scalable AI integrations for modern enterprise applications.",
    coverLetterSummary: "Tailored for AI/ML Engineer roles: Demonstrates practical LLM deployment, RAG engineering, vector search, and full-stack integration.",
    highlightedSkills: ["Python", "TypeScript", "React / Next.js", "Pinecone", "LangChain / LlamaIndex", "DeepSeek / OpenAI APIs", "PostgreSQL"],
    systemPromptRole: "Candidate for AI/ML Engineer roles. Highlight practical AI implementations, autonomous agent design, and production LLM tooling."
  },
  swe: {
    id: "swe",
    roleTitle: "Full-Stack Software Engineer",
    tagline: "Crafting High-Performance Web Applications, Robust APIs, and Scalable Microservices.",
    heroHighlight: "Passionate about clean architecture, test-driven development, and fluid user experiences.",
    aboutText: "Extensive background in full-stack web development, teaching software engineering principles, and delivering clean, maintainable enterprise software.",
    coverLetterSummary: "Tailored for Senior / Mid Full-Stack Software Engineer roles: Highlights strong fundamentals in TypeScript, Java/Spring, React, and system architecture.",
    highlightedSkills: ["TypeScript", "React", "Next.js", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS", "RESTful APIs"],
    systemPromptRole: "Candidate for Full-Stack Software Engineer roles. Emphasize software engineering best practices, robust API architecture, and clean code."
  }
};

export const experiencesData = [
  {
    title: "Full-Stack Developer & AI Systems Engineer",
    location: "Remote / Freelance",
    description: "Developing modern AI-driven web applications, custom agentic orchestration tools, and low-latency full-stack pipelines.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
  {
    title: "Software Developer & Technical Instructor",
    location: "Reston, VA",
    description: "Employed in a high-velocity agile environment; built enterprise web apps and trained dozens of junior developers in modern full-stack development.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2023",
  },
  {
    title: "Graduated Bootcamp (Top Cohort)",
    location: "Tacoma, WA",
    description: "Completed intensive full-stack software engineering program. Hired directly as developer and instructor due to top performance.",
    icon: React.createElement(LuGraduationCap),
    date: "2021",
  },
  {
    title: "University Graduate (High Honors)",
    location: "Bellingham, WA",
    description: "Graduated on the Dean's List with a 3.92 GPA in Computer Science, pursuing core algorithms, data structures, and system design.",
    icon: React.createElement(FaReact),
    date: "2019 - 2020",
  },
] as const;

export const projectsData = [
  {
    title: "AI Assistant (In-Context Orchestration)",
    description: "An agentic chat assistant equipped with an in-context state machine, allowing fluid routing between persona nodes and deep background retrieval.",
    tags: ["TypeScript", "Next.js", "Vercel AI SDK", "DeepSeek", "React Three Fiber"],
    imageUrl: "/project_ai_assistant.jpg",
  },
  {
    title: "Tuition Reimbursement Management System",
    description: "A full-stack enterprise web app allowing automated multi-tier approval routing for corporate tuition reimbursement.",
    tags: ["Java", "PostgreSQL", "Hibernate", "Junit", "Javalin", "JavaScript"],
    imageUrl: "/project_trms.jpg",
  },
  {
    title: "Sage - Prediction Tracker",
    description: "An AI-powered forecasting platform to record, evaluate, and calibrate user predictions using semantic search and probabilistic scoring.",
    tags: ["React", "Next.js", "PostgreSQL", "Pinecone", "OpenAI API", "TypeScript"],
    imageUrl: "/project_sage.jpg",
  },
] as const;

export const skillsData = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Three.js / WebGL",
  "Vercel AI SDK",
  "DeepSeek / OpenAI APIs",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Pinecone",
  "Tailwind CSS",
  "Git",
  "Jest / JUnit"
] as const;