# ZenMind – A Full‑Stack Mental‑Health Support Platform  

**_Empowering students with anonymous counseling, AI‑driven emotional support, and personalized wellness tools – all in one secure, modern web app._**  

---  

## Table of Contents  

| # | Section |
|---|---------|
| 1 | [Project Overview](#project-overview) |
| 2 | [Key Features](#key-features) |
| 3 | [Tech Stack](#tech-stack) |
| 4 | [Project Structure](#project-structure) |
| 5 | [Getting Started](#getting-started) |
| 6 | [Running the Development Environment](#running-the-development-environment) |
| 7 | [API Reference](#api-reference) |
| 8 | [Frontend Usage](#frontend-usage) |
| 9 | [Testing](#testing) |
|10 | [Contributing](#contributing) |
|11 | [License](#license) |
|12 | [Acknowledgements](#acknowledgements) |

---  

## Project Overview  

**ZenMind** is a production‑ready, open‑source platform that provides students (school & college) with:

* **Anonymous counseling session booking** – no personal identifiers are stored, protecting privacy.  
* **AI‑powered chatbot** – built on Groq’s Llama‑3.3‑70B model, offering empathetic, concise guidance.  
* **Self‑assessment & scoring** – mental‑health questionnaires with instant, personalized recommendations.  
* **Therapy & wellness content** – curated videos (Mindfulness, Sleep, Stress‑relief) in multiple languages (Tamil, Bengali, …).  
* **Physical‑health trackers** – blood‑pressure, sleep, and diet modules that integrate with the mental‑health view.  

The platform is built as a **FastAPI** backend (Python) and a **Next.js** + **React** + **Tailwind CSS** frontend, communicating over **ASGI** (uvicorn) with JSON‑based REST endpoints.

---  

## Key Features  

| Category | Description |
|----------|-------------|
| **Anonymous Counseling** | Students can book a 30‑minute video/voice session with a certified counselor without revealing name, email or phone. |
| **AI Chatbot** | Real‑time conversational support using Groq’s Llama‑3.3‑70B. The system prompt enforces short, actionable advice (250‑300 words, bullet‑style). |
| **Self‑Assessment** | Standardized questionnaires (PHQ‑9, GAD‑7, etc.) with automatic scoring and tailored wellness plans. |
| **Therapy Library** | Curated videos for Mindfulness, Sleep, Mental‑Wellness, and Breathing exercises, multilingual (Tamil, Bengali). |
| **Physical‑Health Tracking** | Simple BP, sleep‑duration, and diet‑recommendation widgets that feed into the overall wellness score. |
| **Admin Dashboard** | Secure admin login (`AdminLogin` model) to manage counselors, content, and view aggregated analytics. |
| **Extensible Architecture** | Plug‑in friendly – add new assessment modules, content types, or external AI providers with minimal code changes. |
| **Responsive UI** | Tailwind‑styled components adapt to mobile, tablet, and desktop. |
| **Type‑Safe Frontend** | All client‑side code written in TypeScript, guaranteeing compile‑time safety. |
| **OpenAPI Docs** | Auto‑generated Swagger UI at `/docs` (FastAPI) for developers. |

---  

## Tech Stack  

| Layer | Technology | Badge |
|-------|------------|-------|
| **Backend** | Python 3.11, FastAPI, Pydantic, Uvicorn (ASGI) | ![Python](https://img.shields.io/badge/python-3.11%20%7C%20FastAPI-3776AB?logo=python) |
| **AI Integration** | Groq LLM (llama‑3.3‑70b‑versatile) | ![Groq](https://img.shields.io/badge/Groq-LLM-FF6F61) |
| **Data Store** | JSON files (persisted locally) – `data.json`, `food_db.json` | ![JSON](https://img.shields.io/badge/JSON-Data-5F9EA0) |
| **Frontend** | Node.js 20, React 18, Next.js 14, TypeScript 5, Tailwind CSS 3 | ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs) |
| **Package Management** | Poetry (Python), npm (Node) | ![Poetry](https://img.shields.io/badge/Poetry-1.5-60A5FA?logo=poetry) ![npm](https://img.shields.io/badge/npm-9-CB3837?logo=npm) |
| **Testing** | pytest, Playwright (E2E) | ![pytest](https://img.shields.io/badge/pytest-7-0A9DFF?logo=pytest) |
| **CI/CD** | GitHub Actions (lint, test, build) | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-✓-2088FF?logo=github) |
| **Deployment** | Docker (multi‑stage), optional Vercel for frontend | ![Docker](https://img.shields.io/badge/Docker-✓-2496ED?logo=docker) |

---  

## Project Structure  

```
zenmind/
├─ backend/
│   ├─ __init__.py
│   ├─ main.py                # Full FastAPI app (with admin & user routes)
│   ├─ main_simple.py         # Minimal version for quick prototyping
│   ├─ ai_agent.py            # Wrapper around Groq LLM calls
│   ├─ groq_client.py         # Low‑level HTTP client for Groq API
│   ├─ data/
│   │   ├─ food_db.json       # Nutrition DB used by diet recommendation
│   │   └─ ...                # Additional static JSON assets
│   ├─ data.json               # Core app data (counselors, bookings, assessments)
│   └─ a.html                  # Simple static page used for health‑check
├─ zenmind/
│   ├─ app/
│   │   ├─ therapy/
│   │   │   └─ page.tsx       # Therapy video catalogue (Tamil/Bengali)
│   │   ├─ components/
│   │   │   └─ *.tsx          # Re‑usable UI components
│   │   └─ layout.tsx
│   ├─ public/
│   │   └─ images/
│   ├─ next.config.ts          # Next.js configuration (TS)
│   └─ tsconfig.json
├─ frontend.py                 # Small script to start Next.js dev server from Python
├─ pyproject.toml              # Poetry config, dependencies, scripts
├─ package.json                # npm scripts, dependencies
├─ tailwind.config.js
├─ README.md
└─ ...                         # Other config files (eslint, prettier, .gitignore)
```

---  

## Getting Started  

### Prerequisites  

| Tool | Minimum Version |
|------|-----------------|
| **Python** | 3.11 |
| **Poetry** | 1.5 |
| **Node.js** | 20.x |
| **npm** | 9.x |
| **Docker** (optional) | 24.x |

> **Tip:** Use `pyenv` + `asdf` or `conda` to manage the Python version, and `nvm` for Node.

### 1️⃣ Clone the repository  

```bash
git clone https://github.com/your-org/zenmind.git
cd zenmind
```

### 2️⃣ Backend setup  

```bash
# Install Python dependencies via Poetry
poetry install

# Activate the virtual environment
poetry shell

# (Optional) Load sample data
cp backend/data.sample.json backend/data.json
```

### 3️⃣ Frontend setup  

```bash
# Install Node dependencies
npm ci   # or `npm install` if you prefer

# Build Tailwind CSS (watch mode)
npm run dev:css
```

### 4️⃣ Environment variables  

Create a `.env` file in the project root (or use Docker secrets). Minimum required keys:

```dotenv
# FastAPI
HOST=0.0.0.0
PORT=8000
DEBUG=True

# Groq LLM
GROQ_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx

# JWT secret for auth
JWT_SECRET=super-secret-key
JWT_ALGORITHM=HS256
```

### 5️⃣ Run the application  

#### Development (backend + frontend)

```bash
# Terminal 1 – FastAPI (backend)
poetry run uvicorn backend.main:app --reload --host $HOST --port $PORT

# Terminal 2 – Next.js (frontend)
npm run dev   # starts on http://localhost:3000
```

#### Production (Docker)  

```bash
docker compose up --build -d
# API reachable at http://localhost:8000
# Frontend reachable at http://localhost:3000
```

---  

## Usage Examples & API Endpoints  

### Authentication  

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/admin/login` | `{ "name": "...", "email": "...", "phone": "...", "institute": "..." }` | Returns JWT for admin actions. |
| `POST` | `/user/login` | `{ "username": "...", "email": "...", "phone": "...", "institute": "..." }` | Returns JWT for a regular user. |

> **Note:** All protected routes require the `Authorization: Bearer <token>` header.

### Counseling Booking  

```http
POST /bookings
Content-Type: application/json
Authorization: Bearer <jwt>

{
  "user_id": "user-123",
  "counselor_id": "counselor-42",
  "preferred_time": "2024-10-15T14:00:00Z",
  "anonymous": true
}
```

Response (201):

```json
{
  "booking_id": "bk-9f7c1a",
  "status": "pending",
  "meeting_link": "https://zoom.us/j/123456789"
}
```

### AI Chatbot  

```http
POST /chat
Content-Type: application/json
Authorization: Bearer <jwt>

{
  "model_name": "llama-3.3-70b-versatile",
  "model_provider": "Groq",
  "messages": ["I feel overwhelmed with exams."]
}
```

Response (200):

```json
{
  "reply": "Take a short break. • Breathe slowly for 4‑7‑8 count. • Write down three tasks you can finish in 15 min. • Reach out to a peer or counselor if the feeling persists."
}
```

### Mental‑Health Assessment  

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/assessment/start` | `POST` | Returns a new assessment session ID. |
| `/assessment/{session_id}/answer` | `POST` | Submit a single answer (`question_id`, `choice`). |
| `/assessment/{session_id}/result` | `GET` | Returns scored result + personalized recommendations. |

### Therapy Content (Read‑only)  

```http
GET /therapy/videos?lang=ta&category=Mindfulness%20Guide
```

```json
[
  {
    "id": "ta-mindfulness-video-1",
    "title": "BEST Guided Meditation for BEGINNERS (Tamil)",
    "link": "https://www.youtube.com/watch?v=_flmnpBMBSE"
  },
  ...
]
```

---  

## Frontend Usage  

The Next.js UI is split into the following pages (all located under `zenmind/app`):

| Route | Purpose |
|-------|---------|
| `/` | Landing page with quick links to assessment, chatbot, and booking. |
| `/assessment` | Interactive questionnaire wizard. |
| `/chatbot` | Real‑time chat UI (WebSocket‑enabled for streaming responses). |
| `/book` | Anonymous counseling booking form. |
| `/therapy` | Video library filtered by language & category. |
| `/track` | BP, sleep, and diet trackers (simple forms + charts). |
| `/admin` | Protected dashboard (counselor management, analytics). |

**Running the UI locally**

```bash
npm run dev   # hot‑reload on http://localhost:3000
```

**Building for production**

```bash
npm run build
npm start
```

---  

## Testing  

### Backend  

```bash
poetry run pytest -vv
```

- Unit tests live in `backend/tests/`.  
- Mocked Groq responses are provided via `tests/mocks/groq_*.json`.  

### Frontend  

```bash
npm run test          # Jest + React Testing Library
npm run
