# Plugin Routing Rules
# Conditional activation of search/external plugins for P-Assistant efficiency
# 
# Strategy: Reduce external API calls and plugin overhead for routine tasks
# Search plugins only activate when queries explicitly request information retrieval
#
# Last updated: 2026-05-25

## Query Patterns → Plugin Activation

### HIGH-SIGNAL QUERIES (Full plugin suite)
- "search for", "find", "lookup", "check latest", "what's new"
- "research", "investigate", "analyze", "compare"
- "news", "updates", "trends", "statistics"
- "price", "weather", "traffic", "status"
- Triggers: **searxng**, **exa**, **tavily**, **web-readability** enabled

### MEDIUM-SIGNAL QUERIES (Selective plugins)
- "help with", "review code", "debug", "refactor"
- "explain", "how to", "guide", "tutorial"
- Triggers: **openshell** (if local), **active-memory** enabled
- Disabled: external search plugins

### LOW-SIGNAL QUERIES (Internal only)
- "remember", "note", "think about", "plan"
- "brainstorm", "summarize", "list"
- Code completion, prompt routing, classification
- Triggers: **active-memory**, **llm-task** only
- Disabled: all external plugins

## Implementation

This routing is enforced via:
1. **Agent.js rules** — Query classification before plugin loading
2. **openclaw.json** — Plugin default state (all enabled; rules override at request time)
3. **Memory context** — Recent search history to avoid redundant API calls

## Manual Override

User can force full/minimal plugin set:
- `@full-search [query]` → All plugins enabled
- `@local-only [query]` → Internal plugins only
- `@code [query]` → Code agent with openshell + memory only

## Metrics

Track in `memory/plugin-efficiency.json`:
- Queries by signal level
- API calls saved per week
- Response latency by plugin state
- Cost avoidance (external API calls prevented)

---

**Owner**: P-Assistant decision engine  
**Review cycle**: Weekly (check cost vs. latency tradeoffs)
