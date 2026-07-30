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
      <GlassCard id="about-card" className="p-8">
        <SectionHeading>About Me</SectionHeading>
        <p className="mb-4 text-lg text-gray-300 leading-relaxed">
          {persona.aboutText}
        </p>
        <div className="mt-6 rounded-xl bg-white/5 p-4 border border-white/10 text-left">
          <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            Targeted Role Focus
          </h4>
          <p className="text-sm text-gray-300 italic">
            {persona.coverLetterSummary}
          </p>
        </div>
      </GlassCard>
    </motion.section>
  );
}
