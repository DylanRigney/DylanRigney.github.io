"use client";

import { useState } from "react";
import AIChatBox from "./AIChatbox";
import { Sparkles, X } from "lucide-react";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(true);

  return (
    <>
      <button 
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] group flex items-center gap-3 px-5 py-3 transition-all duration-300 bg-white/90 hover:bg-white rounded-full shadow-[0_8px_32px_rgba(30,58,138,0.18)] hover:shadow-[0_12px_36px_rgba(244,63,94,0.25)] backdrop-blur-xl border border-white hover:border-rose-200/80 cursor-pointer"
        onClick={() => setChatBoxOpen(!chatBoxOpen)}
        aria-label={chatBoxOpen ? "Minimize AI Assistant" : "Open AI Assistant"}
      >
        {/* Pulsing online status indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
        </span>

        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#f43f5e] group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-bold text-[#1e3a8a] tracking-wide">
            AI Assistant
          </span>
        </div>

        {chatBoxOpen && (
          <span className="ml-1 p-0.5 rounded-full bg-slate-100/90 text-slate-500 group-hover:text-slate-700 transition">
            <X size={13} />
          </span>
        )}
      </button>

      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
}
