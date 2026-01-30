# 🚨 SRE Incident Assistant (AI-Powered)

## 🔗 Live Demo
**Production URL:** [https://cf-ai-incident-assistant.sriteja.workers.dev/](https://cf-ai-incident-assistant.sriteja.workers.dev/)

> **Note:** If the AI response returns a "Quota Exceeded" error, it is due to OpenAI API limits on the testing key. The underlying Cloudflare architecture (Workers, Durable Objects, and Static Assets) is fully operational and handled via structured mock fallbacks if necessary.

---

## 🌟 Why This Architecture?

This project was designed to meet the high-availability and low-latency requirements of SRE teams:

* **Durable Objects for State Management:** Unlike standard AI chatbots that lose context, this app uses Durable Objects to maintain a consistent "Incident War Room" state. This ensures that every follow-up question is grounded in previous logs.
* **Structured Reasoning:** Leveraging a refined system prompt, the AI bypasses "chatty" responses to provide deterministic categories: **Root Cause**, **Mitigation**, and **Prevention**.
* **Edge-First Performance:** By running on the Cloudflare global network, the analysis begins the millisecond an engineer pastes a log, regardless of their location.

---

## 🚀 Cloudflare Tech Stack

* **Compute:** [Cloudflare Workers](https://workers.cloudflare.com/) (Request routing & API orchestration)
* **State:** [Durable Objects](https://developers.cloudflare.com/durable-objects/) (Global consistency & session memory using **SQLite storage**)
* **AI:** OpenAI GPT-4o (Structured reasoning engine)
* **Frontend:** Cloudflare Static Assets (SRE Dashboard UI)

---

## 🛠️ Project Structure

```text
├── src/
│   ├── worker.js        # Entry point & Request routing
│   ├── conversation.js  # Durable Object (State storage logic)
│   ├── routes.js        # AI route handler
│   └── utils.js         # LLM integration & Prompt logic
├── public/              # SRE Dashboard (HTML/CSS/JS)
├── wrangler.json        # Cloudflare configuration & migrations
├── prompts.md           # Prompt engineering documentation
└── README.md            # You are here!
```

---

## ⚙️ Setup & Deployment

### 1. Local Development
1. Clone the repository and install dependencies.
2. Create a `.dev.vars` file in the root:
   ```text
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Run the development server:
   ```bash
   npx wrangler dev
   ```

### 2. Production Deployment
To deploy to the Cloudflare global network, run:
```bash
# Deploy code and assets
npx wrangler deploy

# Set your production secret (Required for AI functionality)
npx wrangler secret put OPENAI_API_KEY
```

---

## 🧪 Operational Testing

### Test the Local API:
```bash
curl -X POST [http://127.0.0.1:8787/message](http://127.0.0.1:8787/message) \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Error: Connection timeout to database cluster us-east-1"}'
```

### Test the Live Production Endpoint:
```bash
curl -X POST [https://cf-ai-incident-assistant.sriteja.workers.dev/message](https://cf-ai-incident-assistant.sriteja.workers.dev/message) \
  -H "Content-Type: application/json" \
  -d '{"prompt": "High latency detected on API gateway"}'
```

---

## 📈 Future Roadmap
- [ ] **Workflows Integration:** Transition long-running diagnostic tasks to Cloudflare Workflows.
- [ ] **Streaming Responses:** Implement Server-Sent Events (SSE) for real-time analysis updates.
- [ ] **RAG:** Connect Cloudflare Vectorize to search through historical incident post-mortems.

---

### Troubleshooting with Live Logs
To monitor production traffic and debug in real-time:
```bash
npx wrangler tail
```