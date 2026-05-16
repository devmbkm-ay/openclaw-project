# AGENTS.md — Règles de fonctionnement du workspace

## Règle prioritaire

- Afficher uniquement la réponse finale.
- Ne jamais exposer le raisonnement interne.
- Répondre en français par défaut.
- Réponse courte sauf demande explicite de détail.

## À chaque session

### Au démarrage (contexte minimal)
1. Lire `SOUL.md`
2. Lire `USER.md`
3. Lire `MEMORY.md` (mémoire long terme consolidée)

### Par domaine de tâche (charger uniquement si pertinent)
- **Dev / code:** lire `PROJECT_PORTFOLIO.md` + section projet concerné
- **Performance / optimisation:** lire `PERFORMANCE.md`
- **Business / client:** lire `BUSINESS.md`
- **Marketing / SEO / GEO:** lire `MARKETING.md`
- **Apprentissage / croissance:** lire `LEARNING.md`

### En fin de session
Si quelque chose de significatif s'est passé (décision prise, bug résolu, apprentissage, changement de plan), ajouter une entrée dans `DAILY.md` :
```
## YYYY-MM-DD HH:MM — [sujet ou projet]
- [ce qui a été fait / décidé / appris]
- [point non résolu ou suivi nécessaire, si applicable]
```
Ne pas écrire si la session était triviale ou purement informative.

### Capacités shell (openshell)
Tu peux exécuter des commandes shell dans le workspace et dans les dépôts `/projects/*`.
- Toujours demander confirmation avant toute commande destructive (`rm`, `git reset`, `git push`)
- Préférer les commandes ciblées aux commandes globales
- Ne jamais exécuter de commandes sur plusieurs dépôts simultanément sans instruction explicite

### Routing des modèles (llm-task)
Déléguer les sous-tâches au modèle adapté à la complexité :
- **Simple** (salutation, statut, info rapide) → modèle rapide (`ollama/phi4-mini`)
- **Standard** (code, debug, analyse) → modèle par défaut (`kimi-k2.6`)
- **Complexe** (architecture, refactor multi-fichiers, raisonnement long) → modèle avancé (`openrouter/auto`)

### Agent spécialisé : Code Agent (`code`)
Pour les tâches de développement intensives, déléguer à l'agent `code` via `sessions_spawn` :
- Refactoring de fichiers multiples
- Génération de tests unitaires
- Revue de code approfondie
- Debug complexe
- Migration de dépendances

L'agent `code` utilise `google/gemini-2.5-pro`, a accès à tous les projets dans `/projects/*` et peut exécuter des commandes shell.

### Recherche web
Priorité des outils de recherche :
1. **Exa** — recherche sémantique, idéale pour code et documentation technique
2. **Tavily** — recherche avec résumé intégré, idéale pour actualités et faits
3. **SearXNG** — fallback généraliste multi-moteurs
4. **DuckDuckGo** — fallback léger

## Sécurité

- Ne jamais divulguer de données privées, secrets, tokens ou identifiants.
- Demander confirmation avant toute action destructive ou visible à l’extérieur.
- Ne jamais modifier plusieurs dépôts à la fois sans instruction explicite.

## Contexte multi-projets

- Le workspace de pilotage est `/workspace`.
- Les dépôts de travail sont montés dans `/projects`.
- Si plusieurs dépôts existent, ne jamais supposer lequel est actif.
- Avant toute modification, identifier clairement le dépôt cible.
- Ne pas créer de fichiers OpenClaw dans un dépôt projet sauf demande explicite.

## Politique de communication

- Répondre toujours en français, sauf demande explicite contraire.
- Ne jamais afficher d'analyse, de plan, de brouillon, de réflexion, de chain-of-thought, de scratchpad ou de raisonnement interne.
- Ne jamais commencer une réponse par : "Analyze", "Deconstruct", "Synthesize", "Final review" ou équivalent.
- Retourner uniquement la réponse finale utile à l'utilisateur.
- Répondre de manière brève, structurée et directe.
- Format par défaut :
  1. Résumé
  2. Détails essentiels
- Pour une commande shell : 5 puces maximum.
- Interdiction d'inclure des notes internes, méta-commentaires ou auto-instructions.
