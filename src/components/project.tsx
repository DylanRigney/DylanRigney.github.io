"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Clean ID for GlassCard registration
  const cardId = `project-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-4 sm:mb-8 last:mb-0 w-full"
    >
      <GlassCard id={cardId} hoverable={true} className="p-0 overflow-hidden sm:h-[22rem] group transition-all duration-300">
        <div className="pt-6 pb-8 px-6 sm:pl-10 sm:pr-4 sm:pt-10 sm:max-w-[55%] flex flex-col h-full sm:group-even:ml-auto">
          <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">{title}</h3>
          <p className="mt-2 mb-4 leading-relaxed text-[#334155] text-sm sm:text-base">
            {description}
          </p>
          <ul className="flex flex-wrap mt-auto gap-2">
            {tags.map((tag, index) => (
              <li
                className="bg-white/60 border border-white/80 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-[#d05459] rounded-full font-semibold shadow-[0_2px_6px_rgba(15,23,42,0.04),_inset_0_1px_0.5px_rgba(255,255,255,0.9)] backdrop-blur-sm"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          quality={95}
          className="absolute hidden sm:block top-8 -right-20 w-[26rem] rounded-2xl shadow-[0_20px_40px_-10px_rgba(15,23,42,0.25),_0_0_20px_rgba(186,230,253,0.2)] border-[1.5px] border-white/80
          transition duration-300
          group-hover:scale-[1.05]
          group-hover:-translate-x-3
          group-hover:translate-y-2
          group-hover:-rotate-1

          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-2
          group-even:group-hover:rotate-1

          group-even:right-[initial] group-even:-left-20"
        />
      </GlassCard>
    </motion.div>
  );
}
