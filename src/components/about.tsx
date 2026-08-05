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
        <div className="mt-6 rounded-xl bg-rose-50/50 p-5 border border-rose-200/50 shadow-sm text-left">
          <h4 className="text-base font-bold text-[#f43f5e] uppercase tracking-wider mb-2">
            Targeted Role Focus
          </h4>
          <p className="text-base font-medium text-[#334155]">
            {persona.coverLetterSummary}
          </p>
        </div>
      </GlassCard>
    </motion.section>
  );
}
