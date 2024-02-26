import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  tool: "purple",
  assistant: "green",
  data: "orange",
};

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
    });

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);    

  useEffect(() => {
      if (status === "awaiting_message") {
          inputRef.current?.focus();
      }
  }, [status]);

  return <div className={cn("bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36")}>

  </div>
}
