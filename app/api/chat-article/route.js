import { NextResponse } from "next/server";

export async function POST(req) {
  const { article, messages } = await req.json();

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5:3b",
      stream: true,
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant. 
Answer ONLY based on the article below. 
If the answer is not in the article, say "The article does not mention this."

ARTICLE CONTENT:
${article}
          `
        },
        ...messages
      ]
    })
  });

  return new NextResponse(response.body, {
    headers: { "Content-Type": "text/event-stream" }
  });
}