"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        After graduating with a degree in{" "}
        <span className="font-medium">Computer Science</span>, I decided to pursue my
        passion for programming. I started a coding bootcamp and learned{" "}
        <span className="font-medium">full-stack development</span>.{" "}
        <span className="italic">My favorite part of programming</span> is learning
        a new skill or language and then using that knowledge to create something new. I <span className="underline">love</span> the
        feeling of using something that I have learned to solve to a problem that I couldn't before. My core stack
        is{" "}
        <span className="font-medium">
          Angular, Java, Spring, and PostgresSQL
        </span>
        . I am also comfortable with TypeScript, Python and React. I am always looking to
        learn new technologies. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        hiking, climbing, and spending time with friends and family. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about{" "}
        <span className="font-medium">Artificial Intelligence</span>. I'm also
        learning Spanish.
      </p>
    </motion.section>
  );
}
