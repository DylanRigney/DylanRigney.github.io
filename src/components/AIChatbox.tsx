import { useState, useRef, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Orbit, CircleUserRound, X, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePersona } from "@/context/PersonaContext";
import { useWebGLContext } from "@/context/WebGLContext";
import { ProjectArchitectureWidget, RecruiterConnectWidget, TourBadgeWidget } from "./AgentWidgets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  tool_calls?: any[];
};

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
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
      icon: "🎯",
      text: "Can you take me on a live AI-guided walkthrough of Dylan's portfolio?",
    },
    {
      icon: "🎨",
      text: "Show me how you control the website's Generative UI in real time.",
    },
    {
      icon: "💻",
      text: "What standout AI systems has Dylan built?",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed bottom-28 right-4 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[450px] animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="relative flex h-[650px] max-h-[80vh] flex-col rounded-3xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_20px_40px_rgba(30,58,138,0.1)] overflow-hidden">
        
        {/* Sleek Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-b from-white/90 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-white shadow-sm border border-[#1e3a8a]/10 text-[#1e3a8a]">
              <Orbit size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1e3a8a] tracking-wide">AI Career Advocate</h3>
              <p className="text-xs text-[#f43f5e] font-semibold tracking-wide uppercase">{persona.roleTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/50 text-[#64748b] hover:text-[#1e3a8a] transition">
            <X size={20} />
          </button>
        </div>

        {/* Message Log */}
        <div className="h-full px-5 py-2 overflow-y-auto space-y-6" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="flex flex-col mt-4 gap-4">
              <p className="font-semibold text-[#1e3a8a] text-[15px] leading-relaxed">
                Hi! I&apos;m Dylan&apos;s AI Advocate. I can control this website, take you on a tour, or answer questions about his experience.
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
                    className="w-full text-left p-4 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-sm hover:shadow-md hover:border-[#1e3a8a]/20 text-[#0f172a] text-sm font-medium transition-all duration-300 flex items-start gap-4 group cursor-pointer"
                  >
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{chip.icon}</span>
                    <span className="leading-relaxed text-[#334155] group-hover:text-[#1e3a8a]">{chip.text}</span>
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
                    ? "text-[#1e293b] pl-4 border-l-2 border-[#f43f5e] py-1" // Clean workspace look, no bubble
                    : "bg-[#1e3a8a] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm" // Ocean blue bubble
                )}>
                  {m.role === "assistant" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-slate max-w-none prose-sm">
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
            <div className="flex items-center gap-3 py-2 pl-4 border-l-2 border-[#f43f5e]/30">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white/80 border-t border-white flex gap-3 backdrop-blur-md">
          <Input
            ref={inputRef}
            disabled={isLoading}
            className="bg-white border-white/60 text-[#0f172a] placeholder:text-[#94a3b8] h-12 text-sm focus:border-[#1e3a8a]/30 shadow-sm rounded-xl focus:ring-[#1e3a8a]/20"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={isLoading} className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white h-12 w-12 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center shrink-0 p-0">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
