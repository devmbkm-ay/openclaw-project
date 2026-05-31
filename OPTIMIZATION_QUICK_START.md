# Quick Start: P-Assistant Optimization
# Fast reference for using new efficiency features

## 🚀 First-Time Setup (5 minutes)

```bash
# 1. Initialize dual-model chain
./setup-models.sh

# 2. Verify both models are loaded
curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"'

# Output should show:
#   - phi4-mini
#   - neural-chat
```

## 📋 Weekly Maintenance

```bash
# Run memory pruning (archives stale tasks)
node scripts/prune-memory.js

# View archived history
ls -lt data/workspace/memory-archive/
```

## 🎯 Query Optimization Tips

### Automatic (No action needed)
- Routine questions → Uses phi4-mini locally (fast baseline)
- Falls back to neural-chat for classification if needed

### Manual Controls
```
@search [query]    — Force full search suite (searxng, exa, tavily)
@code [query]      — Code mode: openshell + memory only
@local [query]     — Internal only: no external APIs
@full [query]      — All plugins enabled
```

Examples:
```
@search latest AI trends in May 2026
@code debug my React component crash
@local what was I working on yesterday?
```

## 📊 Monitoring

Check effectiveness weekly:

```bash
# Recent queries and response times
tail -20 data/logs/commands.log

# Memory state (shows keep_alive heartbeats)
docker logs openclaw-gateway 2>&1 | grep -i "ollama\|model" | tail -10

# Plugin routing decisions (when implemented)
tail -5 memory/plugin-decisions.jsonl
```

## ⚡ Performance Targets

After optimization, expect:
- **Routine queries**: 1-2s (was 3-5s)
- **Memory context**: 40% smaller (pruned)
- **API calls**: 50% fewer (conditional plugins)

## 🔧 Troubleshooting

**Q: neural-chat model not found**  
A: Run `./setup-models.sh` to pull it

**Q: Fallback taking too long**  
A: Check if Ollama is under load: `docker logs openclaw-ollama`

**Q: Memory still too large**  
A: Run `node scripts/prune-memory.js --force` to archive all paused tasks

**Q: Want to use external models again?**  
A: Enable plugins in data/openclaw.json → `"enabled": true` for anthropic/google/openrouter

## 📚 Full Documentation

- Setup & models: `setup-models.sh` + `docker-compose.yml`
- Memory pruning: `scripts/prune-memory.js` + `OPTIMIZATION_LOG.md`
- Plugin routing: `PLUGIN_ROUTING.md` + `.agent-plugin-router.instructions`
- Baseline metrics: `OPTIMIZATION_LOG.md` (before/after table)

---

**Status**: Active (2026-05-25)  
**Last verified**: Model chain dual-loaded ✅  
**Support**: Check DAILY.md for recent changes
