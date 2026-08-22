"use client";

import Image from "next/image";
import headshot from "../../public/DRHeadshot.png";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { GlassCard } from "./ui/GlassCard";
import { usePersona } from "@/context/PersonaContext";
import { useChatLayout } from "@/context/ChatLayoutContext";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { persona } = usePersona();
  const { isChatOpen, setIsChatOpen, activeSide, setActiveSide } = useChatLayout();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[65rem] text-center sm:mb-0 scroll-mt-[100rem] w-full"
    >
      <div className="flex flex-col xl:flex-row items-center justify-center w-full gap-4">
        {/* Main Intro Panel */}
        <GlassCard id="intro-card" className="flex flex-col items-center justify-center p-8 w-full max-w-[50rem]">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                <Image
                  src={headshot}
                  alt="Dylan Portrait"
                  width={200}
                  height={200}
                  className="h-48 w-48 rounded-3xl border-2 border-[#1e293b]/20 object-cover shadow-[0_0_40px_rgba(244,63,94,0.2)]"
                  priority={true}
                />
              </motion.div>
            </div>
          </div>

          <motion.h1
            className="mb-4 mt-6 px-4 text-3xl font-bold tracking-tight text-[#0f172a] sm:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Dylan Rigney
          </motion.h1>

          <motion.h2
            className="mb-6 px-4 text-xl font-medium text-[#f43f5e] sm:text-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {persona.roleTitle}
          </motion.h2>

          <motion.p
            className="mb-10 px-4 text-lg font-normal !leading-[1.6] text-[#334155] sm:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {persona.heroHighlight}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <a
              className="group bg-[#1e293b]/10 text-[#0f172a] px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#1e293b]/10 backdrop-blur-md hover:bg-[#1e293b]/20"
              href="/RigneyResume.pdf"
              download={true}
            >
              Download Resume{" "}
              <HiDownload className="opacity-70 group-hover:translate-y-1 transition" />
            </a>

            <div className="flex gap-3">
              <a
                className="bg-[#1e293b]/10 p-4 text-[#1e293b] flex items-center gap-2 rounded-full text-[1.25rem] hover:scale-110 hover:text-[#0f172a] transition-all cursor-pointer border border-[#1e293b]/10 backdrop-blur-md hover:bg-[#1e293b]/20"
                href="https://www.linkedin.com/in/dylan-rigney/"
                target="_blank"
                aria-label="LinkedIn Profile"
              >
                <BsLinkedin />
              </a>

              <a
                className="bg-[#1e293b]/10 p-4 text-[#1e293b] flex items-center gap-2 rounded-full text-[1.25rem] hover:scale-110 hover:text-[#0f172a] transition-all cursor-pointer border border-[#1e293b]/10 backdrop-blur-md hover:bg-[#1e293b]/20"
                href="https://github.com/DylanRigney"
                target="_blank"
                aria-label="GitHub Profile"
              >
                <BsGithub />
              </a>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
