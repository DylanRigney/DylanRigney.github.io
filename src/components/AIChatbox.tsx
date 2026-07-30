import { useState, useRef, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Bot, CircleUserRound, XCircle, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePersona } from "@/context/PersonaContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const { personaId, persona } = usePersona();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
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

      const data: Message = await res.json();
      setMessages((prev) => [...prev, data]);
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

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 w-full max-w-[500px] p-2 sm:right-8", open ? "block" : "hidden")}>
      <div className="relative flex h-[580px] flex-col rounded-2xl border border-white/20 bg-[#050608]/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Portfolio Assistant</h3>
              <p className="text-xs text-cyan-400 font-medium">Node: {persona.roleTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <XCircle size={24} />
          </button>
        </div>

        {/* Message Log */}
        <div className="h-full px-4 py-4 overflow-y-auto space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center my-12 text-gray-400 text-sm">
              <p className="font-semibold text-gray-200 mb-1">Ask me anything about Dylan!</p>
              <p className="text-xs">
                Examples: &quot;What AI projects has he built?&quot;, &quot;Tell me about his work at Revature&quot;, or &quot;Why is he a good fit for this role?&quot;
              </p>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex items-start gap-3 text-sm", m.role === "assistant" ? "justify-start" : "justify-end")}>
              {m.role === "assistant" && (
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0 mt-1">
                  <Bot size={18} />
                </div>
              )}
              <div className={cn("rounded-2xl px-4 py-2.5 max-w-[80%] leading-relaxed", m.role === "assistant" ? "bg-white/10 text-gray-100 border border-white/10" : "bg-cyan-600 text-white font-medium")}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="p-1.5 rounded-lg bg-white/10 text-gray-300 border border-white/10 shrink-0 mt-1">
                  <CircleUserRound size={18} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                <Bot size={18} />
              </div>
              <div className="h-8 w-24 bg-white/10 rounded-full animate-pulse border border-white/10" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
          <Input
            ref={inputRef}
            disabled={isLoading}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-10 text-sm focus:border-cyan-400/50"
            value={input}
            placeholder="Ask a question..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold h-10 px-4">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
