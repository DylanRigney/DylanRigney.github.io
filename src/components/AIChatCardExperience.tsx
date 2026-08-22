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
        {/* THE FINAL DESIGN: 3D Frosted Glass Card (Stationary with 3D Depth) */}
        <div className="absolute bottom-12 sm:bottom-[62px] right-6 sm:right-10 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleSide("right"); }} 
            className="group relative w-[150px] h-[220px] rounded-2xl border-[2.5px] border-[#bae6fd]/55 bg-slate-900/10 backdrop-blur-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_8px_20px_rgba(15,23,42,0.4),_0_0_20px_rgba(186,230,253,0.15)] hover:shadow-[0_30px_65px_rgba(0,0,0,0.65),_0_12px_30px_rgba(15,23,42,0.5),_0_0_30px_rgba(186,230,253,0.25)] hover:-translate-y-1.5 transition-all duration-300 active:scale-95 overflow-hidden text-left"
          >
            {/* Top glass bevel catchlight & bottom rim shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-1.5px_1px_rgba(0,0,0,0.4)] pointer-events-none z-20" />
            
            {/* Diagonal glass light reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10 pointer-events-none z-10" />

            {/* Neon Bonsai Image with signature zoom & radial mask */}
            <img 
              src="/ai_button_v2_3.jpg" 
              alt="Dylan's AI Career Advocate" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 will-change-transform transform-gpu" 
              style={{ 
                transitionProperty: "transform", 
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", 
                transitionDuration: "2s", 
                maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 72%)", 
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 72%)" 
              }} 
              onMouseEnter={(e) => { e.currentTarget.style.transitionDuration = "5s"; e.currentTarget.style.transform = "scale(2)"; }} 
              onMouseLeave={(e) => { e.currentTarget.style.transitionDuration = "2s"; e.currentTarget.style.transform = "scale(1)"; }} 
            />

            {/* Floating Typography */}
            <div className="relative z-20 flex flex-col justify-end h-full p-3 pointer-events-none">
              <p 
                className="text-[9px] uppercase font-extrabold text-rose-100 tracking-[0.22em] mb-1 leading-tight"
                style={{ textShadow: "0 0 3px #000, 0 1px 2px #000, 0 0 1px #000, 0 0 6px rgba(0,0,0,0.8)" }}
              >
                Dylan&apos;s AI
              </p>
              <h4 
                className="text-lg font-light text-white tracking-tight leading-none"
                style={{ textShadow: "0 0 4px #000, 0 1px 3px #000, 0 0 8px rgba(0,0,0,0.7)" }}
              >
                Career <span className="font-bold block text-xl">Advocate</span>
              </h4>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DOCKED CHAT MODAL - Docks seamlessly above the selected card corner */}
      {/* ========================================================================= */}
      <AIChatBox />
    </>
  );
}
