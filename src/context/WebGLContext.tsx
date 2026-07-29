"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export type DOMRectBounds = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
};

interface WebGLContextProps {
  cards: Record<string, DOMRectBounds>;
  registerCard: (id: string, bounds: DOMRectBounds) => void;
  unregisterCard: (id: string) => void;
  updateCardBounds: (id: string, bounds: DOMRectBounds) => void;
}

const WebGLContext = createContext<WebGLContextProps | null>(null);

export const WebGLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Record<string, DOMRectBounds>>({});

  const registerCard = useCallback((id: string, bounds: DOMRectBounds) => {
    setCards((prev) => ({ ...prev, [id]: bounds }));
  }, []);

  const unregisterCard = useCallback((id: string) => {
    setCards((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const updateCardBounds = useCallback((id: string, bounds: DOMRectBounds) => {
    setCards((prev) => {
      const existing = prev[id];
      if (
        existing &&
        Math.abs(existing.x - bounds.x) < 1 &&
        Math.abs(existing.y - bounds.y) < 1 &&
        Math.abs(existing.width - bounds.width) < 1 &&
        Math.abs(existing.height - bounds.height) < 1
      ) {
        return prev;
      }
      return { ...prev, [id]: bounds };
    });
  }, []);

  return (
    <WebGLContext.Provider value={{ cards, registerCard, unregisterCard, updateCardBounds }}>
      {children}
    </WebGLContext.Provider>
  );
};

export const useWebGLContext = () => {
  const context = useContext(WebGLContext);
  if (!context) {
    throw new Error('useWebGLContext must be used within a WebGLProvider');
  }
  return context;
};
