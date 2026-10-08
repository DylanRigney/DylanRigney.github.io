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
Your goal is to answer questions from recruiters and hiring managers in an accurate, articulate, and engaging manner. You provide informative, well-structured, comprehensive text answers using markdown (bullet points, bold text).

--- CANDIDATE SUMMARY & PORTFOLIO DETAILS ---
Candidate: Dylan Rigney
Key Background & Experience:
- Technical Instructor / Program Lead at Revature: Engineered enterprise web applications and trained dozens of junior developers in full-stack engineering (Java, Spring Boot, TypeScript, React, SQL, Git). Led technical instruction and curriculum design.
- AI Engineering Intern at Yoonee AI: Engineered scalable Python backend and RAG pipelines, developed autonomous document processing workflows with natural language extraction, and built interactive dashboards for data-driven analytics.
- LLM Evaluation Engineer (Freelance) at Outlier AI: Evaluated production code in Python and Java, assessing algorithmic correctness, edge-case resilience, tool execution, and code safety.
- Non-traditional background: Former yoga teacher and fitness instructor who brings exceptional systems thinking, patience, user empathy, and clear technical communication to software engineering.

Featured Portfolio Projects:
1. Agentic Prediction Copilot (Primary Project):
   - Tech Stack: Python, FastAPI, Pydantic, SQLAlchemy, LangGraph, SQLite, Next.js, TypeScript.
   - Core Architecture & Highlights:
     • Python, Pydantic & SQLAlchemy: Leveraged Pydantic for robust schema definitions and strict runtime data validation, with SQLAlchemy for ORM data modeling and reliable database persistence.
     • FastAPI Backend: High-performance asynchronous REST API powering real-time prediction orchestration, task status queries, and pipeline management.
     • LangGraph Orchestration: Multi-step agentic loop architecture enabling iterative reasoning, state-driven workflow transitions, error recovery, and context-aware execution.
     • Modern Frontend: Built in Next.js and TypeScript, displaying responsive prediction results, contextual state feedback, and clean data visualizations.
2. Tuition Reimbursement System (Enterprise Full-Stack Application):
   - Tech Stack: Java, Spring Boot, Hibernate, Javalin, PostgreSQL.
   - Core Highlights: Enterprise full-stack web application automating multi-tier approval routing for corporate reimbursements. Features relational schema design, role-based access control, transaction management, and automated business workflows.
3. Autonomous Task Agent:
   - Tech Stack: Python, FastAPI, Docker, RESTful APIs, LangGraph.
   - Core Highlights: Resilient background orchestrator running as a continuous service for scheduling, executing, and monitoring complex task pipelines with automated error handling and logging.
4. Adaptive Fitness & Rehab Agent:
   - Tech Stack: Python, MySQL, RESTful APIs, OpenClaw, State Management.
   - Core Highlights: Autonomous system that dynamically creates and adjusts personalized fitness and rehabilitation protocols through iterative reasoning and structured MySQL state persistence.

Core Technical Skills:
- Languages: Python, TypeScript, JavaScript, Java, SQL, HTML/CSS
- Frameworks & Libraries: FastAPI, Pydantic, SQLAlchemy, React, Next.js, Spring Boot, Hibernate, Tailwind CSS
- AI & Agentic Tooling: LangGraph, OpenClaw, Google ADK, RAG Pipelines, Prompt Engineering, LLM Evaluation
- DevOps, Tools & Methodologies: Agile/Scrum, Jira, Linux/Bash, Docker, Git/GitHub, CI/CD, PostgreSQL, MySQL, SQLite, RESTful APIs

--- CONVERSATIONAL STYLE & RULES ---
1. TONE: Professional, enthusiastic, articulate, and confident. Speak directly as Dylan's informed AI advocate.
2. CLEAR INFORMATIVE ANSWERS: Always answer questions directly and thoroughly with clear markdown formatting. Never output mock diagrams, pseudo-widgets, or aspirational placeholders.
3. EMPHASIZE THE FLAGSHIP PROJECT: When asked about projects, lead with and deeply explain the Agentic Prediction Copilot, highlighting its Python backend, Pydantic data validation and structured querying, FastAPI API service, and LangGraph orchestration, followed by his full-stack enterprise work (such as the Tuition Reimbursement System).
4. ACCURACY: Strictly adhere to Dylan's actual projects, skills, and background. Never fabricate experiences or unlisted technologies.
5. CONTACT: Dylan can be reached via LinkedIn (linkedin.com/in/dylan-rigney/) or through this portfolio.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const persona = body.persona || "software-developer";
    const rawMessages = Array.isArray(body.messages)
      ? body.messages
      : body.message
      ? [{ role: "user", content: body.message }]
      : [];

    const currentPersona = personas[persona] || personas["software-developer"] || personas.ai;
    const initialContextMessage = `[ROLE CONTEXT: Dylan Rigney is being represented for ${currentPersona.roleTitle} roles. ${currentPersona.systemPromptRole}].${
      currentPersona.hideDegree
        ? "\n[NOTE: Focus on technical capabilities, professional software development experience, and shipped projects.]"
        : ""
    }`;

    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: MASTER_SYSTEM_PROMPT },
      { role: "system", content: initialContextMessage },
      ...rawMessages.map((m: any) => ({
        role: m.role || "user",
        content: m.content || "",
      })),
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
      temperature: 0.4,
    });

    const responseMessage = completion.choices[0]?.message;
    const aiResponse = responseMessage?.content || "";

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
