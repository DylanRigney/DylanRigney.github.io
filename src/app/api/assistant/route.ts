import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resumeText = `
Dylan Rigney

Location: Tenino, WA
LinkedIn: linkedin.com/in/dylan-rigney
Portfolio: dylanrigney.vercel.app
GitHub: github.com/DylanRigney

Summary:
Software Engineer and Computer Science student with a strong full-stack background and a focus on Applied AI. Experienced as a Technical Instructor, skilled in debugging, technical communication, and rapid upskilling. Adept at integrating LLMs, Agents, and Retrieval-Augmented Generation (RAG) into modern web applications. Seeking opportunities to apply technical expertise in software engineering and AI-powered development.

Education:
- University of the People | Remote | Bachelor of Science in Computer Science | Apr 2024 – Expected 2026
  - President’s List, Coursework: Software Engineering, Mobile App Development, Data Structures, Web Programming
- Full Stack Java Developer Bootcamp | Revature | Reston, VA | 2021
  - Graduated top of cohort; hired directly as Full-Stack Developer and Technical Instructor

Technical Skills:
- Languages: Python, Java, JavaScript, TypeScript, C++
- Web Development: React, Next.js, Angular, Spring, HTML5, RESTful APIs
- AI & ML: LLM integration, Retrieval-Augmented Generation (RAG), Agentic Systems
- Tools & DevOps: Git/GitHub, PostgreSQL, VS Code, Linux, AWS

Professional Experience:
- Outlier AI | Remote | AI Code Evaluator (Freelance) | Nov 2023 – Apr 2024
  - Evaluated and debugged AI-generated code in Python and Java to improve model accuracy
  - Created "Gold Standard" coding solutions and prompts for model training
- Revature | Reston, VA | Software Engineering Technical Instructor | Sep 2021 – Sep 2023
  - Developed full-stack demonstration apps using Angular, Java, Spring Boot, PostgreSQL
  - Led live coding demos in Java, JavaScript, SQL, Spring; mentored students in full-stack dev and data structures
  - Many students went on to become successful full-stack developers

Technical Projects:
- Sage - AI-Powered Prediction Tracker | Next.js, Python, OpenAI API, Vector DB
  - Full-stack prediction tracking app with server-side rendering and dynamic routing
  - Integrated a RAG chatbot for natural language queries on prediction data
- Mars Rover Sim - Reinforcement Learning | Python, PyBullet, PyTorch
  - Autonomous agent navigating a simulated rover using Reinforcement Learning
  - Used PyBullet for physics simulation; agent trained to identify goals and navigate obstacles

  Personal Interests: Dylan enjoys snowboarding, camping, rock climbing, spending time outdoors, and playing chess. He values challenging himself physically and mentally, exploring nature, and learning new skills both in tech and in life.

`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Answer questions using only the following resume as context:

${resumeText}`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.2,
    });

    const aiMessage = completion.choices[0]?.message?.content || "Sorry, I don't know.";

    // Return in the format useChat expects
    return NextResponse.json({
      id: crypto.randomUUID(),
      role: "assistant",
      content: aiMessage,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Error processing request.",
      },
      { status: 500 }
    );
  }
}
