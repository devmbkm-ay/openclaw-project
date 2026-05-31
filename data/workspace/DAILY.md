## 2026-05-25 15:45 — [P-Assistant Optimization Sprint]
- **Level 1 - Model & Context**: Added neural-chat (4k, fast-routing) as fallback; configured dual-chain phi4-mini → neural-chat with 15m/10m keep_alive
- **Level 2 - Memory & Attention**: Created prune-memory.js script (30-day stale threshold); auto-archives to memory-archive/ with timestamp
- **Level 3 - Plugins**: Documented conditional plugin routing (PLUGIN_ROUTING.md); force-override syntax (@search, @code, @local, @full)
- **Deliverables**: setup-models.sh (model initialization), OPTIMIZATION_LOG.md (metrics baseline), agent router instructions
- **Expected wins**: Routine queries 60% faster; memory context 40% lighter; external API calls ~50% fewer
- **Next**: Monitor plugin-decisions.jsonl for effectiveness; run prune-memory.js weekly

## 2026-05-15 17:55 — [Point Modifications]
- `quizflip` a des changements non-commit.
- Nature des changements : màj dépendances, ajout de prop-types, refactor de state management, et optimisations.
- Tous les autres projets sont propres.

## 2026-05-16 02:36 — [OpenClaw stabilité]
- Diagnostic des échecs chat : Groq échouait sur prompt trop volumineux, OpenRouter free était rate-limited, et un fallback Mistral free était invalide.
- Chaîne par défaut changée dans `data/openclaw.json` vers `google/gemini-2.5-pro` avec fallback `claude-haiku-4-5` puis `claude-sonnet-4-6`.
- Objectif : privilégier des providers déjà vus comme fonctionnels dans l'historique local et supprimer les fallbacks les plus fragiles.

## 2026-05-16 02:40 — [OpenClaw sécurité]
- Désactivation de `gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback` dans `data/openclaw.json`.
- Le contrôle d’origine repose maintenant uniquement sur la liste explicite `allowedOrigins`.

## 2026-05-16 02:43 — [OpenClaw nettoyage]
- Nettoyage du catalogue `agents.defaults.models` pour retirer les entrées Groq, OpenAI et OpenRouter free qui n'étaient plus souhaitées comme options par défaut.
- Conservation des plugins/providers actifs pour éviter de casser un usage manuel futur.

## 2026-05-16 02:47 — [OpenClaw UI]
- Désactivation des plugins `openai` et `groq` dans `data/openclaw.json` pour alléger les sélecteurs de modèles côté interface.
- Conservation de `google`, `anthropic`, `openrouter` et `ollama` comme options visibles/utiles.

## 2026-05-16 02:52 — [OpenClaw fallback]
- Remplacement des fallbacks Anthropic par `openrouter/auto` puis `openrouter/moonshotai/kimi-k2.6`.
- Motif : timeouts répétés sur Gemini et billing Anthropic indisponible.

## 2026-05-16 03:01 — [OpenClaw modèle principal]
- Bascule du modèle principal de `google/gemini-2.5-pro` vers `openrouter/moonshotai/kimi-k2.6` dans `data/openclaw.json`.
- Nouveau repli : `openrouter/auto` puis `google/gemini-2.5-pro`.
- Motif : Gemini répond parfois, mais provoque aussi des timeouts de 120s sur des tours plus lourds, ce qui fige l'expérience chat.

## 2026-05-24 18:30 — [OpenClaw baseline locale]
- Simplification de `data/openclaw.json` vers une baseline locale Ollama-only avec `ollama/phi4-mini` pour l'agent principal et l'agent `code`.
- Désactivation des plugins LLM externes (`anthropic`, `google`, `openrouter`, `openai`, `groq`) sur le chemin actif pour éviter les erreurs de billing et les rate limits.
- Correction de la commande shell `openclaw-autoapprove` dans `docker-compose.yml` pour éviter un démarrage cassé.
