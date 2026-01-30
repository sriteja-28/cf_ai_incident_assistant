import handleMessage from "./routes.js";
import { Conversation } from "./conversation.js";

// CRITICAL: You must export the class for the Durable Object to work
export { Conversation };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Route for AI Analysis (Stateless LLM Call)
    if (url.pathname === "/message" && request.method === "POST") {
      return handleMessage(request, env);
    }

    // 2. Route for Durable Object (Stateful Memory)
    if (url.pathname === "/conversation") {
      // We use a fixed ID for the demo, or you could derive one from a header
      const id = env.CONVERSATION.idFromName("incident-session-001");
      const obj = env.CONVERSATION.get(id);
      return obj.fetch(request);
    }

    // 3. Fallback for Static Assets (index.html)
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};