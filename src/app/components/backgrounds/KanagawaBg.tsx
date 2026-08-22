'use client'
import React from 'react';

export default function KanagawaBg() {
  return (
    <div 
      className="fixed inset-0 -z-10 bg-[#efe8de] pointer-events-none"
      style={{ 
        backgroundImage: "url('/pastel-landscape.jpg')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </div>
  );
}
