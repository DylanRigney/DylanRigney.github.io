import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgba(30,58,138,0.05)] rounded-full px-8 py-3">
        <h2 className="text-3xl font-bold capitalize text-[#1e3a8a] text-center tracking-tight">
          {children}
        </h2>
      </div>
    </div>
  );
}
