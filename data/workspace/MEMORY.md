# MEMORY.md - Long-Term Context

## Purpose
Curated long-term memory for OpenClaw collaboration with Ricardo. Keep this stable, high-signal, and periodically pruned.

## User Profile
- Roles: Senior Engineer, Investor (BTC/finance), Musician, Callisthenics practitioner
- Core goal: Human augmentation through practical AI orchestration
- Preferred interaction: Direct, concise, technically accurate

## OpenClaw Technical Context
- Environment: Docker on Ubuntu
- Runtime path: `docker-compose.yml` service `openclaw-gateway`
- Config truth: `data/openclaw.json`
- Primary model: `ollama/phi4-mini`
- Fallback chain: local-only baseline, no paid provider on the default path
- Stability note (2026-05-16): removed Groq as default primary because the injected prompt regularly exceeded its TPM/request budget; removed free OpenRouter defaults because of repeated upstream 429s and a broken Mistral free fallback.
- Security note (2026-05-16): disabled `gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback`; rely only on explicit `allowedOrigins`.
- Catalog note (2026-05-16): cleaned `agents.defaults.models` to keep only viable default options (`google`, `anthropic`, `ollama`, `openrouter` paid/auto) and removed dead Groq/OpenAI/free OpenRouter entries from the default model list.
- UI note (2026-05-16): disabled `openai` and `groq` plugins to reduce noise in model selectors while their accounts were not dependable for this setup.
- Fallback note (2026-05-16): replaced Anthropic fallbacks with `openrouter/auto` then `openrouter/moonshotai/kimi-k2.6` because Anthropic billing was exhausted and Gemini requests were timing out.
- Public UI: `https://assistant.ricardomboukou.online`
- Baseline note (2026-05-24): active config simplified to Ollama-first for both main and code agents; disabled Anthropic, Google, OpenRouter, OpenAI, and Groq plugins from the active session path to avoid billing and rate-limit failures.

## Operating Policy
- Priority order: explicit user request -> repository docs -> MEMORY.md
- Default behavior: execute end-to-end unless blocked
- Reliability loop: container -> heartbeat -> logs -> fallback

## Performance Heuristics
- Keep context minimal and task-scoped
- Batch related checks to lower overhead
- Escalate model complexity only when task risk or ambiguity requires it
- Preserve rollback points after config changes
- In OpenClaw, the local Ollama baseline is preferred for routine stability; only reintroduce external providers intentionally after validation

## Business Context
- Model: freelance (cash flow) + indie products (leverage)
- Markets: FR and EN/international, bilingual
- Active products: noceflorale, quizflip, fininside, enidpath, devassistant, budgetapp
- Priority revenue path: noceflorale (local service) → quizflip → budgetapp
- Full detail: `BUSINESS.md`

## Marketing & SEO
- Strategy: SEO + GEO (Generative Engine Optimization) for all projects
- Priority targets: noceflorale (FR local SEO), ricardomboukou (dev portfolio)
- Full detail: `MARKETING.md`

## Opportunity Radar
1. Cognitive expansion: memory drills and deep-work support (see LEARNING.md)
2. Financial sovereignty: disciplined risk/reward analysis, BTC cycle awareness
3. Physical/spiritual base: callisthenics, mindfulness, music (guitar)

## Paused / Pending Tasks

*   **Email Management Setup (Paused on 2026-05-17):**
    *   **Goal:** Automate email triage, summaries, draft replies, and bill notifications for Gmail and Outlook.
    *   **Status:** User confirmed interest. Paused before starting the Google Cloud API setup for Gmail.
    *   **Next Step:** Guide the user through the Google Cloud Console to create OAuth credentials for the Gmail API.

## Plan: Secure Admin Dashboard

*Status: In Progress (Phases 1 & 2 completed in March 2026).*

A secure dashboard for managing portfolio content dynamically.

### Phase 1: Backend API for Authentication (Done)
1.  **Database Schema:** Prisma extended with `User` model.
2.  **API Endpoints:** NextAuth.js configured with Credentials provider in `/api/auth/[...nextauth]`.
3.  **Password Security:** Hashing implemented for secure storage.

### Phase 2: Frontend Implementation & UI (Done)
1.  **UI Pages:** `/login` and initial `/dashboard` structure created.
2.  **Protected Routes:** `middleware.ts` implemented using `withAuth` to protect `/dashboard/:path*`.

### Phase 3: Dashboard for Content Management (Done)
1.  **Backend API for Projects:** CRUD routes implemented in `/api/admin/projects`.
2.  **Frontend Dashboard UI:** Full management interface created at `/[lang]/admin/dashboard`.
3.  **AI Integration:** Feature to generate project details from a GitHub URL using Gemini API and GitHub API implemented in `/api/admin/projects/analyze-repo`.
4.  **Media Management:** Image uploads integrated with Cloudinary in `/api/admin/upload-image`.
