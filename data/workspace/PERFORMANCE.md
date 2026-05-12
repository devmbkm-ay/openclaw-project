# PERFORMANCE.md - OpenClaw Performance Playbook

## Goal
Run OpenClaw with maximum practical speed, reliability, and signal-to-noise while keeping token cost controlled.

## 1) Runtime Baseline
- Source of truth: `data/openclaw.json`.
- Gateway runtime: `docker-compose.yml` service `openclaw-gateway`.
- Keep one active baseline before tuning: stable first, then optimize.

## 2) Session Startup Sequence
1. Verify container health.
2. Verify gateway reachability.
3. Verify model/auth profile is available.
4. Run tasks.
5. Check logs only if latency/errors appear.

## 3) Prompt Efficiency Rules
- Use explicit scope, expected output format, and hard constraints.
- Keep prompts short and deterministic; avoid repeated background context.
- Load only required files, not entire directories.
- Batch related checks in one turn instead of many fragmented calls.
- Prefer concise outputs unless detail is explicitly requested.

## 4) Context & Memory Efficiency
- Daily volatile context: `memory/YYYY-MM-DD.md`.
- Curated long-term context: `MEMORY.md`.
- Promote only stable, high-value facts to long-term memory.
- Prune stale memory entries weekly to reduce irrelevant context load.

## 5) Heartbeat Efficiency
- Keep `HEARTBEAT.md` empty when no active automations are needed.
- If enabled, keep tasks minimal, concrete, and bounded.
- Avoid expensive checks more often than every 30-60 minutes unless urgent.
- Use `memory/heartbeat-state.json` to prevent duplicate checks.

## 6) Reliability Guardrails
- Do not change multiple system variables at once (model + auth + gateway).
- After config changes, run one validation cycle before normal usage.
- Keep rollback points (`data/openclaw.json.bak*`) and document what changed.

## 7) Security That Also Improves Performance
- Do not expose or duplicate gateway tokens in docs or chat outputs.
- Keep auth mode explicit and minimal.
- Reduce noisy external integrations that generate low-value events.

## 8) Fast Troubleshooting Ladder
1. `docker compose ps`
2. `docker compose logs --tail=200 openclaw-gateway`
3. Validate `data/openclaw.json` syntax and model id
4. Confirm gateway token and port mapping
5. Retry with minimal prompt

## 9) Definition of "Best Performance"
- Low latency for routine operations
- High first-pass accuracy on execution tasks
- Minimal redundant tokens and repeated context
- Stable uptime with predictable behavior
