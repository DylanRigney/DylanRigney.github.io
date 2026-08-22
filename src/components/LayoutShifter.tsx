"use client";

import { useChatLayout } from "@/context/ChatLayoutContext";

export default function LayoutShifter({ children }: { children: React.ReactNode }) {
  const { isChatOpen, activeSide, setIsChatOpen } = useChatLayout();

  const scoochLeft = isChatOpen && activeSide === "left";
  const scoochRight = isChatOpen && activeSide === "right";

  return (
    <div
      className="relative w-full h-full min-h-screen transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        paddingLeft: scoochLeft ? "450px" : "0px",
        paddingRight: scoochRight ? "450px" : "0px",
      }}
    >
      {children}
      
      {/* Click-away overlay to close the panel intuitively */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 z-[990] cursor-pointer" 
          onClick={() => setIsChatOpen(false)}
          title="Click to close AI panel"
        />
      )}
    </div>
  );
}
