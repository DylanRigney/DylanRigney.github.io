import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { personas } from "@/lib/data";
import { env } from "@/lib/env";
import { agentTools } from "@/lib/agent-tools";

const apiKey = env.DEEPSEEK_API_KEY || env.OPENAI_API_KEY;
const baseURL = env.DEEPSEEK_API_KEY ? "https://api.deepseek.com" : undefined;
const defaultModel = env.DEEPSEEK_API_KEY ? "deepseek-v4-flash" : "gpt-4o-mini";

const openai = new OpenAI({
  apiKey: apiKey || "dummy-key-for-build",
  baseURL,
});

const MASTER_SYSTEM_PROMPT = `
You are Dylan Rigney's interactive AI Career Advocate.
Your goal is to answer questions from recruiters and hiring managers in an accurate, articulate, and engaging manner.

--- CANDIDATE SUMMARY & PORTFOLIO DETAILS ---
Candidate: Dylan Rigney
Education: BS in Computer Science, University of the People (President's List)
Key Background & Experience:
- AI Engineering Intern at Yoonee AI: Engineered scalable RAG pipelines, developed autonomous document processing workflows, and built interactive dashboards for data-driven analytics.
- LLM Evaluation Engineer (Freelance) at Outlier AI: Evaluated AI-generated code in Python and Java, assessing reasoning quality, multi-step tool use, and safety.
- Technical Instructor / Program Lead at Revature: Agile full-stack engineering, trained junior developers in full-stack web development, enterprise systems.
- Non-traditional background: Former yoga teacher and fitness instructor who brings unique systems thinking, empathy, user experience focus, and clear technical communication to engineering.

Featured Portfolio Projects:
1. Agentic Prediction Copilot: AI-powered forecasting system featuring autonomous agentic decision loops, structured querying, and dynamic Generative UI based on pipeline context. Built with Next.js, TypeScript, Python, LangGraph, FastAPI, and SQLite.
2. Adaptive Fitness & Rehab Agent: Autonomous agent built on OpenClaw that dynamically adapts workout and rehabilitation protocols with automated reasoning and MySQL state management.
3. Autonomous Task Agent: Agentic workflow orchestrator running as a resilient Windows service with robust error handling and monitoring (Python, LangGraph, Google ADK, Docker).
4. Autonomous Web Experience & Generative UI: This interactive portfolio itself! Features in-context AI orchestration, dynamic theme control, and modern responsive design.
5. Tuition Reimbursement System: Enterprise full-stack application with automated multi-tier approval routing (Java, Spring Boot, Hibernate, PostgreSQL).

Core Technical Skills:
- Languages & Frameworks: Python, TypeScript, JavaScript, React, Next.js, FastAPI, Java, Spring Boot
- AI & Agentic Systems: LangGraph, OpenClaw, Google ADK, RAG Pipelines, Prompt Engineering, LLM Evaluation
- Databases & Tools: PostgreSQL, MySQL, SQLite, Docker, Git, Tailwind CSS

--- CONVERSATIONAL STYLE & RULES ---
1. TONE: Professional, confident, enthusiastic, and concise. Highlight Dylan's technical capability, learning velocity, and communication strengths.
2. STRUCTURED ANSWERS: When asked about projects, highlight the problem, tech stack, and Dylan's specific architectural contributions (especially for the Agentic Prediction Copilot).
3. ACCURACY: Never fabricate skills or experience not listed in Dylan's profile.
4. CONTACT: Dylan can be reached via LinkedIn (linkedin.com/in/dylan-rigney/) or through the contact section on this site.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, persona = "ai" } = await req.json();

    const currentPersona = personas[persona] || personas.ai;
    const initialContextMessage = `[SYSTEM CONTEXT: The user is currently browsing the '${currentPersona.id}' portfolio version. Initializing assistant in Node '${currentPersona.roleTitle}'].`;

    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: MASTER_SYSTEM_PROMPT },
      { role: "system", content: initialContextMessage },
      ...(Array.isArray(messages)
        ? messages.map((m: any) => ({
            role: m.role,
            content: m.content || "",
            ...(m.tool_calls ? { tool_calls: m.tool_calls } : {}),
            ...(m.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
            ...(m.name ? { name: m.name } : {}),
          }))
        : []),
    ];

    if (!apiKey || apiKey === "dummy-key-for-build") {
      return NextResponse.json(
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "AI service is currently unavailable. Please ensure the API key is configured correctly in the environment settings.",
        },
        { status: 503 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: defaultModel,
      messages: formattedMessages as any,
      temperature: 0.3,
      tools: agentTools,
      tool_choice: "auto",
    });

    const responseMessage = completion.choices[0]?.message;
    const aiResponse = responseMessage?.content || "";
    const toolCalls = responseMessage?.tool_calls;

    return NextResponse.json({
      id: crypto.randomUUID(),
      role: "assistant",
      content: aiResponse,
      tool_calls: toolCalls,
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
