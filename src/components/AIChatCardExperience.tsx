"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import AIChatBox from "./AIChatbox";
import { Sparkles, CornerDownRight, Orbit, Fingerprint, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useChatLayout } from "@/context/ChatLayoutContext";
import { cn } from "@/lib/utils";

export default function AIChatCardExperience() {
  const { isChatOpen, setIsChatOpen, activeSide, setActiveSide } = useChatLayout();

  const toggleSide = (side: "left" | "right") => {
    if (isChatOpen && activeSide === side) {
      setIsChatOpen(false);
    } else {
      setActiveSide(side);
      setIsChatOpen(true);
    }
  };

  // --- Framer Motion logic for Left Card Parallax ---
  const leftCardRef = useRef<HTMLDivElement>(null);

  // Motion values track cursor position from 0 to 1 across the card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for buttery fluid motion
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map mouse positions to rotation angles
  const rotateX = useTransform(smoothMouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-15, 15]);
  
  // Map mouse positions to glare coordinates
  const glareX = useTransform(smoothMouseX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothMouseY, [0, 1], [0, 100]);
  const backgroundTemplate = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`;

  const handleLeftMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!leftCardRef.current) return;
    const rect = leftCardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeftMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <>
      {/* ========================================================================== */}
      {/* EXP 5: FLOATING BOTTOM RIGHT (Offset) */}
      {/* ========================================================================== */}
      <div 
        id="ai-chat-trigger-floating"
        className={cn(
          "fixed inset-0 pointer-events-none z-[110] transition-all duration-500",
          isChatOpen ? "opacity-0 scale-95 translate-y-8" : "opacity-100 scale-100 translate-y-0"
        )}
      >
        {/* THE FINAL DESIGN: Frosted Glass Delicate Border */}
        <button onClick={(e) => { e.stopPropagation(); toggleSide("right"); }} className="absolute bottom-6 right-6 pointer-events-auto group w-[150px] h-[220px] rounded-2xl border border-sky-300/30 bg-slate-900/5 backdrop-blur-[4px] shadow-lg hover:shadow-xl transition-all active:scale-95 overflow-hidden text-left">
          <img src="/ai_button_v2_3.jpg" alt="Dylan's AI Career Advocate" className="absolute inset-0 w-full h-full object-cover object-center scale-100 will-change-transform transform-gpu" style={{ transitionProperty: "transform", transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", transitionDuration: "2s", maskImage: "radial-gradient(circle at 50% 55%, black 30%, transparent 65%)", WebkitMaskImage: "radial-gradient(circle at 50% 55%, black 30%, transparent 65%)" }} onMouseEnter={(e) => { e.currentTarget.style.transitionDuration = "5s"; e.currentTarget.style.transform = "scale(2)"; }} onMouseLeave={(e) => { e.currentTarget.style.transitionDuration = "2s"; e.currentTarget.style.transform = "scale(1)"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-0% via-black/10 via-30% to-transparent to-50% pointer-events-none" />
          <div className="relative z-10 flex flex-col justify-end h-full p-3 pointer-events-none">
            <p className="text-[9px] uppercase font-bold text-rose-200/90 tracking-[0.2em] mb-1 leading-tight drop-shadow-md">Dylan's AI</p>
            <h4 className="text-lg font-light text-white tracking-tight drop-shadow-md leading-none">Career <span className="font-bold block text-xl">Advocate</span></h4>
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* DOCKED CHAT MODAL - Docks seamlessly above the selected card corner */}
      {/* ========================================================================= */}
      <AIChatBox />
    </>
  );
}
