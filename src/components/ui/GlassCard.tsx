"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useWebGLContext } from '@/context/WebGLContext';
import { cn } from '@/lib/utils'; // Assuming tailwind-merge util exists

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ id, children, className, ...props }) => {
  const { registerCard, unregisterCard, updateCardBounds } = useWebGLContext();
  const ref = useRef<HTMLDivElement>(null);
  
  // We'll also use some internal state to apply a fallback CSS styling
  // if WebGL isn't loaded or supported, but mostly this relies on the 3D scene.
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        updateCardBounds(id, {
          id,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
        });
      }
    };

    // Initial registration
    const rect = ref.current.getBoundingClientRect();
    registerCard(id, {
      id,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    });

    // We use ResizeObserver to catch dimension changes
    const resizeObserver = new ResizeObserver(() => {
      updateBounds();
    });
    resizeObserver.observe(ref.current);

    // We also need to listen to scroll events to update Y position on screen.
    // Assuming the window is the scroller. If there is a custom scroll container, 
    // it would need to be passed down or handled specifically.
    window.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
      unregisterCard(id);
    };
  }, [id, registerCard, unregisterCard, updateCardBounds]);

  return (
    <div
      ref={ref}
      id={`glass-card-${id}`}
      className={cn(
        "relative rounded-2xl border border-white/5 bg-white/5",
        "transition-colors duration-500 ease-out",
        isHovered ? "bg-white/10" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* HTML content goes here. The WebGL canvas in the background will render 
          the refractive 3D glass and sub-surface glow at this exact position. */}
      <div className="relative z-10 w-full h-full p-6">
        {children}
      </div>
    </div>
  );
};
