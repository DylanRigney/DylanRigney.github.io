"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { usePersona } from "@/context/PersonaContext";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const { persona } = usePersona();

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 w-full"
    >
      <SectionHeading>Skills & Technologies</SectionHeading>
      <GlassCard id="skills-card" hoverable={true} className="p-8">
        <ul className="flex flex-wrap justify-center gap-3 text-sm sm:text-base text-[#1e293b]">
          {skillsData.map((skill, index) => {
            const isHighlighted = persona.highlightedSkills.some(
              (h) => h.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(h.toLowerCase())
            );

            return (
              <motion.li
                className={`rounded-xl px-4 py-2 border transition-all duration-300 ${
                  isHighlighted
                    ? "bg-rose-500/10 border-rose-400/30 text-[#fecdd3] shadow-lg shadow-rose-500/10 font-semibold"
                    : "bg-[#1e293b]/5 border-[#1e293b]/10 text-[#334155]"
                }`}
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                {skill}
              </motion.li>
            );
          })}
        </ul>
      </GlassCard>
    </section>
  );
}
