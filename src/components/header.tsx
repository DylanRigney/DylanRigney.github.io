"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { isChatOpen, setIsChatOpen, activeSide, setActiveSide } = require("@/context/ChatLayoutContext").useChatLayout();

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border-[1.5px] border-white/80 bg-gradient-to-r from-white/80 via-white/50 to-white/80 shadow-[0_15px_35px_-5px_rgba(15,23,42,0.12),_0_0_20px_rgba(186,230,253,0.2),_inset_0_1.5px_1px_rgba(255,255,255,0.9),_inset_0_-1px_1px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: isChatOpen ? "calc(-50% - 225px)" : "-50%", opacity: 1 }}
      ></motion.div>

      <nav 
        className="flex fixed top-[0.15rem] left-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(calc(-50% + ${isChatOpen ? -225 : 0}px))` }}
      >
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-[#64748b] sm:w-[initial] sm:flex-nowrap sm:gap-5">
            {links.map((link) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 text-[#475569] hover:text-[#1e3a8a] transition",
                    {
                      "text-[#1e3a8a] font-bold drop-shadow-sm":
                        activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {link.name === activeSection && (
                    <motion.span
                      className="bg-white/80 rounded-full absolute inset-0 -z-10 shadow-sm border border-white"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
    </header>
  );
}
