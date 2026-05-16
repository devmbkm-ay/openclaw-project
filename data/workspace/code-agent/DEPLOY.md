# DEPLOY.md — Référence déploiement par projet

## Vercel (frontend Next.js / React)

Nécessite : `VERCEL_TOKEN` dans l'environnement du container.

### Commandes

```bash
# Preview deploy (test)
cd /projects/<nom> && npx vercel

# Production deploy
cd /projects/<nom> && npx vercel --prod

# Vérifier le statut du dernier déploiement
cd /projects/<nom> && npx vercel ls
```

### Projets Vercel confirmés

| Projet | Répertoire | Framework | Notes |
|---|---|---|---|
| enidpath | `/projects/enidpath` | Next.js | Lié (`.vercel/project.json`) |
| quizflip | `/projects/quizflip` | React SPA | `vercel.json` présent |
| budgetapp | `/projects/budgetapp` | Next.js monorepo (bun) | Build via `cd apps/web && bun run build` |

### Procédure de déploiement sécurisé

1. Vérifier que le code est propre : `git status`
2. Lancer lint/types si disponible
3. Demander confirmation avant `--prod`
4. Lancer le déploiement
5. Vérifier l'URL de preview retournée
6. Annoncer le résultat avec l'URL

---

## Coolify (self-hosted / backend)

Nécessite : `COOLIFY_URL` et `COOLIFY_TOKEN` dans l'environnement.

### Déclencher un redéploiement via API

```bash
curl -X POST "$COOLIFY_URL/api/v1/deploy" \
  -H "Authorization: Bearer $COOLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "<app-uuid>"}'
```

### Projets Coolify

| Projet | UUID | Notes |
|---|---|---|
| (à renseigner) | — | Renseigner les UUIDs depuis le dashboard Coolify |

---

## Règles de sécurité déploiement

- **Toujours** demander confirmation explicite avant un déploiement production
- Ne jamais déployer plusieurs projets en même temps
- En cas d'erreur de build, ne pas réessayer sans analyser les logs
- Toujours vérifier `git status` avant de déployer (pas de fichiers non commités sensibles)
