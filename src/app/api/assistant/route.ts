import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resumeText = `
John Doe
Software Engineer with 5+ years experience in full-stack web development, specializing in Next.js, React, and Node.js.
Worked on AI-powered apps, cloud deployment, and large-scale web applications.
Skills: JavaScript, TypeScript, React, Next.js, Node.js, OpenAI APIs, Vercel, SQL, NoSQL, REST, GraphQL.
Experience: Company A - Senior Developer; Company B - Full-stack Engineer.
Education: B.S. in Computer Science.
`;

// POST /api/assistant
export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4" if you have access
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

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error processing request." }, { status: 500 });
  }
}
