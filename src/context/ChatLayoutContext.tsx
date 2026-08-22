"use client";

import React, { createContext, useContext, useState } from "react";

type ChatLayoutContextType = {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  activeSide: "left" | "right";
  setActiveSide: (side: "left" | "right") => void;
};

const ChatLayoutContext = createContext<ChatLayoutContextType | undefined>(undefined);

export function ChatLayoutProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<"left" | "right">("right"); // Default to right

  return (
    <ChatLayoutContext.Provider value={{ isChatOpen, setIsChatOpen, activeSide, setActiveSide }}>
      {children}
    </ChatLayoutContext.Provider>
  );
}

export function useChatLayout() {
  const context = useContext(ChatLayoutContext);
  if (context === undefined) {
    throw new Error("useChatLayout must be used within a ChatLayoutProvider");
  }
  return context;
}
