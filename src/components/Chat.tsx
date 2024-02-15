"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import Message from "./Message";
import OpenAI, { ClientOptions } from "openai";
import { MessageDto } from "@/models/MessageDto";

export default function Chat() {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageDto>>(
    new Array<MessageDto>()
  );
  const [input, setInput] = useState<string>("");
  const [assistant, setAssistant] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [openai, setOpenai] = useState<any>(null);

  useEffect(() => {
    initChatBot();
  }, []);

  useEffect(() => {
    setMessages([
      {
        content:
          "Hi, I'm here to help you learn a little more about Dylan. What would you like to know?",
        isUser: false,
      },
    ]);
  }, [assistant]);

  const initChatBot = async () => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });

    const assistant = await openai.beta.assistants.create({
      name: "Job Placement Assistant",
      instructions:
        "Your job is to help Dylan get hired as a software engineer. Hiring managers and recruiters will ask you questions about Dylan in order to decide whether they should hire him. You should answer the questions to the best of your ability based on the information about Dylan that has been provided to you, but in a way that makes Dylan seem like he would make an excellent engineer. You can make some jokes and be a little humorous. If they ask you a question that you don't know the answer to then you can either admit you don't know, or give an answer that is obviously not true but in a funny way. Like if someone asked how many years of Pascal programming experience Dylan has and you don't know(The real answer is 0), you could say: I don't know for sure, but probably at least a million years experience .",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4-1106-preview",
    });

    const thread = await openai.beta.threads.create();

    setOpenai(openai);
    setAssistant(assistant);
    setThread(thread);
  };

  const createNewMessage = (content: string, isUser: boolean) => {
    const newMessage = new MessageDto(isUser, content);
    return newMessage;
  };

  const handleSendMessage = async () => {
    messages.push(createNewMessage(input, true));
    setMessages([...messages]);
    setInput("");

    // Send a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: input,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    // retrieve a response using the run
    let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Wait for the response to be ready
    while (response.status === "in_progress" || response.status === "queued") {
      console.log("Waiting for response...");
      setIsWaiting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    setIsWaiting(false);

    // Get the messages for the thread
    const messageList = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessage = messageList.data
      .filter((message: any) => message.run_id && message.role === "assistant")
      .pop();

    // Print the last message coming from the assistant
    if (lastMessage) {
      console.log(lastMessage.content[0]["text"].value);
      setMessages([
        ...messages,
        createNewMessage(lastMessage.content[0]["text"].value, false),
      ]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Grid container direction="column" spacing={2} paddingBottom={5}>
        {messages.map((message, index) => (
          <Grid
            item
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
            key={index}
          >
            <Message key={index} message={message} />
          </Grid>
        ))}
        <Grid item>
          <TextField
            label="Have a question about Dylan? Ask here!"
            variant="outlined"
            disabled={isWaiting}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isWaiting && <LinearProgress color="inherit" />}
        </Grid>
        {!isWaiting && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={isWaiting}
            >
              Send
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
