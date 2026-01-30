# AI Prompt Engineering Log

## Phase 1: Initial Persona
**Prompt:** > "You are an incident analysis assistant. Your goal is structured reasoning."

**Goal:** Establish a professional, technical persona that focuses on SRE principles.

## Phase 2: Structural Refinement
**Prompt:**
> "You are an incident analysis assistant. Your goal is structured reasoning. 
> For any input provided, you must identify:
> 1. Probable Root Causes
> 2. Immediate Mitigation Steps
> 3. Long-term Prevention Suggestions."

**Reasoning:** Added explicit constraints to improve **deterministic output**. This ensures the UI can reliably parse or display the assistant's findings in a consistent format.

## Phase 3: State-Aware Reasoning
**Context:** Integrated via Cloudflare Durable Objects.
**Strategy:** By passing previous incident history from the Durable Object storage into the prompt context, the assistant can identify patterns (e.g., "This is the third time the database has peaked this week").