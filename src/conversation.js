export class Conversation {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    try {
      const { text } = await request.json();
      
      let history = (await this.state.storage.get("history")) || [];
      history.push({ role: "user", content: text, timestamp: Date.now() });

      await this.state.storage.put("history", history);

      return new Response(JSON.stringify({ history }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response("Invalid JSON or internal error", { status: 400 });
    }
  }
}