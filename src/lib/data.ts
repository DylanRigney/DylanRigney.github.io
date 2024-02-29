import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import etchedgoldImg from "../../public/Etched Gold.png";
import TRMS from "../../public/TRMS repo.png";
import assistantpic from "../../public/assistant.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  // {
  //   name: "Contact",
  //   hash: "#contact",
  // },
] as const;

export const experiencesData = [
  {
    title: "University student",
    location: "Bellingham, Wa",
    description:
      "I decided to follow my passion for technology by pursuing a degree in Computer Science. I graduated on the Dean's List with a 3.92 GPA, receiving High Honors.",
    icon: React.createElement(FaReact),
    date: "2019 - 2020",
  },
  {
    title: "Graduated bootcamp",
    location: "Tacoma, Wa",
    description:
      "I graduated as one of the top students in my cohort after 3 months of intensive training. Because of my success in the bootcamp, I was then hired directly as a full-stack developer and Technical Instructor by the company that held the bootcamp.",
    icon: React.createElement(LuGraduationCap),
    date: "2021",
  },
  {
    title: "Software Developer / Technical Instructor",
    location: "Reston, Va",
    description:
      "Employed as a full-stack developer and Technical Instructor in a highly collaborative, agile environment; gaining experience as a developer as well as teaching others to become developers. I'm proud to say that many of the people I instructed are now successful full-stack developers.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2023",
  },
  {
    title: "Full-Stack Developer",
    location: "Reston, Va",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes Angular, Java, Spring and PostgreSQL. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
] as const;

export const projectsData = [
  {
    title: "AI Assistant",
    description:
      "An AI powered agent designed to provide information about my professional experience to recruiters and hiring managers. It employs Retrieval Augmented Generation to allow the user to chat with my resume, cover letter and other relevant documents",
    tags: ["React", "Next.js", "OpenAI Assistants API", "Vercel AI SDK", "Typescript"],
    imageUrl: assistantpic,
  },
  {
    title: "Tuition Reimbursement Management System",
    description:
      "A full stack web app allowing employees to submit requests for tuition reimbursement. The system then routes the requests to the appropriate managers and assists in the approval process.",
    tags: ["Java", "PostgreSQL", "Hibernate", "Junit", "Javalin", "Javascript"],
    imageUrl: TRMS,
  },
  {
    title: "Sage - Prediction Tracker",
    description:
      "An AI powered app designed to help users make and track their predictions and improve their prediction accuracy. They can also compare their prediction accuracy against other users. Inspired by the book Super Forecasting.",
    tags: ["React", "Next.js", "PostgreSQL", "Pinecone", "OpenAI Assistants API", "Typescript"],
    imageUrl: etchedgoldImg,
  },
] as const;

export const skillsData = [
  "Java",
  "SQL",
  "Spring",
  "Angular",
  "TypeScript",
  "Python",
  "Git",
  "JUnit",
  "Selenium",
  "Javalin",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "JavaScript",
  "OpenAI Assistants API",
] as const;