import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";
import { experimental_AssistantResponse } from "ai";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  // parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return experimental_AssistantResponse({
    threadId,
    messageId: createdMessage.id,
  }, 
    async ({ threadId, sendMessage }) => {
      // Run the assistant on the thread
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
        // Poll for status change
        while (run.status === "queued" || run.status === "in_progress") {
          // delay for 500ms:
          await new Promise((resolve) => setTimeout(resolve, 500));

          run = await openai.beta.threads.runs.retrieve(threadId!, run.id);
        }

        // Check the run status
        if (
          run.status === "cancelled" ||
          run.status === "cancelling" ||
          run.status === "failed" ||
          run.status === "expired"
        ) {
          throw new Error(run.status);
        }
      }

      await waitForRun(run);

      // Get new thread messages (after our message)
      const responseMessages = (await openai.beta.threads.messages.list(threadId, {
        after: createdMessage.id,
        order: "asc",
      })
      ).data  

      // send the messages
      for (const message of responseMessages) {
        sendMessage({
          id: message.id,
          role: "assistant",
          content: message.content.filter(
            (content) => content.type === "text" 
          ) as Array<MessageContentText>,
        })
      }
    } // AssistantResponseCallback
  ); // assistantResponse
} // post  


// export default async function Handler(
// ) {

//     // Add Assistant logic here

//     // Create an assistant singleton
//     // let assistant: any;

//     // if (assistant == null) {

//     //     assistant = await openai.beta.assistants.create({
//     //         name: "Job Placement Assistant",
//     //         instructions: "Your job is to help Dylan get hired as a software engineer. Hiring managers and recruiters will ask you questions about Dylan in order to decide whether they should hire him. You should answer the questions to the best of your ability based on the information about Dylan that has been provided to you, but in a way that makes Dylan seem like he would make an excellent engineer. You can make some jokes and be a little humorous. If they ask you a question that you don't know the answer to then you can either admit you don't know, or give an answer that is obviously not true but in a funny way. Like if someone asked how many years of Pascal programming experience Dylan has and you don't know(The real answer is 0), you could say: I don't know for sure, but probably at least a million years experience .",
//     //         tools: [{ type: "code_interpreter" }],
//     //         model: "gpt-4-1106-preview",
//     //     });
//     // }

//     // Create a thread
//     //const thread = await openai.beta.threads.create();

//     // Set assistant, openai and thread state

// }
