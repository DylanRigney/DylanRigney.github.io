"use client";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import React, { useEffect, useRef, useState } from "react";


import {
  TextField,
  Button,
  Container,
  Grid,
  LinearProgress,
} from "@mui/material";
import MessageComponent from "./Message";
import OpenAI from "openai";
import { MessageDto } from "@/models/MessageDto";

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'black',
  function: 'blue',
  assistant: 'green',
  data: 'orange',
  tool: 'purple',
};

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "../api/assistant",
    });

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md-">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${m.role}: `}</strong>
          {m.role !== "data" && m.content}
          {m.role !== "data" && (
            <>
              {(m.data as any).description}
              <br />
              <pre className={"bg-gray-200"}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
          <br />
          <br />
        </div>
      ))}

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="What would you like to know?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
//const [isWaiting, setIsWaiting] = useState<boolean>(false);

// const [messages, setMessages] = useState<Array<MessageDto>>(
//   new Array<MessageDto>()
// );

// const [input, setInput] = useState<string>("");

// const [assistant, setAssistant] = useState<any>(null);
// const [thread, setThread] = useState<any>(null);
// const [openai, setOpenai] = useState<any>(null);

// useEffect(() => {
//   initChatBot();
// }, []);

// useEffect(() => {
//   setMessages([
//     {
//       content:
//         "Hi, I'm here to help you learn a little more about Dylan. What would you like to know?",
//       isUser: false,
//     },
//   ]);
// }, [assistant]);

// const initChatBot = async () => {

//   // setOpenai(openai);
//   // setAssistant(assistant);
//   // setThread(thread);
// };

// const createNewMessage = (content: string, isUser: boolean) => {
//   const newMessage = new MessageDto(isUser, content);
//   return newMessage;
// };

// const handleSendMessage = async () => {
//   messages.push(createNewMessage(input, true));
//   setMessages([...messages]);
//   setInput("");

//   // Send a message to the thread
//   await openai.beta.threads.messages.create(thread.id, {
//     role: "user",
//     content: input,
//   });

//   // Run the assistant
//   const run = await openai.beta.threads.runs.create(thread.id, {
//     assistant_id: assistant.id,
//   });

//   // retrieve a response using the run
//   let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);

//   // Wait for the response to be ready
//   while (response.status === "in_progress" || response.status === "queued") {
//     console.log("Waiting for response...");
//     setIsWaiting(true);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
//   }

//   setIsWaiting(false);

//   // Get the messages for the thread
//   const messageList = await openai.beta.threads.messages.list(thread.id);

//   // Find the last message for the current run
//   const lastMessage = messageList.data
//     .filter((message: any) => message.run_id && message.role === "assistant")
//     .pop();

//   // Print the last message coming from the assistant
//   if (lastMessage) {
//     console.log(lastMessage.content[0]["text"].value);
//     setMessages([
//       ...messages,
//       createNewMessage(lastMessage.content[0]["text"].value, false),
//     ]);
//   }
// };

// const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
//   if (event.key === "Enter") {
//     handleSendMessage();
//   }
// };

// return (
//   <Container>
//     <Grid container direction="column" spacing={2} paddingBottom={5}>
//       {messages.map((message, index) => (
//         <Grid
//           item
//           alignSelf={message.isUser ? "flex-end" : "flex-start"}
//           key={index}
//         >
//           <MessageComponent key={index} message={message} />
//         </Grid>
//       ))}
//       <Grid item>
//         <TextField
//           label="Have a question about Dylan? Ask here!"
//           variant="outlined"
//           disabled={isWaiting}
//           fullWidth
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         {isWaiting && <LinearProgress color="inherit" />}
//       </Grid>
//       {!isWaiting && (
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSendMessage}
//             disabled={isWaiting}
//           >
//             Send
//           </Button>
//         </Grid>
//       )}
//     </Grid>
//   </Container>
// );
