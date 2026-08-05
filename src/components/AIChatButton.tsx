"use client";

import { useState } from "react";
import AIChatBox from "./AIChatbox";
import { Orbit } from "lucide-react";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button 
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] group flex items-center justify-center w-16 h-16 transition-all duration-500 bg-white/70 rounded-full hover:bg-white/90 hover:scale-110 shadow-[0_8px_32px_rgba(30,58,138,0.15)] hover:shadow-[0_8px_32px_rgba(244,63,94,0.25)] backdrop-blur-xl border border-white overflow-hidden"
        onClick={() => setChatBoxOpen(!chatBoxOpen)}
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/10 to-[#f43f5e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Orbit size={28} className="text-[#1e3a8a] group-hover:text-[#f43f5e] transition-colors duration-300 relative z-10" />
      </button>

      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
}
