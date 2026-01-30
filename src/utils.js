export async function queryLLM(prompt, apiKey) {
  if (!apiKey) {
    throw new Error("Missing OpenAI API Key. Check your .dev.vars or Cloudflare Secrets.");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("OpenAI Error Details:", data);
    throw new Error(`OpenAI API Error: ${res.status} - ${data.error?.message}`);
  }

  return data.choices[0].message.content;
}