"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, X, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePersona } from "@/context/PersonaContext";
import { useWebGLContext } from "@/context/WebGLContext";
import { ProjectArchitectureWidget, RecruiterConnectWidget, TourBadgeWidget } from "./AgentWidgets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatLayout } from "@/context/ChatLayoutContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  tool_calls?: any[];
};

export default function AIChatBox() {
  const { isChatOpen, setIsChatOpen, activeSide } = useChatLayout();
  const { personaId, persona } = usePersona();
  const { setAmbientMood } = useWebGLContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: textToSend,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          persona: personaId,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, data]);

      if (data.tool_calls) {
        data.tool_calls.forEach((tc: any) => {
          if (tc.function.name === "set_ambient_mood") {
            const args = JSON.parse(tc.function.arguments);
            setAmbientMood(args.color);
          } else if (tc.function.name === "start_guided_tour") {
            const args = JSON.parse(tc.function.arguments);
            document.getElementById(args.section)?.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Error fetching response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
  };

  const presetChips = [
    {
      icon: "💡",
      text: "Tell me about Dylan's portfolio projects.",
    },
    {
      icon: "🛠️",
      text: "What are Dylan's core technical skills?",
    },
    {
      icon: "🎯",
      text: "Why should our team hire Dylan?",
    },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-[1000] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[100vw] sm:w-[450px] overflow-hidden isolate",
        "right-0 bg-slate-900/30 backdrop-blur-[16px] border-l-[6px] border-slate-950 shadow-[-20px_0_40px_rgba(0,0,0,0.4)]",
        isChatOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
      )}
    >
      {/* Sleek Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 relative z-10 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 shadow-sm border border-white/5 text-rose-300">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">AI Career Advocate</h3>
            <p className="text-xs text-rose-300 font-semibold tracking-wide uppercase">{persona.roleTitle}</p>
          </div>
        </div>
        <button id="ai-close-btn" onClick={() => setIsChatOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition" aria-label="Close AI Assistant">
          <X size={20} />
        </button>
      </div>

      {/* Message Log */}
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-6 relative z-10" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="flex flex-col mt-4 gap-4">
            <p className="font-semibold text-[15px] leading-relaxed text-white">
              Hi, I&apos;m Dylan&apos;s AI Career Advocate. Ask me a question about Dylan or select one of the options below to get started.
            </p>
            <div className="flex flex-col gap-3 w-full mt-2">
              {presetChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setInput(chip.text);
                    sendMessage(chip.text);
                  }}
                  className="w-full text-left p-4 rounded-2xl border shadow-sm transition-all duration-300 flex items-start gap-4 group cursor-pointer bg-slate-800/80 border-2 border-slate-950 hover:bg-slate-700 hover:border-slate-900 text-slate-100 shadow-md"
                >
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{chip.icon}</span>
                  <span className="leading-relaxed group-hover:text-white">{chip.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={cn("flex flex-col gap-1.5", m.role === "assistant" ? "items-start" : "items-end")}>
            {m.content && (
              <div className={cn(
                "max-w-[85%] text-sm leading-relaxed", 
                m.role === "assistant" 
                  ? "pl-4 border-l-[3px] py-1 text-slate-200 border-slate-700"
                  : "px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md bg-slate-800 text-white border-2 border-slate-950"
              )}>
                {m.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose max-w-none prose-sm prose-invert">
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            )}
            {m.tool_calls && m.tool_calls.map((tc: any) => {
              if (tc.function.name === "spotlight_project_architecture") {
                const args = JSON.parse(tc.function.arguments);
                return <div className="mt-2" key={tc.id}><ProjectArchitectureWidget projectId={args.projectId} /></div>;
              }
              if (tc.function.name === "request_recruiter_connect") {
                return <div className="mt-2" key={tc.id}><RecruiterConnectWidget onComplete={() => setAmbientMood("#10b981")} /></div>;
              }
              if (tc.function.name === "start_guided_tour") {
                return <div className="mt-2" key={tc.id}><TourBadgeWidget /></div>;
              }
              return null;
            })}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 py-2 pl-4 border-l-2 border-rose-500/30">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-white/10 relative z-10 bg-transparent">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            ref={inputRef}
            disabled={isLoading}
            className="h-12 text-sm shadow-sm rounded-xl bg-slate-900/80 border-2 border-slate-950 text-white placeholder:text-white/50 focus:border-slate-700"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={isLoading} className="h-12 w-12 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center shrink-0 p-0 bg-slate-800 border-2 border-slate-950 hover:bg-slate-700 text-white">
            <Send size={18} />
          </Button>
        </form>
      </div>

      {/* Bottom spacer */}
      <div className="shrink-0 w-full h-4 relative z-10" />
    </div>
  );
}
