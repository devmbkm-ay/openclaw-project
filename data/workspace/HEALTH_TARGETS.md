# HEALTH_TARGETS.md — URLs à surveiller

Mis à jour manuellement ou par l'agent lors de nouveaux déploiements.

## Cibles actives

| Projet | URL | Type | Critique |
|---|---|---|---|
| OpenClaw | https://assistant.ricardomboukou.online | App web | ✅ oui |
| QuizFlip frontend | https://virid.quizflip.vercel.app | Vercel | ✅ oui |
| QuizFlip API | https://quizflip-production.up.railway.app/api | Railway API | ✅ oui |
| Enidpath | https://www.enidpath.com | Site web | ✅ oui |

## Cibles à ajouter (URL inconnue)

| Projet | Plateforme | Notes |
|---|---|---|
| noceflorale | ? | URL non trouvée dans les configs |
| budgetapp | Vercel | URL de production non configurée localement |
| fininside | ? | URL inconnue |
| ricardomboukou | ? | Portfolio, URL inconnue |

## Procédure de health check

Pour chaque URL :
```bash
curl -o /dev/null -s -w "%{http_code}" --max-time 10 <URL>
```
- `2xx` → ✅ En ligne
- `3xx` → ⚠️ Redirection (vérifier)
- `4xx` / `5xx` → ❌ Erreur
- Timeout / no response → ❌ Hors ligne

## Format de rapport Telegram

```
🔍 Health Check — HH:MM

✅ OpenClaw          200
✅ QuizFlip front    200
⚠️ QuizFlip API      301
❌ Enidpath          503

Actions requises : [liste si problèmes]
```
