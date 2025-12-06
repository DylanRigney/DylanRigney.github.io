import { experimental_AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message, threadId } = (await req.json()) as {
      message: string;
      threadId?: string;
    };

    // Ensure threadId is always a string
    const safeThreadId = threadId ?? "default-thread";

    return experimental_AssistantResponse(
      { threadId: safeThreadId, messageId: "1" },
      async ({ sendMessage }) => {
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          messages: [{ role: "user", content: message }],
        });

        for await (const event of stream as AsyncIterable<any>) {
          if (event.type === "message" && event.message?.content?.length) {
            sendMessage({
              id: "1",
              role: event.message.role ?? "assistant",
              content: [{ type: "text", text: event.message.content[0].text ?? "" }],
            } as any);
          }
        }
      }
    );
  } catch (err) {
    console.error("POST /api/assistant failed:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
