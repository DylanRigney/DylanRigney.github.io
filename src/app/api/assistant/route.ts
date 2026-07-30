import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { personas } from "@/lib/data";

// Initialize OpenAI client configured for DeepSeek if API key is provided, 
// otherwise fallback to OpenAI default.
const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
const baseURL = process.env.DEEPSEEK_API_KEY ? "https://api.deepseek.com" : undefined;
const defaultModel = process.env.DEEPSEEK_API_KEY ? "deepseek-chat" : "gpt-4o-mini";

const openai = new OpenAI({
  apiKey: apiKey || "dummy-key-for-build",
  baseURL,
});

const MASTER_SYSTEM_PROMPT = `
You are Dylan Rigney's interactive AI Portfolio Assistant and Career Navigator.
Your goal is to answer questions from recruiters and hiring managers in an accurate, articulate, and engaging manner.

--- IN-CONTEXT ORCHESTRATION & STATE MACHINE ---
You have access to the complete candidate profiles across multiple persona nodes:

[NODE 1: CLAUDE CORP / ANTHROPIC BASELINE]
- Role: ${personas.claude.roleTitle}
- Focus: AI Alignment, LLM Systems Architecture, RAG, Reasoning, Safety-focused Engineering.
- Details: Deep interest in frontier AI research, model evaluation, agentic state machines, and building low-latency LLM tools.

[NODE 2: AI / ML ENGINEER]
- Role: ${personas.ai.roleTitle}
- Focus: Production AI/ML Pipelines, Autonomous Agent Workflows, Vector Databases.
- Details: Practical experience deploying OpenAI / DeepSeek models, Pinecone vector search, fine-tuning evaluations (Outlier AI), and RAG applications.

[NODE 3: FULL-STACK SOFTWARE ENGINEER]
- Role: ${personas.swe.roleTitle}
- Focus: Robust Web Development, Clean Architecture, Mentorship, Enterprise Software.
- Details: Software Engineering Instructor at Revature (taught Java, Spring, React, SQL), high honors CS graduate (3.92 GPA), proficient in TypeScript, React, Next.js, Java.

--- ROUTING & BEHAVIORAL RULES ---
1. INITIAL NODE: Check the starting persona specified in the request context. Begin your answer tailored to that persona's highlight.
2. FLUID TRANSITIONS: If a user asks about general software engineering while in the AI node, or about AI research while in the SWE node, seamlessly transition between nodes to give a complete picture of Dylan's background.
3. CONVERSATIONAL STYLE: Professional, confident, concise, and enthusiastic. Never fabricate experience not present in the nodes.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, persona = "claude" } = await req.json();

    // Determine current persona context
    const currentPersona = personas[persona] || personas.claude;
    const initialContextMessage = `[SYSTEM CONTEXT: The user is currently browsing the '${currentPersona.id}' portfolio version. Initializing assistant in Node '${currentPersona.roleTitle}'].`;

    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: MASTER_SYSTEM_PROMPT },
      { role: "system", content: initialContextMessage },
      ...(Array.isArray(messages)
        ? messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content || "",
          }))
        : []),
    ];

    if (!apiKey || apiKey === "dummy-key-for-build") {
      return NextResponse.json({
        id: crypto.randomUUID(),
        role: "assistant",
        content: `(Demo Mode): Hi! I'm Dylan's AI Assistant initialized for the ${currentPersona.roleTitle} profile. Please set DEEPSEEK_API_KEY or OPENAI_API_KEY in your environment variables to enable live chat capabilities!`,
      });
    }

    const completion = await openai.chat.completions.create({
      model: defaultModel,
      messages: formattedMessages,
      temperature: 0.3,
    });

    const aiResponse = completion.choices[0]?.message?.content || "I'm here to assist with any questions about Dylan's background!";

    return NextResponse.json({
      id: crypto.randomUUID(),
      role: "assistant",
      content: aiResponse,
    });
  } catch (err: any) {
    console.error("AI Assistant API Error:", err);
    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "An unexpected error occurred while communicating with the AI service.",
      },
      { status: 500 }
    );
  }
}
