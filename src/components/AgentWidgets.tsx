import React, { useState } from "react";
import { Bot, CheckCircle2, ChevronRight, Code2, Play, Building2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { saveRecruiterLead } from "@/actions/saveRecruiterLead";

export const TourBadgeWidget = () => {
  return (
    <div className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/30 p-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.15)] animate-pulse">
      <div className="p-2 bg-rose-500/10 rounded-full">
        <Play className="text-[#f43f5e]" size={16} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-cyan-50">Guided Tour in Progress</h4>
        <p className="text-xs text-[#fb7185]">Scrolling and highlighting sections...</p>
      </div>
    </div>
  );
};

export const RecruiterConnectWidget = ({ onComplete }: { onComplete?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await saveRecruiterLead(formData);
    setLoading(false);
    setSubmitted(true);
    if (onComplete) onComplete();
  };

  if (submitted) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-emerald-50">
        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <CheckCircle2 size={18} />
          <span className="font-bold">Pitch Generated</span>
        </div>
        <p className="text-sm text-emerald-200">
          I&apos;ve sent your information to Dylan. I&apos;ll provide a custom pitch based on your role right here in the chat!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e293b]/5 border border-[#1e293b]/10 p-4 rounded-xl flex flex-col gap-3">
      <div className="flex items-center gap-2 text-gold-400 mb-1">
        <Building2 size={16} className="text-yellow-400"/>
        <h4 className="text-sm font-bold text-yellow-50">Request Custom Briefing</h4>
      </div>
      <p className="text-xs text-[#334155] mb-2">
        Enter your details to generate a custom fit analysis and notify Dylan.
      </p>
      <Input name="name" required placeholder="Your Name" className="bg-black/20 border-[#1e293b]/10 h-8 text-sm" />
      <Input name="company" required placeholder="Company Name" className="bg-black/20 border-[#1e293b]/10 h-8 text-sm" />
      <Input name="email" type="email" required placeholder="Your Email" className="bg-black/20 border-[#1e293b]/10 h-8 text-sm" />
      <Input name="role" required placeholder="Role you are hiring for" className="bg-black/20 border-[#1e293b]/10 h-8 text-sm" />
      <Button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-8 text-xs mt-1">
        {loading ? "Generating..." : "Generate Custom Pitch"} <Send size={12} className="ml-2" />
      </Button>
    </form>
  );
};

export const ProjectArchitectureWidget = ({ projectId }: { projectId: string }) => {
  return (
    <div className="bg-violet-950/30 border border-violet-500/30 p-4 rounded-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Code2 size={100} />
      </div>
      <h4 className="text-sm font-bold text-violet-100 mb-3 relative z-10">
        Architecture Deep Dive
      </h4>
      <div className="space-y-4 relative z-10">
        <div className="p-3 bg-black/40 rounded-lg border border-[#1e293b]/5">
          <p className="text-xs font-semibold text-violet-300 mb-2">1. System Workflow</p>
          <div className="flex items-center gap-2 text-xs text-[#334155]">
            <span className="px-2 py-1 bg-[#1e293b]/10 rounded">User Input</span>
            <ChevronRight size={14} className="text-violet-400" />
            <span className="px-2 py-1 bg-[#1e293b]/10 rounded">Agent Orchestrator</span>
            <ChevronRight size={14} className="text-violet-400" />
            <span className="px-2 py-1 bg-[#1e293b]/10 rounded">Tool Execution</span>
          </div>
        </div>
        
        <div>
          <p className="text-xs font-semibold text-violet-300 mb-2">2. Core Stack</p>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">Python</span>
            <span className="px-2 py-1 bg-rose-500/10 text-[#fb7185] border border-cyan-500/30 rounded-full">LangGraph</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full">Next.js</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">OpenAI API</span>
          </div>
        </div>
      </div>
    </div>
  );
};
