"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useWebGLContext } from '@/context/WebGLContext';
import { cn } from '@/lib/utils'; // Assuming tailwind-merge util exists

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ id, hoverable = false, children, className, ...props }) => {
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
        "relative rounded-2xl border-[1px] border-[#1e293b]/10 bg-white/30 shadow-lg",
        "transition-all duration-500 ease-out backdrop-blur-md",
        hoverable && isHovered ? "bg-white/70 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] -translate-y-1" : "",
        className
      )}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      {...props}
    >
      <div className="relative z-10 w-full h-full p-6 text-[#1e293b]">
        {children}
      </div>
    </div>
  );
};
