"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        After graduating with a degree in{" "}
        <span className="font-medium">Computer Science</span>, I decided I
        wanted to continue to pursue my passion for programming. I entered an
        intensive coding bootcamp and learned{" "}
        <span className="font-medium">
          full-stack development with automated testing and agile development
          practices.{" "}
        </span>
        Upon completion I was hired as a developer and technical instructor at
        Revature. I am currently working as a freelance full-stack developer.
        </p>
        <p className="mb-3">
        <span className="italic">My favorite part of programming</span> is
        learning a new skill or language and then using that knowledge to create
        something new. I <span className="underline">love</span> the feeling of
        using something that I have learned to overcome a difficult challenge.
        My core stack is{" "}
        <span className="font-medium">
          Angular, Java, Spring, PostgresSQL and automated testing with JUnit
          and Selenium
        </span>
        . I am also comfortable with TypeScript, Python and React. In addition,
        I'm very <span className="italic">passionate</span> about{" "}
        <span className="font-medium underline">Artificial Intelligence</span> and enjoy
        building AI applications. Currently I am looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>
      <p className="mb-3">
        <span className="italic">When I&apos;m not coding</span>, I enjoy
        playing chess, hiking, climbing, exploring DC and the surrounding areas,
        as well as spending time with friends and family. I&apos;m also learning
        to speak Spanish.
      </p>
    </motion.section>
  );
}
