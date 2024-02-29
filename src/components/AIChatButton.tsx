"use client";

import { useState } from "react";
import AIChatBox from "./AIChatbox";
import { Button } from "./ui/button";
import { Bot, CircleUserRound } from "lucide-react";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button className="mt-8 " onClick={() => setChatBoxOpen(true)}>
        <Bot size={30} className="mr-2" />
         Ask my AI assistant
      </Button>

      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      ></AIChatBox>
    </>
  );
}
