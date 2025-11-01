
# NexusAI Learn — Student Learning Portal (Phase 1: Normal Chat)

> A full-stack AI-assisted learning platform built using **Angular**, **NestJS**, **PostgreSQL**, and **Ollama**.  
> This phase focuses on the **Normal Chat Flow**, laying the groundwork for RAG, MCP, and Agentic AI in later stages.

---

## 🚀 Overview

NexusAI Learn is a student-oriented learning portal designed to showcase practical AI capabilities — including local LLM chat, retrieval-augmented learning, intelligent planning, and note-based reasoning.

**Tech Stack:**
- **Frontend:** Angular  
- **Backend:** NestJS  
- **Database:** PostgreSQL (with pgvector planned for RAG)  
- **LLM Engine:** Ollama (local inference)  

---

## 🧩 Phase 1: Normal Chat Flow

The first milestone of NexusAI Learn focuses on a **simple chat system** that connects Angular → NestJS → Ollama.

This forms the base for integrating Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and Agentic AI workflows in the next phases.

---

## 🧱 Core Database Schema

```sql
-- Users
CREATE TABLE users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  password_hash text,
  created_at timestamptz default now()
);

-- Conversations (each represents a single chat session)
CREATE TABLE conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  title text,
  mode text default 'chat',
  summary text,
  created_at timestamptz default now(),
  last_message_at timestamptz default now()
);

-- Messages (individual messages inside each conversation)
CREATE TABLE messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id),
  sender text, -- 'user' | 'assistant' | 'system'
  content text,
  meta jsonb,
  created_at timestamptz default now()
);
```

---

## ⚙️ Chat Flow Architecture

1. **Frontend (Angular)** — Provides a chat UI where users can send messages and view AI responses.
2. **Backend (NestJS)** — Handles requests, stores messages, and proxies user prompts to **Ollama**.
3. **Ollama** — Runs locally to generate chat completions.

### Flow

```
User → Angular → NestJS (/chat/message)
      ↓
   Ollama (via HTTP)
      ↓
NestJS saves (user + AI messages)
      ↓
Angular displays conversation
```

---

## 🧠 Example Endpoints

### `POST /chat/message`
Send a message and get an AI reply.

**Request:**
```json
{
  "conversationId": "uuid",
  "prompt": "Explain binary search",
  "systemPrompt": "You are a helpful tutor."
}
```

**Response:**
```json
{
  "assistantMessage": "Binary search works by dividing the array...",
  "conversationId": "uuid"
}
```

### `GET /chat/conversations`
List all user conversations.

### `GET /chat/conversations/:id/messages`
Fetch all messages for a specific chat session.

---

## 🧰 Folder Structure

```
/client              # Angular frontend
/server              # NestJS backend
  ├── src/
  │   ├── auth/
  │   ├── users/
  │   ├── chat/
  │   ├── notes/           # Placeholder for future RAG
  │   └── plan/            # Placeholder for future agent planner
  ├
  ├── main.ts
  └── app.module.ts
/database
  └── migrations.sql
```

---

## ⚡ Environment Variables

```env
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nexusai
JWT_SECRET=supersecret
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

---

## 🧠 Future Phases

| Phase | Focus | Description |
|--------|--------|-------------|
| ✅ Phase 1 | **Normal Chat** | Angular → NestJS → Ollama chat completion |
| 🔄 Phase 2 | **RAG** | Add embeddings + pgvector for note-based retrieval |
| 🔄 Phase 3 | **MCP** | Implement tool-based reasoning protocol |
| 🔄 Phase 4 | **Agentic AI** | Introduce planning + autonomous reasoning for study plans |

---

## 💬 Developer Notes

- The chat schema (`conversations`, `messages`) provides clean separation for chat sessions and message logs.
- The backend can easily extend to RAG by embedding notes and linking retrieval context per conversation.
- The Ollama integration keeps everything **local-first** and **private**.
- Angular frontend can reuse the same API for later RAG/Agent modes.

---

## 🪪 License

MIT License © 2025 Sanket  
Built to learn, teach, and show what local AI can do.

---

**Next Steps:**  
Once you confirm this setup, we can scaffold:
- NestJS Chat Module (Controller + Service)
- Angular Chat UI
- Optional Docker Compose for Postgres + Ollama
