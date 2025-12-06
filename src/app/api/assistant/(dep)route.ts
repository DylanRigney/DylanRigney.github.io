import { experimental_AssistantResponse } from "ai";
import OpenAI from "openai";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";

// Edge-friendly OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const input: { threadId: string | null; message: string } = await req.json();

  // Use existing thread or create new
  const threadId =
    input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add user's message to thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return experimental_AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ threadId, sendMessage }) => {
      // Run the assistant
      let run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.ASSISTANT_ID || (() => { throw new Error("ASSISTANT_ID not set"); })(),
      });

      // Wait for completion
      while (run.status === "queued" || run.status === "in_progress") {
        await new Promise((r) => setTimeout(r, 500));
        run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      }

      if (["cancelled", "cancelling", "failed", "expired"].includes(run.status)) {
        throw new Error(run.status);
      }

      // Fetch assistant's messages after the user's message
      const responseMessages = (
        await openai.beta.threads.messages.list(threadId, {
          after: createdMessage.id,
          order: "asc",
        })
      ).data;

      // Stream assistant messages
      for (const message of responseMessages) {
        sendMessage({
          id: message.id,
          role: "assistant",
          content: message.content.filter(
            (c) => c.type === "text"
          ) as MessageContentText[],
        });
      }
    }
  );
}
