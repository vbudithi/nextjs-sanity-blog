export async function POST(req) {
  const { content } = await req.json();

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5:3b",
      prompt: `Summarize the following blog article in 5–7 sentences:\n\n${content}`,
      stream: false
    })
  });

  const text = await response.text();
  return new Response(text);
}