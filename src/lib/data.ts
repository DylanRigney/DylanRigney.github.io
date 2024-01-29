import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import etchedgoldImg from "../../public/Etched Gold.png";

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
  {
    name: "Contact",
    hash: "#contact",
  },
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
      "I graduated as one of the top students in my cohort after 3 months of intensive training. Because of my success in the bootcamp, I was then hired directly as a full-stack developer and a technical instructor by the company that held the bootcamp.",
    icon: React.createElement(LuGraduationCap),
    date: "2021",
  },
  {
    title: "Software Developer / Technical Instructor",
    location: "Reston, Va",
    description:
      "I worked as a developer and Technical Instructor for 2 years. Participating in a highly collaborative, agile environment further improving my own development skills as well as teaching others to become developers. I'm proud to say that many of the people I instructed are now successful full-stack developers, working in the industry.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2023",
  },
  // {
  //   title: "Full-Stack Developer",
  //   location: "Houston, TX",
  //   description:
  //     "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
  //   icon: React.createElement(FaReact),
  //   date: "2021 - present",
  // },
] as const;

export const projectsData = [
  {
    title: "AI Assistants",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: etchedgoldImg,
  },
  {
    title: "Tuition Reimbursement Management System",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: etchedgoldImg,
  },
  {
    title: "TBD",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
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