import { queryLLM } from "./utils.js";

export default async function handleMessage(request, env) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt) return new Response("Missing 'prompt' in JSON body", { status: 400 });

    const responseText = await queryLLM(prompt, env.OPENAI_API_KEY);

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Handler Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}