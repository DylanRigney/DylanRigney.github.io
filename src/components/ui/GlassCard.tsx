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
        "relative rounded-3xl border-[1.5px] border-white/60 bg-white/40 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.16),_0_8px_20px_-6px_rgba(15,23,42,0.08),_0_0_20px_rgba(186,230,253,0.12)]",
        "transition-all duration-500 ease-out backdrop-blur-xl overflow-hidden",
        hoverable && "hover:-translate-y-1.5 hover:shadow-[0_30px_65px_-12px_rgba(15,23,42,0.24),_0_12px_30px_-8px_rgba(15,23,42,0.12),_0_0_30px_rgba(186,230,253,0.22)] hover:border-white/80",
        className
      )}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      {...props}
    >
      {/* Top glass bevel catchlight & bottom physical edge rim */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.75),inset_0_-1.5px_1px_rgba(15,23,42,0.06)] pointer-events-none z-10" />

      {/* Subtle diagonal glass light reflection sheen */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-white/5 to-black/[0.02] pointer-events-none z-10" />

      <div className="relative z-20 w-full h-full p-6 text-[#1e293b]">
        {children}
      </div>
    </div>
  );
};
