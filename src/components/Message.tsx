import React from "react";
type MessageProps = {
  text: string;
  isUser: boolean;
};

export default function Message({ text, isUser }: MessageProps) {
  return (
    <div style={{ textAlign: isUser ? "right" : "left", margin: "8px" }}>
      <div
        style={{
          backgroundColor: isUser ? "DCF8C6" : "#b8e3fc",
          padding: "8px",
        }}
      >
        {text}
      </div>
    </div>
  );
}; 


