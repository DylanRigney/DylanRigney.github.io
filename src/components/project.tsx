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
      <GlassCard id={cardId} className="p-0 overflow-hidden sm:h-[22rem] transition-all duration-300">
        <div className="pt-6 pb-8 px-6 sm:pl-10 sm:pr-4 sm:pt-10 sm:max-w-[55%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          <p className="mt-2 mb-4 leading-relaxed text-gray-300 text-sm sm:text-base">
            {description}
          </p>
          <ul className="flex flex-wrap mt-auto gap-2">
            {tags.map((tag, index) => (
              <li
                className="bg-white/10 border border-white/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-cyan-300 rounded-full font-medium"
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
          className="absolute hidden sm:block top-8 -right-20 w-[26rem] rounded-xl shadow-2xl border border-white/10
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
