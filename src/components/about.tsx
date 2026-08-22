"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { GlassCard } from "./ui/GlassCard";
import { usePersona } from "@/context/PersonaContext";

export default function About() {
  const { ref } = useSectionInView("About");
  const { persona } = usePersona();

  return (
    <motion.section
      className="mb-28 max-w-[45rem] leading-8 sm:mb-40 scroll-mt-28 w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About Me</SectionHeading>
      <GlassCard id="about-card" className="p-8">
        <p className="mb-4 text-lg text-[#334155] leading-relaxed">
          {persona.aboutText}
        </p>
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-white/75 to-[#d05459]/10 p-6 border-[1.5px] border-white/90 shadow-[0_10px_25px_-5px_rgba(208,84,89,0.08),_inset_0_1.5px_1px_rgba(255,255,255,0.95)] backdrop-blur-md text-left">
          <h4 className="text-base font-bold text-[#d05459] uppercase tracking-wider mb-2">
            Agentic AI Engineering Focus
          </h4>
          <p className="text-base font-medium text-[#334155]">
            {persona.coverLetterSummary}
          </p>
        </div>
      </GlassCard>
    </motion.section>
  );
}
