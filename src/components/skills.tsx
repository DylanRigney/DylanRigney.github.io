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
                className={`rounded-xl px-4 py-2.5 border-[1.5px] transition-all duration-300 backdrop-blur-md ${
                  isHighlighted
                    ? "bg-[#d05459]/10 border-[#d05459]/30 text-[#d05459] shadow-[0_4px_12px_rgba(208,84,89,0.12),_inset_0_1px_1px_rgba(255,255,255,0.9)] font-bold scale-105"
                    : "bg-white/50 border-white/80 text-[#334155] shadow-[0_2px_8px_rgba(15,23,42,0.04),_inset_0_1px_1px_rgba(255,255,255,0.9)] hover:bg-white/80 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:-translate-y-0.5"
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
