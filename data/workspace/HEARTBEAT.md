# HEARTBEAT.md — Active Periodic Tasks

# Rules:
# - Batch all checks in one pass.
# - Skip duplicate checks inside 30 minutes (use memory/heartbeat-state.json).
# - Update memory/heartbeat-state.json after each pass.
# - Write outputs to memory/YYYY-MM-DD.md (append, never overwrite).

## MORNING BRIEF (trigger: 06:00 Paris time)

Run these checks in one pass and write a concise summary to today's memory file:

1. **Dev pulse** — Check if any of the mounted projects have uncommitted changes or pending PRs.
   - `git -C /projects/ricardomboukou status --short`
   - `git -C /projects/noceflorale status --short` (if exists)
   - Report: files changed, nothing if clean.

2. **Priority focus** — State the single most important task for today across all projects.
   Read: PROJECT_PORTFOLIO.md, BUSINESS.md. Pick the highest-leverage next action.

3. **Learning micro-moment** — One of:
   - A tech tip relevant to the current build
   - A BTC/macro signal if materially relevant
   - A callisthenics drill note from LEARNING.md

4. **Day framing** — One-sentence intention for the day (from SOUL.md principles).

Output format (append to `memory/YYYY-MM-DD.md`):
```
## Morning Brief — HH:MM

**Dev:** [status or "all clean"]
**Priority:** [single task]
**Learn:** [one insight]
**Intention:** [one sentence]
```

---

## NIGHTLY DEV AUDIT (trigger: 23:00 Paris time)

1. **Commits today** — Count commits across all active projects.
2. **Open items** — Any TODOs left in today's memory file?
3. **Tomorrow's focus** — Based on today's work, suggest tomorrow's top task.
4. **Learning capture** — Prompt: "What did you learn or ship today that compounds?"

Output format (append to `memory/YYYY-MM-DD.md`):
```
## Nightly Audit — HH:MM

**Shipped:** [commits / features]
**Carried over:** [unfinished]
**Tomorrow:** [top task]
**Journal:** [learning capture prompt — awaiting Ricardo's input]
```

---

## WEEKLY DIGEST (trigger: Monday 07:00 Paris time)

1. **Week summary** — Read all `memory/2026-MM-DD.md` files from the past 7 days.
2. **Projects delta** — What moved forward, what is blocked per project.
3. **Business pipeline** — Any client updates, invoices, or proposals due.
4. **SEO/marketing** — Was 1 article published this week? If not, flag it.
5. **Learning streak** — Learning journal filled? Anki reviews done?
6. **Weekly intention** — One focus theme for the coming week.

Output: Write `memory/weekly-YYYY-WXX.md` with the digest.

---

## PERFORMANCE GUARD

- Skip any task if the last run was less than 30 minutes ago (check heartbeat-state.json).
- Never re-run the morning brief if it already ran today.
- Keep each output block under 10 lines — signal only.
