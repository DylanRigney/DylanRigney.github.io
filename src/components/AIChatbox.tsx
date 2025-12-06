import { useState, useRef, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Bot, CircleUserRound, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
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
    <div className={cn("bottom-0 right-0 z-10 w-full max-w-[550px] p-1 xl:right-36", open ? "fixed" : "hidden")}>
      <button onClick={onClose} className="mb-1 ms-auto block"><XCircle size={30} /></button>

      <div className="flex h-[640px] flex-col rounded border bg-background shadow-xl">
        <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} className={cn("mb-3 flex items-center", m.role === "assistant" ? "justify-end ms-5" : "me-5justify-start")}>
              {m.role !== "assistant" && <CircleUserRound size={30} className="mr-2 shrink-0" />}
              <p className={cn("whitespace-pre-line rounded-md border px-3 py-2", m.role !== "assistant" ? "bg-background" : "bg-primary/90 text-primary-foreground")}>
                {m.content}
              </p>
              {m.role === "assistant" && <Bot size={30} className="ml-2 shrink-0" />}
            </div>
          ))}
          {isLoading && (
            <div className="flex alignItems-center">
              <div className="h-14 w-full max-w-md p-2 ml-4 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
              <Bot size={30} className="h-14 ml-2 shrink-0" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            ref={inputRef}
            disabled={isLoading}
            className="shadow-xl h-11 text-sm"
            value={input}
            placeholder="What would you like to know?"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={isLoading} className="rounded-md text-md h-11 shadow-xl">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
